import Shell from './Shell'

export default function PipelineNode({ data }) {
  return (
    <Shell
      accent="neutral"
      className="border-dashed px-(--spacing-sm) py-(--spacing-md) text-center"
      brackets={false}
      glow={false}
    >
      <div className="text-heading-xxs text-(--text-default)">{data.title}</div>
      {data.cost && <div className="mt-(--spacing-xxs) text-overline-xs text-(--danger-contrast)">{data.cost}</div>}
    </Shell>
  )
}
