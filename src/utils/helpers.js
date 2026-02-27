/**
 * Generate a short random ID
 */
export function generateId() {
  return Math.random().toString(36).slice(2, 9)
}

/**
 * Calculate completion percentage from a list of tasks
 * @param {Array} tasks
 * @returns {number} 0–100
 */
export function calcProgress(tasks) {
  if (!tasks || tasks.length === 0) return 0
  const done = tasks.filter((t) => t.done).length
  return Math.round((done / tasks.length) * 100)
}
