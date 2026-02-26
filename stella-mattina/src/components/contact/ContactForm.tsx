'use client'
import { useState } from 'react'

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(`Website Inquiry from ${form.name}`)
    const body = encodeURIComponent(form.message)
    window.location.href = `mailto:info@stellamattina.com?subject=${subject}&body=${body}`
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sm-blue focus:border-sm-blue"
          placeholder="Jane Smith"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sm-blue focus:border-sm-blue"
          placeholder="jane@example.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">How can we help?</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sm-blue focus:border-sm-blue resize-y"
          placeholder="General questions, office hours, insurance questions..."
        />
      </div>
      <p className="text-xs text-gray-400">
        Please do not include personal medical information in this form. For medical questions, please call our office directly.
      </p>
      <button
        type="submit"
        className="w-full bg-sm-navy text-white font-medium py-3 px-6 rounded-lg hover:bg-sm-blue transition-colors"
      >
        Send Message
      </button>
    </form>
  )
}
