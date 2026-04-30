'use client'

import { useState } from 'react'
import { z } from 'zod'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { fadeInUp, staggerContainer, buttonInteraction } from '@/lib/animationVariants'
import SectionContainer from '@/components/ui/SectionContainer'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import profileData from '@/data/profile.json'

const contactSchema = z.object({
  name: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message too long'),
})

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || ''
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ''
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [validationError, setValidationError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError('')

    const validation = contactSchema.safeParse(formData)
    if (!validation.success) {
      const firstError = validation.error.issues[0]?.message || 'Please check your input'
      setValidationError(firstError)
      setStatus('error')
      return
    }

    setStatus('submitting')

    try {
      const templateParams = {
        from_name: formData.name || 'Anonymous',
        from_email: 'Contact Form Submission - Email in message body',
        message: formData.message,
        to_email: profileData.email,
      }

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )

      if (result.status === 200) {
        setStatus('success')
        setFormData({ name: '', message: '' })
      } else {
        throw new Error(`Failed to send: ${result.text || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('EmailJS error:', error)
      setStatus('error')
      if (error instanceof Error) {
        setErrorMessage(error.message || 'Failed to send message. Please try again.')
      } else {
        setErrorMessage('Failed to send message. Please email me directly.')
      }
    }
  }

  return (
    <SectionContainer id="contact" variant="alternate">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="max-w-2xl mx-auto"
      >
        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6 text-center">
          Get In Touch
        </motion.h2>
        <motion.p variants={fadeInUp} className="text-lg text-slate-600 text-center mb-10">
          Have a project or opportunity? Send me a message and include your email if you want a reply.
        </motion.p>

        <motion.form onSubmit={handleSubmit} variants={staggerContainer} className="space-y-6">
          <motion.div variants={fadeInUp}>
            <Input
              label="Name (Optional)"
              placeholder="Your name"
              value={formData.name}
              onChange={(value) => setFormData({ ...formData, name: value })}
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Textarea
              label="Message"
              placeholder="Write your message here. Please include your email address if you want me to reply."
              value={formData.message}
              onChange={(value) => setFormData({ ...formData, message: value })}
              required
              rows={6}
            />
            {validationError && (
              <p className="text-red-500 text-sm mt-2">{validationError}</p>
            )}
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full justify-center"
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </Button>
          </motion.div>

          {status === 'success' && (
            <motion.div variants={fadeInUp} aria-live="polite" className="text-center">
              <p className="text-blue-600 font-medium mb-2">Message sent successfully! ✓</p>
              <p className="text-sm text-slate-600">I'll get back to you soon.</p>
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div variants={fadeInUp} aria-live="polite" className="text-center">
              <p className="text-red-500 font-medium mb-2">Failed to send message ✗</p>
              <p className="text-sm text-slate-600">{errorMessage}</p>
              <p className="text-sm text-slate-600 mt-2">
                Or email me directly at{' '}
                <a href={`mailto:${profileData.email}`} className="text-blue-600 hover:underline">
                  {profileData.email}
                </a>
              </p>
            </motion.div>
          )}
        </motion.form>

        <motion.div
          variants={fadeInUp}
          className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a href={`mailto:${profileData.email}`} className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
            <span className="p-2 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors">📧</span>
            {profileData.email}
          </a>
          {profileData.linkedin && (
            <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
              <span className="p-2 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors">💼</span>
              LinkedIn
            </a>
          )}
          {profileData.phone && (
            <a href={`tel:${profileData.phone}`} className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
              <span className="p-2 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors">📞</span>
              {profileData.phone}
            </a>
          )}
        </motion.div>
      </motion.div>
    </SectionContainer>
  )
}
