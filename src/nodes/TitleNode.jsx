import Shell from './Shell'

const STAGES = ['PERCEIVE', 'REASON', 'ACT', 'GUARDRAILS']

export default function TitleNode({ data }) {
  return (
    <Shell accent="brand" className="px-(--spacing-xxl) py-(--spacing-xl)">
      <div className="flex items-center gap-(--spacing-sm)">
        <span className="text-overline-md text-(--ac)">{data.eyebrow}</span>
        <span className="h-px flex-1 bg-linear-to-r from-(--ac) to-transparent" aria-hidden="true" />
      </div>

      <h1 className="mt-(--spacing-md) text-heading-2xl text-(--text-default)">{data.title}</h1>
      <p className="mt-(--spacing-xs) text-body-md text-(--text-muted)">{data.tagline}</p>

      <div className="mt-(--spacing-lg) flex items-center gap-(--spacing-xs) border-t border-(--border-default) pt-(--spacing-md)">
        {STAGES.map((label, i) => (
          <span key={label} className="contents">
            {i > 0 && <span className="text-overline-sm text-(--text-disabled)">·</span>}
            <span className="text-overline-sm text-(--ac)">{label}</span>
          </span>
        ))}
      </div>
    </Shell>
  )
}
