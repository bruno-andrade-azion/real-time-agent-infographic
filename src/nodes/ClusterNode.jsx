import { useMemo } from 'react'
import Shell from './Shell'

/* Deterministic scatter — stable across renders and reloads. */
function scatter(count, w, h) {
  let seed = 1337
  const rnd = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }
  return Array.from({ length: count }, () => ({
    x: 26 + rnd() * (w - 52),
    y: 26 + rnd() * (h - 52),
    r: 2.4 + rnd() * 2.6,
  }))
}

const W = 560
const H = 300

export default function ClusterNode({ data }) {
  const dots = useMemo(() => scatter(38, W, H), [])
  const hub = { x: W / 2, y: H / 2 }

  return (
    <Shell accent="danger" className="p-(--spacing-md)">
      <div className="text-overline-xs text-(--ac)">{data.label}</div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-(--spacing-sm) block w-full"
        role="img"
        aria-label="Scattered request origins converging into a single attack"
      >
        <defs>
          <radialGradient id="clusterHub">
            <stop offset="0%" stopColor="var(--danger-contrast)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--danger-contrast)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {dots.map((d, i) => (
          <line
            key={`l${i}`}
            x1={d.x}
            y1={d.y}
            x2={hub.x}
            y2={hub.y}
            stroke="var(--danger-contrast)"
            strokeWidth="1"
            strokeOpacity="0.22"
            strokeDasharray="2 4"
          />
        ))}
        {dots.map((d, i) => (
          <circle key={`d${i}`} cx={d.x} cy={d.y} r={d.r} fill="var(--info-contrast)" fillOpacity="0.8" />
        ))}

        <circle cx={hub.x} cy={hub.y} r="70" fill="url(#clusterHub)" />
        <circle
          cx={hub.x}
          cy={hub.y}
          r="42"
          fill="none"
          stroke="var(--danger-contrast)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className="motion-safe:animate-flow-dash"
        />
        <text
          x={hub.x}
          y={hub.y + 4}
          textAnchor="middle"
          fill="var(--danger-contrast)"
          className="text-label-code-sm"
        >
          1 ATTACK
        </text>
      </svg>

      <div
        className="mt-(--spacing-sm) text-body-xs text-(--text-muted) [&_strong]:text-(--text-default)"
        dangerouslySetInnerHTML={{ __html: data.body }}
      />
    </Shell>
  )
}
