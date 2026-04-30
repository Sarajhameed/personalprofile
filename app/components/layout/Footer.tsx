import profileData from '@/data/profile.json'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {profileData.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a href={profileData.linkedin} className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
            LinkedIn
          </a>
          <a href={`mailto:${profileData.email}`} className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
            Email
          </a>
          {profileData.phone && (
            <a href={`tel:${profileData.phone}`} className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
              Phone
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
