# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Next.js 14.2.3 and TypeScript, featuring interactive visualizations, AI integration, and a space/alien theme. The site includes a blog, knowledge graph visualization, and an AI-powered chat interface called "Vishva".

## Commands

### Development
```bash
# Start development server
npm run dev
# or
yarn dev

# Build for production
npm run build
# or
yarn build

# Start production server
npm run start
# or
yarn start

# Run linting
npm run lint
# or
yarn lint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 14.2.3 with App Router
- **Language**: TypeScript with JavaScript support
- **Styling**: Tailwind CSS + NextUI components
- **Animation**: Framer Motion, React Spring, TSParticles
- **AI Integration**: OpenAI SDK, Vercel AI SDK
- **Markdown**: MDX with remark/rehype plugins

### Directory Structure
- `src/app/` - Next.js App Router pages and API routes
  - `api/` - Backend endpoints (fetch-images, filters, summarize)
  - `blog/` - Blog section with dynamic MDX rendering
  - `knowledge-graph/` - Interactive knowledge visualization
  - `vishva/` - AI chat interface with custom components
- `src/components/` - Shared React components (using shadcn/ui)
- `src/lib/` - Utility functions and configurations
- `_posts/` - Markdown blog posts

### Key Patterns
1. **Component Structure**: Use TypeScript interfaces for props, follow NextUI patterns for UI components
2. **Styling**: Tailwind utility classes preferred, custom CSS modules for complex animations
3. **API Routes**: Use Next.js route handlers in `app/api/`, return NextResponse
4. **State Management**: React hooks and context for local state
5. **Path Aliases**: Use `@/*` which maps to `./src/*`

### Environment Variables
Required environment variables:
- `OPENAI_API_KEY` - For AI features and text summarization
- Additional API keys may be needed for other services

### Adding Features
- **New Pages**: Create in `src/app/[page-name]/page.tsx`
- **New API Routes**: Create in `src/app/api/[endpoint]/route.ts`
- **New Blog Posts**: Add MDX files to `_posts/` directory
- **New Components**: Add to `src/components/` and export from index files