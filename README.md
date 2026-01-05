# Prepico Blogs

A modern, production-ready blog platform built for Prepico, featuring a custom block-based editor, admin dashboard, and dynamic public frontend.

## 🚀 Features

### Public Interface
- **Dynamic Blog Listing**: Fetches and displays latest posts from Supabase.
- **Rich Content Rendering**: Recursive block renderer supporting:
  - Text & Headings (with dark, high-contrast typography)
  - Images & Videos
  - Nested Layouts (2-Column Rows)
  - Bullet Lists
- **Responsive Design**: Mobile-first layout using Tailwind CSS.
- **Custom Branding**: Prepico theme colors and typography (Poppins).

### Admin Dashboard
- **Content Management**: Create, Edit, and Delete blog posts.
- **Block-Based Editor**:
  - Drag-and-drop concepts (click to add).
  - Support for complex nested structures.
  - **Media Upload**: Direct integration with Supabase Storage for images and thumbnails.
- **Real-time Preview**: What you see is what you get.

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, Lucide React (Icons)
- **Backend**: Supabase (PostgreSQL, Storage, Auth/RLS)
- **Deployment**: Vercel ready

## 📦 Project Structure

```
├── app/
│   ├── admin/          # Admin dashboard & editor routes
│   ├── blog/[id]/      # Single blog post view
│   ├── page.tsx        # Public landing page
│   └── layout.tsx      # Root layout with Prepico branding
├── components/
│   ├── admin/          # Admin-specific components (tables, layout)
│   ├── blog/           # Public blog components (cards, renderers)
│   ├── editor/         # The core Block Editor engine
│   └── ui/             # Reusable UI kit (Button, Input, Card)
├── lib/
│   └── supabase.ts     # Supabase client configuration
└── types/              # TypeScript definitions for Block/Post structure
```

## 🔧 Setup & Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd prepico-blogs
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env.local` file with your Supabase credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000).

## 📄 Database Schema

The project uses a simple but flexible schema in Supabase:

-   **`posts` Table**: Stores blog metadata and the JSONB `content` structure.
-   **`images` Bucket**: Stores uploaded assets.
