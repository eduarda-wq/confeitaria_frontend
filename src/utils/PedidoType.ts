import type { BoloType } from "./BoloType"
import type { ClienteType } from "./ClienteType"

export type PedidoType = {
  id: number
  clienteId: string
  boloId: number
  bolo: BoloType
  cliente: ClienteType
  quantidade: number
  observacao: string | null
  dataEntrega: string
  status: string
  createdAt: string
  updatedAt: string | null
}