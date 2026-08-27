import Shell from './Shell'

export default function NoteNode({ data }) {
  return (
    <Shell accent={data.accent ?? 'neutral'} className="p-(--spacing-md)">
      {data.label && <div className="text-overline-xs text-(--ac)">{data.label}</div>}
      <div
        className="mt-(--spacing-xs) text-body-xs text-(--text-muted) [&_strong]:text-(--text-default)"
        dangerouslySetInnerHTML={{ __html: data.body }}
      />
    </Shell>
  )
}
