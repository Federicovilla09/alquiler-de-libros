import './TagChoice.css'

function TagChoice({ children, variant = 'trope', selected = false, onClick }) {
  const classes = `tag-choice tag-choice--${variant}${selected ? ' tag-choice--selected' : ''}`

  return (
    <button type="button" className={classes} aria-pressed={selected} onClick={onClick}>
      {children}
    </button>
  )
}

export default TagChoice