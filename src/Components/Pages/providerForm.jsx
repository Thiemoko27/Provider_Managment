import { useFormik } from "formik"
import * as Yup from "yup"

    const ProviderForm = ({fetchProviders}) => {

        const formik = useFormik({
            initialValues: {
                storeName: '',
                storeNumber: '',
                location: ''
            },
            
            enableReinitialize : true,

            validationSchema: Yup.object({
                storeName: Yup.string().required('Store name is required'),
                storeNumber: Yup.number().required('Store number is required'),
                location: Yup.string().required('Store location is required')
            }),
            onSubmit: (values) => {
                fetch('https://localhost:7088/Provider', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                }).then(result => {
                    if(!result.ok) {
                        throw new Error('Failed to add provider...')
                    }
                        return result.json()
                }).then(data => {
                    console.log('provider added:', data)
                    if(fetchProviders) {
                        fetchProviders()
                    }
                }).catch(e => {
                    console.error('failed to add provider: ', e)
                })
            }
        })

        return <div>
            <h1>Add Provider</h1>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="StoreNumber">Store Number</label>
                <input type="text"
                    id="StoreNumber"
                    className="form-control"
                    onChange={(e) => setStoreNumber(e.target.value)}
                    {...formik.getFieldProps('storeNumber')}
                /> {formik.touched.storeNumber && formik.errors.storeNumber ? (
                    <div>{formik.errors.storeNumber}</div>
                ) : null}

                <label htmlFor="StoreName">Store Name</label>
                <input type="text"
                    id="StoreName"
                    className="form-control"
                    onChange={(e) => setStoreName(e.target.value)}
                    {...formik.getFieldProps('storeName')}
                /> {formik.touched.storeName && formik.errors.storeName ? (
                    <div>{formik.errors.storeName}</div>
                ) : null}

                <label htmlFor="Location">Location</label>
                <input type="text"
                    id="Location"
                    className="form-control"
                    onChange={(e) => setLocation(e.target.value)}
                    {...formik.getFieldProps('location')}
                /> {formik.touched.location && formik.errors.location ? (
                    <div>{formik.errors.location}</div>
                ): null}
                

                <button type="submit" className="btn btn-info my-3">Save</button>
            </form>
        </div>
    }

export default ProviderForm