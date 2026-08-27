import Shell from './Shell'

export default function StageNode({ data }) {
  return (
    <Shell accent="brand" className="px-(--spacing-xl) py-(--spacing-lg)">
      <div className="flex items-center gap-(--spacing-xs) text-overline-sm text-(--ac)">
        <span
          className="size-1.5 shrink-0 rounded-full bg-(--ac) motion-safe:animate-pulse motion-reduce:animate-none"
          aria-hidden="true"
        />
        {data.index}
      </div>
      <h2 className="mt-(--spacing-xs) text-heading-xl text-(--text-default)">{data.title}</h2>
      <p className="mt-(--spacing-xxs) text-body-sm text-(--text-muted)">{data.sub}</p>
    </Shell>
  )
}
