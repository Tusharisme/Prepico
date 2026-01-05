export type BlockType = 'paragraph' | 'heading' | 'image' | 'video' | 'list' | 'row' | 'column' ;

export interface BlockStyle {
  textAlign?: 'left' | 'center' | 'right';
  fontWeight?: 'normal' | 'bold';
  italic?: boolean;
}

export interface Block {
  id: string;
  type: BlockType;
  content?: string; // HTML or text content
  src?: string; // For images/videos
  children?: Block[]; // For nested structures like rows/columns
  style?: BlockStyle;
  metadata?: any; // Extra props
}

export interface BlogPost {
  id?: string;
  title: string;
  description?: string;
  thumbnail_url?: string;
  content: Block[];
  created_at?: string;
}
