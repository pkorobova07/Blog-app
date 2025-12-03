// src/components/TagFilter.tsx
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
    <div>
      <button onClick={() => onTagClick(null)}>Все</button>

      {tags.map((tag, i) => (
        <button key={i} onClick={() => onTagClick(tag)}>
          {tag}
        </button>
      ))}

      {activeTag && (
        <div>
          <span>Фильтр: #{activeTag}</span>
          <button onClick={() => onTagClick(null)}>✕</button>
        </div>
      )}
    </div>
  );
}
