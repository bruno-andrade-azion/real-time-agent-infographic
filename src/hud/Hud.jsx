const TAG_INK = {
  HOOK: 'text-(--danger-contrast)',
  SETUP: 'text-(--primary)',
  PROBLEM: 'text-(--danger-contrast)',
  SOLUTION: 'text-(--primary)',
  PERCEIVE: 'text-(--info-contrast)',
  REASON: 'text-(--primary)',
  ACT: 'text-(--success-contrast)',
  GUARDRAILS: 'text-(--warning-contrast)',
  RECAP: 'text-(--primary)',
  CLOSE: 'text-(--success-contrast)',
}

const KEYS = [
  ['→ / space / N', 'next'],
  ['← / B', 'back'],
  ['F', 'fit all'],
  ['R', 'reframe'],
  ['I', 'index'],
  ['P', 'pip'],
  ['D', 'dim'],
  ['H', 'hide hud'],
]

const PANEL =
  'rounded-(--shape-card) border border-(--border-default) bg-(--bg-surface)/90 shadow-(--shadow-xl) backdrop-blur-md'

const fade = (on) =>
  `transition-opacity duration-moderate-02 ease-productive-entrance motion-reduce:transition-none ${
    on ? 'opacity-100' : 'pointer-events-none opacity-0'
  }`

export default function Hud({ step, index, total, steps, show, onJump }) {
  const pct = total > 1 ? (index / (total - 1)) * 100 : 0

  return (
    <>
      {/* progress rail */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 bg-(--border-default)">
        <div
          className="h-full bg-(--primary) transition-[width] duration-slow-01 ease-expressive-entrance motion-reduce:transition-none"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* current step */}
      <div
        className={`pointer-events-none fixed top-(--spacing-lg) left-(--spacing-lg) z-50 flex items-stretch overflow-hidden ${PANEL} ${fade(show.hud)}`}
      >
        <div className="grid place-items-center border-r border-(--border-default) bg-(--primary-mask) px-(--spacing-sm) text-big-number-sm text-(--primary)">
          {step.time}
        </div>
        <div className="px-(--spacing-md) py-(--spacing-xs)">
          <div className={`text-overline-xs ${TAG_INK[step.tag] ?? 'text-(--text-muted)'}`}>{step.tag}</div>
          <div className="mt-(--spacing-xxs) text-heading-xxs text-(--text-default)">{step.title}</div>
        </div>
        <div className="grid place-items-center border-l border-(--border-default) px-(--spacing-sm) text-label-code-sm text-(--text-muted)">
          {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
        </div>
      </div>

      {/* step index */}
      <div
        className={`thin-scroll fixed top-(--spacing-lg) right-(--spacing-lg) z-50 max-h-[calc(100vh-8rem)] w-(--container-2xs) overflow-auto p-(--spacing-xs) ${PANEL} ${fade(
          show.hud && show.index,
        )}`}
      >
        {steps.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={(ev) => {
              // drop focus, or space/enter would re-fire this row instead of advancing
              ev.currentTarget.blur()
              onJump(i)
            }}
            className={[
              'flex w-full items-center gap-(--spacing-xs) rounded-(--shape-elements) px-(--spacing-xs) py-(--spacing-xxs) text-left',
              'transition-colors duration-fast-02 ease-productive-entrance motion-reduce:transition-none',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring-color)',
              i === index
                ? 'bg-(--primary-mask) text-(--text-default)'
                : 'text-(--text-muted) hover:bg-(--bg-hover)',
            ].join(' ')}
          >
            <span className="truncate text-body-xxs">{s.title}</span>
          </button>
        ))}
      </div>

      {/* bottom bar: pip guide (left) · key hints (right) */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex items-end justify-between gap-(--spacing-lg) p-(--spacing-lg)">
        <div
          className={`grid h-44 w-72 shrink-0 place-items-center rounded-(--shape-card) border border-dashed border-(--border-default) text-overline-xs text-(--text-disabled) ${fade(
            show.pip,
          )}`}
        >
          presenter pip
        </div>

        <div
          className={`flex w-56 shrink-0 flex-wrap justify-end gap-(--spacing-xxs) ${fade(
            show.hud && show.keys,
          )}`}
        >
          {KEYS.map(([k, label]) => (
            <span
              key={k}
              className="flex items-center gap-(--spacing-xxs) rounded-(--shape-elements) border border-(--border-default) bg-(--bg-surface)/80 px-(--spacing-xs) py-(--spacing-xxs) backdrop-blur-sm"
            >
              <b className="text-label-code-sm text-(--primary)">{k}</b>
              <span className="text-body-xxs text-(--text-muted)">{label}</span>
            </span>
          ))}
        </div>
      </div>

    </>
  )
}
