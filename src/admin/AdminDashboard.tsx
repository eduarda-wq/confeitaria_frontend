// File: confeitaria_frontend/src/admin/AdminDashboard.tsx

import './AdminDashboard.css'
import { useEffect, useState } from "react";
import { VictoryPie, VictoryLabel, VictoryTheme } from "victory";

const apiUrl = import.meta.env.VITE_API_URL

// CORRIGIDO: Renomeado para refletir o contexto de Bolos/Categorias
type graficoCategoriaType = {
  categoria: string // De 'marca' para 'categoria'
  num: number
}

type graficoClienteType = {
  cidade: string
  num: number
}

type geralDadosType = {
  clientes: number
  bolos: number     // De 'carros' para 'bolos'
  pedidos: number   // De 'propostas' para 'pedidos'
}

export default function AdminDashboard() {
  // CORRIGIDO: Renomeado de carrosMarca para bolosCategoria
  const [bolosCategoria, setBolosCategoria] = useState<graficoCategoriaType[]>([]) 
  const [clientesCidade, setClientesCidade] = useState<graficoClienteType[]>([])
  const [dados, setDados] = useState<geralDadosType>({} as geralDadosType)

  useEffect(() => {
    async function getDadosGerais() {
      const response = await fetch(`${apiUrl}/dashboard/gerais`)
      const dados = await response.json()
      setDados(dados)
    }
    getDadosGerais()

    async function getDadosGraficoCategoria() {
      // CORRIGIDO: Endpoint para buscar bolos por categoria
      const response = await fetch(`${apiUrl}/dashboard/bolosPorCategoria`) 
      const dados = await response.json()
      setBolosCategoria(dados)
    }
    getDadosGraficoCategoria()

    async function getDadosGraficoCliente() {
      const response = await fetch(`${apiUrl}/dashboard/clientesCidade`)
      const dados = await response.json()
      setClientesCidade(dados)
    }
    getDadosGraficoCliente()

  }, [])

  // CORRIGIDO: Mapeamento usa 'categoria'
  const listaBolosCategoria = bolosCategoria.map(item => (
    { x: item.categoria, y: item.num } 
  ))

  const listaClientesCidade = clientesCidade.map(item => (
    { x: item.cidade, y: item.num }
  ))

  // RGB para amber-800 (Chocolate Vibrante) para o texto do gráfico
  const chocolateColor = "rgb(146, 64, 14)"; 
  
  return (
    <div className="container mt-24">
      {/* Título com cor de chocolate vibrante (amber-900) */}
      <h2 className="text-3xl mb-4 font-bold text-amber-900">Visão Geral do Sistema</h2>

      <div className="w-2/3 flex justify-between mx-auto mb-5">
        
        {/* KPI 1: Clientes (Mantido em Ciano/Azul para distinção, texto em chocolate) */}
        <div className="border-cyan-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-cyan-100 text-cyan-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-cyan-900 dark:text-cyan-300">
            {dados.clientes}</span>
          <p className="font-bold mt-2 text-center text-amber-900">Nº Clientes</p>
        </div>
        
        {/* KPI 2: Bolos (Vibrante) */}
        <div className="border-amber-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-amber-100 text-amber-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-amber-900 dark:text-amber-300">
            {dados.bolos}</span> 
          <p className="font-bold mt-2 text-center text-amber-900">Nº Bolos</p>
        </div>
        
        {/* KPI 3: Pedidos (Vibrante) */}
        <div className="border-amber-600 border rounded p-6 w-1/3">
          <span className="bg-amber-100 text-amber-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-amber-900 dark:text-amber-300">
            {dados.pedidos}</span> 
          <p className="font-bold mt-2 text-center text-amber-900">Nº Pedidos</p>
        </div>
      </div>

      <div className="div-graficos">
        <svg viewBox="30 55 400 400">
          <VictoryPie
            standalone={false}
            width={400}
            height={400}
            data={listaBolosCategoria} // CORRIGIDO
            innerRadius={50}
            labelRadius={80}
            theme={VictoryTheme.clean}
            style={{
              labels: {
                fontSize: 10,
                fill: "#fff",
                fontFamily: "Arial",
                fontWeight: "bold"
              }
            }}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{
              fontSize: 12,
              fill: chocolateColor, // Cor Chocolate
              fontFamily: "Arial",
              fontWeight: "bold"
            }}
            x={200}
            y={200}
            text={["Bolos", "por Categoria"]} // CORRIGIDO
          />
        </svg>

        <svg viewBox="30 55 400 400">
          <VictoryPie
            standalone={false}
            width={400}
            height={400}
            data={listaClientesCidade}
            innerRadius={50}
            labelRadius={80}
            theme={VictoryTheme.clean}
            style={{
              labels: {
                fontSize: 10,
                fill: "#fff",
                fontFamily: "Arial",
                fontWeight: "bold"
              }
            }}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{
              fontSize: 12,
              fill: chocolateColor, // Cor Chocolate
              fontFamily: "Arial",
              fontWeight: "bold"
            }}
            x={200}
            y={200}
            text={["Clientes", "por Cidade"]}
          />
        </svg>

      </div>
    </div>
  )
}