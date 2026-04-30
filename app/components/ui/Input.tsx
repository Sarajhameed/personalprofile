interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  className?: string;
  autoComplete?: string;
}

export default function Input({ type = 'text', placeholder, value, onChange, label, required, className, autoComplete }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={label.toLowerCase().replace(/\s+/g, '-')} className="text-sm font-medium text-slate-700">
          {label} {required && <span className="text-red-500" aria-hidden="true">*</span>}
        </label>
      )}
      <input
        id={label?.toLowerCase().replace(/\s+/g, '-')}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        aria-required={required}
        className={`px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${className || ''}`}
      />
    </div>
  )
}
