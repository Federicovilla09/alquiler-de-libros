import './TagChoice.css'

function TagChoice({ children, variant = 'trope', selected = false, readOnly = false, onClick }) {
  const classes = `tag-choice tag-choice--${variant}${selected ? ' tag-choice--selected' : ''}`

  if (readOnly) {
    return <span className={`${classes} tag-choice--readonly`}>{children}</span>
  }

  return (
    <button type="button" className={classes} aria-pressed={selected} onClick={onClick}>
      {children}
    </button>
  )
}

export default TagChoice