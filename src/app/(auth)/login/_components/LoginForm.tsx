"use client";

import { User, Lock } from "lucide-react";
import Input from "./Input";
import Checkbox from "./Checkbox";
import Button from "./Button";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthState";

import { api } from "@/app/lib/api";

import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from 'js-cookie';

export default function LoginForm() {
  const login = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    lembrar: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    senha: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setErrors((prev) => ({ ...prev, [name]: "" }));

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await api.post("/login/acessar", {
        email: formData.email,
        senha: formData.senha,
      });

      if (response.data.status === 1) {
        const { token_de_acesso, dados_usuario } = response.data;

        login(dados_usuario, token_de_acesso);
        Cookies.set('auth-token', token_de_acesso, { expires: 1 })
        router.push("/produtos");
      } else {
        alert(response.data.message || "Dados inválidos");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || "Erro na API";
        alert(message);
      } else {
        alert("Ocorreu um erro inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const tempErrors = { email: "", senha: "" };
    let isValid = true;

    // Validação de Usuário
    if (!formData.email.trim()) {
      tempErrors.email = "O usuário é obrigatório.";
      isValid = false;
    }

    // Validação de Senha
    if (!formData.senha) {
      tempErrors.senha = "A senha não pode estar vazia.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Input
          name="email"
          placeholder="Usuário"
          icon={User}
          onChange={handleChange}
          value={formData.email}
          error={errors.email}
        />

        <Input
          name="senha"
          placeholder="Senha"
          icon={Lock}
          type="password"
          onChange={handleChange}
          value={formData.senha}
          error={errors.senha}
        />

        <div className="flex justify-between">
          <Checkbox
            label={"Manter logado"}
            id="lembrar"
            name="lembrar"
            onChange={handleChange}
            checked={formData.lembrar}
          />
          <a
            href="#"
            className="ml-auto text-sm text-white dark:text-zinc-400 hover:underline"
          >
            Esqueceu a senha?
          </a>
        </div>

        <div className="flex justify-center">
          <Button type="submit" isLoading={loading}>
            Login
          </Button>
        </div>
      </div>
    </form>
  );
}
