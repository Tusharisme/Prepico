"use client"

import { useState } from 'react'
import { Block, BlogPost, BlockType } from '@/types/blog'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { Plus, Save, Layout, Type, Image as ImageIcon, Video, List, Columns } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function BlogEditor() {
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState<BlogPost>({
    title: '',
    description: '',
    thumbnail_url: '',
    content: []
  })

  // Basic handlers
  const updateMetadata = (key: keyof BlogPost, value: string) => {
    setPost(prev => ({ ...prev, [key]: value }))
  }

  const addBlock = (type: BlockType, parentId?: string) => {
    const newBlock: Block = {
      id: crypto.randomUUID(),
      type,
      content: '',
      children: type === 'row' ? [] : undefined
    }

    if (type === 'row') {
      // Initialize row with 2 columns by default
       newBlock.children = [
         { id: crypto.randomUUID(), type: 'column', children: [] },
         { id: crypto.randomUUID(), type: 'column', children: [] }
       ]
    }

    if (!parentId) {
      setPost(prev => ({ ...prev, content: [...prev.content, newBlock] }))
    } else {
        // Nested logic would go here (simplified for root level addition first)
        // For a full implementation, we need a recursive update function
        setPost(prev => ({
            ...prev,
            content: updateBlockRecursive(prev.content, parentId, (block) => ({
                ...block,
                children: [...(block.children || []), newBlock]
            }))
        }))
    }
  }
  
  // Recursive helper to find and update a block or its children
  const updateBlockRecursive = (blocks: Block[], targetId: string, transform: (b: Block) => Block): Block[] => {
      return blocks.map(block => {
          if (block.id === targetId) {
              return transform(block)
          }
          if (block.children) {
              return { ...block, children: updateBlockRecursive(block.children, targetId, transform) }
          }
          return block
      })
  }
  
  const updateBlockContent = (id: string, content: string) => {
      setPost(prev => ({
          ...prev,
          content: updateBlockRecursive(prev.content, id, b => ({ ...b, content }))
      }))
  }

  const savePost = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.from('posts').insert({
        title: post.title,
        description: post.description,
        thumbnail_url: post.thumbnail_url,
        content: post.content
      })
      if (error) throw error
      alert('Post saved successfully!')
    } catch (e) {
      console.error(e)
      alert('Failed to save post')
    } finally {
        setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Create New Blog Post</h2>
        <Button onClick={savePost} disabled={loading}>
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'Saving...' : 'Publish Post'}
        </Button>
      </div>

      <Card className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <Input 
            value={post.title} 
            onChange={(e) => updateMetadata('title', e.target.value)}
            placeholder="Enter blog title..."
            className="text-lg font-semibold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <Input 
            value={post.description} 
            onChange={(e) => updateMetadata('description', e.target.value)}
            placeholder="Short summary..." 
          />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
             <Input 
                value={post.thumbnail_url} 
                onChange={(e) => updateMetadata('thumbnail_url', e.target.value)}
                placeholder="https://..." 
          />
        </div>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Content Blocks</h3>
        
        {/* Render Blocks */}
        <div className="space-y-4">
             {post.content.map(block => (
                 <BlockRenderer 
                    key={block.id} 
                    block={block} 
                    onUpdate={updateBlockContent} 
                    onAddChild={addBlock}
                 />
             ))}
        </div>
      </div>
    </div>
  )
}

function BlockRenderer({ block, onUpdate, onAddChild }: { block: Block, onUpdate: (id: string, val: string) => void, onAddChild: (type: BlockType, parentId: string) => void }) {
    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        try {
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }
            
            const { data } = supabase.storage.from('images').getPublicUrl(filePath)
            onUpdate(block.id, data.publicUrl)
        } catch (error) {
            console.error('Error uploading image:', error)
            alert('Error uploading image')
        }
    }

    if (block.type === 'row') {
        return (
            <div className="grid grid-cols-2 gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                {block.children?.map(col => (
                    <div key={col.id} className="border border-dashed border-gray-300 rounded p-3 min-h-[100px] bg-white">
                        <div className="text-xs text-gray-400 mb-2 uppercase font-bold tracking-wider">Column</div>
                        <div className="space-y-3">
                             {col.children?.map(child => (
                                 <BlockRenderer key={child.id} block={child} onUpdate={onUpdate} onAddChild={onAddChild} />
                             ))}
                        </div>
                        <div className="mt-4 flex gap-1 justify-center opacity-50 hover:opacity-100 transition-opacity">
                             <button onClick={() => onAddChild('paragraph', col.id)} className="p-1 hover:bg-gray-100 rounded" title="Add Text"><Type size={14}/></button>
                             <button onClick={() => onAddChild('image', col.id)} className="p-1 hover:bg-gray-100 rounded" title="Add Image"><ImageIcon size={14}/></button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
    
    // Simple blocks
    return (
        <div className="relative group">
            <div className="absolute -left-8 top-2 opacity-0 group-hover:opacity-100 text-gray-400">
                {/* Drag handle could go here */}
            </div>
            
            {block.type === 'heading' && (
                <Input 
                    value={block.content} 
                    onChange={(e) => onUpdate(block.id, e.target.value)} 
                    placeholder="Heading..."
                    className="font-bold text-xl border-none shadow-none focus-visible:ring-0 px-0 h-auto" 
                />
            )}
            
            {block.type === 'paragraph' && (
                 <textarea 
                    value={block.content}
                    onChange={(e) => onUpdate(block.id, e.target.value)}
                    placeholder="Type your text here..."
                    className="w-full resize-y min-h-[80px] p-2 rounded-md border-transparent hover:border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-transparent"
                 />
            )}
            
            {block.type === 'list' && (
                 <div className="flex gap-2 items-start">
                    <div className="mt-2.5 h-1.5 w-1.5 rounded-full bg-gray-400 shrink-0" />
                    <textarea 
                        value={block.content}
                        onChange={(e) => onUpdate(block.id, e.target.value)}
                        placeholder="List item..."
                        className="w-full resize-none h-[40px] p-1 rounded-md border-transparent hover:border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-transparent"
                     />
                 </div>
            )}

            {block.type === 'image' && (
                <div className="space-y-2 border rounded-lg p-3 bg-gray-50">
                    <div className="flex items-center gap-2 mb-2">
                         <ImageIcon size={16} className="text-gray-500" />
                         <span className="text-sm font-medium text-gray-700">Image Block</span>
                    </div>
                    
                    <div className="flex gap-2">
                         <Input 
                            value={block.content} 
                            onChange={(e) => onUpdate(block.id, e.target.value)} 
                            placeholder="Image URL..." 
                            className="flex-1"
                        />
                         <div className="relative">
                            <Button variant="secondary" size="sm" type="button" className="relative cursor-pointer">
                                Upload
                                <input 
                                    type="file" 
                                    className="absolute inset-0 opacity-0 cursor-pointer" 
                                    accept="image/*"
                                    onChange={handleUpload}
                                />
                            </Button>
                         </div>
                    </div>

                    {block.content && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={block.content} alt="Preview" className="max-h-60 rounded-md object-contain border bg-gray-100" />
                    )}
                </div>
            )}
             {block.type === 'video' && (
                <div className="space-y-2 border rounded-lg p-3 bg-gray-50">
                    <div className="flex items-center gap-2">
                         <Video size={16} className="text-gray-500" />
                         <span className="text-sm font-medium text-gray-700">Video Block</span>
                    </div>
                    <Input 
                        value={block.content} 
                        onChange={(e) => onUpdate(block.id, e.target.value)} 
                        placeholder="Video URL (YouTube/MP4)..." 
                    />
                </div>
            )}
        </div>
    )
}
