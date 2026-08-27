import Shell from './Shell'

export default function ClockNode({ data }) {
  return (
    <Shell accent="danger" className="p-(--spacing-md)">
      <div className="text-overline-xs text-(--ac)">{data.label}</div>

      <div className="mt-(--spacing-sm) flex items-center gap-(--spacing-md)">
        <svg viewBox="0 0 66 66" className="size-16 shrink-0" aria-hidden="true">
          <circle cx="33" cy="33" r="29" fill="none" stroke="var(--danger-border)" strokeWidth="1.5" />
          <circle
            cx="33"
            cy="33"
            r="29"
            fill="none"
            stroke="var(--danger-contrast)"
            strokeWidth="3"
            strokeDasharray="182"
            strokeDashoffset="60"
            strokeLinecap="round"
            transform="rotate(-90 33 33)"
          />
          <line x1="33" y1="33" x2="33" y2="15" stroke="var(--danger-contrast)" strokeWidth="2" strokeLinecap="round" />
          <line x1="33" y1="33" x2="46" y2="39" stroke="var(--danger-contrast)" strokeWidth="2" strokeLinecap="round" />
        </svg>

        <div>
          <div className="text-big-number-md text-(--ac)">{data.big}</div>
          <div className="mt-(--spacing-xxs) text-body-xs text-(--text-muted)">{data.small}</div>
        </div>
      </div>

      {data.body && (
        <div
          className="mt-(--spacing-sm) text-body-xs text-(--text-muted) [&_strong]:text-(--text-default)"
          dangerouslySetInnerHTML={{ __html: data.body }}
        />
      )}
    </Shell>
  )
}
