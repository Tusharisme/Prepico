import Link from 'next/link'
import { BlogPost } from '@/types/blog'
import { Card } from '@/components/ui/Card'
import { cn } from '@/components/ui/Button'
import { formatDistanceToNow } from 'date-fns'

interface BlogCardProps {
  post: BlogPost
  className?: string
}

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.id}`}>
      <Card className={cn("overflow-hidden h-full flex flex-col group cursor-pointer border-transparent hover:border-blue-100 ring-1 ring-gray-100", className)}>
        <div className="aspect-[16/9] relative bg-gray-100 overflow-hidden">
             {post.thumbnail_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                    src={post.thumbnail_url} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
             ) : (
                <div className="w-full h-full flex items-center justify-center bg-[var(--prepico-bg-light)] text-[var(--prepico-blue)] opacity-50">
                    <span className="text-4xl font-bold">Prepico</span>
                </div>
             )}
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
             <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">Blog</span>
             {post.created_at && (
                 <span className="text-xs text-gray-500">{formatDistanceToNow(new Date(post.created_at))} ago</span>
             )}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[var(--prepico-blue)] transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 line-clamp-3 text-sm flex-1">
            {post.description}
          </p>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
             <div className="h-6 w-6 rounded-full bg-gray-200"></div>
             <span className="text-xs font-medium text-gray-700">Prepico Team</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
