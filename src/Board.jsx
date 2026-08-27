import { useCallback, useEffect, useMemo, useState } from 'react'
import { Background, BackgroundVariant, ReactFlow, useReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { edges as allEdges, nodes as allNodes } from './data/board'
import { buildTimeline, steps } from './data/steps'

import StageNode from './nodes/StageNode'
import CardNode from './nodes/CardNode'
import CalloutNode from './nodes/CalloutNode'
import CodeNode from './nodes/CodeNode'
import BadgeNode from './nodes/BadgeNode'
import NoteNode from './nodes/NoteNode'
import PipelineNode from './nodes/PipelineNode'
import RingNode from './nodes/RingNode'
import TitleNode from './nodes/TitleNode'
import LegendNode from './nodes/LegendNode'
import ClusterNode from './nodes/ClusterNode'
import ClockNode from './nodes/ClockNode'
import SectionLabel from './nodes/SectionLabel'
import GlowEdge from './edges/GlowEdge'
import LoopEdge from './edges/LoopEdge'
import Hud from './hud/Hud'

const nodeTypes = {
  stage: StageNode,
  card: CardNode,
  callout: CalloutNode,
  code: CodeNode,
  badge: BadgeNode,
  note: NoteNode,
  pipeline: PipelineNode,
  ring: RingNode,
  title: TitleNode,
  legend: LegendNode,
  cluster: ClusterNode,
  clock: ClockNode,
  label: SectionLabel,
}

const edgeTypes = { glow: GlowEdge, loop: LoopEdge }

const TIMELINE = buildTimeline()

/* The HUD floats over the canvas, so the camera insets itself past whichever
   panels are currently on screen instead of centring under them. */
const HUD_INSET = {
  top: 120,
  right: 340, // step index panel
  bottom: 220, // presenter pip guide
  left: 330, // presenter pip guide
}
const EDGE_GUTTER = 48

function cameraPadding(show) {
  return {
    top: `${show.hud ? HUD_INSET.top : EDGE_GUTTER}px`,
    right: `${show.hud && show.index ? HUD_INSET.right : EDGE_GUTTER}px`,
    bottom: `${show.pip ? HUD_INSET.bottom : EDGE_GUTTER}px`,
    left: `${show.pip ? HUD_INSET.left : EDGE_GUTTER}px`,
  }
}

export default function Board() {
  const [index, setIndex] = useState(0)
  const [dimOthers, setDimOthers] = useState(true)
  const [show, setShow] = useState({ hud: true, index: true, keys: true, pip: false })
  const { fitView } = useReactFlow()

  const step = steps[index]
  const frame = TIMELINE[index]

  /* ---- which ids are on the board right now ---- */
  const visibleNodes = frame.nodes
  const visibleEdges = useMemo(() => {
    const byId = new Map(allEdges.map((e) => [e.id, e]))
    return new Set(
      [...frame.edges].filter((id) => {
        const e = byId.get(id)
        return e && visibleNodes.has(e.source) && visibleNodes.has(e.target)
      }),
    )
  }, [frame, visibleNodes])

  /* ---- focus set drives both camera and emphasis ---- */
  const focusSet = useMemo(
    () => (step.focus ? new Set(step.focus.filter((id) => visibleNodes.has(id))) : null),
    [step, visibleNodes],
  )

  /* ---- what this step reveals, derived rather than remembered ---- */
  const revealed = useMemo(() => {
    const before = index > 0 ? TIMELINE[index - 1].nodes : new Set()
    return new Set([...frame.nodes].filter((id) => !before.has(id)))
  }, [index, frame])

  /* ---- nodes appearing for the first time get the reveal animation ---- */
  const nodes = useMemo(() => {
    return allNodes.map((n) => {
      const visible = visibleNodes.has(n.id)
      const isNew = visible && revealed.has(n.id)
      const dim = dimOthers && focusSet && !focusSet.has(n.id)
      return {
        ...n,
        hidden: !visible,
        className: [n.className, isNew ? 'nd-in' : '', dim ? 'is-dim' : ''].filter(Boolean).join(' '),
      }
    })
  }, [visibleNodes, revealed, focusSet, dimOthers])

  const edges = useMemo(
    () =>
      allEdges.map((e) => {
        const dim =
          dimOthers && focusSet && !(focusSet.has(e.source) && focusSet.has(e.target))
        return {
          ...e,
          hidden: !visibleEdges.has(e.id),
          className: dim ? 'is-dim' : '',
        }
      }),
    [visibleEdges, focusSet, dimOthers],
  )

  /* ---- camera ---- */
  const frameCamera = useCallback(() => {
    const targets = step.focus?.filter((id) => visibleNodes.has(id)) ?? []
    const opts = {
      duration: 900,
      padding: cameraPadding(show),
      maxZoom: step.zoomOut ? 0.7 : 1.25,
    }
    if (targets.length) fitView({ ...opts, nodes: targets.map((id) => ({ id })) })
    else fitView(opts)
  }, [step, visibleNodes, fitView, show])

  useEffect(() => {
    const t = setTimeout(frameCamera, 120) // let freshly-shown nodes measure first
    return () => clearTimeout(t)
  }, [frameCamera])

  /* ---- controls ---- */
  const go = useCallback((delta) => {
    setIndex((i) => Math.min(steps.length - 1, Math.max(0, i + delta)))
  }, [])

  const toggle = useCallback((key) => setShow((s) => ({ ...s, [key]: !s[key] })), [])

  useEffect(() => {
    const onKey = (ev) => {
      if (ev.metaKey || ev.ctrlKey || ev.altKey) return
      // never steal keys from a text field
      const tag = ev.target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || ev.target?.isContentEditable) return

      switch (ev.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'Enter':
        case 'PageDown':
        case 'n':
        case 'N':
          ev.preventDefault()
          go(1)
          break
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
        case 'b':
        case 'B':
          ev.preventDefault()
          go(-1)
          break
        case 'Home':
          setIndex(0)
          break
        case 'End':
          setIndex(steps.length - 1)
          break
        case 'f':
        case 'F':
          fitView({ duration: 900, padding: cameraPadding(show), maxZoom: 1.25 })
          break
        case 'r':
        case 'R':
          frameCamera()
          break
        case 'd':
        case 'D':
          setDimOthers((v) => !v)
          break
        case 'i':
        case 'I':
          toggle('index')
          break
        case 'k':
        case 'K':
          toggle('keys')
          break
        case 'p':
        case 'P':
          toggle('pip')
          break
        case 'h':
        case 'H':
          toggle('hud')
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, fitView, frameCamera, toggle, show])

  return (
    <div className="board">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        minZoom={0.06}
        maxZoom={2.2}
        proOptions={{ hideAttribution: true }}
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable={false}
        panOnScroll
        selectionOnDrag={false}
        zoomOnDoubleClick={false}
        defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
      >
        <Background variant={BackgroundVariant.Dots} gap={34} size={1} color="var(--border-default)" />
        <Background
          id="grid-2"
          variant={BackgroundVariant.Lines}
          gap={170}
          lineWidth={1}
          color="var(--border-muted)"
        />
      </ReactFlow>

      <Hud
        step={step}
        index={index}
        total={steps.length}
        steps={steps}
        show={show}
        onJump={setIndex}
      />
    </div>
  )
}
