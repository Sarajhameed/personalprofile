'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animationVariants'
import SectionContainer from '@/components/ui/SectionContainer'
import profileData from '@/data/profile.json'

export default function AboutSection() {
  return (
    <SectionContainer id="about" variant="alternate">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-10">
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-slate-600 leading-relaxed">
              {profileData.bio}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <p className="text-sm text-slate-500 mb-1">Location</p>
                <p className="font-semibold text-slate-900">📍 {profileData.location}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <p className="text-sm text-slate-500 mb-1">Email</p>
                <a href={`mailto:${profileData.email}`} className="font-semibold text-blue-600 hover:underline">
                  {profileData.email}
                </a>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl flex items-center justify-center border border-slate-200">
              <span className="text-8xl">👤</span>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
              <p className="text-3xl font-bold text-blue-600">15+</p>
              <p className="text-sm text-slate-600">Years Experience</p>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  )
}
