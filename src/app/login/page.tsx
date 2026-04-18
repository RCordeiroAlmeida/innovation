import Image from "next/image";
import LoginForm from "./_components/LoginForm";

import BgLogin from "@/assets/bg-login.jpg"

export default function Login() {
  return (
    <div className="relative flex items-center justify-center min-h-screen flex-col gap-8">
      <Image 
        src={BgLogin} 
        quality={100}
        alt="Background" 
        fill 
        className="object-cover -z-20"
        priority // Carrega a imagem imediatamente
      />
      
      {/* Overlay para escurecer um pouco */}
      <div className="absolute inset-0 bg-black/30 -z-10" />

      <h1 className="font-bold text-2xl text-lime-500 drop-shadow-md">
        Bem vindo a Innovation Brindes
      </h1>
      
      <div className="bg-lime-500 dark:bg-zinc-900/95 p-8 rounded-lg shadow-2xl w-full max-w-md backdrop-blur-sm">
        <LoginForm />
      </div>
    </div>
  );
}