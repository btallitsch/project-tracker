/**
 * Pages tab — list of pages on the left, note editor on the right.
 */
export default function PagesTab({
  pages,
  activePageId,
  onSelectPage,
  onAddPage,
  onDeletePage,
  onUpdatePage,
}) {
  const activePage = pages.find((pg) => pg.id === activePageId)

  return (
    <div className="pages-layout">
      {/* Page list */}
      <div className="pages-list">
        <div className="pages-list-header">
          <span>Pages</span>
          <button className="add-btn" onClick={onAddPage}>
            + Add
          </button>
        </div>

        {pages.length === 0 && <div className="pages-empty">No pages yet</div>}

        {pages.map((pg) => (
          <div
            key={pg.id}
            className={`page-list-item${pg.id === activePageId ? ' active' : ''}`}
            onClick={() => onSelectPage(pg.id)}
          >
            <span className="page-list-item-name">{pg.title || 'Untitled'}</span>
            <button
              className="page-del-btn"
              onClick={(e) => {
                e.stopPropagation()
                onDeletePage(pg.id)
              }}
              title="Delete page"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Page editor */}
      <div className="page-editor">
        {activePage ? (
          <>
            <input
              className="page-title-input"
              value={activePage.title}
              placeholder="Page title..."
              onChange={(e) => onUpdatePage(activePage.id, 'title', e.target.value)}
            />
            <textarea
              className="page-body-input"
              value={activePage.body}
              placeholder="Start writing your notes here..."
              onChange={(e) => onUpdatePage(activePage.id, 'body', e.target.value)}
            />
          </>
        ) : (
          <div className="no-page-selected">
            <span>✦</span>
            <p>Select or create a page</p>
          </div>
        )}
      </div>
    </div>
  )
}
