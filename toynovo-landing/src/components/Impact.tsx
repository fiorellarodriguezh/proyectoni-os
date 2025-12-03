const stats = [
  {
    number: '500+',
    label: 'Juguetes reutilizados',
    description: 'Contribuyendo a reducir residuos',
  },
  {
    number: '200+',
    label: 'Familias beneficiadas',
    description: 'Ahorrando dinero y cuidando el planeta',
  },
  {
    number: '1.5T',
    label: 'CO₂ ahorrado',
    description: 'Impacto positivo en el medio ambiente',
  },
]

export default function Impact() {
  return (
    <section className="section-container bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
          Nuestro Impacto Ambiental
        </h2>
        <p className="text-lg text-primary-100 max-w-2xl mx-auto">
          Cada juguete reutilizado es un paso hacia un futuro más sostenible
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-5xl sm:text-6xl font-bold mb-2">
              {stat.number}
            </div>
            <div className="text-xl font-semibold mb-2">
              {stat.label}
            </div>
            <div className="text-primary-100">
              {stat.description}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <p className="text-lg text-primary-100 max-w-3xl mx-auto">
          La economía circular no es solo una tendencia, es una necesidad. 
          En Toynovo, cada familia que se une a nuestra comunidad contribuye 
          directamente a reducir el desperdicio y crear un mundo mejor para las futuras generaciones.
        </p>
      </div>
    </section>
  )
}

