"use client";

import { useId, useState } from "react";
import { AUSTRIA_STATES, AUSTRIA_VIEWBOX, type AustriaState } from "./austriaStates";

export interface AustriaMapProps
  extends Omit<React.SVGProps<SVGSVGElement>, "onSelect"> {
  /** Border/stroke colour of every state. Default: currentColor. */
  lineColor?: string;
  /** Default fill for non-highlighted states. Default: transparent. */
  fill?: string;
  /** Fill on hover for non-highlighted states. Default: transparent (no visible hover). */
  hoverFill?: string;
  /** Per-state fill overrides for highlighted states. */
  stateFills?: Partial<Record<string, string>>;
  /** Fill used while a highlighted state is hovered/focused. */
  highlightedHoverFill?: string;
  /** How much a highlighted state grows on hover. 1 = no growth. Default: 1.04. */
  hoverScale?: number;
  /** Border thickness in viewBox units. Default: 1.2. */
  strokeWidth?: number;
  /** Called with the state id when a state is clicked. */
  onSelect?: (id: string, state: AustriaState) => void;
}

export default function AustriaMap({
  lineColor = "currentColor",
  fill = "transparent",
  hoverFill = "transparent",
  stateFills,
  highlightedHoverFill = "#b8cce8",
  hoverScale = 1.04,
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
        const isHighlighted = stateFills !== undefined && s.id in stateFills;
        const base = stateFills?.[s.id] ?? fill;

        let currentFill: string;
        if (isActive) {
          currentFill = isHighlighted ? highlightedHoverFill : hoverFill;
        } else {
          currentFill = base;
        }

        return (
          <path
            key={s.id}
            d={s.d}
            data-state={s.id}
            tabIndex={isHighlighted ? 0 : -1}
            aria-label={s.name}
            role={interactive ? "button" : "img"}
            onMouseEnter={() => setActive(s.id)}
            onMouseLeave={() => setActive((cur) => (cur === s.id ? null : cur))}
            onFocus={() => isHighlighted && setActive(s.id)}
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
            fill={currentFill}
            stroke={lineColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeLinecap="round"
            className="at-state"
            style={{
              transform: (isActive && isHighlighted) ? `scale(${hoverScale})` : "scale(1)",
              cursor: interactive ? "pointer" : (isHighlighted ? "default" : "default"),
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
