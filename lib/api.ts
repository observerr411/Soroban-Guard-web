import type { ScanRequest, ScanResponse } from '@/types/findings'

const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001').replace(/\/$/, '')

export class ApiError extends Error {
  public retryAfter?: number

  constructor(
    public status: number,
    message: string,
    retryAfter?: number,
  ) {
    super(message)
    this.name = 'ApiError'
    this.retryAfter = retryAfter
  }
}

export async function scanContract(source: string): Promise<ScanResponse> {
  const body: ScanRequest = { source }

  const res = await fetch(`${API_BASE}/scan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    if (res.status === 429) {
      const retryAfterHeader = res.headers.get('Retry-After')
      const retryAfter = retryAfterHeader ? Math.ceil(parseFloat(retryAfterHeader)) : 60
      throw new ApiError(429, 'Rate limited', retryAfter)
    }
    const text = await res.text().catch(() => 'Unknown error')
    throw new ApiError(res.status, text || `HTTP ${res.status}`)
  }

  return res.json() as Promise<ScanResponse>
}
