import { Feather } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/ui/Card';
import { SectionLabel } from '../../components/ui/SectionLabel';
import { colors, fonts } from '../../constants/colors';
import { fmtBRLFromReais } from '../../utils/format';

interface CustomPart {
  id: string;
  category: 'engine' | 'front' | 'rear' | 'wheels' | 'paint';
  donorModel: string;
  name: string;
  price: number;
  specsLabel: string;
  badge: string;
}

const BASE_CHASSIS_PRICE = 120000; // Preço base do chassi modular Ford

const PARTS_CATALOG: CustomPart[] = [
  // Motorização
  { id: 'eng-mustang', category: 'engine', donorModel: 'Mustang GT', name: 'Motor 5.0L Coyote V8 (488 cv)', price: 95000, specsLabel: '488 cv · 56.4 kgfm · Ronco V8', badge: 'High Power' },
  { id: 'eng-raptor', category: 'engine', donorModel: 'Ranger Raptor', name: 'Motor 3.0L V6 Bi-Turbo (397 cv)', price: 82000, specsLabel: '397 cv · 59.4 kgfm · Anti-Lag', badge: 'Off-Road' },
  { id: 'eng-bronco', category: 'engine', donorModel: 'Bronco Sport', name: 'Motor 2.0L EcoBoost Turbo (253 cv)', price: 55000, specsLabel: '253 cv · 38.7 kgfm · Eficiente', badge: 'Turbo' },
  { id: 'eng-maverick', category: 'engine', donorModel: 'Maverick Hybrid', name: 'Motor 2.5L Híbrido elétrico (194 cv)', price: 48000, specsLabel: '194 cv · 18 km/L consumo', badge: 'Hybrid' },

  // Frente
  { id: 'frt-mustang', category: 'front', donorModel: 'Mustang GT', name: 'Frente Aerodinâmica LED Matrix', price: 38000, specsLabel: 'Faróis LED Tri-Bar & Grade esportiva', badge: 'Sport' },
  { id: 'frt-raptor', category: 'front', donorModel: 'Ranger Raptor', name: 'Frente Robust FORD Grid & Para-choque de Aço', price: 42000, specsLabel: 'Proteção sob medida & Ganchos duplos', badge: 'Tough' },
  { id: 'frt-bronco', category: 'front', donorModel: 'Bronco Heritage', name: 'Frente Retro-Futurista Bronco', price: 32000, specsLabel: 'Faróis circulares LED Ring', badge: 'Classic' },

  // Traseira
  { id: 'rear-ecosport', category: 'rear', donorModel: 'EcoSport Titanium', name: 'Traseira SUV Compacta com Estepe Exposto', price: 18000, specsLabel: 'Tampa traseira com abertura lateral', badge: 'Urban' },
  { id: 'rear-mustang', category: 'rear', donorModel: 'Mustang Fastback', name: 'Traseira Fastback com Escapamento Quad-Tip', price: 36000, specsLabel: 'Lanternas verticais sequenciais LED', badge: 'Performance' },
  { id: 'rear-raptor', category: 'rear', donorModel: 'Ranger Raptor', name: 'Caçamba Off-Road com Amortecedores FOX', price: 45000, specsLabel: 'Capacidade de carga reforçada & Tailgate', badge: '4x4' },

  // Rodas
  { id: 'whl-raptor', category: 'wheels', donorModel: 'Ranger Raptor', name: 'Rodas 17" Liga Leve & Pneus 33" All-Terrain', price: 22000, specsLabel: 'Pneus Goodyear Wrangler Duratrac', badge: 'Off-Road' },
  { id: 'whl-mustang', category: 'wheels', donorModel: 'Mustang Mach 1', name: 'Rodas 19" Carbono Forjado & Pneus Brembo', price: 28000, specsLabel: 'Pneus Michelin Pilot Sport 4S', badge: 'Track' },
  { id: 'whl-bronco', category: 'wheels', donorModel: 'Bronco Wildtrak', name: 'Rodas 17" Beadlock-Capable Dark Alloy', price: 24000, specsLabel: 'Prontas para baixa pressão nas dunas', badge: 'Beadlock' },

  // Pintura
  { id: 'pnt-performance-blue', category: 'paint', donorModel: 'Ford Performance', name: 'Azul Ford Performance Metálico', price: 8500, specsLabel: 'Verniz multicamadas com brilho cristalino', badge: 'Ford Color' },
  { id: 'pnt-stealth-black', category: 'paint', donorModel: 'Raptor Special Edition', name: 'Preto Stealth Fosco Satin', price: 12000, specsLabel: 'Acabamento premium satin com proteção cerâmica', badge: 'Special' },
  { id: 'pnt-area-51', category: 'paint', donorModel: 'Bronco Custom', name: 'Cinza Area 51 Matte', price: 9800, specsLabel: 'Tom exclusivo militar tático', badge: 'Tactical' },
];

const CATEGORY_TABS = [
  { id: 'engine', label: '1. Motorização', icon: 'cpu' },
  { id: 'front', label: '2. Frente', icon: 'shield' },
  { id: 'rear', label: '3. Traseira', icon: 'box' },
  { id: 'wheels', label: '4. Rodas & Pneus', icon: 'disc' },
  { id: 'paint', label: '5. Pintura', icon: 'droplet' },
] as const;

import { useLocalSearchParams } from 'expo-router';
import { useUserStore } from '../../store/userStore';

export default function CustomizerScreen() {
  const params = useLocalSearchParams<{
    engineId?: string;
    frontId?: string;
    rearId?: string;
    wheelsId?: string;
    paintId?: string;
  }>();

  const [activeTab, setActiveTab] = useState<'engine' | 'front' | 'rear' | 'wheels' | 'paint'>('engine');
  const addCustomBuild = useUserStore((s) => s.addCustomBuild);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Initial part resolution based on params or default
  const initialEngine = useMemo(() => PARTS_CATALOG.find((p) => p.id === params.engineId) ?? PARTS_CATALOG[0]!, [params.engineId]);
  const initialFront = useMemo(() => PARTS_CATALOG.find((p) => p.id === params.frontId) ?? PARTS_CATALOG[4]!, [params.frontId]);
  const initialRear = useMemo(() => PARTS_CATALOG.find((p) => p.id === params.rearId) ?? PARTS_CATALOG[7]!, [params.rearId]);
  const initialWheels = useMemo(() => PARTS_CATALOG.find((p) => p.id === params.wheelsId) ?? PARTS_CATALOG[10]!, [params.wheelsId]);
  const initialPaint = useMemo(() => PARTS_CATALOG.find((p) => p.id === params.paintId) ?? PARTS_CATALOG[13]!, [params.paintId]);

  // Peças selecionadas pelo usuário
  const [selectedEngine, setSelectedEngine] = useState<CustomPart>(initialEngine);
  const [selectedFront, setSelectedFront] = useState<CustomPart>(initialFront);
  const [selectedRear, setSelectedRear] = useState<CustomPart>(initialRear);
  const [selectedWheels, setSelectedWheels] = useState<CustomPart>(initialWheels);
  const [selectedPaint, setSelectedPaint] = useState<CustomPart>(initialPaint);

  // Sync state if params change dynamically
  React.useEffect(() => {
    if (params.engineId) setSelectedEngine(initialEngine);
    if (params.frontId) setSelectedFront(initialFront);
    if (params.rearId) setSelectedRear(initialRear);
    if (params.wheelsId) setSelectedWheels(initialWheels);
    if (params.paintId) setSelectedPaint(initialPaint);
  }, [params.engineId, params.frontId, params.rearId, params.wheelsId, params.paintId]);

  const totalPrice = useMemo(() => {
    return BASE_CHASSIS_PRICE + selectedEngine.price + selectedFront.price + selectedRear.price + selectedWheels.price + selectedPaint.price;
  }, [selectedEngine, selectedFront, selectedRear, selectedWheels, selectedPaint]);

  const estimatedPower = useMemo(() => {
    if (selectedEngine.id === 'eng-mustang') return '488 CV';
    if (selectedEngine.id === 'eng-raptor') return '397 CV';
    if (selectedEngine.id === 'eng-bronco') return '253 CV';
    return '194 CV (Hybrid)';
  }, [selectedEngine]);

  const currentCategoryParts = useMemo(() => {
    return PARTS_CATALOG.filter((p) => p.category === activeTab);
  }, [activeTab]);

  const getSelectedForCategory = (cat: string) => {
    if (cat === 'engine') return selectedEngine;
    if (cat === 'front') return selectedFront;
    if (cat === 'rear') return selectedRear;
    if (cat === 'wheels') return selectedWheels;
    return selectedPaint;
  };

  const handleSelectPart = (part: CustomPart) => {
    if (part.category === 'engine') setSelectedEngine(part);
    if (part.category === 'front') setSelectedFront(part);
    if (part.category === 'rear') setSelectedRear(part);
    if (part.category === 'wheels') setSelectedWheels(part);
    if (part.category === 'paint') setSelectedPaint(part);
  };

  const handleSaveBuild = () => {
    const title = `Ford Custom Hybrid (${selectedEngine.donorModel} + ${selectedFront.donorModel})`;
    addCustomBuild({
      id: `build-${Date.now()}`,
      title,
      totalPrice,
      engineId: selectedEngine.id,
      frontId: selectedFront.id,
      rearId: selectedRear.id,
      wheelsId: selectedWheels.id,
      paintId: selectedPaint.id,
      engineName: selectedEngine.name,
      frontName: selectedFront.name,
      rearName: selectedRear.name,
      wheelsName: selectedWheels.name,
      paintName: selectedPaint.name,
      power: estimatedPower,
      savedAt: new Date().toISOString(),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg.canvas }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: colors.bg.border }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, backgroundColor: 'rgba(0, 102, 204, 0.22)' }}>
              <Text style={{ fontFamily: fonts.monoBold, fontSize: 10, color: colors.brand.blueLight }}>CUSTOM STUDIO</Text>
            </View>
          </View>
          <Text style={{ fontFamily: fonts.sansBold, fontSize: 32, color: colors.text.primary, letterSpacing: -1, marginTop: 4 }}>
            Create your car
          </Text>
          <Text style={{ fontFamily: fonts.sans, fontSize: 13, color: colors.text.secondary, marginTop: 2 }}>
            Monte um veículo Ford híbrido personalizado combinando componentes de modelos clássicos e esportivos.
          </Text>
        </View>

        {/* Dynamic Blueprint Canvas / Live Vehicle Visualizer */}
        <View style={{ paddingHorizontal: 20, paddingTop: 18 }}>
          <Card style={{ padding: 18, overflow: 'hidden' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.status.success }} />
                <Text style={{ fontFamily: fonts.monoBold, fontSize: 10.5, color: colors.text.secondary }}>ESTÚDIO DE MONTAGEM 3D</Text>
              </View>
              <Text style={{ fontFamily: fonts.monoBold, fontSize: 11, color: colors.brand.blueLight }}>FORD BENCH BUILD</Text>
            </View>

            {/* Render do Veículo Personalizado */}
            <View style={{ width: '100%', height: 210, borderRadius: 12, backgroundColor: '#070F22', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(0, 102, 204, 0.25)', overflow: 'hidden', position: 'relative' }}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80' }}
                style={{ width: '100%', height: '100%', resizeMode: 'cover', opacity: 0.88 }}
              />
              <View style={{ position: 'absolute', bottom: 10, left: 12, right: 12, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rgba(3, 7, 18, 0.85)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: colors.bg.border }}>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <Text style={{ fontFamily: fonts.mono, fontSize: 10, color: colors.text.secondary }}>POTÊNCIA: <Text style={{ color: colors.brand.blueLight, fontFamily: fonts.monoBold }}>{estimatedPower}</Text></Text>
                  <Text style={{ fontFamily: fonts.mono, fontSize: 10, color: colors.text.secondary }}>COR: <Text style={{ color: colors.text.primary, fontFamily: fonts.monoBold }}>{selectedPaint.name.split(' ')[0]}</Text></Text>
                </View>
                <Text style={{ fontFamily: fonts.monoBold, fontSize: 10, color: colors.accent.emerald }}>BLUEPRINT ATIVO</Text>
              </View>
            </View>

            {/* Resumo dos Componentes Doadores Escolhidos */}
            <View style={{ marginTop: 14, gap: 6 }}>
              <Text style={{ fontFamily: fonts.monoMedium, fontSize: 9.5, color: colors.text.muted, letterSpacing: 1, textTransform: 'uppercase' }}>
                COMPOSIÇÃO DO SEU VEÍCULO:
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                <View style={{ paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, backgroundColor: colors.bg.subtle, borderWidth: 1, borderColor: colors.bg.border }}>
                  <Text style={{ fontFamily: fonts.sansMedium, fontSize: 11, color: colors.text.primary }}>
                    <Text style={{ color: colors.brand.blueLight, fontFamily: fonts.monoBold }}>Motor:</Text> {selectedEngine.donorModel}
                  </Text>
                </View>
                <View style={{ paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, backgroundColor: colors.bg.subtle, borderWidth: 1, borderColor: colors.bg.border }}>
                  <Text style={{ fontFamily: fonts.sansMedium, fontSize: 11, color: colors.text.primary }}>
                    <Text style={{ color: colors.brand.blueLight, fontFamily: fonts.monoBold }}>Frente:</Text> {selectedFront.donorModel}
                  </Text>
                </View>
                <View style={{ paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, backgroundColor: colors.bg.subtle, borderWidth: 1, borderColor: colors.bg.border }}>
                  <Text style={{ fontFamily: fonts.sansMedium, fontSize: 11, color: colors.text.primary }}>
                    <Text style={{ color: colors.brand.blueLight, fontFamily: fonts.monoBold }}>Traseira:</Text> {selectedRear.donorModel}
                  </Text>
                </View>
                <View style={{ paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, backgroundColor: colors.bg.subtle, borderWidth: 1, borderColor: colors.bg.border }}>
                  <Text style={{ fontFamily: fonts.sansMedium, fontSize: 11, color: colors.text.primary }}>
                    <Text style={{ color: colors.brand.blueLight, fontFamily: fonts.monoBold }}>Rodas:</Text> {selectedWheels.donorModel}
                  </Text>
                </View>
              </View>
            </View>

            {/* Preço Total Estimado */}
            <View style={{ marginTop: 16, paddingTop: 14, borderTopWidth: 1, borderTopColor: colors.divider, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={{ fontFamily: fonts.monoMedium, fontSize: 10, color: colors.text.secondary, letterSpacing: 1 }}>ESTIMATIVA TOTAL DE PROJETO</Text>
                <Text style={{ fontFamily: fonts.sans, fontSize: 11, color: colors.text.muted }}>Inclui chassi modular + homologação</Text>
              </View>
              <Text style={{ fontFamily: fonts.monoBold, fontSize: 24, color: colors.brand.blueLight }}>
                {fmtBRLFromReais(totalPrice)}
              </Text>
            </View>
          </Card>
        </View>

        {/* Parts Selector Tabs */}
        <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
          <SectionLabel>Escolha os Componentes Doadores</SectionLabel>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingBottom: 14, paddingTop: 10 }}>
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <Pressable key={tab.id} onPress={() => setActiveTab(tab.id as any)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                      paddingHorizontal: 14,
                      paddingVertical: 9,
                      borderRadius: 10,
                      backgroundColor: isActive ? 'rgba(0, 102, 204, 0.25)' : colors.bg.surface,
                      borderWidth: 1,
                      borderColor: isActive ? colors.brand.blueLight : colors.bg.border,
                    }}
                  >
                    <Feather name={tab.icon as any} size={14} color={isActive ? colors.brand.blueLight : colors.text.secondary} />
                    <Text style={{ fontFamily: isActive ? fonts.sansBold : fonts.sansMedium, fontSize: 12.5, color: isActive ? colors.text.primary : colors.text.secondary }}>
                      {tab.label}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* List of Available Parts for Selected Category */}
          <View style={{ gap: 10, marginTop: 4 }}>
            {currentCategoryParts.map((part) => {
              const currentSelected = getSelectedForCategory(part.category);
              const isPicked = currentSelected.id === part.id;

              return (
                <Pressable key={part.id} onPress={() => handleSelectPart(part)}>
                  <Card
                    style={{
                      padding: 16,
                      borderColor: isPicked ? colors.brand.blueLight : colors.bg.border,
                      borderWidth: isPicked ? 1.5 : 1,
                      backgroundColor: isPicked ? 'rgba(0, 102, 204, 0.12)' : colors.bg.surface,
                    }}
                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <View style={{ flex: 1, marginRight: 12 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <View style={{ paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, backgroundColor: colors.bg.subtle, borderWidth: 1, borderColor: colors.bg.border }}>
                            <Text style={{ fontFamily: fonts.monoBold, fontSize: 9, color: colors.brand.blueLight }}>{part.donorModel.toUpperCase()}</Text>
                          </View>
                          <Text style={{ fontFamily: fonts.monoMedium, fontSize: 9.5, color: colors.accent.amber }}>{part.badge}</Text>
                        </View>

                        <Text style={{ fontFamily: fonts.sansBold, fontSize: 15, color: colors.text.primary, letterSpacing: -0.3 }}>
                          {part.name}
                        </Text>
                        <Text style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.text.secondary, marginTop: 3 }}>
                          {part.specsLabel}
                        </Text>
                      </View>

                      <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ fontFamily: fonts.monoBold, fontSize: 14, color: colors.text.primary }}>
                          + {fmtBRLFromReais(part.price)}
                        </Text>
                        <View style={{ marginTop: 8, width: 22, height: 22, borderRadius: 11, backgroundColor: isPicked ? colors.brand.blueLight : 'transparent', borderWidth: isPicked ? 0 : 1.5, borderColor: colors.text.muted, alignItems: 'center', justifyContent: 'center' }}>
                          {isPicked && <Feather name="check" size={13} color="#FFF" />}
                        </View>
                      </View>
                    </View>
                  </Card>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Action Controls */}
        <View style={{ paddingHorizontal: 20, paddingTop: 26 }}>
          <Pressable onPress={handleSaveBuild}>
            <View style={{ backgroundColor: savedSuccess ? colors.accent.emerald : colors.brand.fordBlue, borderRadius: 14, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 10, shadowColor: '#0066CC', shadowOpacity: 0.4, shadowRadius: 10 }}>
              <Feather name={savedSuccess ? "check-circle" : "save"} size={18} color="#FFF" />
              <Text style={{ fontFamily: fonts.sansBold, fontSize: 15, color: '#FFF' }}>
                {savedSuccess ? "Projeto Salvo no Dashboard!" : "Salvar Projeto & Exibir no Dashboard"}
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
