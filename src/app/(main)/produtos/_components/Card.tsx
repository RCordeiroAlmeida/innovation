"use client"

import { StaticImageData } from "next/image"
import Image from "next/image"
import { useState } from "react"
import Badge from "./Badge"
import Cores from "./Cores"
import ProdutoModal from "./ProdutoModal"
import { Heart } from "lucide-react"

interface cardProps {
    nome: string
    codigo: string
    referencia?: string
    codigo_categoria?: string
    imagem: string | StaticImageData
    descricao: string
    preco: number

    
    isFavorito: boolean
    onToggleFavorito: (codigo: string) => void
}

const DESCRICAO_LIMITE = 80

export default function Card({
    nome,
    codigo,
    referencia,
    codigo_categoria,
    imagem,
    descricao,
    preco,
    isFavorito,
    onToggleFavorito
}: cardProps) {

    const [expandido, setExpandido] = useState(false)
    const [modalAberto, setModalAberto] = useState(false)

    const descricaoTruncada = descricao.slice(0, DESCRICAO_LIMITE).trimEnd()
    const temMais = descricao.length > DESCRICAO_LIMITE

    const [reais, centavos] = Number(preco).toFixed(2).split(".")

    return (
        <>
            <div className="bg-transparent w-full flex flex-col justify-center">
                
                <header className="text-center">
                    <h1 className="font-bold text-sm">{nome}</h1>
                    <p>{codigo}</p>
                </header>

                <div className="border border-gray-400 rounded-lg p-4 flex flex-col h-[480px]">

                    {/* 🔥 Imagem + favorito */}
                    <div className="relative h-52 shrink-0">

                        <Image
                            src={imagem}
                            alt="imagem do produto"
                            fill
                            className="object-contain z-0"
                        />

                        <Badge descricao="exclusivo!" className="right-0 absolute" />

                        {/* ❤️ Favorito */}
                        <button
                            onClick={() => onToggleFavorito(codigo)}
                            className="absolute top-2 left-2 z-10"
                        >
                            <Heart
                                className={`w-5 h-5 transition ${
                                    isFavorito
                                        ? "fill-red-500 text-red-500 scale-110"
                                        : "text-gray-400"
                                }`}
                            />
                        </button>
                    </div>

                    {/* Conteúdo */}
                    <div className="flex flex-col flex-1 justify-between mt-4">
                        <div className="space-y-3">

                            <p className="text-sm">
                                {expandido
                                    ? descricao
                                    : temMais
                                    ? `${descricaoTruncada}...`
                                    : descricao}

                                {temMais && (
                                    <button
                                        onClick={() => setExpandido(!expandido)}
                                        className="ml-1 text-blue-600 text-xs"
                                    >
                                        {expandido ? "ver menos" : "ver mais"}
                                    </button>
                                )}
                            </p>

                            <Cores />
                        </div>

                        {/* 💰 Preço melhorado */}
                        <div className="text-right leading-tight">
                            <p className="text-xs text-gray-400">
                                a partir de
                            </p>

                            <div className="flex justify-end items-start gap-1 text-lime-600 font-bold">
                                <span className="text-sm mt-1">R$</span>
                                <span className="text-xl">{reais}</span>
                                <span className="text-sm mt-1">,{centavos}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-2">
                    <button
                        onClick={() => setModalAberto(true)}
                        className="uppercase bg-lime-500 p-2 w-full rounded-md font-bold text-white hover:bg-lime-700 duration-300"
                    >
                        confira
                    </button>
                </div>
            </div>

            <ProdutoModal
                isOpen={modalAberto}
                onClose={() => setModalAberto(false)}
                nome={nome}
                codigo={codigo}
                referencia={referencia}
                codigo_categoria={codigo_categoria}
                imagem={imagem}
                descricao={descricao}
                preco={preco}
            />
        </>
    )
}