import type { Metadata } from 'next'
import type { Finding, Severity } from '@/types/findings'
import { decodeFindings } from '@/lib/share'
import ResultsClient from './ResultsClient'

interface Props {
  searchParams: { r?: string }
}

export function generateMetadata({ searchParams }: Props): Metadata {
  const r = searchParams.r
  if (!r) {
    return {
      title: 'Soroban Guard — Scan Results',
      openGraph: { title: 'Soroban Guard — Scan Results' },
      twitter: { card: 'summary' },
    }
  }

  const findings = decodeFindings(r)
  if (findings.length === 0) {
    return {
      title: 'Soroban Guard — Scan Results',
      openGraph: { title: 'Soroban Guard — Scan Results' },
      twitter: { card: 'summary' },
    }
  }

  const counts: Record<Severity, number> = { High: 0, Medium: 0, Low: 0 }
  for (const f of findings) counts[f.severity]++

  const title = `Soroban Guard — ${findings.length} finding${findings.length !== 1 ? 's' : ''} detected`
  const description = `High: ${counts.High} · Medium: ${counts.Medium} · Low: ${counts.Low}`

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: 'summary', title, description },
  }
}

export default function ResultsPage({ searchParams }: Props) {
  return <ResultsClient />
}
