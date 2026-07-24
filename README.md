# 🎮 Harshuma Play

A high-performance, single-page web gaming hub hosting a collection of classic visual games. Built using a modern **Monorepo** and **Micro-frontend Architecture** to achieve complete independence between individual game apps and the central container dashboard.


---

## 🛠️ Tech Stack & Architecture

- **Monorepo Engine:** [Turborepo](https://turbo.build) managed via **pnpm workspaces** for zero-dependency bloat and superfast builds.
- **Micro-frontends:** [Vite](https://vite.dev) coupled with `@originjs/vite-plugin-federation` to stream isolated apps at runtime.
- **Core Frameworks:** React 18+ and TypeScript (for strict typing and robust runtime logic).
- **Client Routing:** `react-router-dom` to support seamless browser history tracking and standard back/forward navigation.

---

## 📁 Repository Structure

```text
harshuma-games/
├── apps/
│   ├── host-dashboard/   # Central Hub / Orchestrator (React, Port 5000)
│   └── game-tictactoe/   # Remote Game App 1 (React + TypeScript, Port 5001)
├── packages/             # Future shared style utilities and configurations
├── package.json          # Root workspace scripts
└── pnpm-workspace.yaml  # Workspace directory maps
```

---

## 🚀 Key Technical Highlights

### ⚡ Double-Bypass Development Flow (Zero Rebuilds)
To counter the limitation where Vite Module Federation requires a production build to share remote assets locally, the container dashboard leverages an automated routing bypass during local development:
```javascript
const TicTacToeGame = lazy(() => 
  isDevelopment 
    ? import('../../game-tictactoe/src/App.tsx') // Direct local file access for hot-reloads
    : import('game_tictactoe/App')                // Runtime Module Federation fallback
);
```

## 🛠️ Local Development Setup

Ensure you have **Node.js (v20.19.0+ or v22.12.0+)** and **pnpm** installed on your machine.

### 1. Install Workspace Dependencies
Run this in the root folder to download and map dependencies cleanly across all microservices:
```bash
pnpm install
```

### 2. Run the Development Server
Launch the live development workspace. Both the central hub and the isolated games will start concurrently with native **Hot Module Replacement (HMR)**:
```bash
pnpm --filter host-dashboard dev & pnpm --filter game-tictactoe dev
```
Open your browser and navigate to **`http://localhost:5000`** to view the live dashboard.

---

## 📦 Production Compiling & Building

To generate production-ready static bundles prepared for Module Federation runtime streaming:

```bash
# Compile and build production-ready chunks across all projects
pnpm -r build

# Run the localized production preview servers
pnpm --filter host-dashboard preview & pnpm --filter game-tictactoe preview
```
- **Host Dashboard Preview:** `http://localhost:5000`
- **Tic-Tac-Toe Game Preview:** `http://localhost:5001`

---

## 🗺️ Roadmap
- [x] High-performance Monorepo setup with Vite and pnpm.
- [x] Host Orchestrator with `react-router-dom` navigation tracking.
- [x] Optimized Tic-Tac-Toe remote app in TypeScript.
- [ ] Add **Memory Match** card matching game.
- [ ] Add **Wordle Clone** text assessment engine.
