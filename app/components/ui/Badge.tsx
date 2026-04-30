interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 ${className || ''}`}>
      {children}
    </span>
  )
}
