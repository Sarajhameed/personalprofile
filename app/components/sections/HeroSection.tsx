'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, buttonInteraction } from '@/lib/animationVariants'
import Button from '@/components/ui/Button'
import profileData from '@/data/profile.json'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Royal Blue Gradient Background with subtle pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'1\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      </div>
      
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.p variants={fadeInUp} className="text-sm sm:text-base uppercase tracking-[0.2em] text-blue-200 mb-4 font-medium">
            Hello, I'm
          </motion.p>

          <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            {profileData.name}
          </motion.h1>

          <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl md:text-4xl font-semibold text-blue-100 mb-8">
            {profileData.title}
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-base sm:text-lg text-blue-100/90 max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed">
            {profileData.bio}
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 px-4 sm:px-0 relative z-20">
            <motion.div variants={buttonInteraction} whileHover="hover" whileTap="tap" className="w-full sm:w-auto">
              <Button href="#about" variant="primary" className="w-full sm:w-auto min-w-[160px] text-base">
                Learn More
              </Button>
            </motion.div>
            <motion.div variants={buttonInteraction} whileHover="hover" whileTap="tap" className="w-full sm:w-auto">
              <Button href="#contact" variant="secondary" className="w-full sm:w-auto min-w-[160px] text-base bg-white text-slate-900 border-white hover:bg-slate-100">
                Contact Me
              </Button>
            </motion.div>
            {profileData.resumeUrl && (
              <motion.div variants={buttonInteraction} whileHover="hover" whileTap="tap" className="w-full sm:w-auto">
                <Button href={profileData.resumeUrl} variant="outline" download={profileData.resumeUrl.split('/').pop()} className="w-full sm:w-auto min-w-[160px] text-base border-white text-white hover:bg-white/10">
                  Download Resume
                </Button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
