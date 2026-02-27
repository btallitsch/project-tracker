import { useEffect, useRef } from 'react'

/**
 * A single task row — checkbox, auto-resizing textarea, delete button.
 */
export default function TaskItem({ task, onToggle, onTextChange, onDelete }) {
  const textareaRef = useRef(null)

  // Auto-resize textarea height to fit content
  useEffect(() => {
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = el.scrollHeight + 'px'
    }
  }, [task.text])

  return (
    <div className={`task-item${task.done ? ' done' : ''}`}>
      <div
        className={`task-checkbox${task.done ? ' checked' : ''}`}
        onClick={onToggle}
        role="checkbox"
        aria-checked={task.done}
        tabIndex={0}
        onKeyDown={(e) => e.key === ' ' && onToggle()}
      />
      <textarea
        ref={textareaRef}
        className={`task-text-input${task.done ? ' done' : ''}`}
        value={task.text}
        placeholder="Task description..."
        onChange={(e) => onTextChange(e.target.value)}
        rows={1}
      />
      <button className="task-delete" onClick={onDelete} title="Delete task">
        ✕
      </button>
    </div>
  )
}
