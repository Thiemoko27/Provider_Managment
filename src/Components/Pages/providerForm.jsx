import { useState } from "react"

    const ProviderForm = ({fetchProviders}) => {

        const [storeName, setStoreName] = useState('')
        const [storeNumber, setStoreNumber] = useState('')
        const [location, setLocation] = useState('')
        const [errors, setErrors] = useState({})
        const[submitedData, setSubmitedData] = useState(null)

        const Validate = () => {
            const errors = {}

            if(!storeName)
                errors.storeName = 'Name of store required'

            if(!storeNumber)
                errors.storeNumber = 'Number of store required'

            if(!location)
                errors.location = 'location of store required'

            return errors
        }

        const addProvider = async (provider) => {
            const response = await fetch('https://localhost:7088/Provider', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(provider)
            })
            const result = response.json()
            setSubmitedData(result)
        }

        const handleSend = async (e) => {
            e.preventDefault()

            addProvider({storeName, storeNumber, location})
            setStoreName('')
            setStoreNumber('')
            setLocation('')

            const errors = Validate()

            if(Object.keys(errors).length === 0)
                console.log('Form Submited')
            else
                setErrors(errors)
        }

        return <div>
            <h1>Add Provider</h1>
            <form onSubmit={handleSend}>
                <label htmlFor="StoreNumber">Store Number</label>
                <input type="text"
                    id="StoreNumber"
                    className="form-control"
                    value={storeNumber}
                    onChange={(e) => setStoreNumber(e.target.value)}
                /> {errors.storeNumber && <p className="alert alert-danger">{errors.storeNumber}</p> }

                <label htmlFor="StoreName">Store Name</label>
                <input type="text"
                    id="StoreName"
                    className="form-control"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                /> {errors.storeName && <p className="alert alert-danger">{errors.storeName}</p>}

                <label htmlFor="Location">Location</label>
                <input type="text"
                    id="Location"
                    className="form-control"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                /> {errors.location && <p className="alert alert-danger">{errors.location}</p>}

                <button type="submit" className="btn btn-info my-3">Save</button>
            </form>
            {submitedData && <p>Provider saved!</p> }
        </div>
    }

export default ProviderForm