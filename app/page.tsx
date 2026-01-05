import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { BlogCard } from '@/components/blog/BlogCard'
import { Button } from '@/components/ui/Button'

// Revalidate every 60 seconds
export const revalidate = 60

export default async function Home() {
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white sticky top-0 z-20">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[var(--prepico-blue)] flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--prepico-gradient-start)] to-[var(--prepico-gradient-end)] flex items-center justify-center text-white">
                P
              </div>
              PREPICO
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-[var(--prepico-blue)]">Products & Services</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-[var(--prepico-blue)]">Resources</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-[var(--prepico-blue)]">Pricing</a>
            <Button variant="primary" className="rounded-full px-8">Login/Sign Up</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-20 bg-gradient-to-b from-[var(--prepico-bg-light)] to-white border-b border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[var(--prepico-blue)] mb-6 tracking-tight">
            Prepico Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Tips, guides, and insights to help you ace your career journey.
          </p>
          <div className="max-w-xl mx-auto relative group">
             <input 
                type="text" 
                placeholder="Search articles, tips, and guides..." 
                className="w-full h-14 pl-6 pr-14 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--prepico-blue)] focus:border-transparent transition-all"
             />
             <div className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-[var(--prepico-blue)] rounded-full text-white cursor-pointer hover:opacity-90 transition-opacity">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar (Categories) */}
          <aside className="w-full lg:w-64 shrink-0 space-y-8">
             <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Categories</h3>
                <div className="space-y-2">
                    <button className="w-full text-left px-4 py-2 rounded-lg bg-[var(--prepico-bg-light)] text-[var(--prepico-blue)] font-medium">All Posts</button>
                    <button className="w-full text-left px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">Interview Tips</button>
                    <button className="w-full text-left px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">Resume & CV</button>
                    <button className="w-full text-left px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">Career Growth</button>
                </div>
             </div>
             <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Popular Topics</h3>
                 <div className="flex flex-wrap gap-2">
                    {['interview', 'resume', 'career', 'tips', 'growth'].map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-600 font-medium hover:bg-gray-200 cursor-pointer transition-colors">
                            {tag}
                        </span>
                    ))}
                 </div>
             </div>
          </aside>

          {/* Blog Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-end mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Latest Posts</h2>
                <span className="text-sm text-gray-500">{posts?.length || 0} posts</span>
            </div>

            {posts && posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {posts.map(post => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a5 5 0 1110 0v2M7 7h10" /></svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                    <p className="text-gray-500 mb-6">Check back later for updates or login to admin to create one.</p>
                </div>
            )}
            
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
