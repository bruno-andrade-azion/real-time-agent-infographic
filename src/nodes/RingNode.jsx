export default function RingNode({ data }) {
  return (
    <div className="acc-build ring-surface relative size-full rounded-(--shape-card)">
      <div className="absolute -top-3 left-(--spacing-xl) flex items-center gap-(--spacing-xs) rounded-(--shape-elements) border border-(--ac-border) bg-(--bg-canvas) px-(--spacing-sm) py-(--spacing-xxs)">
        <span className="text-overline-sm text-(--ac)">{data.title}</span>
        <span className="rounded-(--shape-elements) bg-(--warning-contrast) px-(--spacing-xxs) text-overline-xs text-(--text-contrast)">
          {data.stamp}
        </span>
      </div>
    </div>
  )
}
