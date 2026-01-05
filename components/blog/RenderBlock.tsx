import { Block } from '@/types/blog'
import { cn } from '@/components/ui/Button'

export function RenderBlock({ block }: { block: Block }) {
  if (block.type === 'paragraph') {
    return <p className="text-gray-900 leading-relaxed mb-4 text-lg">{block.content}</p>
  }

  if (block.type === 'heading') {
    return <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-l-4 border-[var(--prepico-gradient-end)] pl-4">{block.content}</h2>
  }

  if (block.type === 'list') {
      return (
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-900 text-lg">
             <li>{block.content}</li>
          </ul>
      )
  }

  if (block.type === 'image') {
    return (
      <div className="my-8 rounded-xl overflow-hidden shadow-lg border border-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
            src={block.content} 
            alt="Blog content" 
            className="w-full h-auto object-cover"
        />
      </div>
    )
  }

  if (block.type === 'video') {
    // Simple video embed (assuming mp4 url or similar, for youtube we need parsing)
    // For this demo, assuming direct URL or just simple video tag
    return (
      <div className="my-8 rounded-xl overflow-hidden shadow-lg border border-gray-100 aspect-video bg-black">
        <video src={block.content} controls className="w-full h-full" />
      </div>
    )
  }

  if (block.type === 'row') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
        {block.children?.map(col => (
          <div key={col.id} className="space-y-4">
            {col.children?.map(child => (
              <RenderBlock key={child.id} block={child} />
            ))}
          </div>
        ))}
      </div>
    )
  }
  
  if (block.type === 'column') {
      return (
          <div>
              {block.children?.map(child => (
                  <RenderBlock key={child.id} block={child} />
              ))}
          </div>
      )
  }

  return null
}
