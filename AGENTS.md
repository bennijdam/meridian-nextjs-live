# AGENTS.md — App Agent Log

Append only.

Guardrail:
- If you use a document and then change behavior, configuration, or deployment methodology in a way that makes that document stale, update the document in the same task before appending your log entry.

Entry format:
```text
[YYYY-MM-DD | HH:MM] | Agent: [Name] | Commit: [short hash or "uncommitted"] | Status: [Success/Partial/Blocker]
Note for next agent: [1–2 sentences not obvious from the code]
```

[2026-04-22 | 15:20] | Agent: GitHub Copilot | Commit: uncommitted | Status: Partial
Note for next agent: Render now has the live `STRIPE_WEBHOOK_SECRET`, and the Vercel project `meridian-nextjs-live` has imported envs. The first Vercel deployment failed because commit `576548d` still contains the unused import in `app/careers/page.tsx`; the local fix is present but not yet pushed.
