import Shell from './Shell'

/**
 * Monospace block. `lines` is one array entry per rendered row — the
 * text-label-code-* set is leading-none, so rows are spaced with a gap
 * token rather than a line-height override.
 *
 * Rows need `whitespace-pre-wrap`: without it HTML collapses the leading
 * spaces and every JSON row renders flush-left. `pre-wrap` (not `pre`)
 * keeps long lines wrapping inside the node instead of overflowing it.
 */
export default function CodeNode({ data }) {
  return (
    <Shell accent={data.accent ?? 'neutral'} className="overflow-hidden" brackets={false} glow={false}>
      <div className="flex items-center gap-(--spacing-xs) border-b border-(--border-muted) bg-(--bg-surface-raised) px-(--spacing-sm) py-(--spacing-xs)">
        <span className="size-1.5 shrink-0 rounded-full bg-(--ac)" aria-hidden="true" />
        <span className="text-overline-xs text-(--text-muted)">{data.label}</span>
      </div>
      <div className="flex flex-col gap-(--spacing-xxs) p-(--spacing-sm)">
        {data.lines.map((line, i) => (
          <div
            key={i}
            className="text-label-code-sm whitespace-pre-wrap text-(--code-sintax-identifier)"
            dangerouslySetInnerHTML={{ __html: line || '&nbsp;' }}
          />
        ))}
      </div>
    </Shell>
  )
}
