# WaterOS Documentation

Strategic planning and documentation viewer for WaterOS.

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:5301](http://localhost:5301) to view the application.

## Deployment

This project is optimized for deployment on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/water-os-docs)

### Manual Deployment

1. Push to GitHub
2. Import repository in Vercel
3. Deploy (no configuration needed)

## Project Structure

```
water-os-docs/
├── app/                 # Next.js App Router
│   ├── api/            # API routes for file serving
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main page with tabs
├── wateros/            # Documentation content (markdown files)
│   ├── plan/
│   ├── business/
│   ├── tech/
│   ├── research/
│   └── ...
└── package.json
```

## Features

- 📄 Markdown documentation viewer
- 🗂️ Organized by tabs (Plan, Business, Tech, Research, etc.)
- 🎨 Clean, modern UI with Tailwind CSS
- ⚡ Fast and optimized with Next.js
- 🚀 One-click Vercel deployment
