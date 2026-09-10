import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CategoryCard } from '../../components/search/CategoryCard';
import { CategoryListView } from '../../components/search/CategoryListView';
import { HierarchicalSearchBar } from '../../components/search/HierarchicalSearchBar';
import { colors, fonts } from '../../constants/colors';
import { CatalogService } from '../../services/catalog';
import type { Category } from '../../types';

export default function BuscaScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const categories = CatalogService.getCategories();

  if (selectedCategory) {
    return (
      <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg.canvas }}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <CategoryListView
            category={selectedCategory}
            onBack={() => setSelectedCategory(null)}
            onSelect={(vehicleId) => router.push(`/vehicle/${vehicleId}`)}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg.canvas }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 20, paddingTop: 14, paddingBottom: 6 }}>
          <HierarchicalSearchBar
            onExactSearch={(vehicleId) => router.push(`/vehicle/${vehicleId}`)}
            onBroadSearch={(brand, model, version, year) =>
              router.push({
                pathname: '/model-results',
                params: {
                  brand,
                  model,
                  ...(version ? { version } : {}),
                  ...(year != null ? { year: String(year) } : {}),
                },
              })
            }
          />
        </View>

        <View style={{ paddingHorizontal: 20, paddingTop: 18, paddingBottom: 16 }}>
          <Text
            style={{
              fontFamily: fonts.sansBold,
              fontSize: 24,
              color: colors.text.primary,
              letterSpacing: -0.6,
              lineHeight: 26,
            }}
          >
            Segmentos do Mercado
          </Text>
          <Text
            style={{
              fontFamily: fonts.sans,
              fontSize: 13,
              color: colors.text.secondary,
              marginTop: 4,
            }}
          >
            Navegue por 12 categorias catalogadas
          </Text>
        </View>

        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            flexWrap: 'wrap',
            rowGap: 10,
            justifyContent: 'space-between',
          }}
        >
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} onPress={() => setSelectedCategory(c)} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
