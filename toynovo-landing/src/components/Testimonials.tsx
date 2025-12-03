const testimonials = [
  {
    name: 'María González',
    role: 'Madre de familia',
    content: 'Toynovo ha sido una solución perfecta para nosotros. Ahorramos mucho dinero y mi bebé siempre tiene juguetes nuevos y educativos.',
  },
  {
    name: 'Carlos Ramírez',
    role: 'Director de Jardín Infantil',
    content: 'Excelente servicio para nuestro centro. Los juguetes están en perfecto estado y nos permiten renovar constantemente sin grandes costos.',
  },
  {
    name: 'Ana Martínez',
    role: 'Maestra de preescolar',
    content: 'La variedad de juguetes educativos es impresionante. Mis estudiantes están encantados y yo estoy feliz de contribuir al medio ambiente.',
  },
]

export default function Testimonials() {
  return (
    <section className="section-container bg-white">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Lo que dicen nuestros clientes
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Familias e instituciones que confían en nosotros
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="card">
            <div className="mb-4">
              <svg className="w-12 h-12 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
              </svg>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed italic">
              "{testimonial.content}"
            </p>
            <div>
              <p className="font-semibold text-gray-900">{testimonial.name}</p>
              <p className="text-sm text-gray-600">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

