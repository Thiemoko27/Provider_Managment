import { useNavigate, useParams } from "react-router-dom"

export function ProviderRow({provider, deleteProvider}) {
  const navigate = useNavigate()

      return <tr>
        <td><strong>{provider.storeNumber}</strong></td>
        <td>{provider.storeName}</td>
        <td>{provider.location}</td>
        <td>
          <button onClick={() => deleteProvider(provider.id)} className="btn btn-danger" >Delete</button>
          <button onClick={() => navigate(`/edit-provider/${provider.id}`)} className="btn btn-primary" >Edit</button>
        </td>
      </tr>

}