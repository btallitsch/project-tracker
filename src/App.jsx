import { useState, useEffect } from 'react'

import Sidebar from './components/Sidebar'
import ProjectHeader from './components/ProjectHeader'
import TasksTab from './components/TasksTab'
import PagesTab from './components/PagesTab'
import NewProjectModal from './components/NewProjectModal'

import { generateId } from './utils/helpers'
import { loadData, saveData } from './utils/storage'

/**
 * App — root state manager.
 * All project/task/page mutations live here; child components are purely presentational.
 */
export default function App() {
  const [projects, setProjects] = useState([])
  const [activeProjectId, setActiveProjectId] = useState(null)
  const [activeTab, setActiveTab] = useState('tasks')
  const [activePageId, setActivePageId] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  // ── Load from localStorage on mount ──────────────────────────────────────
  useEffect(() => {
    const data = loadData()
    setProjects(data.projects)
    setActiveProjectId(data.activeProjectId)
    setHydrated(true)
  }, [])

  // ── Persist to localStorage whenever state changes ────────────────────────
  useEffect(() => {
    if (!hydrated) return
    saveData({ projects, activeProjectId })
  }, [projects, activeProjectId, hydrated])

  // ── Helpers ───────────────────────────────────────────────────────────────

  const activeProject = projects.find((p) => p.id === activeProjectId) ?? null

  /** Apply a partial update to a single project by id */
  function patchProject(id, patcher) {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...patcher(p) } : p))
    )
  }

  // ── Project actions ───────────────────────────────────────────────────────

  function handleCreateProject({ name, desc }) {
    const project = {
      id: generateId(),
      name,
      desc,
      tasks: [],
      pages: [],
    }
    setProjects((prev) => [...prev, project])
    setActiveProjectId(project.id)
    setActiveTab('tasks')
    setActivePageId(null)
    setShowModal(false)
  }

  function handleSelectProject(id) {
    setActiveProjectId(id)
    setActiveTab('tasks')
    setActivePageId(null)
  }

  function handleDeleteProject(id) {
    setProjects((prev) => prev.filter((p) => p.id !== id))
    if (activeProjectId === id) {
      setActiveProjectId(null)
      setActivePageId(null)
    }
  }

  function handleUpdateProject(patch) {
    if (!activeProjectId) return
    patchProject(activeProjectId, () => patch)
  }

  // ── Task actions ──────────────────────────────────────────────────────────

  function handleAddTask() {
    if (!activeProjectId) return
    const task = { id: generateId(), text: '', done: false }
    patchProject(activeProjectId, (p) => ({ tasks: [...p.tasks, task] }))
  }

  function handleToggleTask(taskId) {
    patchProject(activeProjectId, (p) => ({
      tasks: p.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)),
    }))
  }

  function handleTaskTextChange(taskId, text) {
    patchProject(activeProjectId, (p) => ({
      tasks: p.tasks.map((t) => (t.id === taskId ? { ...t, text } : t)),
    }))
  }

  function handleDeleteTask(taskId) {
    patchProject(activeProjectId, (p) => ({
      tasks: p.tasks.filter((t) => t.id !== taskId),
    }))
  }

  // ── Page actions ──────────────────────────────────────────────────────────

  function handleAddPage() {
    if (!activeProjectId) return
    const page = { id: generateId(), title: 'Untitled', body: '' }
    patchProject(activeProjectId, (p) => ({ pages: [...p.pages, page] }))
    setActivePageId(page.id)
  }

  function handleSelectPage(id) {
    setActivePageId(id)
  }

  function handleDeletePage(pageId) {
    patchProject(activeProjectId, (p) => ({
      pages: p.pages.filter((pg) => pg.id !== pageId),
    }))
    if (activePageId === pageId) setActivePageId(null)
  }

  function handleUpdatePage(pageId, field, value) {
    patchProject(activeProjectId, (p) => ({
      pages: p.pages.map((pg) => (pg.id === pageId ? { ...pg, [field]: value } : pg)),
    }))
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="app">
      <Sidebar
        projects={projects}
        activeProjectId={activeProjectId}
        onSelectProject={handleSelectProject}
        onNewProject={() => setShowModal(true)}
      />

      <main className="main">
        {!activeProject ? (
          <div className="empty-state">
            <div className="empty-state-icon">◈</div>
            <h2>Select a project</h2>
            <p>Choose from the sidebar or create a new one</p>
          </div>
        ) : (
          <>
            <ProjectHeader
              project={activeProject}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onUpdateProject={handleUpdateProject}
              onDeleteProject={() => handleDeleteProject(activeProject.id)}
            />

            <div className="tab-content">
              {activeTab === 'tasks' && (
                <TasksTab
                  tasks={activeProject.tasks}
                  onAddTask={handleAddTask}
                  onToggle={handleToggleTask}
                  onTextChange={handleTaskTextChange}
                  onDelete={handleDeleteTask}
                />
              )}

              {activeTab === 'pages' && (
                <PagesTab
                  pages={activeProject.pages}
                  activePageId={activePageId}
                  onSelectPage={handleSelectPage}
                  onAddPage={handleAddPage}
                  onDeletePage={handleDeletePage}
                  onUpdatePage={handleUpdatePage}
                />
              )}
            </div>
          </>
        )}
      </main>

      {showModal && (
        <NewProjectModal
          onConfirm={handleCreateProject}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
