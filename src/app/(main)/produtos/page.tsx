import Card from "./_components/Card";
import img from '@/assets/bg-login.jpg'

export default function Produtos(){
    return(

        <section className="mt-[120px] p-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Card nome="Teste" codigo="123456" imagem={img} descricao="teste vla bla bla" preco={800}></Card>
            </div>
        </section>

       
        
    )
}