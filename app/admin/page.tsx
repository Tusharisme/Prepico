import AdminLayout from '@/components/admin/AdminLayout'
import { Card } from '@/components/ui/Card'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function AdminDashboard() {
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
          <p className="text-3xl font-bold text-[var(--prepico-blue)]">0</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Published</h3>
          <p className="text-3xl font-bold text-green-600">0</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Drafts</h3>
          <p className="text-3xl font-bold text-orange-500">0</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Recent Posts</h3>
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <p>No posts found. Create your first blog post!</p>
        </div>
      </Card>
    </AdminLayout>
  )
}
