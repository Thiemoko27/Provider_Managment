import { useFormik } from "formik"
import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import * as Yup from "yup"

const ProviderUpdateForm = ({fetchProviders}) => {
    const navigate = useNavigate()
    const [provider, setProvider] = useState(null)
    const {id} = useParams()

    const fetchProvider = useCallback(async () => {
        console.log("fetching the provider...")
        const response  = await fetch(`https://localhost:7088/Provider/${id}`)
        const data = await response.json()
        setProvider(data)
        console.log("the provider has fetched successfully!")
    }, [])

    useEffect(() => {
        fetchProvider()
    }, [id])

    const formik = useFormik({
        initialValues: {
            storeName: provider? provider.storeName: '',
            storeNumber: provider? provider.storeNumber: '',
            location: provider? provider.location: ''
        },

        enableReinitialize: true,

        validationSchema: Yup.object({
            storeName: Yup.string().required('Store name is required'),
            storeNumber: Yup.number().required('Store number is required'),
            location: Yup.string().required('Store location is required')
        }),

        onSubmit: (values) => {
            values.Id = id
            fetch(`https://localhost:7088/Provider/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(values)
            }).then(result => {
                console.log('Provider updated')
                if(!result.ok) {
                    throw new Error('Failed to update provider...')
                }

                if (result.status === 204) {
                    return null;
                }
                    return result.json()

            }).catch(e => {
                console.error('failed to add provider: ', e)
            })
        }
    })


    {!provider && <div>Loading...</div>}


    return <div>
            <h1>Update Provider</h1>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="StoreNumber">Store Number</label>
                <input type="text"
                    id="StoreNumber"
                    className="form-control"
                    {...formik.getFieldProps('storeNumber')}
                /> {formik.touched.storeNumber && formik.errors.storeNumber ? (
                    <div>{formik.errors.storeNumber}</div>
                ) : null}

                <label htmlFor="StoreName">Store Name</label>
                <input type="text"
                    id="StoreName"
                    className="form-control"
                    {...formik.getFieldProps('storeName')}
                /> {formik.touched.storeName && formik.errors.storeName ? (
                    <div>{formik.errors.storeName}</div>
                ) : null}

                <label htmlFor="Location">Location</label>
                <input type="text"
                    id="Location"
                    className="form-control"
                    {...formik.getFieldProps('location')}
                /> {formik.errors.location}

                <button type="submit" className="btn btn-info my-3">Save</button>
            </form>
        </div>

}

export default ProviderUpdateForm