# Pencil2D MCP Server Showcase Website

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/chriz-3656/pencil2d-mcp-web)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PyPI](https://img.shields.io/badge/PyPI-v0.3.0-orange.svg)](https://pypi.org/project/pencil2d-mcp/)
[![GitHub](https://img.shields.io/badge/GitHub-pencil2d--mcp-blue.svg)](https://github.com/chriz-3656/pencil2d-mcp)

Official showcase website and interactive documentation for **[pencil2d-mcp](https://github.com/chriz-3656/pencil2d-mcp)**, the open-source Model Context Protocol server that connects AI coding agents to Pencil2D traditional 2D animation.

---

## 🚀 Live 1-Click Deployment on Vercel

Click the button below to deploy this website instantly to your own Vercel account:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/chriz-3656/pencil2d-mcp-web)

### Manual Vercel Deployment via GitHub

1. Push or fork this repository to your GitHub account (`chriz-3656/pencil2d-mcp-web`).
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import `pencil2d-mcp-web`.
4. Click **Deploy**. Vercel will build and assign your free production domain (e.g., `pencil2d-mcp.vercel.app`).

---

## 🌟 Website Features

- **🎬 Live Production Showcase**: Embeds real rendered animations (`MC_NARRATOR_01` 8-second 12 FPS prototype and physics bouncing ball).
- **🛠️ 14-Tool Interactive Explorer**: Category filtering and parameter documentation for all 14 MCP tools.
- **⚡ 1-Click Code Copying**: Copy `pip install pencil2d-mcp` or client configuration snippets with one click.
- **📱 Responsive Glassmorphic Dark UI**: Modern slate/zinc styling with ambient lighting effects and mobile-friendly layouts.
- **🔌 Client Configuration Switcher**: Interactive tabbed snippets for Claude Desktop, Google Antigravity, Cursor / Cline, and Python API.
- **📖 Comprehensive Subpages**: Dedicated `about.html`, `blog.html` (with full technical release breakdown), `terms.html`, and `privacy.html`.
- **🤖 AI Agent Discoverability**: Standards-compliant `/llms.txt` and `/llm.txt` for LLM parsers and AI crawlers.
- **🔍 SEO & Crawling**: Valid `/sitemap.xml` and `/robots.txt` optimized for search indexing.

---

## 💻 Local Preview

To preview the website locally on your machine:

```bash
cd pencil2d-mcp-web
python3 -m http.server 3000
```

Then open `http://localhost:3000` in your browser.

---

## 📜 License

Distributed under the **MIT License**. Maintained by **[chriz-3656](https://github.com/chriz-3656)**.
