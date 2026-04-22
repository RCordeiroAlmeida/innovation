'use client'

import { useAuthStore } from '@/store/useAuthState'

export function UserProfile() {
  const user = useAuthStore((state) => state.user);

  const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date())
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace('-feira', '');

  return (
    <div className="flex items-center gap-3 pl-6">
      <div className="w-20 h-20 rounded-full border-4 border-white bg-lime-600 flex items-center justify-center overflow-hidden">
        <span className="text-sm font-bold">
          {user?.nome_usuario?.charAt(0).toUpperCase() || 'U'}
        </span>
      </div>

      <div className="flex flex-col leading-tight">
        <span className="font-semibold text-sm">
          {user?.nome_usuario || 'Visitante'}
        </span>

        <span className="text-xs opacity-90">{dataFormatada}</span>
      </div>

      
    </div>
  );
}