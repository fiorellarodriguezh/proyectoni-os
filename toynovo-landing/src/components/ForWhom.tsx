const audiences = [
  {
    icon: '👨‍👩‍👧',
    title: 'Familias',
    description: 'Para padres que buscan opciones sostenibles y económicas para sus bebés. Ahorra dinero mientras cuidas el planeta.',
  },
  {
    icon: '🏫',
    title: 'Colegios',
    description: 'Para instituciones educativas que necesitan juguetes didácticos sin realizar grandes inversiones. Ideal para aulas y espacios de juego.',
  },
  {
    icon: '🌱',
    title: 'Jardines de infancia',
    description: 'Para centros de cuidado infantil que buscan variedad en juguetes educativos y mantener sus espacios actualizados constantemente.',
  },
]

export default function ForWhom() {
  return (
    <section className="section-container bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Para quién es Toynovo
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Un servicio diseñado para diferentes necesidades
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {audiences.map((audience, index) => (
          <div key={index} className="card text-center">
            <div className="text-6xl mb-4">{audience.icon}</div>
            <h3 className="font-display text-2xl font-semibold text-gray-900 mb-4">
              {audience.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {audience.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

