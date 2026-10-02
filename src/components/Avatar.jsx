import './Avatar.css'

function Avatar({ src, alt = '', size = 'large', disabled = false }) {
  const classes = `avatar avatar--${size}${disabled ? ' avatar--disabled' : ''}`

  return (
    <span className={classes}>
      <img className="avatar__image" src={src} alt={alt} />
    </span>
  )
}

export default Avatar