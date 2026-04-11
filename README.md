# Soroban Guard Web

The frontend dashboard for **Soroban Guard** — an automated security scanner for [Soroban](https://soroban.stellar.org/) smart contracts.

Built with Next.js 14, TypeScript, and Tailwind CSS. Part of the [Veritas Vaults Network](https://github.com/Veritas-Vaults-Network) ecosystem.

## Features

- Paste contract source code or provide a GitHub repo URL
- Real-time scan via the Soroban Guard Core REST API
- Findings table with severity badges (High / Medium / Low)
- Expandable rows with full finding detail
- Summary bar with per-severity counts
- Empty state for clean contracts
- Dark mode by default, fully responsive

## Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Framework  | Next.js 14 (App Router) |
| Language   | TypeScript              |
| Styling    | Tailwind CSS            |
| API        | Axum REST (soroban-guard-core) |

## Getting Started

```bash
# Install dependencies
npm install

# Set the API URL (defaults to http://localhost:3001)
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable               | Default                  | Description                        |
|------------------------|--------------------------|------------------------------------|
| `NEXT_PUBLIC_API_URL`  | `http://localhost:3001`  | Base URL for soroban-guard-core    |

## API Contract

The app calls `POST /scan` on the core API:

**Request**
```json
{ "source": "<contract source code or github url>" }
```

**Response**
```json
{
  "findings": [
    {
      "check_name": "unchecked-auth",
      "severity": "High",
      "file_path": "src/lib.rs",
      "line": 42,
      "function_name": "transfer",
      "description": "Authorization is not verified before executing privileged operation."
    }
  ]
}
```

## Project Structure

```
app/
  page.tsx          # Landing page with scan input
  results/
    page.tsx        # Results page with findings table
  layout.tsx        # Root layout + metadata
components/
  ScanInput.tsx     # Code textarea + GitHub URL input + scan button
  FindingsTable.tsx # Sortable findings table with expandable rows
  FindingCard.tsx   # Expanded finding detail card
  SeverityBadge.tsx # Colored severity pill (High/Medium/Low)
  EmptyState.tsx    # Clean contract illustration
lib/
  api.ts            # fetch wrapper for the core API
types/
  findings.ts       # Finding type matching core Rust struct
```

## Sister Repos

- [soroban-guard-core](https://github.com/Veritas-Vaults-Network/soroban-guard-core) — Rust/Axum analysis engine
- [soroban-guard-contracts](https://github.com/Veritas-Vaults-Network/soroban-guard-contracts) — Example contracts for testing

## License

MIT
