import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-gray-50 text-gray-800">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center text-center px-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AgendApp — Seu sistema de agendamento online
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Transforme sua rotina com agendamentos automatizados e sem complicação.
          </p>
          <Link
            href="/agendar"
            className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-100 transition"
          >
            Começar agora
          </Link>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Por que usar o AgendApp?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: '100% online',
                desc: 'Permita que seus clientes agendem a qualquer hora, de onde estiverem.',
              },
              {
                title: 'Automatizado',
                desc: 'Evite falhas de comunicação e reduza faltas com lembretes automáticos.',
              },
              {
                title: 'Fácil de usar',
                desc: 'Interface intuitiva para você e seus clientes agendarem em poucos cliques.',
              },
            ].map(({ title, desc }) => (
              <div key={title} className="p-6 border rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Como funciona?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: '1. Crie sua conta',
                desc: 'Você pode integrar o sistema ao seu site ou usar de forma independente.',
              },
              {
                title: '2. Compartilhe seu link',
                desc: 'Divulgue o link para seus clientes agendarem diretamente.',
              },
              {
                title: '3. Acompanhe agendamentos',
                desc: 'Gerencie seus horários no painel administrativo fácil de usar.',
              },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos (mock) */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">O que estão dizendo</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-xl">
              <p className="mb-4 italic">
                “Desde que comecei a usar o AgendApp, minha agenda ficou organizada e os
                clientes adoraram a praticidade!”
              </p>
              <span className="font-semibold">— Camila, terapeuta</span>
            </div>
            <div className="p-6 border rounded-xl">
              <p className="mb-4 italic">
                “Simplesmente incrível! Consegui centralizar tudo em um só lugar e reduzir
                drasticamente os esquecimentos de horários.”
              </p>
              <span className="font-semibold">— Pedro, barbeiro</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-6 bg-blue-700 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Pronto para transformar seu atendimento?</h2>
        <Link
          href="/agendar"
          className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl hover:bg-blue-100 transition"
        >
          Agende seu horário agora
        </Link>
      </section>
    </main>
  );
}
