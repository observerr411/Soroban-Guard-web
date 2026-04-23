import type { ContractScanRecord } from '@/types/stellar'

const KEY = 'sg_history'
const MAX = 50

export function getHistory(): ContractScanRecord[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    return JSON.parse(raw) as ContractScanRecord[]
  } catch {
    return []
  }
}

export function saveHistory(list: ContractScanRecord[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list))
  } catch {
    // ignore
  }
}

export function addRecord(rec: ContractScanRecord) {
  const list = getHistory()
  // newest first
  list.unshift(rec)
  if (list.length > MAX) list.splice(MAX)
  saveHistory(list)
}

export function clearHistory() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // ignore
  }
}

export function removeAt(index: number) {
  const list = getHistory()
  if (index < 0 || index >= list.length) return
  list.splice(index, 1)
  saveHistory(list)
}
