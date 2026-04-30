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
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [lastSubmitTime, setLastSubmitTime] = useState(0)

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters'
    }

    // Spam prevention: limit to 1 submission per 30 seconds
    const now = Date.now()
    if (now - lastSubmitTime < 30000) {
      errors.spam = 'Please wait 30 seconds before sending another message'
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
    setLastSubmitTime(Date.now())

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
        setFormData({ subject: '', message: '' })
        setFieldErrors({})
        // Auto-hide success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000)
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

          {fieldErrors.spam && (
            <motion.div variants={fadeInUp} className="text-center">
              <p className="text-red-500 text-sm">{fieldErrors.spam}</p>
            </motion.div>
          )}

          <motion.div variants={fadeInUp}>
            <Button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full justify-center"
            >
              {status === 'submitting' ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </Button>
          </motion.div>

          {status === 'success' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              variants={fadeInUp} 
              aria-live="polite" 
              className="text-center bg-blue-50 border border-blue-200 rounded-xl p-4"
            >
              <p className="text-blue-700 font-medium mb-1">✓ Message sent successfully!</p>
              <p className="text-sm text-blue-600">I'll get back to you soon.</p>
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              variants={fadeInUp} 
              aria-live="polite" 
              className="text-center bg-red-50 border border-red-200 rounded-xl p-4"
            >
              <p className="text-red-700 font-medium mb-1">✗ Failed to send message</p>
              <p className="text-sm text-red-600">{errorMessage}</p>
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
