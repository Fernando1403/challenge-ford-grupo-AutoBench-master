import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/colors';
import type { Vehicle } from '../../types';

type CategoryId = 'motorizacao' | 'dimensoes' | 'tecnologia' | 'seguranca';

const CATEGORIES: { id: CategoryId; label: string; icon: keyof typeof Feather.glyphMap; sections: string[] }[] = [
  { id: 'motorizacao', label: 'Motorização', icon: 'activity',     sections: ['engine', 'transmission'] },
  { id: 'dimensoes',   label: 'Dimensões',   icon: 'maximize-2',   sections: ['dimensions', 'wheels'] },
  { id: 'tecnologia',  label: 'Tecnologia',  icon: 'cpu',          sections: ['tech', 'lighting', 'driving_modes'] },
  { id: 'seguranca',   label: 'Segurança',   icon: 'shield',       sections: ['safety', 'suspension'] },
];

interface SpecsMatrixProps {
  vehicle: Vehicle;
}

export const SpecsMatrix: React.FC<SpecsMatrixProps> = ({ vehicle }) => {
  const [cat, setCat] = useState<CategoryId>('motorizacao');
  const active = CATEGORIES.find((c) => c.id === cat)!;
  const sections = vehicle.sections.filter((s) => active.sections.includes(s.id));
  const rows = sections.flatMap((s) => s.specs);

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingHorizontal: 20, paddingBottom: 14 }}
        style={{ marginHorizontal: -20 }}
      >
        {CATEGORIES.map((c) => {
          const isActive = c.id === cat;
          return (
            <Pressable
              key={c.id}
              onPress={() => setCat(c.id)}
              style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                  paddingHorizontal: 14,
                  paddingVertical: 9,
                  borderRadius: 10,
                  backgroundColor: isActive ? colors.brand.navy : colors.bg.surface,
                  borderWidth: 1,
                  borderColor: isActive ? colors.brand.blue : colors.bg.borderStrong,
                }}
              >
                <Feather
                  name={c.icon}
                  size={13}
                  color={isActive ? colors.brand.blue : colors.text.secondary}
                />
                <Text
                  style={{
                    fontFamily: isActive ? fonts.sansBold : fonts.sansMedium,
                    fontSize: 12.5,
                    color: isActive ? colors.brand.blue : colors.text.primary,
                  }}
                >
                  {c.label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>

      <View
        style={{
          backgroundColor: colors.bg.surface,
          borderRadius: 14,
          borderWidth: 1,
          borderColor: colors.bg.borderStrong,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            paddingHorizontal: 16,
            paddingVertical: 14,
            borderBottomWidth: 1,
            borderBottomColor: colors.divider,
            backgroundColor: colors.bg.subtle,
          }}
        >
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              backgroundColor: colors.brand.cyanGlow,
              borderWidth: 1,
              borderColor: 'rgba(0, 240, 255, 0.3)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Feather name={active.icon} size={15} color={colors.brand.blue} />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: fonts.sansBold,
                fontSize: 14,
                color: colors.text.primary,
                letterSpacing: -0.2,
              }}
            >
              {active.label}
            </Text>
            <Text
              style={{
                fontFamily: fonts.mono,
                fontSize: 9.5,
                color: colors.text.secondary,
                marginTop: 1,
              }}
            >
              {rows.length} atributos · ficha técnica oficial
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: 4,
              backgroundColor: colors.brand.cyanGlow,
              borderWidth: 1,
              borderColor: 'rgba(0, 240, 255, 0.3)',
            }}
          >
            <Text
              style={{
                fontFamily: fonts.monoBold,
                fontSize: 9,
                color: colors.brand.blue,
                letterSpacing: 0.6,
              }}
            >
              VERIFICADO
            </Text>
          </View>
        </View>

        <View>
          {rows.length === 0 ? (
            <View style={{ paddingVertical: 22, alignItems: 'center' }}>
              <Text style={{ fontFamily: fonts.sans, fontSize: 12.5, color: colors.text.secondary }}>
                Nenhum atributo nesta categoria para esta versão.
              </Text>
            </View>
          ) : (
            rows.map((spec, i) => (
              <View
                key={`${spec.label}-${i}`}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderTopWidth: i === 0 ? 0 : 1,
                  borderTopColor: colors.divider,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    fontFamily: fonts.sans,
                    fontSize: 13,
                    color: colors.text.secondary,
                    letterSpacing: -0.1,
                    marginRight: 12,
                  }}
                >
                  {spec.label}
                </Text>
                <View style={{ flex: 1.1, alignItems: 'flex-end' }}>
                  <Text
                    style={{
                      fontFamily: hasDigit(spec.value) || spec.unit ? fonts.monoBold : fonts.sansSemibold,
                      fontSize: 13,
                      color:
                        spec.value === 'Não Disponível'
                          ? colors.text.muted
                          : spec.highlight
                            ? colors.brand.blue
                            : colors.text.primary,
                      fontStyle: spec.value === 'Não Disponível' ? 'italic' : 'normal',
                      textAlign: 'right',
                      letterSpacing: -0.1,
                    }}
                  >
                    {spec.value}
                    {spec.unit && spec.value !== 'Não Disponível' && (
                      <Text style={{ color: colors.text.muted, fontFamily: fonts.mono }}> {spec.unit}</Text>
                    )}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      </View>
    </View>
  );
};

const hasDigit = (s: string) => /[\d,.]/.test(s);
