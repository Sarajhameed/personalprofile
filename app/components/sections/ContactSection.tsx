'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animationVariants'
import SectionContainer from '@/components/ui/SectionContainer'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import profileData from '@/data/profile.json'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!validateForm()) {
      setStatus('error')
      return
    }

    setStatus('submitting')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setFieldErrors({})
      } else {
        throw new Error(data.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message. Please try again.')
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
          Have a project or opportunity? Send me a message and I'll get back to you.
        </motion.p>

        <motion.form onSubmit={handleSubmit} variants={staggerContainer} className="space-y-6">
          <motion.div variants={fadeInUp}>
            <Input
              label="Name"
              placeholder="Your name"
              value={formData.name}
              onChange={(value) => setFormData({ ...formData, name: value })}
              required
            />
            {fieldErrors.name && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>
            )}
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(value) => setFormData({ ...formData, email: value })}
              required
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
            )}
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Input
              label="Subject"
              placeholder="What is this regarding?"
              value={formData.subject}
              onChange={(value) => setFormData({ ...formData, subject: value })}
              required
            />
            {fieldErrors.subject && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.subject}</p>
            )}
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Textarea
              label="Message"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={(value) => setFormData({ ...formData, message: value })}
              required
              rows={6}
            />
            {fieldErrors.message && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.message}</p>
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
