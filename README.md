# E-commerce Store with Next.js 14

A modern e-commerce store built with Next.js 14, featuring a responsive design, cart functionality, and product management.

## Features

- 🛍️ Product listing with grid layout
- 🔍 Product search and filtering
- ⭐ Product rating display
- 🛒 Shopping cart functionality
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔄 State management with Redux

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Lucide Icons

## Getting Started

1. Clone the repository:
```bash
git clone [your-repo-url]
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser

## Project Structure

```
src/
├── app/                # Next.js app router pages
├── components/         # Reusable components
│   ├── cart/          # Cart related components
│   ├── header/        # Header component
│   ├── modal/         # Modal components
│   └── product/       # Product related components
├── core/              # Core types and interfaces
├── store/             # Redux store configuration
└── utils/             # Utility functions
```

## Key Features Explained

- **Product Listing**: Grid layout with product cards showing key information
- **Product Details**: Dedicated page for each product with detailed information
- **Shopping Cart**: Modal-based cart with quantity management
- **Search & Filter**: Real-time product filtering based on search input
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **SEO(meta)**: make reusable function for meta tags
