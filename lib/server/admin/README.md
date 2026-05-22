# Admin Server Layer (Future)

This folder defines server-side contracts for future admin features.

Why this exists:

- Keep admin behavior separated from public website code.
- Add authentication/authorization gates before any private data is returned.
- Allow swapping implementation details (Prisma, service-layer logic, permissions) without rewriting UI routes.

Before implementing real admin endpoints:

1. Add authentication (session/JWT/provider).
2. Add role-based authorization checks.
3. Protect all admin routes and APIs.
4. Add rate limits and audit logs for sensitive actions.
