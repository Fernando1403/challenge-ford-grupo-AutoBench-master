import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { colors, fonts } from '../../constants/colors';

interface WordmarkProps {
  small?: boolean;
  light?: boolean;
}

export const Wordmark: React.FC<WordmarkProps> = ({ small = false, light = false }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: small ? 8 : 12 }}>
      {/* Official Ford Blue Oval Logo Badge */}
      <View
        style={{
          width: small ? 38 : 46,
          height: small ? 24 : 28,
          borderRadius: 14,
          backgroundColor: '#002C6C',
          borderWidth: 1.5,
          borderColor: '#38BDF8',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#0066CC',
          shadowOpacity: 0.5,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
        }}
      >
        <Text style={{ fontFamily: fonts.sansBold, fontSize: small ? 11 : 13, color: '#FFFFFF', fontStyle: 'italic', letterSpacing: -0.5 }}>
          Ford
        </Text>
      </View>

      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text
            style={{
              fontFamily: fonts.sansBold,
              fontSize: small ? 16 : 20,
              color: colors.text.primary,
              letterSpacing: -0.6,
            }}
          >
            AutoBench
          </Text>
          <View
            style={{
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderRadius: 6,
              backgroundColor: 'rgba(0, 102, 204, 0.25)',
              borderWidth: 1,
              borderColor: 'rgba(56, 189, 248, 0.4)',
            }}
          >
            <Text style={{ fontFamily: fonts.monoBold, fontSize: 8.5, color: '#38BDF8', letterSpacing: 1 }}>
              OFFICIAL
            </Text>
          </View>
        </View>
        {!small && (
          <Text
            style={{
              fontFamily: fonts.monoMedium,
              fontSize: 9.5,
              color: colors.text.secondary,
              letterSpacing: 1.6,
              marginTop: 2,
              textTransform: 'uppercase',
            }}
          >
            Competitive Intelligence Hub
          </Text>
        )}
      </View>
    </View>
  );
};
