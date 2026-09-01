"use client";
import {
  X,
  Monitor,
  Trees,
  Sparkles,
  Move,
  LayoutDashboard,
  Volume2,
  Eye,
  RotateCcw,
  ChevronDown,
  Zap,
  Sun,
  Cloud,
  Palette,
  Layers,
  Mountain,
  Swords,
  Maximize,
  Activity,
  Vibrate,
  Skull,
  Crosshair,
  Shield,
  ZoomIn,
  MousePointer,
  PanelTop,
  Heart,
  Target,
  Radio,
  Clock,
  FastForward,
  VolumeX,
  Headphones,
  Wind,
  Accessibility,
  Contrast,
  Type,
  AlertCircle,
  Lock,
  Unlock,
  Star,
  Gamepad2,
  Keyboard,
} from "lucide-react";
import React, { useState, useCallback } from "react";

import { DEV_MODE_STORAGE_KEY } from "../../constants/settings";
import type {
  GameSettings,
  QualityPreset,
  SettingsCategory,
  ShadowQuality,
  ParticleDensity,
  FogQuality,
  GradientQuality,
  EnvironmentEffects,
  DecorationDensity,
  BattleDebrisDensity,
  DecorationScale,
  AnimationIntensity,
  CameraEdgePan,
  DamageNumberStyle,
  ColorblindMode,
  UIScale,
} from "../../constants/settings";
import { BaseModal } from "../ui/primitives/BaseModal";
import { OrnateFrame } from "../ui/primitives/OrnateFrame";
import {
  PANEL,
  GOLD,
  OVERLAY,
  panelGradient,
  dividerGradient,
} from "../ui/system/theme";

// =============================================================================
// REUSABLE SETTING CONTROLS
// =============================================================================

interface SegmentedControlProps<T extends string> {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}

function SegmentedControl<T extends string>({
  value,
  options,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <div
      className="flex flex-wrap gap-1 p-0.5 rounded-lg"
      style={{ background: PANEL.bgDeep }}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-[11px] sm:text-xs font-medium transition-all whitespace-nowrap"
            style={{
              background: active
                ? `linear-gradient(180deg, ${GOLD.accentBorder50}, ${GOLD.accentBorder35})`
                : "transparent",
              border: active ? "none" : "1px solid transparent",
              color: active ? "#1a1207" : "rgba(253,230,138,0.6)",
              fontWeight: active ? 700 : 500,
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

interface SliderControlProps {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  formatLabel?: (value: number) => string;
}

function SliderControl({
  value,
  min,
  max,
  step,
  onChange,
  formatLabel,
}: SliderControlProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex items-center gap-3 w-full">
      <input
        type="사거리"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number.parseFloat(e.target.value))}
        className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(90deg, rgba(251,191,36,0.7) 0%, rgba(251,191,36,0.7) ${pct}%, rgba(60,50,30,0.6) ${pct}%, rgba(60,50,30,0.6) 100%)`,
        }}
      />
      <span className="text-xs text-amber-300 font-mono w-12 text-right">
        {formatLabel ? formatLabel(value) : value.toFixed(1)}
      </span>
    </div>
  );
}

interface ToggleControlProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

function ToggleControl({ value, onChange }: ToggleControlProps) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="relative w-11 h-6 rounded-full transition-all"
      style={{
        background: value
          ? "linear-gradient(90deg, rgba(251,191,36,0.7), rgba(217,119,6,0.8))"
          : "rgba(60,50,30,0.6)",
        border: `1px solid ${value ? GOLD.accentBorder40 : GOLD.innerBorder10}`,
      }}
    >
      <div
        className="absolute top-0.5 w-5 h-5 rounded-full transition-all"
        style={{
          background: value ? "#fbbf24" : "rgba(180,140,60,0.4)",
          boxShadow: value ? "0 0 6px rgba(251,191,36,0.4)" : "none",
          left: value ? "calc(100% - 22px)" : "2px",
        }}
      />
    </button>
  );
}

interface SettingRowProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  tag?: "coming-soon";
  children: React.ReactNode;
}

function SettingRow({
  icon,
  label,
  description,
  tag,
  children,
}: SettingRowProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 py-3 px-3 sm:px-4 rounded-lg transition-colors hover:bg-white/[0.02] ${tag === "coming-soon" ? "opacity-50 pointer-events-none" : ""}`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="text-amber-500/70 flex-shrink-0">{icon}</div>
        <div className="min-w-0">
          <div className="text-sm font-medium text-amber-200 flex items-center gap-2">
            {label}
            {tag === "coming-soon" && (
              <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-zinc-800/60 text-zinc-400/80 border border-zinc-600/30">
                Soon
              </span>
            )}
          </div>
          {description && (
            <div className="text-xs text-amber-200/40 mt-0.5">
              {description}
            </div>
          )}
        </div>
      </div>
      <div className="flex-shrink-0 ml-7 sm:ml-0">{children}</div>
    </div>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="pt-4 pb-1 px-4">
      <div className="flex items-center gap-3">
        <div className="text-xs font-bold uppercase tracking-widest text-amber-500/50">
          {label}
        </div>
        <div className="flex-1 h-px" style={{ background: dividerGradient }} />
      </div>
    </div>
  );
}

// =============================================================================
// DEVELOPER MODE SECTION (shared between desktop sidebar & mobile bottom)
// =============================================================================

interface DevModeSectionProps {
  devUnlocked: boolean;
  devPassword: string;
  devPasswordError: boolean;
  onDevPasswordChange: (value: string) => void;
  onDevPasswordSubmit: () => void;
  onDevModeDisable: () => void;
}

function DevModeSection({
  devUnlocked,
  devPassword,
  devPasswordError,
  onDevPasswordChange,
  onDevPasswordSubmit,
  onDevModeDisable,
}: DevModeSectionProps) {
  return (
    <>
      <div className="flex items-center gap-2 mb-2.5">
        <span
          style={{
            color: devUnlocked
              ? "rgba(74,222,128,0.8)"
              : "rgba(253,230,138,0.35)",
          }}
        >
          {devUnlocked ? <Unlock size={14} /> : <Lock size={14} />}
        </span>
        <span
          className="text-xs font-medium"
          style={{
            color: devUnlocked
              ? "rgba(74,222,128,0.8)"
              : "rgba(253,230,138,0.35)",
          }}
        >
          Developer
        </span>
      </div>
      {devUnlocked ? (
        <button
          onClick={onDevModeDisable}
          className="w-full px-2 py-1.5 rounded text-xs font-medium transition-colors"
          style={{
            background: "rgba(74,222,128,0.1)",
            border: "1px solid rgba(74,222,128,0.25)",
            color: "rgba(74,222,128,0.8)",
          }}
        >
          Enabled — Disable
        </button>
      ) : (
        <div className="flex flex-col gap-1.5">
          <input
            type="password"
            value={devPassword}
            onChange={(e) => onDevPasswordChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "입력") {
                onDevPasswordSubmit();
              }
            }}
            placeholder="Password"
            className="w-full px-2 py-1.5 rounded text-xs"
            style={{
              background: PANEL.bgDeep,
              border: `1px solid ${devPasswordError ? "rgba(239,68,68,0.5)" : GOLD.innerBorder10}`,
              color: "rgba(253,230,138,0.7)",
              outline: "none",
            }}
          />
          {devPasswordError && (
            <span className="text-xs" style={{ color: "rgba(239,68,68,0.8)" }}>
              Wrong password
            </span>
          )}
        </div>
      )}
    </>
  );
}

// =============================================================================
// CATEGORY PANELS
// =============================================================================

interface CategoryPanelProps {
  settings: GameSettings;
  updateCategory: <K extends SettingsCategory>(
    category: K,
    patch: Partial<GameSettings[K]>
  ) => void;
}

function GraphicsPanel({ settings, updateCategory }: CategoryPanelProps) {
  const g = settings.graphics;
  const update = (patch: Partial<GameSettings["graphics"]>) =>
    updateCategory("graphics", patch);

  return (
    <>
      <SectionDivider label="Shadows & Lighting" />
      <SettingRow
        icon={<Sun size={16} />}
        label="Shadow Quality"
        description="품질이 높을수록 더 큰 블러 반경을 사용합니다"
      >
        <SegmentedControl<ShadowQuality>
          value={g.shadowQuality}
          options={[
            { label: "끄기", value: "off" },
            { label: "낮음", value: "low" },
            { label: "Med", value: "medium" },
            { label: "High", value: "high" },
          ]}
          onChange={(v) => update({ shadowQuality: v })}
        />
      </SettingRow>
      <SettingRow
        icon={<Sun size={16} />}
        label="God Rays"
        description="볼류메트릭 광선 효과"
      >
        <ToggleControl
          value={g.showGodRays}
          onChange={(v) => update({ showGodRays: v })}
        />
      </SettingRow>
      <SettingRow
        icon={<Sparkles size={16} />}
        label="Screen Glow"
        description="Ambient glow effects"
      >
        <ToggleControl
          value={g.showScreenGlow}
          onChange={(v) => update({ showScreenGlow: v })}
        />
      </SettingRow>

      <SectionDivider label="Particles & Effects" />
      <SettingRow
        icon={<Sparkles size={16} />}
        label="Particle Density"
        description="생성되는 파티클 수"
      >
        <SegmentedControl<ParticleDensity>
          value={g.particleDensity}
          options={[
            { label: "끄기", value: "off" },
            { label: "낮음", value: "reduced" },
            { label: "가득", value: "full" },
            { label: "Extra", value: "extra" },
          ]}
          onChange={(v) => update({ particleDensity: v })}
        />
      </SettingRow>

      <SectionDivider label="Atmosphere" />
      <SettingRow
        icon={<Cloud size={16} />}
        label="Fog Quality"
        description="Fog bank complexity"
      >
        <SegmentedControl<FogQuality>
          value={g.fogQuality}
          options={[
            { label: "끄기", value: "off" },
            { label: "낮음", value: "reduced" },
            { label: "가득", value: "full" },
          ]}
          onChange={(v) => update({ fogQuality: v })}
        />
      </SettingRow>
      <SettingRow
        icon={<Palette size={16} />}
        label="그래디언트 품질"
        description="Gradient color stops"
      >
        <SegmentedControl<GradientQuality>
          value={g.gradientQuality}
          options={[
            { label: "Simple", value: "simplified" },
            { label: "가득", value: "full" },
          ]}
          onChange={(v) => update({ gradientQuality: v })}
        />
      </SettingRow>
      <SettingRow
        icon={<Wind size={16} />}
        label="환경 효과"
        description="바람, 낙엽, 꽃가루 등 환경 효과"
      >
        <SegmentedControl<EnvironmentEffects>
          value={g.environmentEffects}
          options={[
            { label: "끄기", value: "off" },
            { label: "낮음", value: "reduced" },
            { label: "가득", value: "full" },
          ]}
          onChange={(v) => update({ environmentEffects: v })}
        />
      </SettingRow>
      <SettingRow
        icon={<Sparkles size={16} />}
        label="Aurora"
        description="오로라 효과 (겨울 맵)"
      >
        <ToggleControl
          value={g.showAurora}
          onChange={(v) => update({ showAurora: v })}
        />
      </SettingRow>
      <SettingRow
        icon={<Layers size={16} />}
        label="Anti-Aliasing"
        description="캔버스 가장자리 부드럽게 처리"
      >
        <ToggleControl
          value={g.antiAliasing}
          onChange={(v) => update({ antiAliasing: v })}
        />
      </SettingRow>
    </>
  );
}

function LandscapingPanel({ settings, updateCategory }: CategoryPanelProps) {
  const l = settings.landscaping;
  const update = (patch: Partial<GameSettings["landscaping"]>) =>
    updateCategory("landscaping", patch);

  const densityOptions: { value: DecorationDensity; label: string }[] = [
    { label: "최소", value: "minimal" },
    { label: "Sparse", value: "sparse" },
    { label: "보통", value: "normal" },
    { label: "Dense", value: "dense" },
    { label: "Lush", value: "lush" },
  ];

  return (
    <>
      <SectionDivider label="Vegetation" />
      <SettingRow
        icon={<Trees size={16} />}
        label="Decoration Density"
        description="맵에 배치된 장식의 전체 개수"
      >
        <SegmentedControl<DecorationDensity>
          value={l.decorationDensity}
          options={densityOptions}
          onChange={(v) => update({ decorationDensity: v })}
        />
      </SettingRow>
      <SettingRow
        icon={<Trees size={16} />}
        label="Tree Clusters"
        description="나무 군집의 수와 크기"
      >
        <SegmentedControl<DecorationDensity>
          value={l.treeClusterDensity}
          options={densityOptions}
          onChange={(v) => update({ treeClusterDensity: v })}
        />
      </SettingRow>

      <SectionDivider label="구조물 & 마을" />
      <SettingRow
        icon={<Mountain size={16} />}
        label="Village Density"
        description="마을 무리의 수"
      >
        <SegmentedControl<DecorationDensity>
          value={l.villageDensity}
          options={densityOptions}
          onChange={(v) => update({ villageDensity: v })}
        />
      </SettingRow>

      <SectionDivider label="Battlefield" />
      <SettingRow
        icon={<Swords size={16} />}
        label="Battle Debris"
        description="분화구, 화살, 해골 등 전장 잔해"
      >
        <SegmentedControl<BattleDebrisDensity>
          value={l.battleDebrisDensity}
          options={[
            { label: "없음", value: "none" },
            { label: "낮음", value: "low" },
            { label: "Med", value: "medium" },
            { label: "High", value: "high" },
          ]}
          onChange={(v) => update({ battleDebrisDensity: v })}
        />
      </SettingRow>

      <SectionDivider label="Scaling" />
      <SettingRow
        icon={<Maximize size={16} />}
        label="Decoration Scale"
        description="배치된 장식의 크기 범위"
      >
        <SegmentedControl<DecorationScale>
          value={l.decorationScale}
          options={[
            { label: "Small", value: "small" },
            { label: "보통", value: "normal" },
            { label: "Large", value: "large" },
            { label: "Mixed", value: "mixed" },
          ]}
          onChange={(v) => update({ decorationScale: v })}
        />
      </SettingRow>

      <SectionDivider label="Toggles" />
      <SettingRow
        icon={<Layers size={16} />}
        label="Path Decorations"
        description="도로의 균열, 풀 뭉치, 표면 디테일"
      >
        <ToggleControl
          value={l.showPathDecorations}
          onChange={(v) => update({ showPathDecorations: v })}
        />
      </SettingRow>
      <SettingRow
        icon={<Mountain size={16} />}
        label="Landmarks"
        description="주요 구조물 (피라미드, 성 등)"
      >
        <ToggleControl
          value={l.showLandmarks}
          onChange={(v) => update({ showLandmarks: v })}
        />
      </SettingRow>
      <SettingRow
        icon={<Cloud size={16} />}
        label="Water Effects"
        description="분수, 연못, 수경 시설"
      >
        <ToggleControl
          value={l.showWaterEffects}
          onChange={(v) => update({ showWaterEffects: v })}
        />
      </SettingRow>
    </>
  );
}

function AnimationPanel({ settings, updateCategory }: CategoryPanelProps) {
  const a = settings.animation;
  const update = (patch: Partial<GameSettings["animation"]>) =>
    updateCategory("animation", patch);

  return (
    <>
      <SectionDivider label="Quality" />
      <SettingRow
        icon={<Activity size={16} />}
        label="Animation Intensity"
        description="전반적인 애니메이션 디테일 수준"
        tag="coming-soon"
      >
        <SegmentedControl<AnimationIntensity>
          value={a.animationIntensity}
          options={[
            { label: "끄기", value: "off" },
            { label: "낮음", value: "reduced" },
            { label: "보통", value: "normal" },
            { label: "Enhanced", value: "enhanced" },
          ]}
          onChange={(v) => update({ animationIntensity: v })}
        />
      </SettingRow>

      <SectionDivider label="Screen Effects" />
      <SettingRow
        icon={<Vibrate size={16} />}
        label="Screen Shake"
        description="충격 시 카메라 흔들림 강도"
        tag="coming-soon"
      >
        <SliderControl
          value={a.screenShakeIntensity}
          min={0}
          max={2}
          step={0.1}
          onChange={(v) => update({ screenShakeIntensity: v })}
          formatLabel={(v) => `${Math.round(v * 100)}%`}
        />
      </SettingRow>

      <SectionDivider label="Toggles" />
      <SettingRow
        icon={<Skull size={16} />}
        label="Death Animations"
        description="적이 죽을 때 애니메이션 재생"
      >
        <ToggleControl
          value={a.deathAnimations}
          onChange={(v) => update({ deathAnimations: v })}
        />
      </SettingRow>
      <SettingRow
        icon={<Crosshair size={16} />}
        label="Projectile Trails"
        description="발사체에 시각적 궤적 표시"
      >
        <ToggleControl
          value={a.projectileTrails}
          onChange={(v) => update({ projectileTrails: v })}
        />
      </SettingRow>
      <SettingRow
        icon={<Shield size={16} />}
        label="Tower Animations"
        description="타워 대기 및 공격 애니메이션"
        tag="coming-soon"
      >
        <ToggleControl
          value={a.towerAnimations}
          onChange={(v) => update({ towerAnimations: v })}
        />
      </SettingRow>
      <SettingRow
        icon={<Activity size={16} />}
        label="Idle Animations"
        description="장식에 미묘한 대기 동작"
        tag="coming-soon"
      >
        <ToggleControl
          value={a.idleAnimations}
          onChange={(v) => update({ idleAnimations: v })}
        />
      </SettingRow>
    </>
  );
}

function CameraPanel({ settings, updateCategory }: CategoryPanelProps) {
  const c = settings.camera;
  const update = (patch: Partial<GameSettings["camera"]>) =>
    updateCategory("camera", patch);

  return (
    <>
      <SectionDivider label="Zoom" />
      <SettingRow
        icon={<ZoomIn size={16} />}
        label="Default Zoom"
        description="맵 입장 시 초기 확대 수준"
      >
        <SliderControl
          value={c.defaultZoom}
          min={0.5}
          max={2}
          step={0.05}
          onChange={(v) => update({ defaultZoom: v })}
          formatLabel={(v) => `${Math.round(v * 100)}%`}
        />
      </SettingRow>
      <SettingRow
        icon={<ZoomIn size={16} />}
        label="Zoom Sensitivity"
        description="스크롤에 따른 줌 반응 속도"
      >
        <SliderControl
          value={c.zoomSensitivity}
          min={0.3}
          max={2}
          step={0.1}
          onChange={(v) => update({ zoomSensitivity: v })}
          formatLabel={(v) => `${Math.round(v * 100)}%`}
        />
      </SettingRow>

      <SectionDivider label="Panning" />
      <SettingRow
        icon={<MousePointer size={16} />}
        label="Edge Pan Speed"
        description="가장자리 호버 시 카메라 이동 속도"
        tag="coming-soon"
      >
        <SegmentedControl<CameraEdgePan>
          value={c.edgePanSpeed}
          options={[
            { label: "끄기", value: "off" },
            { label: "감속", value: "slow" },
            { label: "보통", value: "normal" },
            { label: "Fast", value: "fast" },
          ]}
          onChange={(v) => update({ edgePanSpeed: v })}
        />
      </SettingRow>

      <SectionDivider label="Behavior" />
      <SettingRow
        icon={<Move size={16} />}
        label="Smooth Camera"
        description="카메라 움직임 보간 처리"
        tag="coming-soon"
      >
        <ToggleControl
          value={c.smoothCamera}
          onChange={(v) => update({ smoothCamera: v })}
        />
      </SettingRow>
      <SettingRow
        icon={<Target size={16} />}
        label="Zoom to Cursor"
        description="마우스 위치로 줌인"
      >
        <ToggleControl
          value={c.zoomToCursor}
          onChange={(v) => update({ zoomToCursor: v })}
        />
      </SettingRow>
    </>
  );
}

function UIPanel({ settings, updateCategory }: CategoryPanelProps) {
  const u = settings.ui;
  const update = (patch: Partial<GameSettings["ui"]>) =>
    updateCategory("ui", patch);

  return (
    <>
      <SectionDivider label="HUD" />
      <SettingRow
        icon={<Activity size={16} />}
        label="FPS Counter"
        description="초당 프레임 표시"
      >
        <ToggleControl
          value={u.showFpsCounter}
          onChange={(v) => update({ showFpsCounter: v })}
        />
      </SettingRow>
      <SettingRow
        icon={<Clock size={16} />}
        label="Game Timer"
        description="HUD 아래에 경과 시간 표시"
      >
        <ToggleControl
          value={u.showGameTimer}
          onChange={(v) => update({ showGameTimer: v })}
        />
      </SettingRow>
      <SettingRow
        icon={<PanelTop size={16} />}
        label="Performance Overlay"
        description="상세 성능 통계 표시"
        tag="coming-soon"
      >
        <ToggleControl
          value={u.showPerformanceOverlay}
          onChange={(v) => update({ showPerformanceOverlay: v })}
        />
      </SettingRow>

      <SectionDivider label="Combat Feedback" />
      <SettingRow
        icon={<Swords size={16} />}
        label="Damage Numbers"
        description="데미지 수치 부유 표시"
      >
        <SegmentedControl<DamageNumberStyle>
          value={u.damageNumbers}
          options={[
            { label: "끄기", value: "off" },
            { label: "Simple", value: "simple" },
            { label: "Animated", value: "animated" },
          ]}
          onChange={(v) => update({ damageNumbers: v })}
        />
      </SettingRow>
      <SettingRow
        icon={<Heart size={16} />}
        label="Health Bars"
        description="적의 체력바 표시"
      >
        <ToggleControl
          value={u.showHealthBars}
          onChange={(v) => update({ showHealthBars: v })}
        />
      </SettingRow>

      <SectionDivider label="타워 표시기" />
      <SettingRow
        icon={<Radio size={16} />}
        label="Range Indicators"
        description="타워 호버 시 사정거리 표시"
      >
        <ToggleControl
          value={u.showRangeIndicators}
          onChange={(v) => update({ showRangeIndicators: v })}
        />
      </SettingRow>
      <SettingRow
        icon={<Target size={16} />}
        label="Tower Radii"
        description="배치 중 반경 원 표시"
      >
        <ToggleControl
          value={u.showTowerRadii}
          onChange={(v) => update({ showTowerRadii: v })}
        />
      </SettingRow>
      <SettingRow
        icon={<Star size={16} />}
        label="Tower Badges"
        description="타워에 레벨 별과 업그레이드 경로 배지 표시"
      >
        <ToggleControl
          value={u.showTowerBadges}
          onChange={(v) => update({ showTowerBadges: v })}
        />
      </SettingRow>

      <SectionDivider label="Overlays" />
      <SettingRow
        icon={<Gamepad2 size={16} />}
        label="Camera D-Pad"
        description="화면 상 카메라 이동 조작 표시"
      >
        <ToggleControl
          value={u.showCameraDpad}
          onChange={(v) => update({ showCameraDpad: v })}
        />
      </SettingRow>
      <SettingRow
        icon={<Keyboard size={16} />}
        label="Controls Reference"
        description="키보드 단축키 참조 패널 표시"
      >
        <ToggleControl
          value={u.showControlsReference}
          onChange={(v) => update({ showControlsReference: v })}
        />
      </SettingRow>

      <SectionDivider label="Gameplay" />
      <SettingRow
        icon={<Layers size={16} />}
        label="Wave Preview"
        description="다가오는 웨이브 구성 미리 보기"
      >
        <ToggleControl
          value={u.showWavePreview}
          onChange={(v) => update({ showWavePreview: v })}
        />
      </SettingRow>
      <SettingRow
        icon={<FastForward size={16} />}
        label="Auto-Send Waves"
        description="타이머 만료 시 다음 웨이브 자동 시작"
      >
        <ToggleControl
          value={u.autoSendWaves}
          onChange={(v) => update({ autoSendWaves: v })}
        />
      </SettingRow>

      <SectionDivider label="Interface Scale" />
      <SettingRow
        icon={<Maximize size={16} />}
        label="UI Scale"
        description="Size of HUD elements"
        tag="coming-soon"
      >
        <SegmentedControl<UIScale>
          value={u.uiScale}
          options={[
            { label: "Compact", value: "compact" },
            { label: "보통", value: "normal" },
            { label: "Large", value: "large" },
          ]}
          onChange={(v) => update({ uiScale: v })}
        />
      </SettingRow>
      <SettingRow
        icon={<Clock size={16} />}
        label="Tooltip Delay"
        description="툴팁이 나타나기 전 시간 (밀리초)"
        tag="coming-soon"
      >
        <SliderControl
          value={u.tooltipDelay}
          min={0}
          max={1000}
          step={100}
          onChange={(v) => update({ tooltipDelay: v })}
          formatLabel={(v) => `${v}ms`}
        />
      </SettingRow>
    </>
  );
}

function AudioPanel({ settings, updateCategory }: CategoryPanelProps) {
  const au = settings.audio;
  const update = (patch: Partial<GameSettings["audio"]>) =>
    updateCategory("audio", patch);

  return (
    <>
      <SectionDivider label="볼륨" />
      <SettingRow
        icon={<Volume2 size={16} />}
        label="Master Volume"
        description="Overall audio level"
        tag="coming-soon"
      >
        <SliderControl
          value={au.masterVolume}
          min={0}
          max={1}
          step={0.05}
          onChange={(v) => update({ masterVolume: v })}
          formatLabel={(v) => `${Math.round(v * 100)}%`}
        />
      </SettingRow>
      <SettingRow
        icon={<Zap size={16} />}
        label="SFX Volume"
        description="효과음 (공격, 능력)"
        tag="coming-soon"
      >
        <SliderControl
          value={au.sfxVolume}
          min={0}
          max={1}
          step={0.05}
          onChange={(v) => update({ sfxVolume: v })}
          formatLabel={(v) => `${Math.round(v * 100)}%`}
        />
      </SettingRow>
      <SettingRow
        icon={<Headphones size={16} />}
        label="음악 볼륨"
        description="Background music"
        tag="coming-soon"
      >
        <SliderControl
          value={au.musicVolume}
          min={0}
          max={1}
          step={0.05}
          onChange={(v) => update({ musicVolume: v })}
          formatLabel={(v) => `${Math.round(v * 100)}%`}
        />
      </SettingRow>
      <SettingRow
        icon={<Wind size={16} />}
        label="환경 볼륨"
        description="환경음 (바람, 물)"
        tag="coming-soon"
      >
        <SliderControl
          value={au.ambientVolume}
          min={0}
          max={1}
          step={0.05}
          onChange={(v) => update({ ambientVolume: v })}
          formatLabel={(v) => `${Math.round(v * 100)}%`}
        />
      </SettingRow>

      <SectionDivider label="Behavior" />
      <SettingRow
        icon={<VolumeX size={16} />}
        label="Mute When Unfocused"
        description="탭이 비활성일 때 오디오 음소거"
        tag="coming-soon"
      >
        <ToggleControl
          value={au.muteWhenUnfocused}
          onChange={(v) => update({ muteWhenUnfocused: v })}
        />
      </SettingRow>
    </>
  );
}

function AccessibilityPanel({ settings, updateCategory }: CategoryPanelProps) {
  const acc = settings.accessibility;
  const update = (patch: Partial<GameSettings["accessibility"]>) =>
    updateCategory("accessibility", patch);

  return (
    <>
      <SectionDivider label="Vision" />
      <SettingRow
        icon={<Eye size={16} />}
        label="Colorblind Mode"
        description="색약에 맞춰 색상 조정"
        tag="coming-soon"
      >
        <SegmentedControl<ColorblindMode>
          value={acc.colorblindMode}
          options={[
            { label: "끄기", value: "off" },
            { label: "Protan", value: "protanopia" },
            { label: "Deuter", value: "deuteranopia" },
            { label: "Tritan", value: "tritanopia" },
          ]}
          onChange={(v) => update({ colorblindMode: v })}
        />
      </SettingRow>
      <SettingRow
        icon={<Contrast size={16} />}
        label="High Contrast UI"
        description="UI 요소의 대비 강화"
        tag="coming-soon"
      >
        <ToggleControl
          value={acc.highContrastUI}
          onChange={(v) => update({ highContrastUI: v })}
        />
      </SettingRow>

      <SectionDivider label="Motion" />
      <SettingRow
        icon={<Accessibility size={16} />}
        label="Reduced Motion"
        description="애니메이션과 동작 최소화"
        tag="coming-soon"
      >
        <ToggleControl
          value={acc.reducedMotion}
          onChange={(v) => update({ reducedMotion: v })}
        />
      </SettingRow>

      <SectionDivider label="Readability" />
      <SettingRow
        icon={<Type size={16} />}
        label="Large Text"
        description="UI 전체의 텍스트 크기 확대"
        tag="coming-soon"
      >
        <ToggleControl
          value={acc.largeText}
          onChange={(v) => update({ largeText: v })}
        />
      </SettingRow>
      <SettingRow
        icon={<AlertCircle size={16} />}
        label="Screen Reader Hints"
        description="보조 기술용 추가 ARIA 레이블"
        tag="coming-soon"
      >
        <ToggleControl
          value={acc.screenReaderHints}
          onChange={(v) => update({ screenReaderHints: v })}
        />
      </SettingRow>
    </>
  );
}

// =============================================================================
// TAB DEFINITIONS
// =============================================================================

interface TabDef {
  id: SettingsCategory;
  label: string;
  icon: React.ReactNode;
  panel: React.FC<CategoryPanelProps>;
}

const TABS: TabDef[] = [
  {
    icon: <Monitor size={18} />,
    id: "graphics",
    label: "그래픽",
    panel: GraphicsPanel,
  },
  {
    icon: <Trees size={18} />,
    id: "landscaping",
    label: "Landscaping",
    panel: LandscapingPanel,
  },
  {
    icon: <Sparkles size={18} />,
    id: "animation",
    label: "Animation",
    panel: AnimationPanel,
  },
  {
    icon: <Move size={18} />,
    id: "camera",
    label: "Camera",
    panel: CameraPanel,
  },
  {
    icon: <LayoutDashboard size={18} />,
    id: "ui",
    label: "Interface",
    panel: UIPanel,
  },
  {
    icon: <Volume2 size={18} />,
    id: "audio",
    label: "오디오",
    panel: AudioPanel,
  },
  {
    icon: <Eye size={18} />,
    id: "accessibility",
    label: "Accessibility",
    panel: AccessibilityPanel,
  },
];

// =============================================================================
// PRESET SELECTOR
// =============================================================================

const PRESET_BUTTONS: { value: QualityPreset; label: string; desc: string }[] =
  [
    {
      desc: "저사양 기기를 위한 최소 사양",
      label: "Potato",
      value: "potato",
    },
    { desc: "프레임 확보를 위해 효과를 줄였습니다", label: "낮음", value: "low" },
    {
      desc: "비주얼과 성능의 균형",
      label: "중간",
      value: "medium",
    },
    { desc: "기본값, 최고 품질", label: "높음", value: "high" },
    { desc: "모든 곳에서 최고 디테일", label: "울트라", value: "ultra" },
  ];

// =============================================================================
// SETTINGS MODAL
// =============================================================================

interface SettingsModalProps {
  onClose: () => void;
  settings: GameSettings;
  updateCategory: <K extends SettingsCategory>(
    category: K,
    patch: Partial<GameSettings[K]>
  ) => void;
  applyPreset: (preset: QualityPreset) => void;
  resetToDefaults: () => void;
  resetCategory: (category: SettingsCategory) => void;
  onDevModeChange?: (enabled: boolean) => void;
}

const DEV_PASSWORD = process.env.NEXT_PUBLIC_TD_DEV_PASSWORD ?? "";

function readDevModeFromStorage(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    return window.localStorage.getItem(DEV_MODE_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function writeDevModeToStorage(enabled: boolean): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    if (enabled) {
      window.localStorage.setItem(DEV_MODE_STORAGE_KEY, "1");
    } else {
      window.localStorage.removeItem(DEV_MODE_STORAGE_KEY);
    }
  } catch {
    /* noop */
  }
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  onClose,
  settings,
  updateCategory,
  applyPreset,
  resetToDefaults,
  resetCategory,
  onDevModeChange,
}) => {
  const [activeTab, setActiveTab] = useState<SettingsCategory>("graphics");
  const [showPresets, setShowPresets] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [devPassword, setDevPassword] = useState("");
  const [devUnlocked, setDevUnlocked] = useState(readDevModeFromStorage);
  const [devPasswordError, setDevPasswordError] = useState(false);

  const activeTabDef = TABS.find((t) => t.id === activeTab)!;
  const PanelComponent = activeTabDef.panel;

  const handlePreset = useCallback(
    (preset: QualityPreset) => {
      applyPreset(preset);
      setShowPresets(false);
    },
    [applyPreset]
  );

  const handleResetAll = useCallback(() => {
    if (confirmReset) {
      resetToDefaults();
      setConfirmReset(false);
    } else {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 3000);
    }
  }, [confirmReset, resetToDefaults]);

  const handleDevPasswordSubmit = useCallback(() => {
    if (DEV_PASSWORD !== "" && devPassword === DEV_PASSWORD) {
      setDevUnlocked(true);
      writeDevModeToStorage(true);
      setDevPassword("");
      setDevPasswordError(false);
      onDevModeChange?.(true);
    } else {
      setDevPasswordError(true);
      setTimeout(() => setDevPasswordError(false), 2000);
    }
  }, [devPassword, onDevModeChange]);

  const handleDevModeDisable = useCallback(() => {
    setDevUnlocked(false);
    writeDevModeToStorage(false);
    onDevModeChange?.(false);
  }, [onDevModeChange]);

  return (
    <BaseModal
      isOpen
      onClose={onClose}
      zClass="z-[1500]"
      backdropBg={OVERLAY.black60}
      usePortal
    >
      <div
        className="relative w-full max-w-4xl max-h-[90dvh] rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: panelGradient,
          border: `2px solid ${GOLD.border35}`,
          boxShadow: `0 0 40px ${GOLD.glow07}, inset 0 0 30px ${GOLD.glow04}`,
        }}
      >
        <OrnateFrame
          className="relative w-full h-full overflow-hidden flex flex-col"
          cornerSize={48}
          showSideBorders={false}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b"
            style={{
              borderColor: GOLD.border25,
            }}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <Monitor size={22} className="text-amber-400" />
              <h2 className="text-lg sm:text-xl font-bold text-amber-200 tracking-wide">
                Settings
              </h2>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Preset dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowPresets(!showPresets)}
                  className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    background: PANEL.bgDeep,
                    border: `1px solid ${GOLD.innerBorder12}`,
                    color: "rgba(253,230,138,0.8)",
                  }}
                >
                  <Zap size={14} />
                  <span className="hidden sm:inline">Presets</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${showPresets ? "rotate-180" : ""}`}
                  />
                </button>
                {showPresets && (
                  <div
                    className="absolute top-full right-0 mt-2 w-64 rounded-lg overflow-hidden z-50"
                    style={{
                      background: PANEL.bgDark,
                      border: `1px solid ${GOLD.border30}`,
                      boxShadow: `0 8px 32px rgba(0,0,0,0.5)`,
                    }}
                  >
                    {PRESET_BUTTONS.map((p) => (
                      <button
                        key={p.value}
                        onClick={() => handlePreset(p.value)}
                        className="w-full px-4 py-3 text-left transition-colors hover:bg-white/[0.04]"
                      >
                        <div className="text-sm font-semibold text-amber-200">
                          {p.label}
                        </div>
                        <div className="text-xs text-amber-200/40 mt-0.5">
                          {p.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Reset */}
              <button
                onClick={handleResetAll}
                className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                style={{
                  background: confirmReset
                    ? "rgba(180,60,60,0.3)"
                    : PANEL.bgDeep,
                  border: `1px solid ${confirmReset ? "rgba(180,60,60,0.5)" : GOLD.innerBorder12}`,
                  color: confirmReset
                    ? "rgba(255,150,150,0.9)"
                    : "rgba(253,230,138,0.6)",
                }}
              >
                <RotateCcw size={14} />
                <span className="hidden sm:inline">
                  {confirmReset ? "Confirm?" : "Reset All"}
                </span>
              </button>

              {/* Close */}
              <button
                onClick={onClose}
                className="p-2 rounded-lg transition-colors hover:bg-white/[0.06]"
                style={{ color: "rgba(253,230,138,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div
            className="flex flex-col md:flex-row flex-1 overflow-hidden min-h-0"
            style={{ background: PANEL.bgDark }}
          >
            {/* Mobile horizontal tabs */}
            <div
              className="md:hidden overflow-x-auto flex-shrink-0 border-b scrollbar-none"
              style={{
                background: PANEL.bgDeepSolid,
                borderColor: GOLD.innerBorder08,
              }}
            >
              <div className="flex">
                {TABS.map((tab) => {
                  const active = tab.id === activeTab;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium whitespace-nowrap transition-all flex-shrink-0"
                      style={{
                        background: active
                          ? "rgba(180,140,60,0.15)"
                          : "transparent",
                        borderBottom: active
                          ? "2px solid rgba(251,191,36,0.6)"
                          : "2px solid transparent",
                        color: active
                          ? "rgba(253,230,138,0.9)"
                          : "rgba(253,230,138,0.45)",
                      }}
                    >
                      <span
                        className={
                          active ? "text-amber-400" : "text-amber-600/50"
                        }
                      >
                        {tab.icon}
                      </span>
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Desktop sidebar tabs */}
            <div
              className="hidden md:block w-48 flex-shrink-0 overflow-y-auto border-r"
              style={{
                background: PANEL.bgDeepSolid,
                borderColor: GOLD.innerBorder08,
              }}
            >
              <div className="py-2 flex flex-col h-full">
                <div className="flex-1">
                  {TABS.map((tab) => {
                    const active = tab.id === activeTab;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all"
                        style={{
                          background: active
                            ? `linear-gradient(90deg, rgba(180,140,60,0.15), transparent)`
                            : "transparent",
                          borderRight: active
                            ? `2px solid rgba(251,191,36,0.6)`
                            : "2px solid transparent",
                          color: active
                            ? "rgba(253,230,138,0.9)"
                            : "rgba(253,230,138,0.45)",
                        }}
                      >
                        <span
                          className={
                            active ? "text-amber-400" : "text-amber-600/50"
                          }
                        >
                          {tab.icon}
                        </span>
                        <span className="text-sm font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Developer Mode - desktop sidebar */}
                <div
                  className="mt-auto px-3 pt-3 pb-4 border-t"
                  style={{ borderColor: GOLD.innerBorder08 }}
                >
                  <DevModeSection
                    devUnlocked={devUnlocked}
                    devPassword={devPassword}
                    devPasswordError={devPasswordError}
                    onDevPasswordChange={setDevPassword}
                    onDevPasswordSubmit={handleDevPasswordSubmit}
                    onDevModeDisable={handleDevModeDisable}
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto min-h-0">
              {/* Category header + reset */}
              <div
                className="sticky top-0 z-10 flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3 border-b"
                style={{
                  background: PANEL.bgDark,
                  borderColor: GOLD.innerBorder08,
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 hidden md:inline">
                    {activeTabDef.icon}
                  </span>
                  <h3 className="text-sm sm:text-base font-semibold text-amber-200">
                    {activeTabDef.label}
                  </h3>
                </div>
                <button
                  onClick={() => resetCategory(activeTab)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors hover:bg-white/[0.04]"
                  style={{ color: "rgba(253,230,138,0.4)" }}
                >
                  <RotateCcw size={12} />
                  Reset
                </button>
              </div>

              <div className="pb-6">
                <PanelComponent
                  settings={settings}
                  updateCategory={updateCategory}
                />
              </div>

              {/* Developer Mode - mobile bottom */}
              <div
                className="md:hidden mx-3 mb-4 px-3 pt-3 pb-4 rounded-lg border"
                style={{
                  background: PANEL.bgDeepSolid,
                  borderColor: GOLD.innerBorder08,
                }}
              >
                <DevModeSection
                  devUnlocked={devUnlocked}
                  devPassword={devPassword}
                  devPasswordError={devPasswordError}
                  onDevPasswordChange={setDevPassword}
                  onDevPasswordSubmit={handleDevPasswordSubmit}
                  onDevModeDisable={handleDevModeDisable}
                />
              </div>
            </div>
          </div>

          {/* Footer hint */}
          <div
            className="px-3 sm:px-6 py-2 sm:py-2.5 border-t"
            style={{
              background: PANEL.bgDeepSolid,
              borderColor: GOLD.innerBorder08,
            }}
          >
            <div
              className="text-center text-[11px] sm:text-xs"
              style={{ color: "rgba(253,230,138,0.3)" }}
            >
              All changes take effect immediately
            </div>
          </div>
        </OrnateFrame>
      </div>
    </BaseModal>
  );
};
