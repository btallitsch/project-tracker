const KEY = 'workshop-projects-v1'

/**
 * Load saved projects data from localStorage
 * @returns {{ projects: Array, activeProjectId: string|null }}
 */
export function loadData() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { projects: [], activeProjectId: null }
    return JSON.parse(raw)
  } catch {
    return { projects: [], activeProjectId: null }
  }
}

/**
 * Persist projects data to localStorage
 * @param {{ projects: Array, activeProjectId: string|null }} data
 */
export function saveData(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch {
    // storage unavailable — fail silently
  }
}
