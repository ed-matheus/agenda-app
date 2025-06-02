"use client";

import Image from "next/image";
import Link from "next/link";

export default function SobrePage() {
  return (
    <main className="bg-white text-gray-800">
      {/* Seção Hero */}
      <section className="bg-blue-50 py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
          Nossa Jornada, Seu Futuro
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          A AgendApp nasceu com o propósito de transformar a forma como
          profissionais e clientes se conectam.
        </p>
      </section>

      {/* Seção Quem Somos */}
      <section className="px-6 md:px-20 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold text-blue-600 mb-4 text-center md:text-start">
            Quem Somos
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-center md:text-start">
            Somos uma startup focada em soluções de agendamento inteligente para
            profissionais e empresas. Buscamos facilitar o dia a dia com
            tecnologia intuitiva, design acessível e foco total na experiência
            do usuário.
          </p>
          <p className="text-gray-700 leading-relaxed text-center md:text-start">
            Com uma equipe apaixonada por inovação, entregamos praticidade e
            eficiência em cada detalhe da nossa plataforma.
          </p>
        </div>
        <div className="w-full h-75 md:h-80 relative">
          <Image
            src="/img/about.jpg" 
            alt="Equipe AgendApp"
            fill
            className="object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Missão, Visão, Valores */}
      <section className="bg-gray-50 py-16 xl:py-20 px-6 md:px-20">
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {[
            {
              title: "Missão",
              desc: "Simplificar o agendamento de serviços e otimizar o tempo de todos os envolvidos.",
            },
            {
              title: "Visão",
              desc: "Ser referência nacional em soluções digitais para gestão de agendamentos.",
            },
            {
              title: "Valores",
              desc: "Transparência, inovação, respeito ao usuário e melhoria contínua.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-blue-600 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Chamada final */}
      <section className="text-center py-16 px-6">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Pronto para conhecer uma nova forma de agendar?
        </h2>
        <Link href="/contato">
          <button
            type="button"
            className="btn bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 font-semibold shadow"
          >
            Fale com a gente
          </button>
        </Link>
      </section>
    </main>
  );
}
