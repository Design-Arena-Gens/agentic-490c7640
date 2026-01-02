'use client'

import { useState } from 'react'
import styles from './page.module.css'

interface Lead {
  name: string
  email: string
  phone: string
  interests: string[]
  budget: string
  timestamp: string
}

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interests: [] as string[],
    budget: '',
    subscribe: false
  })

  const [submitted, setSubmitted] = useState(false)
  const [leads, setLeads] = useState<Lead[]>([])
  const [showLeads, setShowLeads] = useState(false)

  const interestOptions = [
    'Casual Wear',
    'Formal Wear',
    'Streetwear',
    'Athletic Wear',
    'Accessories',
    'Footwear'
  ]

  const budgetOptions = [
    'Under $100',
    '$100 - $300',
    '$300 - $500',
    '$500+'
  ]

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newLead: Lead = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      interests: formData.interests,
      budget: formData.budget,
      timestamp: new Date().toISOString()
    }

    setLeads(prev => [newLead, ...prev])
    setSubmitted(true)

    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        interests: [],
        budget: '',
        subscribe: false
      })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.logo}>✨ StyleHub</h1>
          <p className={styles.tagline}>Elevate Your Fashion Game</p>
        </div>

        {!submitted ? (
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Join Our VIP List</h2>
            <p className={styles.formSubtitle}>
              Get exclusive access to new collections, styling tips, and special offers
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  placeholder="john@example.com"
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="phone">Phone Number *</label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className={styles.inputGroup}>
                <label>What are you interested in? *</label>
                <div className={styles.checkboxGrid}>
                  {interestOptions.map(interest => (
                    <label key={interest} className={styles.checkbox}>
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleInterestToggle(interest)}
                      />
                      <span>{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="budget">Monthly Shopping Budget *</label>
                <select
                  id="budget"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  required
                >
                  <option value="">Select your budget</option>
                  {budgetOptions.map(budget => (
                    <option key={budget} value={budget}>{budget}</option>
                  ))}
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.subscribe}
                    onChange={(e) => setFormData({...formData, subscribe: e.target.checked})}
                  />
                  <span>I want to receive style tips and exclusive offers via email</span>
                </label>
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={formData.interests.length === 0}
              >
                Join the VIP List
              </button>
            </form>
          </div>
        ) : (
          <div className={styles.successCard}>
            <div className={styles.successIcon}>✓</div>
            <h2>Welcome to StyleHub!</h2>
            <p>Thank you for joining our VIP list. We'll be in touch soon with exclusive offers tailored to your style preferences.</p>
          </div>
        )}

        <button
          onClick={() => setShowLeads(!showLeads)}
          className={styles.adminButton}
        >
          {showLeads ? 'Hide' : 'View'} Leads ({leads.length})
        </button>

        {showLeads && leads.length > 0 && (
          <div className={styles.leadsPanel}>
            <h3>Captured Leads</h3>
            <div className={styles.leadsList}>
              {leads.map((lead, index) => (
                <div key={index} className={styles.leadCard}>
                  <div className={styles.leadHeader}>
                    <strong>{lead.name}</strong>
                    <span className={styles.leadTime}>
                      {new Date(lead.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className={styles.leadDetails}>
                    <p>📧 {lead.email}</p>
                    <p>📱 {lead.phone}</p>
                    <p>💰 {lead.budget}</p>
                    <p>🛍️ {lead.interests.join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
