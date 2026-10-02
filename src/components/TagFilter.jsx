import './TagFilter.css'

function TagFilter({ children, selected = false, disabled = false, onClick }) {
  return (
    <button
      type="button"
      className={selected ? 'tag-filter tag-filter--selected' : 'tag-filter'}
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default TagFilter