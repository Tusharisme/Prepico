import AdminLayout from '@/components/admin/AdminLayout'
import { Card } from '@/components/ui/Card'
import { Plus, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import { DeletePostButton } from '@/components/admin/DeletePostButton'

// Revalidate every 0 seconds (always fresh for admin)
export const revalidate = 0

export default async function AdminDashboard() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  const totalPosts = posts?.length || 0
  
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-500">Manage your blog posts and media.</p>
        </div>
        <Link href="/admin/create">
          <Button variant="primary" className="gap-2">
            <Plus className="h-4 w-4" />
            Create New Blog
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Posts</h3>
          <p className="text-3xl font-bold text-[var(--prepico-blue)]">{totalPosts}</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">All Posts</h3>
        
        {!posts || posts.length === 0 ? (
           <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
             <p>No posts found. Create your first blog post!</p>
           </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-sm text-gray-500">
                   <th className="py-3 font-medium">Title</th>
                   <th className="py-3 font-medium">Date</th>
                   <th className="py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-gray-50 group hover:bg-gray-50 transition-colors">
                    <td className="py-4 pr-4">
                      <div className="font-semibold text-gray-900">{post.title}</div>
                      <div className="text-xs text-gray-500 line-clamp-1">{post.description || 'No description'}</div>
                    </td>
                    <td className="py-4 text-sm text-gray-500 whitespace-nowrap">
                       {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 text-right">
                       <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/edit/${post.id}`}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                               <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <DeletePostButton postId={post.id} />
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </AdminLayout>
  )
}
