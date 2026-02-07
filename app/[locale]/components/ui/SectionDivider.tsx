/**
 * SectionDivider — gradient line that fades at edges
 * Matches the header bottom border style.
 * 
 * Usage: Place between sections in page.tsx
 * 
 * Props:
 * - color: line color (default: #E2E8F0 slate-200)
 * - maxWidth: container max-width (default: 1200px, matching site container)
 * - className: additional classes on the wrapper
 */
export function SectionDivider({
  color = '#E2E8F0',
  maxWidth = '1200px',
  className = '',
}: {
  color?: string
  maxWidth?: string
  className?: string
}) {
  return (
    <div
      className={`mx-auto px-6 md:px-10 ${className}`}
      style={{ maxWidth }}
      aria-hidden="true"
    >
      <div
        className="h-px w-full"
        style={{
          background: `linear-gradient(to right, transparent, ${color} 15%, ${color} 85%, transparent)`,
        }}
      />
    </div>
  )
}

export default SectionDivider
