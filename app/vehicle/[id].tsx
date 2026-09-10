import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LivePulse } from "../../components/ui/LivePulse";
import { SectionLabel } from "../../components/ui/SectionLabel";
import { Wordmark } from "../../components/ui/Wordmark";
import { MarketBand } from "../../components/vehicle/MarketBand";
import { SpecsMatrix } from "../../components/vehicle/SpecsMatrix";
import { colors, fonts } from "../../constants/colors";
import { useFipePrice } from "../../hooks/useFipePrice";
import { VehicleDataService } from "../../services/vehicleData";
import { useUserStore } from "../../store/userStore";

export default function VehicleScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const vehicleId = Array.isArray(id) ? id[0] : (id ?? "");
  const vehicle = VehicleDataService.getVehicleById(vehicleId);
  const {
    price: fipePrice,
    loading: fipeLoading,
    error: fipeError,
  } = useFipePrice(vehicle);

  const { isFavorite, addFavorite, removeFavorite, addHistory } =
    useUserStore();

  useEffect(() => {
    if (vehicle) {
      addHistory({
        vehicleId: vehicle.id,
        vehicleName: `${vehicle.brand} ${vehicle.model} ${vehicle.version} ${vehicle.year}`,
        viewedAt: new Date().toISOString(),
      });
    }
  }, [vehicleId]);

  if (!vehicle) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.canvas }}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Feather name="alert-circle" size={32} color={colors.text.muted} />
          <Text
            style={{
              fontFamily: fonts.sans,
              color: colors.text.secondary,
              marginTop: 8,
            }}
          >
            Veículo não encontrado.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const saved = isFavorite(vehicle.id);
  const toggleFavorite = () => {
    Haptics.impactAsync(
      saved
        ? Haptics.ImpactFeedbackStyle.Light
        : Haptics.ImpactFeedbackStyle.Medium,
    ).catch(() => {});
    if (saved) {
      removeFavorite(vehicle.id);
    } else {
      addFavorite({
        vehicleId: vehicle.id,
        vehicleName: `${vehicle.brand} ${vehicle.model} ${vehicle.version} ${vehicle.year}`,
        savedAt: new Date().toISOString(),
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.canvas }}>
      <SafeAreaView
        edges={["top"]}
        style={{ backgroundColor: colors.bg.surface }}
      >
        <View
          style={{
            backgroundColor: colors.bg.surface,
            paddingTop: 10,
            paddingBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: colors.bg.borderStrong,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 16,
              paddingBottom: 16,
            }}
          >
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  backgroundColor: colors.bg.elevated,
                  borderWidth: 1,
                  borderColor: colors.bg.borderStrong,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather
                  name="chevron-left"
                  size={20}
                  color={colors.text.primary}
                />
              </View>
            </Pressable>

            <Wordmark small />

            <Pressable
              onPress={toggleFavorite}
              style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  backgroundColor: saved
                    ? colors.brand.cyanGlow
                    : colors.bg.elevated,
                  borderWidth: 1,
                  borderColor: saved
                    ? 'rgba(0, 240, 255, 0.4)'
                    : colors.bg.borderStrong,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather name="bookmark" size={18} color={saved ? colors.brand.blue : colors.text.primary} />
              </View>
            </Pressable>
          </View>

          <View style={{ paddingHorizontal: 20 }}>
            <Text
              style={{
                fontFamily: fonts.monoBold,
                fontSize: 10.5,
                color: colors.brand.blue,
                letterSpacing: 1.4,
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              {vehicle.brand}
            </Text>
            <View>
              <Text
                style={{
                  fontFamily: fonts.sansBold,
                  fontSize: 28,
                  color: colors.text.primary,
                  letterSpacing: -0.8,
                  lineHeight: 32,
                }}
              >
                {vehicle.model}{" "}
                <Text
                  style={{
                    fontFamily: fonts.sansMedium,
                    color: colors.text.secondary,
                  }}
                >
                  {vehicle.version}
                </Text>
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                alignSelf: "flex-start",
                marginTop: 12,
                backgroundColor: colors.bg.elevated,
                borderWidth: 1,
                borderColor: colors.bg.borderStrong,
                paddingHorizontal: 12,
                paddingVertical: 5,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.monoBold,
                  fontSize: 11,
                  color: colors.brand.blue,
                }}
              >
                ANO {vehicle.year}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <SectionLabel>Mercado · FIPE API</SectionLabel>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <LivePulse color={colors.status.success} size={5} />
              <Text
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 9.5,
                  color: colors.text.secondary,
                }}
              >
                ao vivo
              </Text>
            </View>
          </View>
          <MarketBand
            fipeCode={fipePrice?.codigoFipe}
            fipeMonth={fipePrice?.mesReferencia}
            fipeAvg={fipePrice?.valor}
            modelo={fipePrice?.modelo}
            loading={fipeLoading}
            error={fipeError}
          />
        </View>

        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <SectionLabel>Matriz de Especificações</SectionLabel>
            <Text
              style={{
                fontFamily: fonts.mono,
                fontSize: 9.5,
                color: colors.text.muted,
              }}
            >
              Determinístico
            </Text>
          </View>
          <SpecsMatrix vehicle={vehicle} />
        </View>
      </ScrollView>
    </View>
  );
}
