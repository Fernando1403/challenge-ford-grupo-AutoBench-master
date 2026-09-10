import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/colors';
import type { Vehicle } from '../../types';
import { fmtBRLFromReais } from '../../utils/format';

interface VehicleSlotProps {
  vehicle: Vehicle | null;
  side: 'A' | 'B';
  onSwap: () => void;
  onRemove: () => void;
  fipeAvg?: number;
  fipeLoading?: boolean;
}

export const VehicleSlot: React.FC<VehicleSlotProps> = ({
  vehicle,
  side,
  onSwap,
  onRemove,
  fipeAvg,
  fipeLoading,
}) => {
  const accent = side === 'A' ? colors.brand.blue : colors.accent.amber;
  const accentBg = side === 'A' ? colors.brand.cyanGlow : colors.accent.amberBg;

  const SideBadge = (
    <View
      style={{
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        backgroundColor: accentBg,
        borderWidth: 1,
        borderColor: side === 'A' ? 'rgba(0,240,255,0.3)' : 'rgba(245,158,11,0.3)',
      }}
    >
      <Text
        style={{
          fontFamily: fonts.monoBold,
          fontSize: 9.5,
          color: accent,
          letterSpacing: 1,
        }}
      >
        SLOT {side}
      </Text>
    </View>
  );

  if (!vehicle) {
    return (
      <View style={{ flex: 1 }}>
        <Pressable
          onPress={onSwap}
          style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
        >
          <View
            style={{
              backgroundColor: colors.bg.surface,
              borderRadius: 14,
              borderWidth: 1.5,
              borderColor: colors.bg.borderStrong,
              borderStyle: 'dashed',
              padding: 14,
              minHeight: 155,
            }}
          >
            <View style={{ flexDirection: 'row', marginBottom: 12 }}>
              {SideBadge}
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                paddingVertical: 14,
              }}
            >
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: colors.bg.elevated,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Feather name="plus" size={20} color={colors.brand.blue} />
              </View>
              <Text
                style={{
                  fontFamily: fonts.sansMedium,
                  fontSize: 12,
                  color: colors.text.secondary,
                  textAlign: 'center',
                  lineHeight: 16,
                }}
              >
                Selecione veículo{'\n'}para benchmark
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  }

  const priceLabel = fipeLoading ? '...' : fipeAvg != null ? fmtBRLFromReais(fipeAvg) : 'Indisponível';

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bg.surface,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: side === 'A' ? 'rgba(0, 240, 255, 0.3)' : 'rgba(245, 158, 11, 0.3)',
        padding: 14,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        {SideBadge}
        <Pressable
          onPress={onRemove}
          hitSlop={8}
          style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
        >
          <Feather name="x" size={16} color={colors.text.muted} />
        </Pressable>
      </View>

      <Text
        style={{
          fontFamily: fonts.monoBold,
          fontSize: 9.5,
          color: colors.text.secondary,
          letterSpacing: 1.2,
          textTransform: 'uppercase',
          marginBottom: 2,
        }}
      >
        {vehicle.brand}
      </Text>
      <Text
        style={{
          fontFamily: fonts.sansBold,
          fontSize: 15,
          color: colors.text.primary,
          letterSpacing: -0.3,
          lineHeight: 18,
        }}
      >
        {vehicle.model}
      </Text>
      <Text
        style={{
          fontFamily: fonts.sans,
          fontSize: 11.5,
          color: colors.text.secondary,
          marginTop: 2,
          minHeight: 30,
        }}
        numberOfLines={2}
      >
        {vehicle.version}
      </Text>

      <View
        style={{
          marginTop: 10,
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: colors.bg.borderStrong,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontFamily: fonts.mono,
            fontSize: 9,
            color: colors.text.muted,
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}
        >
          {vehicle.year}
        </Text>
        <Text
          style={{
            fontFamily: fonts.monoBold,
            fontSize: 11.5,
            color: colors.text.primary,
          }}
        >
          {priceLabel}
        </Text>
      </View>

      <Pressable
        onPress={onSwap}
        style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
      >
        <View
          style={{
            backgroundColor: colors.bg.elevated,
            borderWidth: 1,
            borderColor: colors.bg.borderStrong,
            borderRadius: 8,
            paddingHorizontal: 8,
            paddingVertical: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          <Feather name="refresh-cw" size={11} color={colors.brand.blue} />
          <Text
            style={{
              fontFamily: fonts.sansSemibold,
              fontSize: 11.5,
              color: colors.text.primary,
            }}
          >
            Trocar
          </Text>
        </View>
      </Pressable>
    </View>
  );
};
