import { Handle, Position } from '@xyflow/react'

const SIDES = [
  ['t', Position.Top],
  ['r', Position.Right],
  ['b', Position.Bottom],
  ['l', Position.Left],
]

/**
 * Shared node chrome: accent scope, surface, corner brackets, handles.
 * accent: brand | ships | build | danger | signal | neutral
 */
export default function Shell({ accent = 'neutral', className = '', children, brackets = true, glow = true }) {
  return (
    <div
      className={[
        'nd acc-' + accent,
        glow ? 'nd-glow' : 'shadow-(--shadow-md)',
        'rounded-(--shape-card) border border-(--ac-border)',
        className,
      ].join(' ')}
    >
      {brackets && (
        <>
          <i className="cnr cnr-tl" />
          <i className="cnr cnr-tr" />
          <i className="cnr cnr-bl" />
          <i className="cnr cnr-br" />
        </>
      )}
      {children}
      {SIDES.map(([id, pos]) => (
        <div key={id}>
          <Handle type="target" position={pos} id={`t-${id}`} isConnectable={false} />
          <Handle type="source" position={pos} id={`s-${id}`} isConnectable={false} />
        </div>
      ))}
    </div>
  )
}
