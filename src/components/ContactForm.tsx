'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language';
import { translations } from '@/lib/translations';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const CONTACT_EMAIL = 'support@overload.gg';

export default function ContactForm() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const t = translations[language];
  const contactT = t.contact || {};

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = contactT.nameRequired || 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = contactT.emailRequired || 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = contactT.emailInvalid || 'Invalid email format';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = contactT.subjectRequired || 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = contactT.messageRequired || 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-surface border border-primary/30 rounded-lg p-6 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="text-xl font-bold text-primary mb-2">
          {contactT.success || 'Message Sent Successfully'}
        </h3>
        <p className="text-gray-300">
          {contactT.successDescription ||
            'Thank you for contacting us. We will get back to you soon.'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            {contactT.name || 'Name'}
            <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full bg-black/50 border rounded px-4 py-2 text-white focus:outline-none transition ${
              errors.name ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'
            }`}
            placeholder={contactT.namePlaceholder || 'Your name'}
          />
          {errors.name && (
            <div className="text-red-400 text-sm mt-1">{errors.name}</div>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            {contactT.email || 'Email Address'}
            <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full bg-black/50 border rounded px-4 py-2 text-white focus:outline-none transition ${
              errors.email ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'
            }`}
            placeholder={contactT.emailPlaceholder || 'your@email.com'}
          />
          {errors.email && (
            <div className="text-red-400 text-sm mt-1">{errors.email}</div>
          )}
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            {contactT.subject || 'Subject'}
            <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className={`w-full bg-black/50 border rounded px-4 py-2 text-white focus:outline-none transition ${
              errors.subject ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'
            }`}
            placeholder={contactT.subjectPlaceholder || 'Message subject'}
          />
          {errors.subject && (
            <div className="text-red-400 text-sm mt-1">{errors.subject}</div>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            {contactT.message || 'Message'}
            <span className="text-primary">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className={`w-full bg-black/50 border rounded px-4 py-2 text-white focus:outline-none transition resize-none ${
              errors.message ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'
            }`}
            rows={5}
            placeholder={contactT.messagePlaceholder || 'Your message here...'}
          />
          {errors.message && (
            <div className="text-red-400 text-sm mt-1">{errors.message}</div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-black font-bold py-3 rounded hover:bg-secondary transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
        >
          {isSubmitting
            ? contactT.sending || 'Sending...'
            : contactT.send || 'Send Message'}
        </button>
      </form>

      {/* Response Time Info */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-sm text-gray-400">
          {contactT.responseTime || 'We typically respond within 24 hours'} -{' '}
          <span className="text-primary font-semibold">{CONTACT_EMAIL}</span>
        </p>
      </div>
    </div>
  );
}
