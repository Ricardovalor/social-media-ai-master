'use client'

import { useSession } from 'next-auth/react'

export default function DashboardContent() {
  const { data: session } = useSession()

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Bem-vindo, {session?.user?.name}!</h2>
          <p className="text-gray-600">Esta é a sua área de trabalho.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-gray-600">Estatísticas</h3>
          <p className="text-2xl font-bold mt-2">Em desenvolvimento</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-gray-600">Atividades Recentes</h3>
          <p className="text-gray-600 mt-2">Nenhuma atividade recente.</p>
        </div>
      </div>
    </div>
  )
}
