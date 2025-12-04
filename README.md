# AI Share Button Generator

A lightweight, embeddable AI share button that lets readers send any article to ChatGPT, Claude, Perplexity, or Gemini with a pre-filled prompt.

## Features

- **Easy Installation**: Copy-paste a single script tag into your site header
- **Auto-Detection**: Automatically finds blog posts and article content
- **Customizable**: Multiple button styles, colors, sizes, and AI destinations
- **Lightweight**: Minimal bundle size, no external dependencies
- **Cross-Platform**: Works on static sites, WordPress, Webflow, and more

## Quick Start

1. Visit the generator page
2. Configure your button (style, color, size, AI destination)
3. Copy the generated script tag
4. Paste it into your site's global header or footer
5. The button will automatically appear on blog posts!

## Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the generator.

### Build

```bash
npm run build
```

This will:
1. Build the Next.js app
2. Compile and minify the embed script (`src/scripts/share.ts` → `public/share.js`)

### Build Script Only

To rebuild just the embed script:

```bash
npm run build:script
```

## Project Structure

```
/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Generator UI
│   ├── layout.tsx         # Root layout
│   └── api/               # API routes
├── src/
│   ├── components/        # React components
│   ├── lib/              # Utility functions
│   └── scripts/          # Embed script source
├── public/
│   └── share.js          # Compiled embed script (generated)
└── package.json
```

## Security

This project uses:
- **Next.js 16.0.7+** (addresses CVE-2025-66478)
- **React 19.2.1+** (addresses CVE-2025-55182)

## Deployment

Deploy to Vercel:

```bash
vercel
```

The `vercel.json` configuration ensures proper caching and CORS headers for the embed script.

## License

MIT
