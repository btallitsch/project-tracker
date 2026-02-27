import TaskItem from './TaskItem'

/**
 * Tasks tab — list of tasks with add/toggle/delete controls.
 */
export default function TasksTab({ tasks, onAddTask, onToggle, onTextChange, onDelete }) {
  return (
    <div>
      <div className="section-header">
        <h3>Tasks</h3>
        <button className="add-btn" onClick={onAddTask}>
          + Add Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="tasks-empty">
          <div className="tasks-empty-icon">✦</div>
          No tasks yet — add one to get started
        </div>
      ) : (
        <>
          <div className="tasks-stats">
            {tasks.filter((t) => t.done).length} of {tasks.length} completed
          </div>
          <div className="tasks-list">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={() => onToggle(task.id)}
                onTextChange={(text) => onTextChange(task.id, text)}
                onDelete={() => onDelete(task.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
