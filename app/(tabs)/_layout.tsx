import { Feather } from '@expo/vector-icons';
import { Tabs, usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Platform, Pressable, Text, View, useWindowDimensions } from 'react-native';
import { Wordmark } from '../../components/ui/Wordmark';
import { colors, fonts } from '../../constants/colors';

const NAV_ITEMS = [
  { name: 'index', title: 'Dashboard', icon: 'grid', route: '/' },
  { name: 'busca', title: 'Catálogo & Busca', icon: 'search', route: '/busca' },
  { name: 'comparar', title: 'Oráculo & Comparador', icon: 'sliders', route: '/comparar' },
  { name: 'customizer', title: 'Create your car', icon: 'tool', route: '/customizer' },
] as const;

export default function TabLayout() {
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width >= 768;
  const router = useRouter();
  const pathname = usePathname();

  if (isDesktop) {
    return (
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: colors.bg.canvas }}>
        {/* Left Sidebar Navigation */}
        <View
          style={{
            width: 260,
            backgroundColor: colors.bg.surface,
            borderRightWidth: 1,
            borderRightColor: colors.bg.border,
            paddingVertical: 24,
            paddingHorizontal: 20,
            justifyContent: 'space-between',
          }}
        >
          <View>
            <View style={{ marginBottom: 32 }}>
              <Wordmark />
            </View>

            <View style={{ gap: 6 }}>
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.route === '/'
                    ? pathname === '/' || pathname === '/index'
                    : pathname.startsWith(item.route);

                return (
                  <Pressable
                    key={item.name}
                    onPress={() => router.push(item.route as any)}
                    style={({ pressed }) => ({
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 12,
                      paddingHorizontal: 14,
                      paddingVertical: 12,
                      borderRadius: 12,
                      backgroundColor: isActive ? 'rgba(0, 102, 204, 0.22)' : pressed ? 'rgba(255,255,255,0.04)' : 'transparent',
                      borderWidth: 1,
                      borderColor: isActive ? 'rgba(56, 189, 248, 0.4)' : 'transparent',
                    })}
                  >
                    <Feather
                      name={item.icon as any}
                      size={18}
                      color={isActive ? colors.brand.blueLight : colors.text.secondary}
                    />
                    <Text
                      style={{
                        fontFamily: isActive ? fonts.sansBold : fonts.sansMedium,
                        fontSize: 14,
                        color: isActive ? colors.text.primary : colors.text.secondary,
                      }}
                    >
                      {item.title}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Footer Badge in Sidebar */}
          <View
            style={{
              padding: 14,
              borderRadius: 14,
              backgroundColor: colors.bg.subtle,
              borderWidth: 1,
              borderColor: colors.bg.border,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: colors.accent.emerald }} />
              <Text style={{ fontFamily: fonts.monoBold, fontSize: 10, color: colors.text.primary }}>
                FORD INTELLIGENCE
              </Text>
            </View>
            <Text style={{ fontFamily: fonts.sans, fontSize: 11, color: colors.text.muted, lineHeight: 15 }}>
              AutoBench v2.0 · Plataforma de Inteligência Competitiva
            </Text>
          </View>
        </View>

        {/* Main Content Area */}
        <View style={{ flex: 1, backgroundColor: colors.bg.canvas }}>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarStyle: { display: 'none' },
            }}
          >
            <Tabs.Screen name="index" />
            <Tabs.Screen name="busca" />
            <Tabs.Screen name="comparar" />
            <Tabs.Screen name="customizer" />
          </Tabs>
        </View>
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.bg.surface,
          borderTopColor: colors.bg.border,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 82 : 68,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
        },
        tabBarActiveTintColor: colors.brand.indigo,
        tabBarInactiveTintColor: colors.text.muted,
        tabBarLabelStyle: {
          fontFamily: fonts.sansMedium,
          fontSize: 10.5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, focused }) => (
            <Feather name="grid" size={20} color={color} strokeWidth={focused ? 2.4 : 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="busca"
        options={{
          title: 'Catálogo',
          tabBarIcon: ({ color, focused }) => (
            <Feather name="search" size={20} color={color} strokeWidth={focused ? 2.4 : 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="comparar"
        options={{
          title: 'Oráculo',
          tabBarIcon: ({ color, focused }) => (
            <Feather name="sliders" size={20} color={color} strokeWidth={focused ? 2.4 : 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="customizer"
        options={{
          title: 'Create Car',
          tabBarIcon: ({ color, focused }) => (
            <Feather name="tool" size={20} color={color} strokeWidth={focused ? 2.4 : 2} />
          ),
        }}
      />
    </Tabs>
  );
}
