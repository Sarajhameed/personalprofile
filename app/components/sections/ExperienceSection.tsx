'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, cardHover } from '@/lib/animationVariants'
import SectionContainer from '@/components/ui/SectionContainer'
import Card from '@/components/ui/Card'
import experienceData from '@/data/experience.json'

export default function ExperienceSection() {
  const sortedExperience = [...experienceData].reverse()

  return (
    <SectionContainer id="experience" variant="default">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-10">
          Professional Experience
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-blue-700 to-blue-600/20" />

          <motion.div
            variants={staggerContainer}
            className="space-y-8"
          >
            {sortedExperience.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={fadeInUp}
                className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white z-10 mt-6" />

                <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <motion.div variants={cardHover}>
                    <Card className="p-6 md:p-8">
                      <div className="mb-4">
                        <h3 className="text-xl md:text-2xl font-semibold text-slate-900">{exp.title}</h3>
                        <p className="text-lg text-blue-600 font-medium mt-1">{exp.company}</p>
                      </div>
                      <div className="text-sm text-slate-500 mb-4">
                        {exp.location && <p>{exp.location}</p>}
                        <p>{exp.startDate} — {exp.endDate || 'Present'}</p>
                      </div>
                      <ul className="space-y-2">
                        {exp.responsibilities.slice(0, 3).map((item, i) => (
                          <li key={i} className="text-slate-600 flex items-start gap-2">
                            <span className="text-blue-600 mt-1.5 text-xs">●</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      {exp.achievements.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <ul className="space-y-1">
                            {exp.achievements.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                                <span className="text-blue-600 mt-1">✦</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </SectionContainer>
  )
}
