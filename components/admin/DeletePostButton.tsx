"use client"

import { Button } from '@/components/ui/Button'
import { Trash2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export function DeletePostButton({ postId }: { postId: string }) {

  const handleDelete = async () => {
    // REMOVED CONFIRMATION DIALOG FOR DEBUGGING
    // Use directly to verify DB/API connection
    console.log('Bypassing confirmation dialog. Sending DELETE request for:', postId)

    try {
        const { error, status, statusText } = await supabase.from('posts').delete().eq('id', postId)
        
        console.log('Supabase Response:', { error, status, statusText })

        if (error) throw error
        
        console.log('Delete successful. Reloading page...')
        window.location.reload()
    } catch (e: any) {
        console.error('DELETE FAILED:', e)
        alert('Failed to delete: ' + (e.message || JSON.stringify(e)))
    }
  }

  return (
    <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleDelete}
        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}
