interface SectionContainerProps {
  children: React.ReactNode
  id?: string
  className?: string
  variant?: 'default' | 'alternate' | 'dark'
}

export default function SectionContainer({ children, id, className, variant = 'default' }: SectionContainerProps) {
  const bgClass = variant === 'alternate' ? 'bg-slate-50' : variant === 'dark' ? 'bg-slate-900' : 'bg-white'
  
  return (
    <section id={id} className={`w-full ${bgClass} py-20 sm:py-24 md:py-32 scroll-mt-16 ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
