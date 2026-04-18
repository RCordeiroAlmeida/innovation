"use client"

import { User, Lock} from "lucide-react";
import Input from "./Input";
import Checkbox from "./Checkbox";
import Button from "./Button";
import { useState } from "react";

export default function LoginForm(){

    const [formData, setFormData] = useState({
        email: "",
        senha: "",
        lembrar: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const{ name, value, type, checked} = e.target;

        let currentError = ""

        if (name === 'email' && value !== "") {
            const emailRegex = /\S+@\S+\.\S+/;
            if (!emailRegex.test(value)) {
                currentError = "Insira um email válido";
            }
        }

        if(name === 'senha' && value !== ""){
            if(value.length < 6){
                currentError = "A senha deve possuir no mínimo 6 caracteres"
            }
        }

        setErrors(prev => ({ ...prev, [name]: currentError }));

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (validate()) {
            console.log("Dados prontos para envio:", formData);
        } else {
            console.log("Erro na validação.");
        }
    };

    // Validação mínima do formulário
    const [errors, setErrors] = useState({
        email: "",
        senha: ""
    })

    const validate = () => {
        const tempErrors = { email: "", senha: "" };
        let isValid = true;

        // Validação de Email (Regex simples)
        const emailRegex = /\S+@\S+\.\S+/;
        if (!formData.email) {
            tempErrors.email = "O email é obrigatório.";
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            tempErrors.email = "Insira um email válido.";
            isValid = false;
        }

        // Validação de Senha
        if (!formData.senha) {
            tempErrors.senha = "A senha não pode estar vazia.";
            isValid = false;
        } else if (formData.senha.length < 6) {
            tempErrors.senha = "A senha deve ter pelo menos 6 caracteres.";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };


    return(
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
                        onChange={handleChange} checked={formData.lembrar}
                    />
                    <a href="#" className="ml-auto text-sm text-white dark:text-zinc-400 hover:underline">Esqueceu a senha?</a>
                </div>

                <div className="flex justify-center">
                    <Button type="submit">
                        Login
                    </Button>
                </div>
            </div>

            
        </form>
    )
}