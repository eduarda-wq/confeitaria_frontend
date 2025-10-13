import type { CategoriaType } from "./CategoriaType.ts"

export type BoloType = {
    id: number
    nome: string
    preco: number
    foto: string
    ingredientes: string
    destaque: boolean
    createdAt: string
    updatedAt: string
    categoriaId: number
    categoria: CategoriaType
}