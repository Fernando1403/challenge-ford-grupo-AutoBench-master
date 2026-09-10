import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/colors';
import type { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
  onPress: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => (
  <View style={{ width: '31%', minWidth: 150, height: 115, borderRadius: 16, overflow: 'hidden' }}>
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        width: '100%',
        height: 115,
        opacity: pressed ? 0.95 : 1,
        transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
      })}
    >
      <View
        style={{
          width: '100%',
          height: 115,
          backgroundColor: colors.bg.surface,
          borderWidth: 1,
          borderColor: colors.bg.border,
          borderRadius: 16,
          padding: 16,
        }}
      >
        <Text
          style={{
            position: 'absolute',
            bottom: -8,
            right: -2,
            fontFamily: fonts.monoBold,
            fontSize: 56,
            color: colors.brand.indigo,
            opacity: 0.06,
            letterSpacing: -3,
            lineHeight: 56,
          }}
        >
          {category.code}
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View
            style={{
              paddingHorizontal: 7,
              paddingVertical: 3,
              borderRadius: 6,
              backgroundColor: colors.brand.accentGlow,
              borderWidth: 1,
              borderColor: 'rgba(99, 102, 241, 0.25)',
            }}
          >
            <Text style={{ fontFamily: fonts.monoBold, fontSize: 9.5, color: colors.brand.indigo }}>
              {category.code}
            </Text>
          </View>
          <Feather name="arrow-up-right" size={16} color={colors.text.muted} />
        </View>

        <View style={{ position: 'absolute', left: 16, bottom: 14 }}>
          <Text
            style={{
              fontFamily: fonts.sansBold,
              fontSize: 16,
              color: colors.text.primary,
              letterSpacing: -0.4,
              lineHeight: 18,
            }}
          >
            {category.label}
          </Text>
          <Text
            style={{
              fontFamily: fonts.monoMedium,
              fontSize: 10.5,
              color: colors.text.secondary,
              letterSpacing: 0.4,
              marginTop: 4,
            }}
          >
            {category.count} {category.count === 1 ? 'modelo' : 'modelos'}
          </Text>
        </View>
      </View>
    </Pressable>
  </View>
);
