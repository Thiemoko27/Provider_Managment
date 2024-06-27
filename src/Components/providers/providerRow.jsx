export function ProviderRow({provider, deleteProvider}) {

      return <tr>
        <td><strong>{provider.storeNumber}</strong></td>
        <td>{provider.storeName}</td>
        <td>{provider.location}</td>
        <td>
          <button onClick={() => deleteProvider(provider.id)} className="btn btn-danger" >Delete</button>
        </td>
      </tr>

}