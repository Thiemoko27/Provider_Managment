import { useCallback, useEffect } from "react"
import { useState } from "react"
import { ProviderRow } from "../providers/providerRow"
import { Input } from "../Input"

const ProviderList = () => {

    const [providers, setProviders] = useState([])
    const [search, setSearch] = useState('')


        const fetchProviders = useCallback(async () => {
            console.log("fetching providers...")
            const response  = await fetch('https://localhost:7088/Provider')
            const data = await response.json()
            setProviders(data)
            console.log("providers fetched successfull!")
        }, [])

        useEffect(() => {
            fetchProviders()
        }, [])

        const deleteProvider = useCallback(async (id) => {
            await fetch(`https://localhost:7088/Provider/${id}`, {
                method: 'DELETE',
            })
                fetchProviders()
        }, [fetchProviders])

        

        const visibleProviders = providers.filter(provider => {
            if(search && !provider.storeName.toLowerCase().includes(search.toLowerCase()))
                return false

            return true
        })

        return <>
            <h1>List of Providers</h1>
            <SearchBar search={search}
                       onSearchChange={setSearch} />
            <ProviderTable providers={visibleProviders} deleteProvider={deleteProvider} />
        </>
}

function SearchBar({search, onSearchChange}) {
    return <Input value={search}
           placeholder="Search store name..."
           onChange={onSearchChange} />
}

function ProviderTable({providers, deleteProvider, navigate}) {
    return <table className="table">
        <thead>
            <tr>
                <th>N°</th>
                <th>Name</th>
                <th>Location</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {providers.map(provider => (
                <ProviderRow key={provider.id} provider={provider} deleteProvider={deleteProvider} />
            ))}
        </tbody>
    </table>
}

export default ProviderList