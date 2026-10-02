import './Button.css'
import Icon from './Icon'

function Button({
  variant = 'primary',
  icon,
  children,
  disabled = false,
  type = 'button',
  onClick,
  ariaLabel,
}) {
  const isIconOnly = variant === 'icon'

  return (
    <button
      type={type}
      className={`button button--${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {icon && <Icon name={icon} size={isIconOnly ? 16 : 14} />}
      {!isIconOnly && children}
    </button>
  )
}

export default Button