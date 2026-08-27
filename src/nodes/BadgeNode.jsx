import Shell from './Shell'

export default function BadgeNode({ data }) {
  return (
    <Shell accent={data.accent ?? 'build'} className="p-(--spacing-sm)">
      <div className="text-overline-xs text-(--ac)">{data.no}</div>
      <h4 className="mt-(--spacing-xxs) text-heading-xxs text-(--text-default)">{data.title}</h4>
      <p
        className="mt-(--spacing-xxs) text-body-xxs text-(--text-muted) [&_b]:text-(--ac)"
        dangerouslySetInnerHTML={{ __html: data.desc }}
      />
    </Shell>
  )
}
