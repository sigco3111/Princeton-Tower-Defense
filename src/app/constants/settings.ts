// =============================================================================
// GAME SETTINGS - Types, Defaults, and Presets
// =============================================================================

// -----------------------------------------------------------------------------
// Enums / Union Types
// -----------------------------------------------------------------------------

export type QualityPreset = "ultra" | "high" | "medium" | "low" | "potato";
export type ShadowQuality = "off" | "low" | "medium" | "high";
export type ParticleDensity = "off" | "reduced" | "full" | "extra";
export type FogQuality = "off" | "reduced" | "full";
export type GradientQuality = "simplified" | "full";
export type EnvironmentEffects = "off" | "reduced" | "full";
export type DecorationDensity =
  | "minimal"
  | "sparse"
  | "normal"
  | "dense"
  | "lush";
export type BattleDebrisDensity = "none" | "low" | "medium" | "high";
export type DecorationScale = "small" | "normal" | "large" | "mixed";
export type AnimationIntensity = "off" | "reduced" | "normal" | "enhanced";
export type CameraEdgePan = "off" | "slow" | "normal" | "fast";
export type DamageNumberStyle = "off" | "simple" | "animated";
export type ColorblindMode =
  | "off"
  | "protanopia"
  | "deuteranopia"
  | "tritanopia";
export type UIScale = "compact" | "normal" | "large";

// -----------------------------------------------------------------------------
// Settings Shape
// -----------------------------------------------------------------------------

export interface GraphicsSettings {
  shadowQuality: ShadowQuality;
  particleDensity: ParticleDensity;
  fogQuality: FogQuality;
  gradientQuality: GradientQuality;
  environmentEffects: EnvironmentEffects;
  antiAliasing: boolean;
  showGodRays: boolean;
  showAurora: boolean;
  showScreenGlow: boolean;
}

export interface LandscapingSettings {
  decorationDensity: DecorationDensity;
  treeClusterDensity: DecorationDensity;
  villageDensity: DecorationDensity;
  battleDebrisDensity: BattleDebrisDensity;
  decorationScale: DecorationScale;
  showPathDecorations: boolean;
  showLandmarks: boolean;
  showWaterEffects: boolean;
}

export interface AnimationSettings {
  animationIntensity: AnimationIntensity;
  screenShakeIntensity: number;
  deathAnimations: boolean;
  projectileTrails: boolean;
  towerAnimations: boolean;
  idleAnimations: boolean;
}

export interface CameraSettings {
  defaultZoom: number;
  zoomSensitivity: number;
  edgePanSpeed: CameraEdgePan;
  smoothCamera: boolean;
  zoomToCursor: boolean;
}

export interface UISettings {
  showFpsCounter: boolean;
  showPerformanceOverlay: boolean;
  damageNumbers: DamageNumberStyle;
  uiScale: UIScale;
  showHealthBars: boolean;
  showRangeIndicators: boolean;
  showTowerRadii: boolean;
  showTowerBadges: boolean;
  showWavePreview: boolean;
  tooltipDelay: number;
  autoSendWaves: boolean;
  showCameraDpad: boolean;
  showControlsReference: boolean;
  showGameTimer: boolean;
}

export interface AudioSettings {
  masterVolume: number;
  sfxVolume: number;
  musicVolume: number;
  ambientVolume: number;
  muteWhenUnfocused: boolean;
}

export interface AccessibilitySettings {
  colorblindMode: ColorblindMode;
  reducedMotion: boolean;
  highContrastUI: boolean;
  largeText: boolean;
  screenReaderHints: boolean;
}

export interface GameSettings {
  graphics: GraphicsSettings;
  landscaping: LandscapingSettings;
  animation: AnimationSettings;
  camera: CameraSettings;
  ui: UISettings;
  audio: AudioSettings;
  accessibility: AccessibilitySettings;
}

// -----------------------------------------------------------------------------
// Default Settings
// -----------------------------------------------------------------------------

export const DEFAULT_GRAPHICS: GraphicsSettings = {
  antiAliasing: true,
  environmentEffects: "full",
  fogQuality: "full",
  gradientQuality: "full",
  particleDensity: "full",
  shadowQuality: "high",
  showAurora: true,
  showGodRays: true,
  showScreenGlow: true,
};

export const DEFAULT_LANDSCAPING: LandscapingSettings = {
  battleDebrisDensity: "medium",
  decorationDensity: "normal",
  decorationScale: "normal",
  showLandmarks: true,
  showPathDecorations: true,
  showWaterEffects: true,
  treeClusterDensity: "normal",
  villageDensity: "normal",
};

export const DEFAULT_ANIMATION: AnimationSettings = {
  animationIntensity: "normal",
  deathAnimations: true,
  idleAnimations: true,
  projectileTrails: true,
  screenShakeIntensity: 1,
  towerAnimations: true,
};

export const DEFAULT_CAMERA: CameraSettings = {
  defaultZoom: 1,
  edgePanSpeed: "normal",
  smoothCamera: true,
  zoomSensitivity: 1,
  zoomToCursor: true,
};

export const DEFAULT_UI: UISettings = {
  autoSendWaves: true,
  damageNumbers: "animated",
  showCameraDpad: true,
  showControlsReference: true,
  showFpsCounter: false,
  showGameTimer: true,
  showHealthBars: true,
  showPerformanceOverlay: false,
  showRangeIndicators: true,
  showTowerBadges: false,
  showTowerRadii: true,
  showWavePreview: true,
  tooltipDelay: 400,
  uiScale: "normal",
};

export const DEFAULT_AUDIO: AudioSettings = {
  ambientVolume: 0.4,
  masterVolume: 0.8,
  musicVolume: 0.5,
  muteWhenUnfocused: true,
  sfxVolume: 0.7,
};

export const DEFAULT_ACCESSIBILITY: AccessibilitySettings = {
  colorblindMode: "off",
  highContrastUI: false,
  largeText: false,
  reducedMotion: false,
  screenReaderHints: false,
};

export const DEFAULT_GAME_SETTINGS: GameSettings = {
  accessibility: { ...DEFAULT_ACCESSIBILITY },
  animation: { ...DEFAULT_ANIMATION },
  audio: { ...DEFAULT_AUDIO },
  camera: { ...DEFAULT_CAMERA },
  graphics: { ...DEFAULT_GRAPHICS },
  landscaping: { ...DEFAULT_LANDSCAPING },
  ui: { ...DEFAULT_UI },
};

// -----------------------------------------------------------------------------
// Quality Presets — Apply a preset and override graphics + landscaping + animation
// -----------------------------------------------------------------------------

export const QUALITY_PRESETS: Record<QualityPreset, Partial<GameSettings>> = {
  high: {
    animation: { ...DEFAULT_ANIMATION },
    graphics: { ...DEFAULT_GRAPHICS },
    landscaping: { ...DEFAULT_LANDSCAPING },
  },
  low: {
    animation: {
      animationIntensity: "reduced",
      deathAnimations: true,
      idleAnimations: false,
      projectileTrails: false,
      screenShakeIntensity: 0.5,
      towerAnimations: true,
    },
    graphics: {
      antiAliasing: false,
      environmentEffects: "off",
      fogQuality: "off",
      gradientQuality: "simplified",
      particleDensity: "reduced",
      shadowQuality: "low",
      showAurora: false,
      showGodRays: false,
      showScreenGlow: false,
    },
    landscaping: {
      battleDebrisDensity: "none",
      decorationDensity: "sparse",
      decorationScale: "small",
      showLandmarks: true,
      showPathDecorations: true,
      showWaterEffects: false,
      treeClusterDensity: "sparse",
      villageDensity: "minimal",
    },
  },
  medium: {
    animation: {
      animationIntensity: "normal",
      deathAnimations: true,
      idleAnimations: false,
      projectileTrails: true,
      screenShakeIntensity: 0.8,
      towerAnimations: true,
    },
    graphics: {
      antiAliasing: true,
      environmentEffects: "reduced",
      fogQuality: "reduced",
      gradientQuality: "full",
      particleDensity: "full",
      shadowQuality: "medium",
      showAurora: false,
      showGodRays: true,
      showScreenGlow: true,
    },
    landscaping: {
      battleDebrisDensity: "low",
      decorationDensity: "normal",
      decorationScale: "normal",
      showLandmarks: true,
      showPathDecorations: true,
      showWaterEffects: true,
      treeClusterDensity: "sparse",
      villageDensity: "sparse",
    },
  },
  potato: {
    animation: {
      animationIntensity: "off",
      deathAnimations: false,
      idleAnimations: false,
      projectileTrails: false,
      screenShakeIntensity: 0,
      towerAnimations: false,
    },
    graphics: {
      antiAliasing: false,
      environmentEffects: "off",
      fogQuality: "off",
      gradientQuality: "simplified",
      particleDensity: "off",
      shadowQuality: "off",
      showAurora: false,
      showGodRays: false,
      showScreenGlow: false,
    },
    landscaping: {
      battleDebrisDensity: "none",
      decorationDensity: "minimal",
      decorationScale: "small",
      showLandmarks: true,
      showPathDecorations: false,
      showWaterEffects: false,
      treeClusterDensity: "minimal",
      villageDensity: "minimal",
    },
  },
  ultra: {
    animation: {
      animationIntensity: "enhanced",
      deathAnimations: true,
      idleAnimations: true,
      projectileTrails: true,
      screenShakeIntensity: 1.2,
      towerAnimations: true,
    },
    graphics: {
      antiAliasing: true,
      environmentEffects: "full",
      fogQuality: "full",
      gradientQuality: "full",
      particleDensity: "extra",
      shadowQuality: "high",
      showAurora: true,
      showGodRays: true,
      showScreenGlow: true,
    },
    landscaping: {
      battleDebrisDensity: "high",
      decorationDensity: "lush",
      decorationScale: "large",
      showLandmarks: true,
      showPathDecorations: true,
      showWaterEffects: true,
      treeClusterDensity: "lush",
      villageDensity: "lush",
    },
  },
};

// -----------------------------------------------------------------------------
// Multiplier Lookup Tables — Map enum values to numeric multipliers
// Used by rendering code to scale loop counts, radii, etc.
// -----------------------------------------------------------------------------

export const DECORATION_DENSITY_MULTIPLIER: Record<DecorationDensity, number> =
  {
    dense: 1.5,
    lush: 2,
    minimal: 0.2,
    normal: 1,
    sparse: 0.5,
  };

export const TREE_CLUSTER_COUNT: Record<DecorationDensity, number> = {
  dense: 60,
  lush: 80,
  minimal: 8,
  normal: 40,
  sparse: 20,
};

export const GROVE_COUNT: Record<DecorationDensity, number> = {
  dense: 18,
  lush: 24,
  minimal: 2,
  normal: 12,
  sparse: 6,
};

export const VILLAGE_COUNT: Record<DecorationDensity, number> = {
  dense: 16,
  lush: 20,
  minimal: 2,
  normal: 12,
  sparse: 6,
};

export const BATTLE_DEBRIS_COUNT: Record<BattleDebrisDensity, number> = {
  high: 450,
  low: 100,
  medium: 280,
  none: 0,
};

export const PARTICLE_DENSITY_MULTIPLIER: Record<ParticleDensity, number> = {
  extra: 1.5,
  full: 1,
  off: 0,
  reduced: 0.5,
};

export const SHADOW_QUALITY_MULTIPLIER: Record<ShadowQuality, number> = {
  high: 1,
  low: 0.35,
  medium: 0.6,
  off: 0,
};

export const FOG_QUALITY_MULTIPLIER: Record<FogQuality, number> = {
  full: 1,
  off: 0,
  reduced: 0.5,
};

export const DECORATION_SCALE_RANGE: Record<
  DecorationScale,
  { base: number; variance: number }
> = {
  large: { base: 0.9, variance: 0.6 },
  mixed: { base: 0.6, variance: 0.8 },
  normal: { base: 0.7, variance: 0.5 },
  small: { base: 0.5, variance: 0.3 },
};

export const EDGE_PAN_SPEED: Record<CameraEdgePan, number> = {
  fast: 2,
  normal: 1,
  off: 0,
  slow: 0.5,
};

export const TOOLTIP_DELAY_OPTIONS = [0, 200, 400, 600, 1000] as const;

// -----------------------------------------------------------------------------
// Settings Categories Metadata — for the settings UI
// -----------------------------------------------------------------------------

export type SettingsCategory =
  | "graphics"
  | "landscaping"
  | "animation"
  | "camera"
  | "ui"
  | "audio"
  | "accessibility";

export interface SettingsCategoryMeta {
  id: SettingsCategory;
  label: string;
  icon: string;
  description: string;
}

export const SETTINGS_CATEGORIES: SettingsCategoryMeta[] = [
  {
    description: "그림자, 파티클, 안개 및 시각 효과",
    icon: "monitor",
    id: "graphics",
    label: "그래픽",
  },
  {
    description: "장식 밀도, 나무, 마을 및 지형",
    icon: "trees",
    id: "landscaping",
    label: "Landscaping",
  },
  {
    description: "애니메이션 품질, 화면 흔들림 및 시각 효과",
    icon: "sparkles",
    id: "animation",
    label: "Animation",
  },
  {
    description: "줌, 패닝 및 카메라 동작",
    icon: "move",
    id: "camera",
    label: "Camera",
  },
  {
    description: "HUD 요소, 피해 숫자 및 오버레이",
    icon: "layout",
    id: "ui",
    label: "Interface",
  },
  {
    description: "음악, 효과음, 환경음 볼륨 조절",
    icon: "volume",
    id: "audio",
    label: "오디오",
  },
  {
    description: "색약 지원, 모션 및 가독성",
    icon: "eye",
    id: "accessibility",
    label: "Accessibility",
  },
];

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Persistent Storage Key
// -----------------------------------------------------------------------------

export const SETTINGS_STORAGE_KEY = "princeton-td-settings";
export const DEV_MODE_STORAGE_KEY = "ptd:dev-mode-unlocked";
