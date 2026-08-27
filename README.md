# Real-Time Threat Detection — presentation whiteboard

A React Flow board that illustrates the YouTube script *"Real-Time Threat Detection ·
Building a Distributed Security Agent with Azion"*. It is built to be **screen-captured**:
a dark, high-tech board that builds itself up step by step as you present, with the camera
flying to whatever you are talking about.

```bash
npm install
npm run dev
```

Open the app, press `F` to frame the board, and drive it with the arrow keys.

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
| `P` | toggle the presenter-PIP reservation box |
| `H` | hide all HUD chrome — **press this before you hit record** |

You can also click any row in the step index to jump straight to it.

The camera insets itself past whichever HUD panels are visible, so content never
ends up hidden behind the index or the PIP box. Toggling `H` reframes accordingly.

## How it is wired

- `src/data/board.js` — every node and edge, with its board coordinates. This is the map.
- `src/data/steps.js` — the choreography: which nodes/edges each script beat reveals
  (`add`), clears (`drop`), and frames (`focus`). Visibility is cumulative; `buildTimeline()`
  folds the steps into a visible-set per step.
- `src/Board.jsx` — applies the timeline to React Flow, drives the camera, owns the keymap.
- `src/nodes/`, `src/edges/` — the visual vocabulary.

To re-time the video, edit `steps.js` only. To move a box, edit `board.js` only.

### The legend is load-bearing

The script's whole point is separating what Azion ships from what you build. That is
encoded, not decorative:

| Role | Token | Means |
| --- | --- | --- |
| `ships` | `--success-*` | a real Azion product, available today |
| `build` | `--warning-*` | glue, pattern or design — you write this |
| `danger` | `--danger-*` | the problem, or the outage you almost caused |
| `brand` | `--primary` | the agent loop itself |
| `signal` | `--info-*` | data in flight |
| `neutral` | `--text-muted` | references and asides |

Set a node's `accent` (or `status: 'ships' | 'build'` on a card) and the border, ink,
pill and edge colour all follow.

## Design system

Styled against **`@aziontech/theme`** per
[`aziontech/webkit` DESIGN.md](https://github.com/aziontech/webkit/blob/main/.claude/docs/DESIGN.md):
Tailwind v4 CSS-first, semantic tokens only, no hex/rgb literals, no Tailwind palette
names, no hardcoded durations or curves.

- **Typography** — theme classes only (`text-heading-*`, `text-body-*`, `text-overline-*`,
  `text-label-code-*`, `text-big-number-*`). No local `font-family`, `leading-*` or `tracking-*`.
  Code blocks render one row per array entry and space them with `gap-(--spacing-xxs)`,
  because `text-label-code-*` is `leading-none` by design.
- **Spacing / radius / shadow** — `p-(--spacing-*)`, `rounded-(--shape-*)`, `shadow-(--shadow-*)`.
- **Colour** — semantic vars only. Glows are `color-mix()` over a token, never a literal.
- **Motion** — `duration-*` / `ease-*` theme utilities and `animate-flow-dash` for the
  marching edges (dash cycle `4 4`, which divides the keyframe's 24 travel so the loop
  has no seam). Everything motion-bearing has a `motion-reduce:` escape.

Two deliberate deviations, both noted in-file:

1. `DESIGN.md` documents `@import '@aziontech/theme/globals.css'`, but `@aziontech/theme@4.3.0`
   only publishes the `"."` export, so `src/styles/index.css` imports the package root.
2. `DESIGN.md` says keyframes live in the theme. The board needs one entrance keyframe
   (`boardNodeIn`) that the theme does not ship, so it is declared once in
   `src/styles/board.css` — the app's own layer, not a component — and timed entirely with
   `--transition-duration-*` / `--ease-*` tokens.

## Content accuracy

The ACT payloads are **read off the published spec**
(`https://api.azion.com/v4/openapi/openapi.yaml`, OpenAPI 3.0.0, `info.version: 4.0.0`,
fetched 2026-08-26), not invented. Verified:

| Board claim | Spec |
| --- | --- |
| `add_to_blocklist` | `POST /workspace/network_lists` · `NetworkListRequest {name, type, items[], active}`, required `name`/`type`/`items` |
| Blocklist by IP, CIDR, ASN, country | `NetworkListTypeEnum: asn \| countries \| ip_cidr`; items accept IPv4/IPv6/CIDR, ISO 3166-1 alpha-2, ASN digits, max 20,000, per-entry expiry `--LT<ISO8601>` |
| `set_rate_limit` | `POST /workspace/firewalls/{firewall_id}/request_rules` · `set_rate_limit.attributes {type, limit_by, average_rate_limit, maximum_burst_size}` |
| per second / per minute, client IP / global | `FirewallBehaviorSetRateLimitAttributesTypeEnum: second \| minute`; `LimitByEnum: client_ip \| global` |
| Rules Engine behaviors | `deny`, `drop`, `run_function`, `set_custom_response`, `set_rate_limit`, `set_waf` |
| `Authorization: Token <token>` | `TokenAuth` (apiKey, header) — `BearerAuth` JWT is the alternative |

### One correction to the script

The script says WAF flips between **"Learning and Blocking"** mode. The API v4 enum is
**`logging | blocking`** — there is no `learning` value. The board says `logging`.

Also worth knowing before you record: `mode` is **not a field on the WAF object**.
`WAFRequest` is `{name, active, product_version, engine_settings}`. The mode lives on the
firewall rule's `set_waf` behavior (`{waf_id, mode}`), and sensitivity is
`engine_settings.attributes.thresholds` on `/workspace/wafs/{waf_id}`.

### The detail worth pausing on

`FirewallCriterionFieldVariableEnum` has no ASN or country variable. You match those
through **`$(network)` + `is_in_list` + a Network List id** — which is exactly how
`add_to_blocklist` and `set_rate_limit` compose into one loop. The board draws that link
explicitly at 6:20.

### Still deliberately non-specific

- The AI Inference card says "open-weight model catalog" rather than naming models — the
  model list is not in this spec, so check the current catalog before naming them on camera.
- IDs (`firewall_id`, `waf_id`, `network_list_id`) are account-specific, and Personal Token
  scope for firewall mutation is not something the spec can confirm for your account.
  That is what honesty checkpoint 04 now says.
