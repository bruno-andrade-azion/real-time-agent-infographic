import { BaseEdge, EdgeLabelRenderer } from '@xyflow/react'
import { DASH, STROKE } from './colors'

/** The act -> perceive return arc: dives below the stages and sweeps back. */
export default function LoopEdge({ id, sourceX, sourceY, targetX, targetY, markerEnd, data = {} }) {
  const ink = STROKE.brand
  const drop = data.drop ?? 150
  const midY = Math.max(sourceY, targetY) + drop
  const path = `M ${sourceX},${sourceY} C ${sourceX},${midY} ${targetX},${midY} ${targetX},${targetY}`
  const lx = (sourceX + targetX) / 2
  const ly = midY - drop * 0.26

  return (
    <>
      <path d={path} fill="none" stroke={ink} strokeWidth={11} strokeOpacity={0.12} className="blur-sm" />
      <BaseEdge
        id={id}
        path={path}
        markerEnd={markerEnd}
        className="motion-safe:animate-flow-dash"
        style={{ stroke: ink, strokeWidth: 2.2, strokeDasharray: DASH }}
      />
      <EdgeLabelRenderer>
        <div
          className="edge-label rounded-(--shape-elements) border px-(--spacing-xs) py-(--spacing-xxs) text-label-code-sm shadow-(--shadow-md)"
          style={{
            borderColor: ink,
            color: ink,
            transform: `translate(-50%, -50%) translate(${lx}px, ${ly}px)`,
          }}
        >
          {data.label ?? 'act changes traffic → new signals'}
        </div>
      </EdgeLabelRenderer>
    </>
  )
}
