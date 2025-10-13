import { TiDeleteOutline } from "react-icons/ti"
import { FaRegStar } from "react-icons/fa"
import type { BoloType } from "../../utils/BoloType"
import { useAdminStore } from "../context/AdminContext"

type listaBoloProps = {
  bolo: BoloType;
  bolos: BoloType[];
  setBolos: React.Dispatch<React.SetStateAction<BoloType[]>>;
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemBolo({ bolo, bolos, setBolos }: listaBoloProps) {
  const { admin } = useAdminStore()

  async function excluirBolo() {
    if (!admin || admin.nivel < 2) {
      alert("Você não tem permissão para excluir bolos");
      return;
    }

    if (confirm(`Confirma a exclusão do bolo "${bolo.nome}"?`)) {
      const response = await fetch(`${apiUrl}/bolos/${bolo.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin.token}`
        },
      })

      if (response.status === 200) {
        setBolos(bolos.filter(b => b.id !== bolo.id))
        alert("Bolo excluído com sucesso")
      } else {
        alert("Erro... O bolo não foi excluído")
      }
    }
  }

  async function alterarDestaque() {
    const response = await fetch(`${apiUrl}/bolos/destacar/${bolo.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${admin.token}`
      },
    })

    if (response.status === 200) {
      setBolos(bolos.map(b => b.id === bolo.id ? { ...b, destaque: !b.destaque } : b))
    }
  }

  return (
    <tr key={bolo.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={bolo.foto} alt={`Foto do ${bolo.nome}`} style={{ width: 200 }} />
      </th>
      <td className={`px-6 py-4 ${bolo.destaque ? "font-extrabold" : ""}`}>
        {bolo.nome}
      </td>
      <td className={`px-6 py-4 ${bolo.destaque ? "font-extrabold" : ""}`}>
        {bolo.categoria.nome}
      </td>
      <td className={`px-6 py-4 ${bolo.destaque ? "font-extrabold" : ""}`}>
        {Number(bolo.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluirBolo} />&nbsp;
        <FaRegStar className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Destacar"
          onClick={alterarDestaque} />
      </td>
    </tr>
  )
}