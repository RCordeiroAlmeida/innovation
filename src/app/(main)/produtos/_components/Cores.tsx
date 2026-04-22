const cores = [
  { id: "vinho", color: "bg-pink-900" },
  { id: "azul-marinho", color: "bg-blue-900" },
  { id: "cinza", color: "bg-gray-400" },
  { id: "azul", color: "bg-blue-500" },
  { id: "lima", color: "bg-lime-400" },
  { id: "chumbo", color: "bg-gray-700" },
  { id: "branco", color: "bg-white border" },
  { id: "vermelho", color: "bg-red-500" },
  { id: "verde", color: "bg-green-500" },
  { id: "ciano", color: "bg-cyan-400" },
  { id: "azul-claro", color: "bg-sky-300" },
  { id: "laranja", color: "bg-orange-500" },
  { id: "amarelo", color: "bg-yellow-400" },
  { id: "preto", color: "bg-black" },
];

export default function Cores() {
  return (
    <div className="flex flex-wrap gap-3">
      {cores.map((cor) => (
        <label key={cor.id} className="cursor-pointer">
          
          <input
            type="radio"
            name="color"
            value={cor.id}
            className="peer hidden"
          />

          <div
            className={`
              w-6 h-6 rounded-full
              ${cor.color}
              border-2 border-gray-200
              peer-checked:border-lime-600
              peer-checked:scale-110
              transition
            `}
          />
        </label>
      ))}
    </div>
  );
}