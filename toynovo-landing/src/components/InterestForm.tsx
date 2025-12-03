'use client'

import { useState } from 'react'

const DISTRICTS = [
  'Miraflores',
  'San Isidro',
  'San Borja',
  'Surco',
  'La Molina',
  'Barranco',
  'Pueblo Libre',
  'Jesús María',
  'Magdalena',
  'San Miguel',
  'Lince',
  'Surquillo',
  'Chorrillos',
  'Lima Centro',
  'Otro',
]

const PARTY_TYPES = [
  { value: 'family', label: 'Familia' },
  { value: 'school', label: 'Colegio' },
  { value: 'kindergarten', label: 'Jardín de Infancia' },
  { value: 'other', label: 'Otro' },
]

const HOW_FOUND_US = [
  { value: '', label: 'Selecciona una opción' },
  { value: 'social_media', label: 'Redes Sociales' },
  { value: 'referral', label: 'Referido por un amigo' },
  { value: 'search', label: 'Búsqueda en Google' },
  { value: 'other', label: 'Otro' },
]

interface FormData {
  fullName: string
  email: string
  phone: string
  partyType: string
  district: string
  childrenCount: string
  childrenAges: string
  institutionName: string
  howFoundUs: string
  message: string
  newsletterConsent: boolean
  termsAccepted: boolean
}

const initialFormData: FormData = {
  fullName: '',
  email: '',
  phone: '',
  partyType: 'family',
  district: '',
  childrenCount: '',
  childrenAges: '',
  institutionName: '',
  howFoundUs: '',
  message: '',
  newsletterConsent: false,
  termsAccepted: false,
}

export default function InterestForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const isInstitution = formData.partyType === 'school' || formData.partyType === 'kindergarten'

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!formData.fullName.trim() || formData.fullName.length < 2) {
      newErrors.fullName = 'Ingresa tu nombre completo'
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Ingresa un email válido'
    }

    if (!formData.phone.match(/^\+?[\d\s-]{9,}$/)) {
      newErrors.phone = 'Ingresa un teléfono válido'
    }

    if (!formData.district) {
      newErrors.district = 'Selecciona tu distrito'
    }

    if (isInstitution && !formData.institutionName.trim()) {
      newErrors.institutionName = 'Ingresa el nombre de la institución'
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'Debes aceptar los términos y condiciones'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Simulate API call - replace with actual API endpoint later
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log('Form data:', formData)
      setSubmitStatus('success')
      setFormData(initialFormData)
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="interes" className="section-container bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            ¿Te interesa Toynovo?
          </h2>
          <p className="text-lg text-gray-600">
            Déjanos tus datos y te contactaremos para brindarte más información
          </p>
        </div>

        {submitStatus === 'success' && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-center">
            <svg className="w-6 h-6 mx-auto mb-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="font-semibold">¡Gracias por tu interés!</p>
            <p className="text-sm">Te contactaremos pronto.</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-center">
            <p className="font-semibold">Hubo un error al enviar el formulario.</p>
            <p className="text-sm">Por favor, intenta nuevamente.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="card space-y-6">
          {/* Party Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Cómo nos contactas? *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PARTY_TYPES.map((type) => (
                <label
                  key={type.value}
                  className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.partyType === type.value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="partyType"
                    value={type.value}
                    checked={formData.partyType === type.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre completo *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Tu nombre completo"
            />
            {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="tu@email.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+51 999 999 999"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
            </div>
          </div>

          {/* Institution Name (conditional) */}
          {isInstitution && (
            <div>
              <label htmlFor="institutionName" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de la institución *
              </label>
              <input
                type="text"
                id="institutionName"
                name="institutionName"
                value={formData.institutionName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                  errors.institutionName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nombre del colegio o jardín"
              />
              {errors.institutionName && (
                <p className="mt-1 text-sm text-red-500">{errors.institutionName}</p>
              )}
            </div>
          )}

          {/* District */}
          <div>
            <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
              Distrito *
            </label>
            <select
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                errors.district ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Selecciona tu distrito</option>
              {DISTRICTS.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
            {errors.district && <p className="mt-1 text-sm text-red-500">{errors.district}</p>}
          </div>

          {/* Children Info (for families) */}
          {formData.partyType === 'family' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="childrenCount" className="block text-sm font-medium text-gray-700 mb-1">
                  Cantidad de hijos
                </label>
                <input
                  type="number"
                  id="childrenCount"
                  name="childrenCount"
                  min="1"
                  max="10"
                  value={formData.childrenCount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Ej: 2"
                />
              </div>
              <div>
                <label htmlFor="childrenAges" className="block text-sm font-medium text-gray-700 mb-1">
                  Edades de los niños
                </label>
                <input
                  type="text"
                  id="childrenAges"
                  name="childrenAges"
                  value={formData.childrenAges}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Ej: 2 años, 4 años"
                />
              </div>
            </div>
          )}

          {/* How Found Us */}
          <div>
            <label htmlFor="howFoundUs" className="block text-sm font-medium text-gray-700 mb-1">
              ¿Cómo nos encontraste?
            </label>
            <select
              id="howFoundUs"
              name="howFoundUs"
              value={formData.howFoundUs}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            >
              {HOW_FOUND_US.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Mensaje o consulta
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
              placeholder="Cuéntanos más sobre lo que buscas..."
            />
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="newsletterConsent"
                checked={formData.newsletterConsent}
                onChange={handleChange}
                className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm text-gray-600">
                Quiero recibir novedades y promociones de Toynovo
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className={`mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary ${
                  errors.termsAccepted ? 'border-red-500' : ''
                }`}
              />
              <span className="text-sm text-gray-600">
                Acepto los{' '}
                <a href="#" className="text-primary hover:underline">
                  términos y condiciones
                </a>{' '}
                y la{' '}
                <a href="#" className="text-primary hover:underline">
                  política de privacidad
                </a>{' '}
                *
              </span>
            </label>
            {errors.termsAccepted && (
              <p className="text-sm text-red-500">{errors.termsAccepted}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Enviando...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Enviar mi información
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  )
}
