import { useFormik } from "formik"
import { useState } from "react"
import * as Yup from "yup"

    const ProviderForm = ({fetchProviders}) => {

        const [loading, setLoading] = useState(false)
        const [validate, setValidate] = useState(false)

        const formik = useFormik({
            initialValues: {
                storeName: '',
                storeNumber: '',
                location: '',
                password: ''
            },
            
            enableReinitialize : true,

            validationSchema: Yup.object({
                storeName: Yup.string().required('Store name is required'),
                storeNumber: Yup.number().required('Store number is required'),
                location: Yup.string().required('Store location is required'),
                password: Yup.string().required('Password is required')
            }),
            onSubmit: (values) => {
                setLoading(true)

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
                        setLoading(false)
                        setValidate(true)
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
                    {...formik.getFieldProps('storeNumber')}
                /> {formik.touched.storeNumber && formik.errors.storeNumber ? (
                    <div className="alert alert-danger">{formik.errors.storeNumber}</div>
                ) : null}

                <label htmlFor="StoreName">Store Name</label>
                <input type="text"
                    id="StoreName"
                    className="form-control"
                    {...formik.getFieldProps('storeName')}
                /> {formik.touched.storeName && formik.errors.storeName ? (
                    <div className="alert alert-danger">{formik.errors.storeName}</div>
                ) : null}

                <label htmlFor="Location">Location</label>
                <input type="text"
                    id="Location"
                    className="form-control"
                    {...formik.getFieldProps('location')}
                /> {formik.touched.location && formik.errors.location ? (
                    <div className="alert alert-danger">{formik.errors.location}</div>
                ): null}

                <label htmlFor="Password">Password</label>
                <input type="password"
                    id="Password"
                    className="form-control"
                    {...formik.getFieldProps('password')}
                /> {formik.touched.password && formik.errors.password ? (
                    <div className="alert alert-danger">{formik.errors.password}</div>
                ): null}

                { loading && <div className="alert alert-info my-2">Loading...</div> }
                { validate && <div className="alert alert-success my-2">Provider added!</div> }

                <button type="submit" className="btn btn-info my-3">Save</button>
            </form>
        </div>
    }

export default ProviderForm