"use client"

import { StaticImageData } from "next/image"
import Image from "next/image"
import { useEffect } from "react"
import { X, Hash, Package, Layers, Tag } from "lucide-react"

export interface ProductModalProps {
    isOpen: boolean
    onClose: () => void
    nome: string
    codigo: string
    referencia?: string
    codigo_categoria?: string
    imagem: string | StaticImageData
    descricao: string
    preco: string
}

function InfoItem({
    icon,
    label,
    value,
    highlight,
}: {
    icon: React.ReactNode
    label: string
    value: string
    highlight?: boolean
}) {
    return (
        <div className="flex items-start gap-2 bg-gray-50 rounded-xl px-3 py-2.5">
            <span className="text-lime-600 mt-0.5 shrink-0">{icon}</span>
            <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{label}</p>
                <p className={`text-sm font-bold ${highlight ? "text-lime-600" : "text-gray-800"}`}>{value}</p>
            </div>
        </div>
    )
}

export default function ProductModal({
    isOpen,
    onClose,
    nome,
    codigo,
    referencia,
    codigo_categoria,
    imagem,
    descricao,
    preco,
}: ProductModalProps) {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
        if (isOpen) document.addEventListener("keydown", handleKey)
        return () => document.removeEventListener("keydown", handleKey)
    }, [isOpen, onClose])

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [isOpen])

    if (!isOpen) return null

    const precoNumerico = parseFloat(preco)
    const precoFormatado =
        !preco || isNaN(precoNumerico) || precoNumerico === 0
            ? "Consultar"
            : `R$ ${precoNumerico.toFixed(2).replace(".", ",")}`

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
        >
            <div
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col"
                style={{ maxHeight: "90vh", animation: "modalIn 0.22s cubic-bezier(.22,1,.36,1)" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Topo */}
                <div className="bg-lime-500 px-6 py-4 flex items-center justify-between shrink-0">
                    <div>
                        <h2 className="text-white font-extrabold text-lg leading-tight">{nome}</h2>
                        <p className="text-lime-100 text-xs mt-0.5">Código {codigo}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white hover:bg-lime-600 transition-colors rounded-full p-1.5"
                        aria-label="Fechar"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Conteúdo scrollável */}
                <div className="overflow-y-auto flex-1">
                    <div className="relative bg-gray-50 flex items-center justify-center" style={{ height: 260 }}>
                        <Image src={imagem} alt={nome} fill className="object-contain p-6" />
                        <span className="absolute top-3 right-3 bg-lime-500 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow">
                            exclusivo!
                        </span>
                    </div>

                    <div className="px-6 py-5 space-y-5">
                        <div>
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Descrição</h3>
                            <p className="text-sm text-gray-700 leading-relaxed">{descricao}</p>
                        </div>

                        <div>
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Informações</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <InfoItem icon={<Hash size={14} />} label="Código" value={codigo} />
                                {referencia && <InfoItem icon={<Package size={14} />} label="Referência" value={referencia} />}
                                {codigo_categoria && <InfoItem icon={<Layers size={14} />} label="Categoria" value={codigo_categoria} />}
                                <InfoItem icon={<Tag size={14} />} label="Preço" value={precoFormatado} highlight />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rodapé */}
                <div className="px-6 py-4 border-t border-gray-100 shrink-0 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 border border-gray-300 text-gray-600 rounded-lg py-2.5 text-sm font-semibold hover:bg-gray-50 transition-colors"
                    >
                        Fechar
                    </button>
                    <button className="flex-1 bg-lime-500 hover:bg-lime-600 text-white rounded-lg py-2.5 text-sm font-extrabold uppercase tracking-wide transition-colors">
                        Adicionar ao carrinho
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes modalIn {
                    from { opacity: 0; transform: scale(0.95) translateY(12px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}</style>
        </div>
    )
}