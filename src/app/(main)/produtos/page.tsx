"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Card from "./_components/Card";
import CardSkeleton from "./_components/CardSkeleton";
import imgDefault from "@/assets/bg-login.jpg";
import FormFiltro from "./_components/FormFiltro";

interface IProduto {
  codigo: string;
  nome: string;
  referencia: string;
  imagem?: string;
  preco: string;
  descricao: string;
}

export default function Produtos() {
  const router = useRouter();

  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const [filtro, setFiltro] = useState("");
  const [filtroDebounce, setFiltroDebounce] = useState("");

  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [somenteFavoritos, setSomenteFavoritos] = useState(false);

  const [pagina, setPagina] = useState(1);
  const ITENS_POR_PAGINA = 10;

  const HEADER_HEIGHT = 120;

  // debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFiltroDebounce(filtro);
    }, 400);

    return () => clearTimeout(timeout);
  }, [filtro]);

  // favoritos
  useEffect(() => {
    const favs = localStorage.getItem("favoritos");
    if (favs) setFavoritos(JSON.parse(favs));
  }, []);

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  function toggleFavorito(codigo: string) {
    setFavoritos((prev) =>
      prev.includes(codigo)
        ? prev.filter((c) => c !== codigo)
        : [...prev, codigo]
    );
  }

  // fetch
  const fetchProdutos = async () => {
    setErro(null);

    const storage = localStorage.getItem("auth-storage");
    let token = "";

    if (storage) {
      const parsed = JSON.parse(storage);
      token = parsed.state?.token;
    }

    try {
      const response = await fetch(
        "https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/produtos/listar",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("auth-storage");
        router.push("/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.mensagem || "Erro ao carregar produtos");
      }

      setProdutos(data);
    } catch (err: any) {
      setErro(err.message || "Erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  // filtro
  const produtosFiltrados = produtos.filter((prod) => {
    const matchBusca = `${prod.nome} ${prod.codigo} ${prod.referencia}`
      .toLowerCase()
      .includes(filtroDebounce.toLowerCase());

    const matchFavorito =
      !somenteFavoritos || favoritos.includes(prod.codigo);

    return matchBusca && matchFavorito;
  });

  // paginação
  const produtosPaginados = produtosFiltrados.slice(
    0,
    pagina * ITENS_POR_PAGINA
  );

  // infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        if (produtosPaginados.length >= produtosFiltrados.length) return;

        setLoadingMore(true);

        setTimeout(() => {
          setPagina((prev) => prev + 1);
          setLoadingMore(false);
        }, 500);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [produtosPaginados.length, produtosFiltrados.length]);

  // reset pagina
  useEffect(() => {
    setPagina(1);
  }, [filtroDebounce, somenteFavoritos]);

  // loading inicial
  if (loading) {
    return (
      <section
        style={{ paddingTop: HEADER_HEIGHT }}
        className="p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </section>
    );
  }

  // erro
  if (erro) {
    return (
      <div
        style={{ paddingTop: HEADER_HEIGHT }}
        className="text-center mt-10"
      >
        <p className="text-red-500 mb-4">{erro}</p>
        <button
          onClick={fetchProdutos}
          className="bg-lime-500 text-white px-4 py-2 rounded"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <section style={{ paddingTop: HEADER_HEIGHT }} className="p-8">

      {/* filtro */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <FormFiltro filtro={filtro} setFiltro={setFiltro} />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={somenteFavoritos}
            onChange={(e) => setSomenteFavoritos(e.target.checked)}
          />
          Mostrar apenas favoritos
        </label>
      </div>

      {/* empty */}
      {produtosFiltrados.length === 0 ? (
        <p className="text-center text-gray-500">
          Nenhum produto encontrado
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {produtosPaginados.map((prod) => (
              <Card
                key={prod.codigo}
                nome={prod.nome}
                codigo={prod.codigo}
                imagem={prod.imagem || imgDefault}
                descricao={prod.descricao}
                preco={prod.preco}
                isFavorito={favoritos.includes(prod.codigo)}
                onToggleFavorito={toggleFavorito}
              />
            ))}
          </div>

          {/* skeleton incremental */}
          {loadingMore && (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}