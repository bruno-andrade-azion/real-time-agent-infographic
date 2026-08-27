/** The board legend, inline: ships today (success) vs you build this (warning). */
export default function Pill({ status }) {
  const ships = status === 'ships'
  return (
    <span
      className={[
        'shrink-0 whitespace-nowrap text-overline-xs',
        'rounded-(--shape-elements) border px-(--spacing-xxs) py-(--spacing-xxs)',
        ships
          ? 'border-(--success-border) bg-(--success) text-(--success-contrast)'
          : 'border-(--warning-border) bg-(--warning) text-(--warning-contrast)',
      ].join(' ')}
    >
      {ships ? 'ships today' : 'you build this'}
    </span>
  )
}
