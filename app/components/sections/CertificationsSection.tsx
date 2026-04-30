'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, cardHover } from '@/lib/animationVariants'
import SectionContainer from '@/components/ui/SectionContainer'
import Card from '@/components/ui/Card'
import certificationsData from '@/data/certifications.json'
import type { Certification } from '@/lib/types'

export default function CertificationsSection() {
  const certifications = certificationsData as Certification[]

  return (
    <SectionContainer id="certifications" variant="default">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-10">
          Certifications & Awards
        </h2>
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {certifications.map((cert) => (
            <motion.div key={cert.id} variants={fadeInUp} whileHover="hover">
              <motion.div variants={cardHover}>
                <Card className="flex items-start gap-4 p-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <span className="text-accent text-xl">🏆</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">{cert.name}</h3>
                    {cert.issuer && (
                      <p className="text-sm text-foreground/80 mt-1">{cert.issuer}</p>
                    )}
                    {cert.date && (
                      <p className="text-sm text-foreground/60 mt-1">{cert.date}</p>
                    )}
                    {cert.url && (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline mt-2 inline-block">
                        View Certificate →
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
