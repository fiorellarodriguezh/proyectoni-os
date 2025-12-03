const steps = [
  {
    number: '1',
    title: 'Elige',
    description: 'Selecciona los juguetes que necesitas de nuestro catálogo. Tenemos opciones para todas las edades y necesidades.',
  },
  {
    number: '2',
    title: 'Alquila',
    description: 'Recibe los juguetes directamente en tu hogar. Proceso simple y rápido, sin complicaciones.',
  },
  {
    number: '3',
    title: 'Disfruta',
    description: 'Tu bebé juega y aprende con juguetes de calidad, mientras tú ahorras dinero y cuidas el planeta.',
  },
  {
    number: '4',
    title: 'Devuelve',
    description: 'Cuando ya no los necesites, los devuelves. Puedes cambiar por otros juguetes o finalizar el alquiler.',
  },
]

export default function HowItWorks() {
  return (
    <section className="section-container bg-white">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          ¿Cómo funciona?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Un proceso simple en 4 pasos
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-primary transform translate-x-4">
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-primary rounded-full"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

