interface Props {
  onScanAnother: () => void
}

export default function EmptyState({ onScanAnother }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      {/* Green checkmark circle */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/30">
        <svg
          className="h-10 w-10 text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="mb-2 text-2xl font-bold text-emerald-400">
        No vulnerabilities found
      </h2>
      <p className="mb-8 max-w-sm text-slate-400">
        Your contract passed all security checks. Keep following best practices
        and re-scan after any significant changes.
      </p>

      <button
        onClick={onScanAnother}
        className="rounded-lg bg-[#1a1d27] px-5 py-2.5 text-sm font-medium text-slate-300 ring-1 ring-[#2a2d3a] transition hover:bg-[#22263a] hover:text-white"
      >
        ← Scan another contract
      </button>
    </div>
  )
}
