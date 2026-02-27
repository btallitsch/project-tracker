import { calcProgress } from '../utils/helpers'

/**
 * Sidebar — shows project list with mini progress bars and a "+ New Project" button.
 */
export default function Sidebar({ projects, activeProjectId, onSelectProject, onNewProject }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          Workshop
          <span>personal projects</span>
        </div>
      </div>

      <div className="sidebar-projects">
        <div className="sidebar-section-label">Projects</div>

        {projects.length === 0 && (
          <div className="sidebar-empty">No projects yet</div>
        )}

        {projects.map((project) => {
          const pct = calcProgress(project.tasks)
          const isActive = project.id === activeProjectId
          return (
            <div
              key={project.id}
              className={`project-item${isActive ? ' active' : ''}`}
              onClick={() => onSelectProject(project.id)}
            >
              <div className="project-item-name">{project.name || 'Untitled'}</div>
              <div className="project-mini-bar">
                <div className="project-mini-fill" style={{ width: `${pct}%` }} />
              </div>
              <div className="project-mini-pct">{pct}% complete</div>
            </div>
          )
        })}
      </div>

      <button className="sidebar-add-btn" onClick={onNewProject}>
        + New Project
      </button>
    </aside>
  )
}
