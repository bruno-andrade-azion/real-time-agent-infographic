/* ============================================================
   STEP CHOREOGRAPHY
   ------------------------------------------------------------
   add    : node ids revealed at this step (cumulative)
   drop   : node ids cleared from the board at this step
   edges  : edge ids revealed at this step (cumulative)
   focus  : what the camera frames + what stays at full opacity
   ============================================================ */

export const steps = [
  {
    time: '0:00',
    tag: 'HOOK',
    title: '3AM Log',
    add: ['hook'],
    focus: ['hook'],
    zoomOut: 0.15,
  },
  {
    time: '0:05',
    tag: 'HOOK',
    title: 'Title card',
    add: ['title'],
    focus: ['hook', 'title'],
  },
  {
    time: '0:08',
    tag: 'SETUP',
    title: 'The marker legend',
    add: ['legend'],
    focus: ['title', 'legend'],
  },
  {
    time: '0:22',
    tag: 'PROBLEM',
    title: 'The slow pipeline',
    add: ['pf-label', 'pf-logs', 'pf-warehouse', 'pf-query', 'pf-page', 'pf-clock', 'pf-pains'],
    edges: ['pf1', 'pf2', 'pf3', 'pf4'],
    focus: ['pf-label', 'pf-logs', 'pf-warehouse', 'pf-query', 'pf-page', 'pf-clock', 'pf-pains'],
  },
  {
    time: '0:38',
    tag: 'PROBLEM',
    title: 'Correlate across requests',
    add: ['pf-cluster', 'pf-owasp'],
    focus: ['pf-cluster', 'pf-pains', 'pf-owasp'],
  },
  {
    time: '0:50',
    tag: 'SOLUTION',
    title: 'Perceive → reason → act',
    drop: [
      'hook',
      'pf-label', 'pf-logs', 'pf-warehouse', 'pf-query', 'pf-page',
      'pf-clock', 'pf-pains', 'pf-cluster', 'pf-owasp',
    ],
    add: ['ring', 'perceive', 'reason', 'act'],
    edges: ['loop-pr', 'loop-ra'],
    focus: ['ring', 'perceive', 'reason', 'act'],
  },
  {
    time: '1:20',
    tag: 'PERCEIVE',
    title: 'Two real signal sources',
    add: ['lbl-perceive', 'src-datastream', 'json-sample', 'src-metrics', 'src-bot'],
    edges: ['in-ds', 'in-mt', 'in-bot', 'in-json'],
    focus: ['lbl-perceive', 'src-datastream', 'json-sample', 'src-metrics', 'src-bot', 'perceive'],
  },
  {
    time: '2:30',
    tag: 'PERCEIVE',
    title: 'Honesty: near-real-time',
    add: ['callout-latency'],
    edges: ['in-lat'],
    focus: ['callout-latency', 'src-datastream', 'src-metrics', 'perceive'],
  },
  {
    time: '3:10',
    tag: 'REASON',
    title: 'AI Inference + tool defs',
    add: ['lbl-reason', 'r-inference', 'r-tools'],
    edges: ['rz-inf', 'rz-tools'],
    focus: ['reason', 'lbl-reason', 'r-inference', 'r-tools'],
  },
  {
    time: '4:00',
    tag: 'REASON',
    title: 'The trace and the state',
    add: ['r-state', 'r-trace', 'r-langgraph', 'callout-langgraph'],
    edges: ['rz-state', 'rz-trace', 'rz-lg', 'rz-lgc'],
    focus: ['r-trace', 'r-state', 'r-langgraph', 'callout-langgraph'],
  },
  {
    time: '4:50',
    tag: 'REASON',
    title: 'You build the loop',
    add: ['callout-loop'],
    edges: ['rz-loopc'],
    focus: ['callout-loop', 'reason'],
  },
  {
    time: '5:20',
    tag: 'ACT',
    title: 'Three real levers',
    add: ['lbl-act', 'a-blocklist', 'a-ratelimit', 'a-waf'],
    edges: ['ac-bl', 'ac-rl', 'ac-wf'],
    focus: ['act', 'lbl-act', 'a-blocklist', 'a-ratelimit', 'a-waf'],
  },
  {
    time: '6:20',
    tag: 'ACT',
    title: 'The actual call',
    add: ['a-apicall', 'a-rulecall'],
    edges: ['ac-api', 'ac-rule'],
    focus: ['a-apicall', 'a-rulecall', 'a-waf'],
  },
  {
    time: '6:40',
    tag: 'ACT',
    title: 'Honesty: scope, not schema',
    add: ['callout-schema'],
    edges: ['ac-sch'],
    focus: ['callout-schema', 'a-apicall'],
  },
  {
    time: '6:50',
    tag: 'ACT',
    title: 'The loop closes',
    edges: ['loop-ap'],
    focus: ['perceive', 'reason', 'act', 'ring'],
  },
  {
    time: '7:00',
    tag: 'GUARDRAILS',
    title: 'Four rules',
    add: ['gr-hitl', 'gr-stop', 'gr-limit', 'gr-audit'],
    focus: ['ring', 'perceive', 'reason', 'act', 'gr-hitl', 'gr-stop', 'gr-limit', 'gr-audit'],
  },
  {
    time: '7:40',
    tag: 'GUARDRAILS',
    title: 'The gate and the trail',
    add: ['gr-example', 'gr-activity'],
    edges: ['gr-ex', 'gr-aud', 'gr-aud2'],
    focus: ['ring', 'perceive', 'reason', 'act', 'gr-example', 'gr-activity', 'gr-hitl', 'gr-audit'],
  },
  {
    time: '10:50',
    tag: 'RECAP',
    title: 'The finished board',
    focus: null, // fit everything
  },
  {
    time: '11:30',
    tag: 'CLOSE',
    title: 'You are not buying an agent',
    add: ['cta'],
    focus: ['cta', 'callout-loop'],
  },
]

/** Cumulative visible node/edge id sets for every step index. */
export function buildTimeline() {
  const out = []
  let nodeSet = new Set()
  let edgeSet = new Set()
  for (const step of steps) {
    nodeSet = new Set(nodeSet)
    edgeSet = new Set(edgeSet)
    step.add?.forEach((id) => nodeSet.add(id))
    step.edges?.forEach((id) => edgeSet.add(id))
    step.drop?.forEach((id) => nodeSet.delete(id))
    out.push({ nodes: nodeSet, edges: edgeSet })
  }
  return out
}
