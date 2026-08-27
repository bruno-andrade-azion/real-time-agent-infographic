/* ============================================================
   BOARD GEOMETRY
   ------------------------------------------------------------
   left column   : perceive signal sources      x  -1380 .. -390
   centre ring   : perceive -> reason -> act    x   -160 .. 1740
   right column  : act levers (API v4)          x   1860 .. 3000
   lower band    : reason internals             x    300 .. 1230
   far left      : problem framing (cleared)    x  -3400 .. -1590

   Accents are semantic roles, not colours:
   brand · ships · build · danger · signal · neutral
   ============================================================ */

const KW = 'text-(--code-sintax-keyword)'
const STR = 'text-(--code-sintax-string)'
const CMT = 'text-(--code-sintax-comment)'
const FN = 'text-(--code-sintax-function)'
const TYP = 'text-(--code-sintax-type)'
const DNG = 'text-(--danger-contrast)'

export const nodes = [
  /* ---------------------------------------------------------- COLD OPEN */
  {
    id: 'hook',
    type: 'code',
    position: { x: 240, y: -1480 },
    style: { width: 1100 },
    data: {
      accent: 'danger',
      label: 'incident · unattended',
      lines: [
        `<span class="${CMT}">// nobody is awake for this</span>`,
        `<span class="${DNG}">03:00:00</span>  failed_logins   <span class="${TYP}">spiking</span>   asn=<span class="${FN}">12 distinct</span>   geo=<span class="${FN}">9 countries</span>`,
        `<span class="${DNG}">03:11:00</span>  status          <span class="${TYP}">still running</span>   <span class="${CMT}">// +11 min, no response</span>`,
        `<span class="${KW}">?</span> what if the thing watching your traffic could <span class="${STR}">reason about it</span> — and <span class="${STR}">act</span>`,
      ],
    },
  },
  {
    id: 'title',
    type: 'title',
    position: { x: 240, y: -1180 },
    style: { width: 1100 },
    data: {
      eyebrow: 'architecture deep-dive',
      title: 'Real-Time Threat Detection',
      tagline: 'Building a distributed security agent on Azion — a blueprint, not a button.',
    },
  },
  {
    id: 'legend',
    type: 'legend',
    position: { x: 1420, y: -1180 },
    style: { width: 440 },
    data: {},
  },

  /* ---------------------------------------------------------- PROBLEM FRAMING (cleared at 0:50) */
  {
    id: 'pf-label',
    type: 'label',
    position: { x: -3400, y: -740 },
    data: { text: 'the 3am reality', accent: 'danger' },
  },
  { id: 'pf-logs', type: 'pipeline', position: { x: -3400, y: -620 }, style: { width: 300 }, data: { title: 'Logs', cost: 'ship delay' } },
  { id: 'pf-warehouse', type: 'pipeline', position: { x: -3060, y: -620 }, style: { width: 300 }, data: { title: 'Warehouse', cost: 'ingest delay' } },
  { id: 'pf-query', type: 'pipeline', position: { x: -2720, y: -620 }, style: { width: 300 }, data: { title: 'Query', cost: 'analyst delay' } },
  { id: 'pf-page', type: 'pipeline', position: { x: -2380, y: -620 }, style: { width: 300 }, data: { title: 'Page a human', cost: 'human delay' } },
  {
    id: 'pf-clock',
    type: 'clock',
    position: { x: -1990, y: -680 },
    style: { width: 400 },
    data: {
      label: 'the attacker window',
      big: '+11 MIN',
      small: 'centralized analysis is too slow',
      body: 'By the time logs ship, get queried and page you, <strong>the attack already had its window.</strong>',
    },
  },
  {
    id: 'pf-pains',
    type: 'card',
    position: { x: -3400, y: -400 },
    style: { width: 640 },
    data: {
      accent: 'danger',
      kicker: 'why on-call security breaks',
      title: 'Three failures, every night',
      items: [
        "<b>Manual triage doesn't scale</b> — one tired human, thousands of events.",
        '<b>Static thresholds</b> either scream constantly or miss the slow stuff.',
        '<b>Centralized analysis is too slow</b> — the round trip is the vulnerability.',
      ],
    },
  },
  {
    id: 'pf-cluster',
    type: 'cluster',
    position: { x: -2700, y: -400 },
    style: { width: 620 },
    data: {
      label: 'credential stuffing · the textbook case',
      body:
        'Stolen passwords fired across <strong>hundreds of IPs and ASNs</strong>, tuned to look normal <strong>per request</strong>. ' +
        'The signal only exists when you <strong>correlate across requests</strong> — exactly what a human at 3am is worst at.',
    },
  },
  {
    id: 'pf-owasp',
    type: 'note',
    position: { x: -3400, y: 150 },
    style: { width: 1200 },
    data: {
      accent: 'neutral',
      label: 'reference',
      body:
        'OWASP: <strong>credential stuffing = automated injection of stolen credential pairs</strong> to fraudulently gain access to user accounts.',
    },
  },

  /* ---------------------------------------------------------- GUARDRAILS RING */
  {
    id: 'ring',
    type: 'ring',
    position: { x: -160, y: -160 },
    style: { width: 1900, height: 640 },
    zIndex: -1,
    selectable: false,
    draggable: false,
    className: 'nopointer',
    data: { title: 'GUARDRAILS', stamp: 'you design this' },
  },

  /* ---------------------------------------------------------- CORE LOOP */
  { id: 'perceive', type: 'stage', position: { x: 0, y: 0 }, style: { width: 340 }, data: { index: 'STAGE 01', title: 'PERCEIVE', sub: "the agent's senses" } },
  { id: 'reason', type: 'stage', position: { x: 620, y: 0 }, style: { width: 340 }, data: { index: 'STAGE 02', title: 'REASON', sub: 'the brain' } },
  { id: 'act', type: 'stage', position: { x: 1240, y: 0 }, style: { width: 340 }, data: { index: 'STAGE 03', title: 'ACT', sub: 'the hands' } },

  /* ---------------------------------------------------------- PERCEIVE INPUTS */
  { id: 'lbl-perceive', type: 'label', position: { x: -820, y: -850 }, data: { text: 'signal sources', accent: 'signal' } },
  {
    id: 'src-datastream',
    type: 'card',
    position: { x: -820, y: -770 },
    style: { width: 430 },
    data: {
      status: 'ships',
      kicker: 'push · streaming',
      title: 'Data Stream',
      desc: 'Raw event logs in real time — WAF Events plus HTTP telemetry.',
      items: [
        'Exactly the credential-stuffing fingerprint',
        'Failed-login codes, concentrated by ASN',
        'High request rate per client IP',
      ],
    },
  },
  {
    id: 'json-sample',
    type: 'code',
    position: { x: -1380, y: -770 },
    style: { width: 500 },
    data: {
      accent: 'ships',
      label: 'data stream · event shape',
      lines: [
        '{',
        `  <span class="${KW}">"$asn"</span>: <span class="${STR}">"AS####"</span>,`,
        `  <span class="${KW}">"$country"</span>: <span class="${STR}">"XX"</span>,`,
        `  <span class="${KW}">"$request_method"</span>: <span class="${STR}">"POST"</span>,`,
        `  <span class="${KW}">"$request_uri"</span>: <span class="${STR}">"/login"</span>,`,
        `  <span class="${KW}">"$status"</span>: <span class="${TYP}">401</span>,   <span class="${CMT}">// then 429</span>`,
        `  <span class="${KW}">"$remote_addr"</span>: <span class="${STR}">"..."</span>`,
        '}',
      ],
    },
  },
  {
    id: 'src-metrics',
    type: 'card',
    position: { x: -820, y: -495 },
    style: { width: 430 },
    data: {
      status: 'ships',
      kicker: 'pull · on demand',
      title: 'Real-Time Metrics · GraphQL API',
      desc: 'Your agent <b>queries</b> aggregated attack and bot data whenever it wants to look.',
      items: ['Aggregated windows, not per-request', 'Good for "is this still happening?"'],
    },
  },
  {
    id: 'src-bot',
    type: 'card',
    position: { x: -820, y: -260 },
    style: { width: 430 },
    data: {
      status: 'ships',
      kicker: 'pre-scored intent',
      title: 'Bot Manager',
      desc: 'Already scores intent, so the agent reasons <b>on top of</b> signals Azion produces.',
      items: ['Credential stuffing', 'Scraping', 'Account takeover'],
    },
  },
  {
    id: 'callout-latency',
    type: 'callout',
    position: { x: -820, y: -10 },
    style: { width: 430 },
    data: {
      label: 'honesty checkpoint 01',
      body:
        '<b>NEAR</b>-real-time, not instant.<br/><br/>Data Stream batches — it flushes on whichever comes first: ' +
        '<b>~2,000 records</b>, <b>60s</b>, or max payload. Metrics aggregate up to a <b>10-minute</b> window.<br/><br/>' +
        'So the agent reacts in <b>seconds-to-a-minute</b>, not sub-second per request. Design for that on purpose.',
    },
  },

  /* ---------------------------------------------------------- REASON INTERNALS */
  { id: 'lbl-reason', type: 'label', position: { x: 300, y: 560 }, data: { text: 'inside the brain', accent: 'brand' } },
  {
    id: 'r-inference',
    type: 'card',
    position: { x: 300, y: 630 },
    style: { width: 440 },
    data: {
      status: 'ships',
      kicker: 'called from a Function',
      title: 'Azion AI Inference',
      desc: 'Serverless inference for open models, <b>OpenAI-compatible</b> — existing tooling mostly just points at a different endpoint.',
      items: ['Open-weight model catalog', 'Same client libs, new base URL'],
    },
  },
  {
    id: 'r-tools',
    type: 'card',
    position: { x: 780, y: 630 },
    style: { width: 450 },
    data: {
      status: 'build',
      kicker: 'ReAct · tool definitions',
      title: 'The three tools you expose',
      items: [
        '<b>add_to_blocklist</b> — ip / cidr / asn / country',
        '<b>set_rate_limit</b> — rps or rpm, by client IP',
        '<b>set_waf_mode</b> — logging ⇄ blocking, sensitivity',
      ],
    },
  },
  {
    id: 'r-state',
    type: 'card',
    position: { x: 300, y: 900 },
    style: { width: 440 },
    data: {
      status: 'ships',
      kicker: 'memory between iterations',
      title: 'SQL Database · KV',
      desc: 'Where the agent keeps what it already saw, already did, and already escalated.',
    },
  },
  {
    id: 'r-trace',
    type: 'code',
    position: { x: 1270, y: 630 },
    style: { width: 460 },
    data: {
      accent: 'brand',
      label: 'react trace · illustrative',
      lines: [
        `<span class="${CMT}">OBSERVE</span>`,
        `  412 fails from <span class="${FN}">AS####</span> / 60s`,
        '  90% share one user-agent',
        `<span class="${CMT}">THOUGHT</span>`,
        '  rate + concentration + UA reuse',
        `  → likely <span class="${DNG}">credential stuffing</span>`,
        `<span class="${CMT}">ACTION</span>`,
        `  <span class="${KW}">set_rate_limit</span>(<span class="${STR}">"AS####"</span>, <span class="${TYP}">10</span>/min)`,
      ],
    },
  },
  {
    id: 'r-langgraph',
    type: 'card',
    position: { x: 780, y: 900 },
    style: { width: 450 },
    data: {
      status: 'ships',
      kicker: 'scaffolding',
      title: 'LangGraph boilerplate',
      desc: "Functions + SQL Database, wired together so you don't start from an empty file.",
    },
  },
  {
    id: 'callout-langgraph',
    type: 'callout',
    position: { x: 1270, y: 900 },
    style: { width: 460 },
    data: {
      label: 'honesty checkpoint 02',
      body:
        'That boilerplate is a <b>chatbot with RAG</b> template, and its defaults point at <b>external OpenAI models</b>.<br/><br/>' +
        'Easy to retarget at Azion AI Inference — the API is OpenAI-compatible — but it is not shipped pointing at Azion.',
    },
  },
  {
    id: 'callout-loop',
    type: 'callout',
    position: { x: 300, y: 1180 },
    style: { width: 1430 },
    data: {
      label: 'honesty checkpoint 03 · the most important line in this video',
      sigil: '★',
      body:
        'The loop itself — <b>polling signals, prompting the model, parsing the tool call, deciding</b> — is code <b>you</b> write, in Azion Functions.<br/><br/>' +
        'Azion gives you the inference endpoint and the scaffolding. <b>It does not give you the closed autonomous loop.</b> ' +
        'You are not buying an agent. You are designing one.',
    },
  },

  /* ---------------------------------------------------------- ACT LEVERS */
  { id: 'lbl-act', type: 'label', position: { x: 1860, y: -230 }, data: { text: 'azion api v4 · real levers', accent: 'ships' } },
  {
    id: 'a-blocklist',
    type: 'card',
    position: { x: 1860, y: -160 },
    style: { width: 470 },
    data: {
      status: 'ships',
      kicker: 'add_to_blocklist',
      kickerCode: true,
      title: 'Network Lists',
      desc: '<b>POST /workspace/network_lists</b> — so the tool call is a real mutation.',
      items: [
        '<b>type</b>: <code class="text-label-code-sm text-(--ac)">asn</code> · <code class="text-label-code-sm text-(--ac)">countries</code> · <code class="text-label-code-sm text-(--ac)">ip_cidr</code>',
        '<b>items</b>: up to 20,000, per-entry expiry via <code class="text-label-code-sm text-(--ac)">--LT&lt;ISO8601&gt;</code>',
        'Required: <code class="text-label-code-sm text-(--ac)">name</code>, <code class="text-label-code-sm text-(--ac)">type</code>, <code class="text-label-code-sm text-(--ac)">items</code>',
      ],
    },
  },
  {
    id: 'a-ratelimit',
    type: 'card',
    position: { x: 1860, y: 90 },
    style: { width: 470 },
    data: {
      status: 'ships',
      kicker: 'set_rate_limit',
      kickerCode: true,
      title: 'Rules Engine · Firewall',
      desc: '<b>POST /workspace/firewalls/{firewall_id}/request_rules</b>',
      items: [
        'Behaviors: <code class="text-label-code-sm text-(--ac)">deny</code> · <code class="text-label-code-sm text-(--ac)">drop</code> · <code class="text-label-code-sm text-(--ac)">set_rate_limit</code> · <code class="text-label-code-sm text-(--ac)">set_waf</code> · <code class="text-label-code-sm text-(--ac)">set_custom_response</code> · <code class="text-label-code-sm text-(--ac)">run_function</code>',
        '<b>type</b>: <code class="text-label-code-sm text-(--ac)">second</code> | <code class="text-label-code-sm text-(--ac)">minute</code> — <b>limit_by</b>: <code class="text-label-code-sm text-(--ac)">client_ip</code> | <code class="text-label-code-sm text-(--ac)">global</code>',
        '<b>average_rate_limit</b> + optional <b>maximum_burst_size</b>',
      ],
    },
  },
  {
    id: 'a-waf',
    type: 'card',
    position: { x: 1860, y: 380 },
    style: { width: 470 },
    data: {
      status: 'ships',
      kicker: 'set_waf_mode',
      kickerCode: true,
      title: 'WAF Rule Sets',
      desc: 'The mode lives on the <b>rule behavior</b>, not on the WAF object.',
      items: [
        '<code class="text-label-code-sm text-(--ac)">set_waf</code> attributes: <b>waf_id</b> + <b>mode</b>',
        '<b>mode</b>: <code class="text-label-code-sm text-(--ac)">logging</code> | <code class="text-label-code-sm text-(--ac)">blocking</code> — the API says <i>logging</i>, not "learning"',
        'Sensitivity = <code class="text-label-code-sm text-(--ac)">engine_settings.attributes.thresholds</code> on <b>/workspace/wafs/{waf_id}</b>',
      ],
    },
  },
  {
    id: 'a-apicall',
    type: 'code',
    position: { x: 1860, y: 640 },
    style: { width: 620 },
    data: {
      accent: 'ships',
      label: 'add_to_blocklist · verified against api v4',
      lines: [
        `<span class="${KW}">POST</span> https://api.azion.com/v4/workspace/network_lists`,
        `<span class="${KW}">Authorization:</span> Token <span class="${STR}">$AZION_TOKEN</span>`,
        '',
        '{',
        `  <span class="${KW}">"name"</span>: <span class="${STR}">"agent-blocklist-asn"</span>,`,
        `  <span class="${KW}">"type"</span>: <span class="${STR}">"asn"</span>,          <span class="${CMT}">// asn | countries | ip_cidr</span>`,
        `  <span class="${KW}">"items"</span>: [<span class="${STR}">"####"</span>, <span class="${STR}">"####"</span>],`,
        `  <span class="${KW}">"active"</span>: <span class="${TYP}">true</span>`,
        '}',
      ],
    },
  },
  {
    id: 'a-rulecall',
    type: 'code',
    position: { x: 2620, y: 640 },
    style: { width: 620 },
    data: {
      accent: 'ships',
      label: 'set_rate_limit · the list and the rule meet here',
      lines: [
        `<span class="${KW}">POST</span> .../v4/workspace/firewalls/<span class="${FN}">{firewall_id}</span>/request_rules`,
        '',
        '{',
        `  <span class="${KW}">"name"</span>: <span class="${STR}">"agent-throttle-cred-stuffing"</span>,`,
        `  <span class="${KW}">"criteria"</span>: [[{`,
        `    <span class="${KW}">"conditional"</span>: <span class="${STR}">"if"</span>,`,
        `    <span class="${KW}">"variable"</span>: <span class="${STR}">"$(network)"</span>,      <span class="${CMT}">// matches a Network List</span>`,
        `    <span class="${KW}">"operator"</span>: <span class="${STR}">"is_in_list"</span>,`,
        `    <span class="${KW}">"argument"</span>: <span class="${FN}">&lt;network_list_id&gt;</span>`,
        '  }]],',
        `  <span class="${KW}">"behaviors"</span>: [{`,
        `    <span class="${KW}">"type"</span>: <span class="${STR}">"set_rate_limit"</span>,`,
        `    <span class="${KW}">"attributes"</span>: {`,
        `      <span class="${KW}">"type"</span>: <span class="${STR}">"minute"</span>,`,
        `      <span class="${KW}">"limit_by"</span>: <span class="${STR}">"client_ip"</span>,`,
        `      <span class="${KW}">"average_rate_limit"</span>: <span class="${TYP}">10</span>`,
        '    }',
        '  }]',
        '}',
      ],
    },
  },
  {
    id: 'callout-schema',
    type: 'callout',
    position: { x: 1860, y: 1040 },
    style: { width: 620 },
    data: {
      label: 'honesty checkpoint 04',
      body:
        'These field names are <b>read off the published API v4 spec</b>, not invented — every enum above is a real value.<br/><br/>' +
        'What is still on you: the <b>IDs are account-specific</b>, and your Personal Token needs <b>scope to mutate firewall config</b>. ' +
        'A token that can read everything can not necessarily write this.',
    },
  },

  /* ---------------------------------------------------------- GUARDRAIL RULES */
  {
    id: 'gr-hitl',
    type: 'badge',
    position: { x: -60, y: 350 },
    style: { width: 400 },
    data: { no: 'RULE 01', title: 'Human-in-the-loop', desc: 'A temporary rate limit can auto-execute. A <b>broad block</b> routes to human approval.' },
  },
  {
    id: 'gr-stop',
    type: 'badge',
    position: { x: 380, y: 350 },
    style: { width: 400 },
    data: { no: 'RULE 02', title: 'Stopping conditions · max iterations', desc: 'The loop cannot spin forever. Every run has a ceiling and an exit.' },
  },
  {
    id: 'gr-limit',
    type: 'badge',
    position: { x: 820, y: 350 },
    style: { width: 400 },
    data: { no: 'RULE 03', title: 'Rate-limit the agent itself', desc: 'One bad inference must not be able to cascade into a hundred mutations.' },
  },
  {
    id: 'gr-audit',
    type: 'badge',
    position: { x: 1260, y: 350 },
    style: { width: 400 },
    data: { no: 'RULE 04', title: 'Audit + explainability', desc: 'Every action ships with the reasoning that produced it — the difference between an agent you trust and one you turn off.' },
  },
  {
    id: 'gr-activity',
    type: 'card',
    position: { x: 600, y: -430 },
    style: { width: 500 },
    data: {
      status: 'ships',
      kicker: 'the audit trail closes the loop',
      title: 'Activity History → Data Stream',
      desc: "Config changes flow back out as events — so the agent's own actions become auditable signal.",
    },
  },
  {
    id: 'gr-example',
    type: 'note',
    position: { x: 1180, y: -430 },
    style: { width: 560 },
    data: {
      accent: 'danger',
      label: 'the outage you almost caused',
      body:
        '<strong>✕ AUTO</strong>&nbsp; block AS#### — turns out to be a <strong>mobile carrier</strong>. You just took a country\'s phones offline.<br/><br/>' +
        '<strong>✓ GATED</strong>&nbsp; the approval gate catches it. An autonomous thing with a blocklist API and no brakes is a <strong>self-inflicted outage</strong>.',
    },
  },

  /* ---------------------------------------------------------- CLOSE */
  {
    id: 'cta',
    type: 'card',
    position: { x: 2620, y: 1040 },
    style: { width: 620 },
    data: {
      accent: 'brand',
      kicker: 'build one action path first',
      title: 'Your move',
      items: [
        'Docs for every product — links below',
        'Companion repo — clone it, run <b>node dryrun.js</b>',
        'Free account → wire <b>one</b> action: ASN → Network List, from a Function',
        'Comment: what would you let it do automatically — and what stays gated?',
      ],
    },
  },
]

/* ============================================================
   EDGES
   ============================================================ */

export const EDGE_COLOR = {
  brand: 'var(--primary)',
  ships: 'var(--success-contrast)',
  build: 'var(--warning-contrast)',
  danger: 'var(--danger-contrast)',
  signal: 'var(--info-contrast)',
  neutral: 'var(--text-muted)',
}

const e = (id, source, target, data, handles = {}) => ({
  id,
  source,
  target,
  type: data?.kind === 'loop' ? 'loop' : 'glow',
  sourceHandle: handles.s ?? 's-r',
  targetHandle: handles.t ?? 't-l',
  data,
  markerEnd: { type: 'arrowclosed', width: 16, height: 16, color: EDGE_COLOR[data?.color ?? 'signal'] },
})

export const edges = [
  /* problem framing pipeline */
  e('pf1', 'pf-logs', 'pf-warehouse', { color: 'neutral', animated: false }),
  e('pf2', 'pf-warehouse', 'pf-query', { color: 'neutral', animated: false }),
  e('pf3', 'pf-query', 'pf-page', { color: 'neutral', animated: false }),
  e('pf4', 'pf-page', 'pf-clock', { color: 'danger', label: 'too late' }),

  /* core loop */
  e('loop-pr', 'perceive', 'reason', { color: 'brand', label: 'signals' }),
  e('loop-ra', 'reason', 'act', { color: 'brand', label: 'tool call' }),
  e('loop-ap', 'act', 'perceive', { kind: 'loop', label: 'act changes traffic → new signals', drop: 130 }, { s: 's-b', t: 't-b' }),

  /* perceive inputs */
  e('in-ds', 'src-datastream', 'perceive', { color: 'ships' }),
  e('in-mt', 'src-metrics', 'perceive', { color: 'ships' }),
  e('in-bot', 'src-bot', 'perceive', { color: 'ships' }),
  e('in-json', 'src-datastream', 'json-sample', { color: 'ships', animated: false, label: 'per event' }, { s: 's-l', t: 't-r' }),
  e('in-lat', 'callout-latency', 'perceive', { color: 'build', label: 'design for this' }),

  /* reason internals */
  e('rz-inf', 'reason', 'r-inference', { color: 'brand' }, { s: 's-b', t: 't-t' }),
  e('rz-tools', 'reason', 'r-tools', { color: 'brand' }, { s: 's-b', t: 't-t' }),
  e('rz-trace', 'r-tools', 'r-trace', { color: 'brand', animated: false, label: 'emits' }),
  e('rz-state', 'r-inference', 'r-state', { color: 'ships', animated: false, label: 'state' }, { s: 's-b', t: 't-t' }),
  e('rz-lg', 'r-state', 'r-langgraph', { color: 'ships', animated: false }),
  e('rz-lgc', 'r-langgraph', 'callout-langgraph', { color: 'build', animated: false }),
  e('rz-loopc', 'r-state', 'callout-loop', { color: 'build', animated: false }, { s: 's-b', t: 't-t' }),

  /* act levers */
  e('ac-bl', 'act', 'a-blocklist', { color: 'ships', label: 'add_to_blocklist' }),
  e('ac-rl', 'act', 'a-ratelimit', { color: 'ships', label: 'set_rate_limit' }),
  e('ac-wf', 'act', 'a-waf', { color: 'ships', label: 'set_waf_mode' }),
  e('ac-api', 'a-waf', 'a-apicall', { color: 'ships', animated: false }, { s: 's-b', t: 't-t' }),
  e('ac-rule', 'a-apicall', 'a-rulecall', { color: 'ships', animated: false, label: 'list id' }),
  e('ac-sch', 'a-apicall', 'callout-schema', { color: 'build', animated: false }, { s: 's-b', t: 't-t' }),

  /* guardrails */
  e('gr-aud', 'gr-activity', 'src-datastream', { color: 'ships', label: 'auditable trail' }, { s: 's-l', t: 't-r' }),
  e('gr-aud2', 'gr-audit', 'gr-activity', { color: 'ships', animated: false }, { s: 's-t', t: 't-b' }),
  e('gr-ex', 'gr-hitl', 'gr-example', { color: 'danger', dashed: true }, { s: 's-t', t: 't-b' }),
]
