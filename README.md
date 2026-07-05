# Elo — Real-Time Mental Math Competitive Platform

Elo is a hyper-performant, real-time 1v1 mental math competitive platform engineered like an e-sport. The ecosystem features a React Native client displaying native 120Hz frame rates and a high-performance Bun-powered backend delivering sub-40ms tick updates.

---

## 🚀 Key Features

*   **Planetary Database Sharding**: Geographic `ShardRouter` horizontal partitions that route player writes locally (`shard_apac.db`, `shard_eu.db`, `shard_us.db`) coupled with a Map-Reduce rankings consolidation loop.
*   **B2B Federated Tournaments**: Secure REST endpoints (`/api/v1/federation/tournaments/create`) validated using corporate API key hashes, isolating third-party matches in high-priority virtual node lanes.
*   **Heuristic Anti-Cheat Sandbox**: Automatic isolation of bot-like input cadences (<120ms consecutive inputs) into a `SILENT_SANDBOX` serving impossible honeypot questions, resulting in permanent hardware bans if solved.
*   **Play Integrity Attestation**: Client-side attestation verification resolved in `<8ms` during room connections to reject rooted runtimes and emulators.
*   **Live-Ops Events & Combat Pass**: A 50-tier progression track powered by Combat Stars, daily challenge objectives rotating every 24 hours, and global double multiplier banners.
*   **Telemetry Observations**: A scrapable `/api/metrics` Prometheus exporter tracking websocket connections, heap footprint allocations, and anti-cheat indicators.

---

## 📂 Repository Layout

*   **[Elo/](file:///e:/Elo/Elo)**: React Native client built using Expo Router.
*   **[server/](file:///e:/Elo/server)**: High-performance Bun backend server utilizing SQLite and WebSockets.
*   **[proto/](file:///e:/Elo/proto)**: Strict API contracts defined using Protocol Buffers (v3).
*   **[docs/](file:///e:/Elo/docs)**: Documentation portal configured for Mintlify.

---

## 🛠️ Quick Start

### 1. Start the Backend Server
```bash
cd server
bun install
bun run build-proto
bun run start:dev
```

### 2. Launch the Mobile Client
```bash
cd Elo
bun install
bun run build-proto
bun run dev
```

---

## 🔧 Operational Scripts

| Command | Action |
| :--- | :--- |
| `bun run start:dev` | Launch backend server in watch/reload mode |
| `bun run start:prod` | Start server in production mode |
| `bun run test` | Run backend unit and integration test suite |
| `bun run test:coverage` | Analyze test coverage profiles |
| `bun run build-proto` | Compile Protocol Buffer schemas to static TypeScript files |

For detailed API specifications and architecture outlines, check out the [Mintlify Documentation](file:///e:/Elo/docs/introduction.mdx).
