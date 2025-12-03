const benefits = [
  {
    icon: '💰',
    title: 'Ahorro económico',
    description: 'Paga solo por el tiempo que necesites. Sin inversión inicial en juguetes que tu bebé usará por poco tiempo.',
  },
  {
    icon: '🌱',
    title: 'Sostenibilidad',
    description: 'Reduce residuos y cuida el planeta. Cada juguete se reutiliza múltiples veces, minimizando el impacto ambiental.',
  },
  {
    icon: '🎯',
    title: 'Variedad',
    description: 'Accede a juguetes educativos y de calidad sin comprar. Cambia de juguetes según las necesidades de tu bebé.',
  },
  {
    icon: '🔄',
    title: 'Flexibilidad',
    description: 'Cambia de juguetes cuando tu bebé crezca. Sin compromisos a largo plazo, adapta el servicio a tu ritmo.',
  },
]

export default function Benefits() {
  return (
    <section className="section-container bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Beneficios de Toynovo
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Una solución inteligente para familias modernas y conscientes
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="card text-center">
            <div className="text-5xl mb-4">{benefit.icon}</div>
            <h3 className="font-display text-xl font-semibold text-gray-900 mb-3">
              {benefit.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

