export default function SectionLabel({ data }) {
  return (
    <div className={`acc-${data.accent ?? 'neutral'} flex items-center gap-(--spacing-sm) whitespace-nowrap`}>
      <span className="text-overline-md text-(--ac)">{data.text}</span>
      <span
        className="h-px w-24 bg-linear-to-r from-(--ac) to-transparent"
        aria-hidden="true"
      />
    </div>
  )
}
