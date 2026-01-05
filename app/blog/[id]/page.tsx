import { supabase } from '@/lib/supabase'
import { RenderBlock } from '@/components/blog/RenderBlock'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Metadata } from 'next'

// Revalidate every 60 seconds
export const revalidate = 60

interface PageProps {
  params: { id: string }
}

// Generate metadata dynamically
// Generate metadata dynamically
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const { data: post } = await supabase.from('posts').select('title, description').eq('id', id).single()
  
  if (!post) {
      return {
          title: 'Post Not Found - Prepico Blogs'
      }
  }

  return {
    title: `${post.title} - Prepico Blogs`,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (!post) {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Post not found</h1>
                <Link href="/">
                    <Button>Return Home</Button>
                </Link>
            </div>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
       {/* Navigation */}
       <nav className="border-b border-gray-100 bg-white sticky top-0 z-20">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
              <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-[var(--prepico-blue)] transition-colors" />
              <span className="text-sm font-medium text-gray-500 group-hover:text-[var(--prepico-blue)] transition-colors">Back to Blog</span>
          </Link>
          <div className="flex items-center gap-4">
             <Button variant="outline" size="sm">Share</Button>
             <Button variant="primary" size="sm">Subscribe</Button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-gradient-to-b from-[var(--prepico-bg-light)] to-white border-b border-gray-100 pt-16 pb-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
                <span className="bg-blue-50 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">Interview Tips</span>
                {post.created_at && (
                    <span className="text-sm text-gray-500">{formatDistanceToNow(new Date(post.created_at))} ago</span>
                )}
            </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {post.description}
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-3xl">
          {post.thumbnail_url && (
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 mb-12 -mt-24 bg-white relative z-10">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                    src={post.thumbnail_url} 
                    alt={post.title} 
                    className="w-full h-auto max-h-[500px] object-cover"
                />
            </div>
          )}

          <div className="prose prose-lg max-w-none text-gray-800">
             {post.content && post.content.map((block: any) => (
                 <RenderBlock key={block.id} block={block} />
             ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
             <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                  <div>
                      <div className="font-bold text-gray-900">Prepico Team</div>
                      <div className="text-sm text-gray-500">Career Experts</div>
                  </div>
             </div>
             <div className="flex gap-2">
                 {/* Social share icons would go here */}
             </div>
          </div>
      </main>
      
       {/* Footer */}
       <footer className="bg-gray-900 text-white py-12 mt-20">
         <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400">© 2026 Prepico. All rights reserved.</p>
         </div>
      </footer>
    </div>
  )
}
