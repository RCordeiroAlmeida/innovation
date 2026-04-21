interface BadgeProps {
  descricao: string;
  className?: string;
}

export default function Badge({ descricao, className = "" }: BadgeProps) {
  return (
    <div
      className={`z-100 inline-flex items-center gap-1 bg-gray-200 text-teal-400 text-[10px] font-bold tracking-widest px-2.5 py-1 shadow-lg ${className}`}
    >
      <span className="uppercase">{descricao}</span>
    </div>
  );
}