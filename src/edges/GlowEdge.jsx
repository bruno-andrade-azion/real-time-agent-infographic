import { BaseEdge, EdgeLabelRenderer, getBezierPath, getSmoothStepPath } from '@xyflow/react'
import { DASH, STROKE } from './colors'

export default function GlowEdge(props) {
  const {
    id, data = {}, markerEnd,
    sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition,
  } = props

  const ink = STROKE[data.color ?? 'signal']
  const build = data.shape === 'step' ? getSmoothStepPath : getBezierPath
  const [path, lx, ly] = build({
    sourceX, sourceY, targetX, targetY,
    sourcePosition, targetPosition,
    curvature: data.curvature ?? 0.3,
    borderRadius: 18,
  })

  return (
    <>
      <path
        d={path}
        fill="none"
        stroke={ink}
        strokeWidth={9}
        strokeOpacity={0.12}
        className="blur-xs"
      />
      <BaseEdge
        id={id}
        path={path}
        markerEnd={markerEnd}
        className={data.animated === false ? '' : 'motion-safe:animate-flow-dash'}
        style={{
          stroke: ink,
          strokeWidth: data.width ?? 2,
          strokeDasharray: data.dashed === false ? undefined : DASH,
        }}
      />
      {data.label && (
        <EdgeLabelRenderer>
          <div
            className="edge-label rounded-(--shape-elements) border px-(--spacing-xs) py-(--spacing-xxs) text-label-code-sm shadow-(--shadow-md)"
            style={{
              borderColor: ink,
              color: ink,
              transform: `translate(-50%, -50%) translate(${lx}px, ${ly}px)`,
            }}
          >
            {data.label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
}
