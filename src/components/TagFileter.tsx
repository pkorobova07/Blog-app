import { Tag } from "@/lib/types";

interface TagFilterProps {
  tags: Tag[];
  activeTag: string | null;
  onTagClick: (tagName: string | null) => void;
}

export default function TagFilter({
  tags,
  activeTag,
  onTagClick,
}: TagFilterProps) {
  return (
    <div className="tags-vertical">
      <button 
        className={`tag-all ${!activeTag ? 'tag-selected' : ''}`}
        onClick={() => onTagClick(null)}
      >
        Все посты
      </button>
      
      <div className="tags-list-vertical">
        {tags.map((tag, i) => (
          <button 
            key={i} 
            className={`tag-btn-vertical ${activeTag === tag ? 'tag-selected' : ''}`}
            onClick={() => onTagClick(tag)}
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
}