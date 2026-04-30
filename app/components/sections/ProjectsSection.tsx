'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, cardHover } from '@/lib/animationVariants'
import SectionContainer from '@/components/ui/SectionContainer'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import projectsData from '@/data/projects.json'
import type { Project } from '@/lib/types'

export default function ProjectsSection() {
  const projects = projectsData as Project[]

  return (
    <SectionContainer id="projects" variant="default">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-10">
          Volunteer Experience
        </h2>
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={fadeInUp} whileHover="hover">
              <motion.div variants={cardHover}>
                <Card className="h-full flex flex-col p-6">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
                      {project.title}
                    </h3>
                    {project.organization && (
                      <p className="text-blue-600 font-medium mb-3">{project.organization}</p>
                    )}
                    <p className="text-slate-600 mb-4">
                      {project.description}
                    </p>
                    {project.features.length > 0 && (
                      <div className="mb-4">
                        <ul className="space-y-1">
                          {project.features.map((feature, i) => (
                            <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                              <span className="text-blue-600 mt-1">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-4 mt-6 pt-4 border-t border-slate-200">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                        View Details →
                      </a>
                    )}
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
