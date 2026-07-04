# Elo

Elo is a hyper-performant, real-time 1v1 mental math competitive mobile application designed like an e-sport.

## Repository Layout

*   `Elo/`: React Native client application built using Expo Router.
*   `server/`: High-performance Bun backend server utilizing SQLite and WebSockets.
*   `proto/`: Type contracts defined via Protocol Buffers (v3).
*   `docs/`: Extensive documentation ([read docs here](https://elo.mintlify.site))

## Quick Start

### 1. Start the Backend Server
```bash
cd server
bun install
bun run build-proto
bun run dev
```

### 2. Launch the Mobile Client
```bash
cd Elo
bun install
bun run build-proto
bun run dev
```

## Documentation

For full architecture details, WebSocket schemas, REST API specs, and bracket engine details, check out the [Mintlify Documentation Site](https://elo.mintlify.site).
