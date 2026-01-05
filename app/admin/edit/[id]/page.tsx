import AdminLayout from '@/components/admin/AdminLayout'
import BlogEditor from '@/components/editor/BlogEditor'
import { supabase } from '@/lib/supabase'

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (!post) {
      return <div>Post not found</div>
  }

  return (
    <AdminLayout>
      <BlogEditor initialPost={post} isEditing />
    </AdminLayout>
  )
}
