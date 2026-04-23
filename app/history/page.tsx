'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getHistory, removeAt, clearHistory } from '@/lib/history'
import type { ContractScanRecord } from '@/types/stellar'

export default function HistoryPage() {
  const [records, setRecords] = useState<ContractScanRecord[]>([])
  const router = useRouter()

  useEffect(() => {
    setRecords(getHistory())
  }, [])

  function handleRerun(rec: ContractScanRecord) {
    const params = new URLSearchParams()
    if (rec.source) params.set('source', rec.source)
    if (rec.mode) params.set('mode', rec.mode)
    router.push('/?' + params.toString())
  }

  function handleRemove(i: number) {
    removeAt(i)
    setRecords(getHistory())
  }

  function handleClear() {
    clearHistory()
    setRecords([])
  }

  if (records.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 text-center">
        <h1 className="mb-4 text-2xl font-bold text-white">Scan History</h1>
        <p className="mb-6 text-sm text-slate-400">No past scans saved yet.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Scan History</h1>
        <div className="flex gap-2">
          <button onClick={handleClear} className="rounded-md border border-[#2a2d3a] px-3 py-1 text-sm text-slate-300">Clear</button>
        </div>
      </div>

      <div className="space-y-3">
        {records.map((r, i) => (
          <div key={i} className="rounded-lg border border-[#2a2d3a] bg-[#0f1117] p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-400">{new Date(r.scannedAt).toLocaleString()}</div>
                <div className="mt-1 text-lg font-semibold text-white">{r.findingCount} findings</div>
                <div className="mt-1 text-sm text-slate-400">High {r.highCount} · Medium {r.mediumCount} · Low {r.lowCount} · Info {r.infoCount ?? 0}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleRerun(r)} className="rounded-md bg-indigo-600 px-3 py-1 text-sm text-white">Re-run</button>
                <button onClick={() => handleRemove(i)} className="rounded-md border border-[#2a2d3a] px-2 py-1 text-sm text-slate-300">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
