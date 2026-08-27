import Shell from './Shell'

const ROWS = [
  {
    swatch: 'bg-(--success-contrast)',
    ink: 'text-(--success-contrast)',
    label: 'Ships today',
    sub: 'A real Azion product. Available now, API-manageable.',
  },
  {
    swatch: 'bg-(--warning-contrast)',
    ink: 'text-(--warning-contrast)',
    label: 'You build this',
    sub: 'Glue, pattern or design. No button ships it for you.',
  },
  {
    swatch: 'bg-(--danger-contrast)',
    ink: 'text-(--danger-contrast)',
    label: 'Honesty checkpoint',
    sub: 'A limit worth designing around, stated out loud.',
  },
]

export default function LegendNode() {
  return (
    <Shell accent="neutral" className="p-(--spacing-md)" glow={false}>
      <div className="text-overline-xs text-(--text-muted)">Board legend</div>
      <div className="mt-(--spacing-sm) flex flex-col gap-(--spacing-sm)">
        {ROWS.map((r) => (
          <div key={r.label} className="flex items-start gap-(--spacing-sm)">
            <span className={`mt-1 h-2 w-6 shrink-0 rounded-(--shape-elements) ${r.swatch}`} aria-hidden="true" />
            <div>
              <div className={`text-heading-xxs ${r.ink}`}>{r.label}</div>
              <div className="text-body-xxs text-(--text-muted)">{r.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  )
}
