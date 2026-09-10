export const colors = {
  bg: {
    canvas: '#030712',
    surface: '#0B132B',
    surfaceElevated: '#1C2541',
    elevated: '#1C2541',
    subtle: '#0F1A36',
    border: 'rgba(0, 102, 204, 0.18)',
    borderStrong: 'rgba(0, 102, 204, 0.35)',
    glass: 'rgba(11, 19, 43, 0.90)',
  },
  text: {
    primary: '#F8FAFC',
    heading: '#FFFFFF',
    secondary: '#94A3B8',
    muted: '#64748B',
    inverse: '#0B132B',
  },
  brand: {
    navy: '#00095B',
    fordRoyal: '#002C6C',
    fordBlue: '#0066CC',
    blue: '#0066CC',
    blueLight: '#38BDF8',
    blueSoft: '#7DD3FC',
    indigo: '#0066CC',
    accentGlow: 'rgba(0, 102, 204, 0.22)',
    cyanGlow: 'rgba(56, 189, 248, 0.22)',
  },
  accent: {
    amber: '#F59E0B',
    amberLight: '#FCD34D',
    amberBg: 'rgba(245, 158, 11, 0.14)',
    emerald: '#10B981',
    emeraldBg: 'rgba(16, 185, 129, 0.14)',
  },
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#0066CC',
  },
  divider: 'rgba(0, 102, 204, 0.12)',
} as const;

export const fonts = {
  sans: 'Geist_400Regular',
  sansMedium: 'Geist_500Medium',
  sansSemibold: 'Geist_600SemiBold',
  sansBold: 'Geist_700Bold',
  mono: 'GeistMono_400Regular',
  monoMedium: 'GeistMono_500Medium',
  monoSemibold: 'GeistMono_600SemiBold',
  monoBold: 'GeistMono_700Bold',
} as const;

