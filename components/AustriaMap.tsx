"use client";

import { useId, useState } from "react";
import { AUSTRIA_STATES, AUSTRIA_VIEWBOX, type AustriaState } from "./austriaStates";

export interface AustriaMapProps
  extends Omit<React.SVGProps<SVGSVGElement>, "onSelect"> {
  /** Border/stroke colour of every state. Default: currentColor. */
  lineColor?: string;
  /** Default fill for states. Default: transparent. */
  fill?: string;
  /** Fill used while a state is hovered/focused. Default: #fdf8f0. */
  hoverFill?: string;
  /** Per-state fill overrides, keyed by state id (e.g. { wien: "#1D9E75" }). */
  stateFills?: Partial<Record<string, string>>;
  /** How much a state grows on hover. 1 = no growth. Default: 1.06. */
  hoverScale?: number;
  /** Border thickness in viewBox units. Default: 1.2. */
  strokeWidth?: number;
  /** Called with the state id when a state is clicked. */
  onSelect?: (id: string, state: AustriaState) => void;
}

/**
 * Interactive outline map of Austria's nine federal states.
 * Each state is an individually addressable, keyboard-focusable path that
 * gently scales up on hover/focus (from its own centre).
 *
 * Data: official Statistik Austria boundaries (2021), Mercator-projected.
 *
 * @example
 * <AustriaMap className="w-full max-w-xl" lineColor="#185FA5" />
 * <AustriaMap stateFills={{ oberoesterreich: "#fdf8f0", wien: "#1D9E75" }} />
 */
export default function AustriaMap({
  lineColor = "currentColor",
  fill = "transparent",
  hoverFill = "#fdf8f0",
  stateFills,
  hoverScale = 1.06,
  strokeWidth = 1.2,
  onSelect,
  ...svgProps
}: AustriaMapProps) {
  const [active, setActive] = useState<string | null>(null);
  const titleId = useId();
  const interactive = Boolean(onSelect);

  return (
    <svg
      viewBox={AUSTRIA_VIEWBOX}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby={titleId}
      {...svgProps}
    >
      <title id={titleId}>Karte von Österreich mit den neun Bundesländern</title>

      {AUSTRIA_STATES.map((s) => {
        const isActive = active === s.id;
        const base = stateFills?.[s.id] ?? fill;
        return (
          <path
            key={s.id}
            d={s.d}
            data-state={s.id}
            tabIndex={0}
            aria-label={s.name}
            role={interactive ? "button" : "img"}
            onMouseEnter={() => setActive(s.id)}
            onMouseLeave={() => setActive((cur) => (cur === s.id ? null : cur))}
            onFocus={() => setActive(s.id)}
            onBlur={() => setActive((cur) => (cur === s.id ? null : cur))}
            onClick={interactive ? () => onSelect?.(s.id, s) : undefined}
            onKeyDown={
              interactive
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect?.(s.id, s);
                    }
                  }
                : undefined
            }
            fill={isActive ? hoverFill : base}
            stroke={lineColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeLinecap="round"
            className="at-state"
            style={{
              transform: isActive ? `scale(${hoverScale})` : "scale(1)",
              cursor: interactive ? "pointer" : "default",
            }}
          />
        );
      })}

      <style>{`
        .at-state {
          transform-box: fill-box;
          transform-origin: center;
          transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1),
                      fill 200ms ease;
          outline: none;
        }
        .at-state:focus-visible {
          stroke-width: ${strokeWidth * 1.8};
        }
        @media (prefers-reduced-motion: reduce) {
          .at-state { transition: fill 200ms ease; transform: none !important; }
        }
      `}</style>
    </svg>
  );
}
