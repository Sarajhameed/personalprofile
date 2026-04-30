import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  href?: string
  download?: boolean | string
}

export default function Button({ children, variant = 'primary', href, className, download, ...props }: ButtonProps) {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.875rem 2rem',
    borderRadius: '1rem',
    fontWeight: 'bold',
    color: '#ffffff',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    textDecoration: 'none',
  }

  if (variant === 'primary') {
    baseStyle.backgroundColor = '#2563eb'
    baseStyle.boxShadow = '0 4px 6px rgba(37, 99, 235, 0.1)'
  } else if (variant === 'secondary') {
    baseStyle.backgroundColor = '#ffffff'
    baseStyle.color = '#0f172a'
    baseStyle.border = '1px solid #e2e8f0'
  } else {
    baseStyle.backgroundColor = 'transparent'
    baseStyle.border = '2px solid #2563eb'
    baseStyle.color = '#2563eb'
  }

  const allClasses = `inline-flex items-center justify-center px-8 py-3.5 rounded-2xl font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className || ''}`

  if (href) {
    return (
      <a href={href} download={download} className={allClasses} style={baseStyle}>
        {children}
      </a>
    )
  }

  return (
    <button {...props} className={allClasses} style={baseStyle}>
      {children}
    </button>
  )
}
