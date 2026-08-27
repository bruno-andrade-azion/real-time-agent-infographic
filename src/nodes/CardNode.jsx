import Shell from './Shell'
import Pill from './Pill'

/** Product or concept card. data.status = 'ships' | 'build' | undefined */
export default function CardNode({ data }) {
  const accent = data.accent ?? (data.status === 'build' ? 'build' : 'ships')
  return (
    <Shell accent={accent} className="p-(--spacing-md)">
      {data.kicker && (
        <div className={`${data.kickerCode ? 'text-label-code-sm' : 'text-overline-xs'} text-(--ac)`}>
          {data.kicker}
        </div>
      )}

      <div className="mt-(--spacing-xxs) flex items-start justify-between gap-(--spacing-xs)">
        <h3 className="text-heading-xs text-(--text-default)">{data.title}</h3>
        {data.status && <Pill status={data.status} />}
      </div>

      {data.desc && (
        <p
          className="mt-(--spacing-xs) text-body-xs text-(--text-muted)"
          dangerouslySetInnerHTML={{ __html: data.desc }}
        />
      )}

      {data.items?.length > 0 && (
        <ul className="mt-(--spacing-xs) flex flex-col gap-(--spacing-xxs)">
          {data.items.map((it) => (
            <li key={it} className="flex items-start gap-(--spacing-xs) text-body-xs text-(--text-muted)">
              <span className="mt-1.5 size-1 shrink-0 bg-(--ac)" aria-hidden="true" />
              <span dangerouslySetInnerHTML={{ __html: it }} />
            </li>
          ))}
        </ul>
      )}
    </Shell>
  )
}
