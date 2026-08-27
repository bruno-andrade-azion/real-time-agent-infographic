# Real-Time Threat Detection — an architecture board

An interactive architecture diagram built with [React Flow](https://reactflow.dev) and the
[Azion design system](https://github.com/aziontech/webkit). It walks through the design of a
distributed security agent — **perceive → reason → act**, wrapped in guardrails — one step at
a time, moving the camera to whatever is being explained.

The board is built for **live presentation and screen capture**: a dark, high-contrast canvas,
chrome that hides with a keystroke, and a camera that frames each step on its own.

```bash
pnpm install
pnpm dev
```

Press `F` to frame the whole board, then drive it with the arrow keys.

---

## Why this repo might be interesting

It is a small app, but it solves three problems that come up whenever you build a diagram that
has to *teach* something:

1. **Data-driven choreography.** The reveal order, the clearing, and the camera are all one
   declarative list — not imperative animation code. Re-sequencing the walkthrough means
   editing an array.
2. **Strict design-token discipline.** Every colour, space, radius, shadow, duration and type
   style comes from `@aziontech/theme`. There is not a single hex literal, Tailwind palette
   name, or hardcoded duration in `src/`.
3. **Content grounded in a real spec.** The API payloads on the board are read off Azion's
   published OpenAPI document rather than written from memory — including one place where the
   product UI and the API disagree on a term.

---

## Presenting

| Key | Action |
| --- | --- |
| `→` `↓` `space` `N` | next step |
| `←` `↑` `B` | previous step |
| `Home` / `End` | first / last step |
| `F` | fit the whole board |
| `R` | reframe the current step |
| `D` | toggle dimming of everything outside the current step |
| `I` | toggle the step index |
| `K` | toggle the key hints |
| `P` | toggle the picture-in-picture reservation box |
| `H` | hide all HUD chrome |

Click any row in the step index to jump straight to it.

The camera insets itself past whichever HUD panels are on screen, so content never ends up
hidden behind the index or the PIP box — and toggling `H` reframes accordingly.

---

## How it is wired

| File | Responsibility |
| --- | --- |
| `src/data/board.js` | Every node and edge with its canvas coordinates. The map. |
| `src/data/steps.js` | The choreography — see below. |
| `src/Board.jsx` | Applies the timeline to React Flow, drives the camera, owns the keymap. |
| `src/nodes/`, `src/edges/` | The visual vocabulary. |
| `src/styles/board.css` | Canvas chrome and the accent map. Token-driven, no literals. |

### The choreography model

Each step declares what it **adds**, what it **drops**, and what it **focuses**:

```js
{
  time: '5:20',
  tag: 'ACT',
  title: 'Three real levers',
  add: ['lbl-act', 'a-blocklist', 'a-ratelimit', 'a-waf'],
  edges: ['ac-bl', 'ac-rl', 'ac-wf'],
  focus: ['act', 'lbl-act', 'a-blocklist', 'a-ratelimit', 'a-waf'],
}
```

Visibility is **cumulative**: `buildTimeline()` folds the steps into a visible-set per index, so
jumping to step 12 renders exactly what a viewer who walked steps 0–12 would see. `drop` is what
lets an early sketch be wiped from the board once it has served its purpose.

`focus` does double duty — it is both the camera's fit target and the emphasis set. Anything
outside it dims to 14%, which keeps the frame on the point being made.

To re-sequence the walkthrough, edit `steps.js` only. To move a box, edit `board.js` only.

### The legend is load-bearing

The board's central claim is a distinction: which parts are shipping products and which parts you
have to build yourself. That is encoded in the data, not just drawn:

| Role | Token | Means |
| --- | --- | --- |
| `ships` | `--success-*` | a real product, available today |
| `build` | `--warning-*` | glue, pattern or design — you write this |
| `danger` | `--danger-*` | the problem, or the failure mode |
| `brand` | `--primary` | the agent loop itself |
| `signal` | `--info-*` | data in flight |
| `neutral` | `--text-muted` | references and asides |

Set a node's `accent` (or `status: 'ships' | 'build'` on a card) and its border, ink, pill and
edge colour all follow. Mislabelling something is a one-word change that is visible everywhere.

---

## Design system

Styled against **`@aziontech/theme`** following
[`aziontech/webkit` DESIGN.md](https://github.com/aziontech/webkit/blob/main/.claude/docs/DESIGN.md):
Tailwind v4 CSS-first, semantic tokens only, no hex/rgb literals, no Tailwind palette names, no
hardcoded durations or curves.

- **Typography** — theme classes only (`text-heading-*`, `text-body-*`, `text-overline-*`,
  `text-label-code-*`, `text-big-number-*`). No local `font-family`, `leading-*` or `tracking-*`.
- **Spacing / radius / shadow** — `p-(--spacing-*)`, `rounded-(--shape-*)`, `shadow-(--shadow-*)`.
- **Colour** — semantic vars only. Glows are `color-mix()` over a token, never a literal.
- **Motion** — `duration-*` / `ease-*` theme utilities, and `animate-flow-dash` for the marching
  edges. Everything motion-bearing carries a `motion-reduce:` escape.

Three details worth stealing:

1. **Dash cycles must divide the keyframe travel.** `animate-flow-dash` animates
   `stroke-dashoffset` from 24 to 0, so a `stroke-dasharray` whose cycle divides 24 (`4 4` = 8)
   loops seamlessly. A cycle that does not (`5 5` = 10) visibly jumps on every repeat.
2. **Code rows need `whitespace-pre-wrap`.** `text-label-code-*` is `leading-none` by design —
   made for one row per line — so rows are spaced with `gap-(--spacing-xxs)` rather than a
   line-height override. Without `whitespace-pre-wrap`, HTML collapses leading spaces and every
   JSON row renders flush-left.
3. **Never animate a React Flow node wrapper's `transform`.** That transform is how React Flow
   positions the node on the canvas; a keyframe that sets `transform` on it will park every node
   at the origin. Animate an inner element instead.

Two deliberate deviations from the spec, both noted in-file:

1. `DESIGN.md` documents `@import '@aziontech/theme/globals.css'`, but `@aziontech/theme@4.3.0`
   only publishes the `"."` export, so `src/styles/index.css` imports the package root.
2. `DESIGN.md` says keyframes live in the theme. The board needs one entrance keyframe
   (`boardNodeIn`) the theme does not ship, so it is declared once in `src/styles/board.css` —
   the app's own layer, not a component — and timed entirely from
   `--transition-duration-*` / `--ease-*` tokens.

---

## Grounding the content in the real API

The payloads shown in the ACT stage are read off the published spec
(`https://api.azion.com/v4/openapi/openapi.yaml`, OpenAPI 3.0.0, `info.version: 4.0.0`,
retrieved 2026-08-26) rather than written from memory.

| Board claim | Spec |
| --- | --- |
| `add_to_blocklist` | `POST /workspace/network_lists` · `NetworkListRequest {name, type, items[], active}`, required `name`/`type`/`items` |
| Blocklist by IP, CIDR, ASN, country | `NetworkListTypeEnum: asn \| countries \| ip_cidr`; items accept IPv4/IPv6/CIDR, ISO 3166-1 alpha-2, ASN digits, max 20,000, per-entry expiry `--LT<ISO8601>` |
| `set_rate_limit` | `POST /workspace/firewalls/{firewall_id}/request_rules` · `set_rate_limit.attributes {type, limit_by, average_rate_limit, maximum_burst_size}` |
| per second / per minute, client IP / global | `FirewallBehaviorSetRateLimitAttributesTypeEnum: second \| minute`; `LimitByEnum: client_ip \| global` |
| Rules Engine behaviors | `deny`, `drop`, `run_function`, `set_custom_response`, `set_rate_limit`, `set_waf` |
| `Authorization: Token <token>` | `TokenAuth` (apiKey, header) — `BearerAuth` JWT is the alternative |

### Where the UI and the API disagree

WAF mode is commonly described as flipping between **"Learning" and "Blocking"**. The API v4 enum
is **`logging | blocking`** — there is no `learning` value. The board uses the API's term.

`mode` is also **not a field on the WAF object**. `WAFRequest` is
`{name, active, product_version, engine_settings}`. The mode lives on the firewall rule's
`set_waf` behavior (`{waf_id, mode}`), and sensitivity is `engine_settings.attributes.thresholds`
on `/workspace/wafs/{waf_id}`.

### The composition the diagram exists to show

`FirewallCriterionFieldVariableEnum` has no ASN or country variable. You match those through
**`$(network)` + `is_in_list` + a Network List id** — which is precisely how `add_to_blocklist`
and `set_rate_limit` compose into a single loop: the list one tool writes becomes the criterion
the other matches on. The ACT stage draws that link explicitly.

### Deliberately non-specific

- The inference card says "open-weight model catalog" rather than naming models; the model list is
  not part of this spec.
- IDs (`firewall_id`, `waf_id`, `network_list_id`) are account-specific, and API token scope for
  firewall mutation cannot be confirmed from the spec.

---

## Deploying

The app is a static build (`pnpm build` → `dist/`) and ships to Azion via the CLI.
`.github/workflows/azion-deploy.yml` runs the deploy on manual dispatch and expects an
`AZION_PERSONAL_TOKEN` repository secret.

`azion/azion.json` holds generated deployment state — application, workload and rule IDs for the
account that deployed it. If you fork this, delete that file and let the CLI recreate it against
your own account.

---

## License

MIT — see [LICENSE](LICENSE).
