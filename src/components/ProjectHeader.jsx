import { calcProgress } from '../utils/helpers'

/**
 * Project header — editable title/desc, animated progress bar, tab switcher.
 */
export default function ProjectHeader({
  project,
  activeTab,
  onTabChange,
  onUpdateProject,
  onDeleteProject,
}) {
  const progress = calcProgress(project.tasks)

  return (
    <div className="project-header">
      <div className="project-header-top">
        <div className="project-title-wrap">
          <input
            className="project-title-input"
            value={project.name}
            placeholder="Project name..."
            onChange={(e) => onUpdateProject({ name: e.target.value })}
          />
          <textarea
            className="project-desc-input"
            value={project.desc}
            placeholder="Short description..."
            onChange={(e) => onUpdateProject({ desc: e.target.value })}
            rows={1}
          />
        </div>
        <button className="delete-project-btn" onClick={onDeleteProject}>
          Delete
        </button>
      </div>

      <div className="progress-section">
        <div className="progress-label">
          <span>
            Progress · {project.tasks.length} task{project.tasks.length !== 1 ? 's' : ''}
          </span>
          <span className="progress-pct">{progress}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="tab-bar">
        <button
          className={`tab-btn${activeTab === 'tasks' ? ' active' : ''}`}
          onClick={() => onTabChange('tasks')}
        >
          Tasks
        </button>
        <button
          className={`tab-btn${activeTab === 'pages' ? ' active' : ''}`}
          onClick={() => onTabChange('pages')}
        >
          Pages {project.pages.length > 0 && `(${project.pages.length})`}
        </button>
      </div>
    </div>
  )
}
