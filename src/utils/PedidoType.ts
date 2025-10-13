import type { BoloType } from "./BoloType.ts"

export type PedidoType = {
  id: number
  usuarioId: string
  boloId: number
  bolo: BoloType
  quantidade: number
  valor_total: number
  observacoes: string | null
  status: 'PENDENTE' | 'EM_PREPARO' | 'CONCLUIDO' | 'ENTREGUE' | 'CANCELADO'
  createdAt: string
  updatedAt: string | null
}