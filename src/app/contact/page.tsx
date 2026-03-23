'use client'
import { useLanguage } from '@/lib/language'
import { translations } from '@/lib/translations'
import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="w-full bg-[#0a0a0f]">
      {/* Header Section */}
      <section className="py-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.contact.title}
          </h1>
          <p className="text-xl text-gray-300">
            {t.contact.subtitle}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 md:px-8 lg:px-12 bg-[#1a1a23] border-y border-[#39ff14]/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-8">
                {t.contact.getInTouch}
              </h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white">
                {t.contact.contactInfo}
              </h2>

              {/* Email */}
              <div>
                <p className="text-gray-400 text-sm mb-2">
                  {t.contact.emailLabel}
                </p>
                <a
                  href="mailto:contact@overload.com"
                  className="text-[#39ff14] hover:text-[#f59e0b] text-lg font-semibold transition"
                >
                  contact@overload.com
                </a>
              </div>

              {/* Address */}
              <div>
                <p className="text-gray-400 text-sm mb-2">
                  {t.contact.addressLabel}
                </p>
                <p className="text-white font-semibold leading-relaxed">
                  ROOM B, 6/F., HOUSE OF CORONA<br />
                  50 HUNG TO ROAD<br />
                  KWUN TONG, HONG KONG
                </p>
              </div>

              {/* Company Info */}
              <div>
                <p className="text-gray-400 text-sm mb-2">
                  {t.contact.companyLabel}
                </p>
                <p className="text-white font-semibold">
                  {t.contact.companyName}
                </p>
              </div>

              {/* Hours */}
              <div>
                <p className="text-gray-400 text-sm mb-2">
                  {t.contact.hoursLabel}
                </p>
                <p className="text-white font-semibold">
                  {t.contact.hours}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
