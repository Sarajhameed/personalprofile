'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, cardHover } from '@/lib/animationVariants'
import SectionContainer from '@/components/ui/SectionContainer'
import Card from '@/components/ui/Card'
import educationData from '@/data/education.json'
import type { Education } from '@/lib/types'

export default function EducationSection() {
  const education = educationData as Education[]

  return (
    <SectionContainer id="education" variant="alternate">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-10">
          Education
        </h2>
        <motion.div
          variants={staggerContainer}
          className="space-y-6"
        >
          {education.map((edu) => (
            <motion.div key={edu.id} variants={fadeInUp} whileHover="hover">
              <motion.div variants={cardHover}>
                <Card>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold text-foreground">{edu.degree}</h3>
                      {edu.institution && (
                        <p className="text-lg text-primary font-medium mt-1">{edu.institution}</p>
                      )}
                    </div>
                    <div className="mt-2 md:mt-0 text-sm text-foreground/60">
                      {edu.startDate} — {edu.endDate}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </SectionContainer>
  )
}
