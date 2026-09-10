import { Feather } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { colors, fonts } from '../../constants/colors';
import { fmtBRLFromReais } from '../../utils/format';

interface MarketBandProps {
  fipeCode?: string;
  fipeMonth?: string;
  fipeAvg?: number;
  modelo?: string;
  loading: boolean;
  error: boolean;
}

export const MarketBand: React.FC<MarketBandProps> = ({
  fipeCode,
  fipeMonth,
  fipeAvg,
  modelo,
  loading,
  error,
}) => (
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
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.divider,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text
          style={{
            fontFamily: fonts.monoMedium,
            fontSize: 9,
            color: colors.text.secondary,
            letterSpacing: 1.4,
            textTransform: 'uppercase',
          }}
        >
          Cotação Tabela FIPE
        </Text>
        {fipeCode && (
          <View
            style={{
              paddingHorizontal: 6,
              paddingVertical: 2,
              backgroundColor: colors.brand.cyanGlow,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: 'rgba(0, 240, 255, 0.3)',
            }}
          >
            <Text
              style={{
                fontFamily: fonts.monoBold,
                fontSize: 9,
                color: colors.brand.blue,
                letterSpacing: 0.5,
              }}
            >
              {fipeCode}
            </Text>
          </View>
        )}
      </View>
      <Text style={{ fontFamily: fonts.mono, fontSize: 9.5, color: colors.text.muted }}>
        Ref. {fipeMonth}
      </Text>
    </View>

    <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 16 }}>
      {loading ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <ActivityIndicator size="small" color={colors.brand.blue} />
          <Text style={{ fontFamily: fonts.sans, fontSize: 13, color: colors.text.secondary }}>
            Obtendo cotação ao vivo via API FIPE...
          </Text>
        </View>
      ) : (
        <>
          <Text
            style={{
              fontFamily: fonts.monoBold,
              fontSize: 30,
              color: colors.brand.blue,
              letterSpacing: -0.8,
              lineHeight: 34,
              marginBottom: modelo ? 4 : 10,
            }}
          >
            {fipeAvg != null ? fmtBRLFromReais(fipeAvg) : '—'}
          </Text>
          {modelo ? (
            <Text
              style={{
                fontFamily: fonts.sans,
                fontSize: 12,
                color: colors.text.secondary,
                marginBottom: 10,
              }}
              numberOfLines={1}
            >
              {modelo}
            </Text>
          ) : null}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Feather
              name={error ? 'alert-circle' : 'check-circle'}
              size={12}
              color={error ? colors.status.warning : colors.status.success}
            />
            <Text
              style={{
                fontFamily: fonts.mono,
                fontSize: 10,
                color: error ? colors.status.warning : colors.text.secondary,
              }}
            >
              {error ? 'Usando preço de referência local' : 'Cotação oficial FIPE · atualizada ao vivo'}
            </Text>
          </View>
        </>
      )}
    </View>
  </View>
);
