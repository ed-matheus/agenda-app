"use client";

export default function ContatoPage() {
  return (
    <main className="bg-white text-gray-800">
      {/* Seção Hero */}
      <section className="bg-blue-50 py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
          Entre em Contato
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Tem dúvidas, sugestões ou deseja saber mais? Fale com a gente!
        </p>
      </section>

      {/* Formulário + Informações */}
      <section className="px-6 md:px-25 lg:px-35 xl:px-50 py-22 grid md:grid-cols-2 gap-12">
        {/* Formulário */}
        <form className="space-y-6">
          <div>
            <label
              htmlFor="nome"
              className="block mb-1 font-medium text-gray-700"
            >
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              required
              className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-1 font-medium text-gray-700"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="mensagem"
              className="block mb-1 font-medium text-gray-700"
            >
              Mensagem
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              rows={5}
              required
              className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Como podemos te ajudar?"
            />
          </div>

          <button
            type="submit"
            className="btn bg-blue-500 hover:bg-blue-400 text-white font-semibold shadow"
          >
            Enviar Mensagem
          </button>
        </form>

        {/* Informações de contato */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Email</h2>
            <p className="text-gray-700">contato@agendapp.com</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              Telefone
            </h2>
            <p className="text-gray-700">(11) 91234-5678</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              Localização
            </h2>
            <p className="text-gray-700">São Paulo, SP – Brasil</p>
          </div>
        </div>
      </section>
    </main>
  );
}
