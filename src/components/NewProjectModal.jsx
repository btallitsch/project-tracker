import { useState } from 'react'

/**
 * Modal dialog for creating a new project.
 */
export default function NewProjectModal({ onConfirm, onCancel }) {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')

  function handleConfirm() {
    if (!name.trim()) return
    onConfirm({ name: name.trim(), desc: desc.trim() })
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleConfirm()
    if (e.key === 'Escape') onCancel()
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>New Project</h3>

        <input
          className="modal-input"
          placeholder="Project name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <input
          className="modal-input"
          placeholder="Description (optional)..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleConfirm}>
            Create
          </button>
        </div>
      </div>
    </div>
  )
}
