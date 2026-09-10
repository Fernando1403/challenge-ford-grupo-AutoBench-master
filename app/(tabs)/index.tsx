import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { CustomBuild } from '../../types';

// ... existing code

const CustomBuildCard: React.FC<{
  build: CustomBuild;
  onRemove: () => void;
  onEdit: () => void;
}> = ({ build, onRemove, onEdit }) => {
  const [specsModalVisible, setSpecsModalVisible] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'motor' | 'dimensions' | 'tech' | 'safety'>('motor');

  return (
    <Card style={{ padding: 18 }}>
      {/* Header Info */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <Feather name="cpu" size={13} color={colors.brand.blueLight} />
            <Text style={{ fontFamily: fonts.monoBold, fontSize: 10, color: colors.brand.blueLight, letterSpacing: 1 }}>
              POTÊNCIA ESTIMADA: {build.power}
            </Text>
          </View>
          <Text style={{ fontFamily: fonts.sansBold, fontSize: 17, color: colors.text.primary, letterSpacing: -0.4 }}>
            {build.title}
          </Text>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontFamily: fonts.monoBold, fontSize: 17, color: colors.text.primary }}>
            {fmtBRLFromReais(build.totalPrice)}
          </Text>
          <Pressable onPress={onRemove} style={{ marginTop: 6, padding: 4 }}>
            <Feather name="trash-2" size={15} color={colors.status.danger} />
          </Pressable>
        </View>
      </View>

      {/* Part badges */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10, marginBottom: 16 }}>
        <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, backgroundColor: colors.bg.subtle, borderWidth: 1, borderColor: colors.bg.border }}>
          <Text style={{ fontFamily: fonts.mono, fontSize: 10.5, color: colors.text.secondary }}>⚙️ {build.engineName}</Text>
        </View>
        <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, backgroundColor: colors.bg.subtle, borderWidth: 1, borderColor: colors.bg.border }}>
          <Text style={{ fontFamily: fonts.mono, fontSize: 10.5, color: colors.text.secondary }}>🛞 {build.wheelsName}</Text>
        </View>
        <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, backgroundColor: colors.bg.subtle, borderWidth: 1, borderColor: colors.bg.border }}>
          <Text style={{ fontFamily: fonts.mono, fontSize: 10.5, color: colors.text.secondary }}>🎨 {build.paintName}</Text>
        </View>
      </View>

      {/* Two Action Buttons */}
      <View style={{ flexDirection: 'row', gap: 10, borderTopWidth: 1, borderTopColor: colors.divider, paddingTop: 14 }}>
        {/* Button 1: Edit Configuration */}
        <Pressable onPress={onEdit} style={{ flex: 1 }}>
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 12,
              borderRadius: 10,
              backgroundColor: colors.bg.subtle,
              borderWidth: 1,
              borderColor: colors.brand.blueLight,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <Feather name="edit-3" size={14} color={colors.brand.blueLight} />
            <Text style={{ fontFamily: fonts.sansBold, fontSize: 12.5, color: colors.brand.blueLight }}>
              Editar Projeto
            </Text>
          </View>
        </Pressable>

        {/* Button 2: View Technical Specs */}
        <Pressable onPress={() => setSpecsModalVisible(true)} style={{ flex: 1 }}>
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 12,
              borderRadius: 10,
              backgroundColor: colors.brand.fordBlue,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <Feather name="sliders" size={14} color="#FFF" />
            <Text style={{ fontFamily: fonts.sansBold, fontSize: 12.5, color: '#FFF' }}>
              Especificações
            </Text>
          </View>
        </Pressable>
      </View>

      {/* Technical Specifications Modal (Styled exactly like vehicle page) */}
      <Modal visible={specsModalVisible} animationType="slide" transparent style={{ margin: 0 }}>
        <View style={{ flex: 1, backgroundColor: 'rgba(3, 7, 18, 0.95)', justifyContent: 'flex-end' }}>
          <SafeAreaView edges={['top']} style={{ flex: 1 }}>
            {/* Header bar matching vehicle telemetry dossier */}
            <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 14, backgroundColor: colors.bg.surface, borderBottomWidth: 1, borderBottomColor: colors.bg.borderStrong, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={{ fontFamily: fonts.monoBold, fontSize: 10, color: colors.brand.blueLight, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                  DOSSIÊ TÉCNICO DE TELEMETRIA
                </Text>
                <Text style={{ fontFamily: fonts.sansBold, fontSize: 20, color: colors.text.primary }}>
                  {build.title}
                </Text>
              </View>

              <Pressable onPress={() => setSpecsModalVisible(false)}>
                <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.bg.elevated, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.bg.borderStrong }}>
                  <Feather name="x" size={18} color={colors.text.primary} />
                </View>
              </Pressable>
            </View>

            <ScrollView contentContainerStyle={{ padding: 20 }}>
              {/* Cotação Estimada / Pricing Banner */}
              <Card style={{ padding: 18, marginBottom: 20, backgroundColor: '#071026', borderColor: 'rgba(0, 102, 204, 0.3)' }}>
                <Text style={{ fontFamily: fonts.monoBold, fontSize: 9.5, color: colors.text.secondary, letterSpacing: 1 }}>COTAÇÃO PROJETO FORD BENCH</Text>
                <Text style={{ fontFamily: fonts.sansBold, fontSize: 30, color: colors.brand.blueLight, marginTop: 4 }}>
                  {fmtBRLFromReais(build.totalPrice)}
                </Text>
                <Text style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.text.muted, marginTop: 4 }}>
                  ✓ Cotação oficial compilada em {new Date(build.savedAt).toLocaleDateString('pt-BR')}
                </Text>
              </Card>

              {/* Specification Tabs (Motorização, Dimensões, Tecnologia, Segurança) */}
              <Text style={{ fontFamily: fonts.monoBold, fontSize: 11, color: colors.text.secondary, letterSpacing: 1.2, marginBottom: 10, textTransform: 'uppercase' }}>
                MATRIZ DE ESPECIFICAÇÕES
              </Text>

              <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
                {[
                  { id: 'motor', label: 'Motorização', icon: 'activity' },
                  { id: 'dimensions', label: 'Dimensões', icon: 'maximize-2' },
                  { id: 'tech', label: 'Tecnologia', icon: 'cpu' },
                  { id: 'safety', label: 'Segurança', icon: 'shield' },
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <Pressable key={tab.id} onPress={() => setActiveTab(tab.id as any)} style={{ flex: 1 }}>
                      <View style={{ paddingVertical: 8, borderRadius: 8, backgroundColor: isActive ? colors.brand.fordBlue : colors.bg.surface, borderWidth: 1, borderColor: isActive ? colors.brand.blueLight : colors.bg.border, alignItems: 'center', gap: 4 }}>
                        <Feather name={tab.icon as any} size={14} color={isActive ? '#FFF' : colors.text.secondary} />
                        <Text style={{ fontFamily: isActive ? fonts.sansBold : fonts.sans, fontSize: 10.5, color: isActive ? '#FFF' : colors.text.secondary }}>{tab.label}</Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>

              {/* Spec Rows depending on selected tab */}
              <Card style={{ padding: 0, overflow: 'hidden' }}>
                {activeTab === 'motor' && (
                  <>
                    <SpecRow label="Motorização" value={build.engineName} />
                    <SpecRow label="Potência Estimada" value={build.power} />
                    <SpecRow label="Configuração de Escapamento" value={build.rearName.includes('Mustang') ? 'Escapamento Quad-Tip Ativo V8' : 'Padrão Esportivo Ford'} />
                    <SpecRow label="Transmissão" value="Automática de 10 Velocidades SelectShift" />
                  </>
                )}

                {activeTab === 'dimensions' && (
                  <>
                    <SpecRow label="Componente Frontal" value={build.frontName} />
                    <SpecRow label="Design de Traseira" value={build.rearName} />
                    <SpecRow label="Rodas & Pneus" value={build.wheelsName} />
                    <SpecRow label="Chassi Base" value="Ford Modular Chassis Protocol (MCP-4)" />
                  </>
                )}

                {activeTab === 'tech' && (
                  <>
                    <SpecRow label="Pintura Especial" value={build.paintName} />
                    <SpecRow label="Sistema Infotainment" value="Ford SYNC 4A com Tela Vertical 13.2''" />
                    <SpecRow label="Painel Digital" value="Cluster Telemetria 12.4'' Customizável" />
                    <SpecRow label="Telemetria" value="Conectividade FordPass Connect 5G" />
                  </>
                )}

                {activeTab === 'safety' && (
                  <>
                    <SpecRow label="Assistência de Condução" value="Ford Co-Pilot360 Assist+" />
                    <SpecRow label="Frenagem" value="Freios a Disco Ventilados com Brembo" />
                    <SpecRow label="Segurança Ativa" value="Controle de Estabilidade AdvanceTrac & 7 Airbags" />
                  </>
                )}
              </Card>

              {/* Edit button inside modal */}
              <Pressable
                onPress={() => {
                  setSpecsModalVisible(false);
                  onEdit();
                }}
                style={{ marginTop: 24 }}
              >
                <View style={{ backgroundColor: colors.bg.surface, borderWidth: 1, borderColor: colors.brand.blueLight, paddingVertical: 14, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 }}>
                  <Feather name="edit-3" size={16} color={colors.brand.blueLight} />
                  <Text style={{ fontFamily: fonts.sansBold, fontSize: 14, color: colors.brand.blueLight }}>
                    Voltar para o Customizer e Editar
                  </Text>
                </View>
              </Pressable>
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>
    </Card>
  );
};

const SpecRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={{ paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.divider, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <Text style={{ fontFamily: fonts.sansMedium, fontSize: 13, color: colors.text.secondary }}>{label}</Text>
    <Text style={{ fontFamily: fonts.monoBold, fontSize: 12.5, color: colors.text.primary, maxWidth: '60%', textAlign: 'right' }}>{value}</Text>
  </View>
);
import { SafeAreaView } from 'react-native-safe-area-context';
import { HierarchicalSearchBar } from '../../components/search/HierarchicalSearchBar';
import { Card } from '../../components/ui/Card';
import { SectionLabel } from '../../components/ui/SectionLabel';
import { Wordmark } from '../../components/ui/Wordmark';
import { colors, fonts } from '../../constants/colors';
import { useFipePrice } from '../../hooks/useFipePrice';
import { VehicleDataService } from '../../services/vehicleData';
import { useUserStore } from '../../store/userStore';
import { fmtBRLFromReais } from '../../utils/format';

export default function HomeScreen() {
  const router = useRouter();
  const favorites = useUserStore((s) => s.favorites);
  const history = useUserStore((s) => s.history);
  const customBuilds = useUserStore((s) => s.customBuilds);
  const removeCustomBuild = useUserStore((s) => s.removeCustomBuild);

  const recentTrimmed = history.slice(0, 3);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg.canvas }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Editorial Top Navigation */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 18,
            paddingBottom: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Wordmark />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 20,
              backgroundColor: colors.bg.surface,
              borderWidth: 1,
              borderColor: colors.bg.border,
            }}
          >
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: colors.accent.emerald,
              }}
            />
            <Text style={{ fontFamily: fonts.monoBold, fontSize: 10.5, color: colors.text.secondary }}>
              API FIPE ALIVE
            </Text>
          </View>
        </View>

        {/* Hero Editorial Header */}
        <View style={{ paddingHorizontal: 20, paddingTop: 10, paddingBottom: 22 }}>
          <Text
            style={{
              fontFamily: fonts.monoBold,
              fontSize: 11,
              color: colors.brand.blueLight,
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            Ford Competitive Telemetry
          </Text>
          <Text
            style={{
              fontFamily: fonts.sansBold,
              fontSize: 34,
              lineHeight: 40,
              color: colors.text.primary,
              letterSpacing: -1.2,
            }}
          >
            Plataforma AutoBench{'\n'}
            <Text style={{ color: colors.brand.blueLight }}>Inteligência Ford</Text>
          </Text>
        </View>

        {/* Search Bento Widget */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
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

        {/* Bento Metrics Banner */}
        <View style={{ paddingHorizontal: 20, marginBottom: 26 }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
            }}
          >
            <View
              style={{
                flex: 1.2,
                backgroundColor: colors.bg.surface,
                borderRadius: 18,
                padding: 16,
                borderWidth: 1,
                borderColor: colors.bg.border,
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.monoMedium,
                  fontSize: 10,
                  color: colors.text.secondary,
                  letterSpacing: 1.2,
                  textTransform: 'uppercase',
                  marginBottom: 6,
                }}
              >
                BANCO DE DADOS
              </Text>
              <Text
                style={{
                  fontFamily: fonts.sansBold,
                  fontSize: 26,
                  color: colors.text.primary,
                  letterSpacing: -0.8,
                }}
              >
                12 <Text style={{ fontSize: 14, color: colors.text.secondary }}>segmentos</Text>
              </Text>
              <Text
                style={{
                  fontFamily: fonts.sans,
                  fontSize: 11.5,
                  color: colors.text.muted,
                  marginTop: 4,
                }}
              >
                Especificações padronizadas Ford
              </Text>
            </View>

            <Pressable
              onPress={() => router.push('/(tabs)/customizer')}
              style={{ flex: 1 }}
            >
              <View
                style={{
                  height: '100%',
                  backgroundColor: colors.brand.fordRoyal,
                  borderRadius: 18,
                  borderWidth: 1,
                  borderColor: 'rgba(56, 189, 248, 0.4)',
                  padding: 16,
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Feather name="tool" size={18} color="#38BDF8" />
                  <Feather name="arrow-up-right" size={16} color="rgba(255,255,255,0.7)" />
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: fonts.monoBold,
                      fontSize: 9.5,
                      color: 'rgba(255,255,255,0.75)',
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                    }}
                  >
                    CUSTOM STUDIO
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.sansBold,
                      fontSize: 15,
                      color: '#FFF',
                      marginTop: 2,
                    }}
                  >
                    Create Your Car
                  </Text>
                </View>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Section: Custom Builds Created by User */}
        {customBuilds.length > 0 && (
          <View style={{ paddingHorizontal: 20, marginBottom: 28 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <SectionLabel>Seus Projetos Customizados ("Create Your Car")</SectionLabel>
              <View style={{ paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, backgroundColor: 'rgba(0, 102, 204, 0.22)' }}>
                <Text style={{ fontFamily: fonts.monoBold, fontSize: 10, color: colors.brand.blueLight }}>{customBuilds.length} PROJETOS</Text>
              </View>
            </View>

            <View style={{ gap: 14 }}>
              {customBuilds.map((build) => (
                <CustomBuildCard
                  key={build.id}
                  build={build}
                  onRemove={() => removeCustomBuild(build.id)}
                  onEdit={() => {
                    router.push({
                      pathname: '/(tabs)/customizer',
                      params: {
                        engineId: build.engineId,
                        frontId: build.frontId,
                        rearId: build.rearId,
                        wheelsId: build.wheelsId,
                        paintId: build.paintId,
                      },
                    });
                  }}
                />
              ))}
            </View>
          </View>
        )}

        {/* Favorites Bento Grid */}
        <View style={{ paddingHorizontal: 20, marginBottom: 28 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 14,
            }}
          >
            <SectionLabel>Garagem de Benchmark</SectionLabel>
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 3,
                borderRadius: 12,
                backgroundColor: colors.brand.accentGlow,
              }}
            >
              <Text style={{ fontFamily: fonts.monoBold, fontSize: 11, color: colors.brand.indigo }}>
                {favorites.length} SALVOS
              </Text>
            </View>
          </View>
          {favorites.length === 0 ? (
            <Card style={{ padding: 24, alignItems: 'center' }}>
              <Feather name="bookmark" size={26} color={colors.text.muted} style={{ marginBottom: 10 }} />
              <Text
                style={{
                  fontFamily: fonts.sansBold,
                  fontSize: 15,
                  color: colors.text.primary,
                  textAlign: 'center',
                }}
              >
                Sua garagem está vazia
              </Text>
              <Text
                style={{
                  fontFamily: fonts.sans,
                  fontSize: 12.5,
                  color: colors.text.secondary,
                  textAlign: 'center',
                  marginTop: 4,
                  lineHeight: 18,
                }}
              >
                Abra qualquer ficha técnica e toque no ícone de marcador para salvar veículos para comparação.
              </Text>
            </Card>
          ) : (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 12, justifyContent: 'space-between' }}>
              {favorites.slice(0, 4).map((f) => (
                <View key={f.vehicleId} style={{ width: '48%' }}>
                  <FavoriteTile
                    vehicleId={f.vehicleId}
                    name={f.vehicleName}
                    onPress={() => router.push(`/vehicle/${f.vehicleId}`)}
                  />
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Recent Search Activity */}
        {recentTrimmed.length > 0 && (
          <View style={{ paddingHorizontal: 20 }}>
            <View style={{ marginBottom: 12 }}>
              <SectionLabel>Histórico Recente</SectionLabel>
            </View>
            <Card style={{ padding: 0, overflow: 'hidden' }}>
              {recentTrimmed.map((h, i) => (
                <Pressable
                  key={h.vehicleId}
                  onPress={() => router.push(`/vehicle/${h.vehicleId}`)}
                  style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 14,
                      paddingHorizontal: 18,
                      paddingVertical: 15,
                      borderTopWidth: i > 0 ? 1 : 0,
                      borderTopColor: colors.divider,
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        backgroundColor: colors.bg.subtle,
                        borderWidth: 1,
                        borderColor: colors.bg.border,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Feather name="clock" size={16} color={colors.brand.indigo} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontFamily: fonts.sansBold,
                          fontSize: 14.5,
                          color: colors.text.primary,
                        }}
                      >
                        {h.vehicleName}
                      </Text>
                      <Text
                        style={{
                          fontFamily: fonts.mono,
                          fontSize: 11,
                          color: colors.text.secondary,
                          marginTop: 2,
                        }}
                      >
                        Acessado em {new Date(h.viewedAt).toLocaleDateString('pt-BR')}
                      </Text>
                    </View>
                    <Feather name="chevron-right" size={18} color={colors.text.muted} />
                  </View>
                </Pressable>
              ))}
            </Card>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const FavoriteTile: React.FC<{ vehicleId: string; name: string; onPress: () => void }> = ({
  vehicleId,
  name,
  onPress,
}) => {
  const vehicle = VehicleDataService.getVehicleById(vehicleId);
  const { price, loading } = useFipePrice(vehicle);
  const fipe = price?.valor ?? 0;
  const parts = name.split(' ');
  const brand = parts[0] ?? '';
  const rest = parts.slice(1).join(' ');

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.92 : 1,
        transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
      })}
    >
      <Card style={{ padding: 16 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 16,
          }}
        >
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              backgroundColor: colors.brand.accentGlow,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Feather name="bookmark" size={15} color={colors.brand.indigo} />
          </View>
          <Feather name="arrow-up-right" size={15} color={colors.text.muted} />
        </View>
        <Text
          style={{
            fontFamily: fonts.monoBold,
            fontSize: 10,
            color: colors.brand.indigo,
            letterSpacing: 1.2,
            textTransform: 'uppercase',
            marginBottom: 4,
          }}
        >
          {brand}
        </Text>
        <Text
          style={{
            fontFamily: fonts.sansBold,
            fontSize: 14.5,
            color: colors.text.primary,
            letterSpacing: -0.3,
            lineHeight: 19,
          }}
          numberOfLines={2}
        >
          {rest}
        </Text>
        <View
          style={{
            marginTop: 14,
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: colors.divider,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <Text
            style={{
              fontFamily: fonts.mono,
              fontSize: 9.5,
              color: colors.text.muted,
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            FIPE
          </Text>
          <Text
            style={{
              fontFamily: fonts.monoBold,
              fontSize: 12.5,
              color: colors.text.primary,
            }}
          >
            {loading ? '...' : fipe ? fmtBRLFromReais(fipe) : '—'}
          </Text>
        </View>
      </Card>
    </Pressable>
  );
};
