import React from "react";

const RegisterPage = () => {
  return (
    <main className="container min-h-screen mx-auto px-7 md:px-30 lg:px-50 xl:px-70 py-42 bg-blue-200">
      <div className="flex flex-col items-center justify-center shadow-2xl p-8 rounded-[10px] bg-white">
        <h2 className="text-xl font-bold mb-5">Cadastre-se</h2>
        <form action="" className="flex flex-col gap-4 w-full">
          <input
            type="text"
            name="nome"
            placeholder="Seu nome e sobrenome"
            // value={""}
            // onChange={""}
            required
            className="border px-4 py-2 rounded"
          />
          <input
            type="text"
            name="telefone"
            placeholder="Seu telefone (Whatsapp)"
            // value={""}
            // onChange={""}
            required
            className="border px-4 py-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            // value={""}
            // onChange={""}
            required
            className="border px-4 py-2 rounded"
          />
          <button type="submit" className="btn bg-blue-500 hover:bg-blue-600 text-white">
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
};

export default RegisterPage;
