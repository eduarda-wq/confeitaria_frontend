import type { CategoriaType } from "./CategoriaType"

export type BoloType = {
    id: number
    nome: string
    descricao: string
    preco: number
    peso: number
    destaque: boolean
    foto: string
    createdAt: Date
    updatedAt: Date
    categoriaId: number
    categoria: CategoriaType
}