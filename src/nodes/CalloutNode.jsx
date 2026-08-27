import Shell from './Shell'

export default function CalloutNode({ data }) {
  return (
    <Shell accent={data.accent ?? 'build'} className="hatch p-(--spacing-md)">
      <div className="flex items-center gap-(--spacing-xs) text-overline-xs text-(--ac)">
        <span
          className="grid size-4 shrink-0 place-items-center rounded-(--shape-elements) border border-(--ac) text-label-code-sm"
          aria-hidden="true"
        >
          {data.sigil ?? '!'}
        </span>
        {data.label ?? 'honesty checkpoint'}
      </div>
      <div
        className="mt-(--spacing-xs) text-body-xs text-(--text-default) [&_b]:text-(--ac)"
        dangerouslySetInnerHTML={{ __html: data.body }}
      />
    </Shell>
  )
}
