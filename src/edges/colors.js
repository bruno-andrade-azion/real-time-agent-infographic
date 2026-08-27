/** Semantic edge inks — token references only, never literals. */
export const STROKE = {
  brand: 'var(--primary)',
  ships: 'var(--success-contrast)',
  build: 'var(--warning-contrast)',
  danger: 'var(--danger-contrast)',
  signal: 'var(--info-contrast)',
  neutral: 'var(--text-muted)',
}

/* `animate-flow-dash` travels stroke-dashoffset 24 -> 0, so the dash cycle
   must divide 24 or the loop shows a seam on every repeat. 4+4 = 8. */
export const DASH = '4 4'
