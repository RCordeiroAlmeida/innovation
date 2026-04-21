import { StaticImageData } from "next/image"

import Image from "next/image"
import Badge from "./Badge"
import Cores from "./Cores"

interface cardProps{
    nome: string,
    codigo: string,
    imagem: string | StaticImageData,
    descricao: string,
    preco: number
}

export default function Card({nome, codigo, imagem, descricao, preco}: cardProps){
    return (

        <div className="bg-transparent w-full flex flex-col justify-center">
            <header className="text-center">
                <h1 className="font-bold">{nome}</h1>
                <p>{codigo}</p>
            </header>

            <div className="border border-gray-400 rounded-lg p-4">
                <div className="relative h-68">
                    <Image
                        src={imagem}
                        alt="imagem do produto"
                        fill    
                        className="object-contain z-0"
                    >
                    </Image>
                    <Badge descricao="exclusivo!" className="right-0 absolute"></Badge>
                </div>
                <div className="flex flex-col">
                    <div className="space-y-4">
                        <p>{descricao}</p>
                        <Cores></Cores>
                    </div>
                    <div className="text-right">
                        <p>Preço: {preco}</p>
                    </div>
                </div>
            </div>

            <div>

            </div>
            
        </div>
    )
}
