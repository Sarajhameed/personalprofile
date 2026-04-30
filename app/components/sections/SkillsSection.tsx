'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animationVariants'
import SectionContainer from '@/components/ui/SectionContainer'
import Badge from '@/components/ui/Badge'
import SkillsChart from '@/components/sections/SkillsChart'
import skillsData from '@/data/skills.json'
import type { Skill } from '@/lib/types'

const categoryLabels = {
  core: 'Core Competencies',
  technical: 'Technical Skills',
  professional: 'Professional Skills'
}

const categoryColors = {
  core: 'bg-blue-50 text-blue-700 border-blue-200',
  technical: 'bg-slate-50 text-slate-700 border-slate-200',
  professional: 'bg-indigo-50 text-indigo-700 border-indigo-200'
}

export default function SkillsSection() {
  const skills = skillsData as Skill[]

  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <SectionContainer id="skills" variant="alternate">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-semibold text-slate-900 mb-10">
          Skills & Expertise
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skill Badges */}
          <motion.div variants={fadeInUp} className="space-y-8">
            {Object.entries(grouped).map(([category, skills]) => (
              <motion.div key={category} variants={fadeInUp}>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  {categoryLabels[category as keyof typeof categoryLabels]}
                </h3>
                <motion.div
                  variants={staggerContainer}
                  className="flex flex-wrap gap-3"
                >
                  {skills.map((skill, i) => (
                    <motion.div key={i} variants={fadeInUp} className="flex flex-col items-center gap-2">
                      <Badge className={`${categoryColors[skill.category as keyof typeof categoryColors]} px-4 py-2 text-sm`}>
                        {skill.name}
                      </Badge>
                      {skill.level && (
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="h-full bg-blue-600 rounded-full"
                          />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Skills Chart Visualization */}
          <motion.div variants={fadeInUp}>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Proficiency Overview</h3>
              <SkillsChart />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </SectionContainer>
  )
}
