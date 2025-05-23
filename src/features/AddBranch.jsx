import React from 'react'
import { Form, Formik,Field, ErrorMessage } from 'formik'
import { useAddBranchMutation } from '../services/schoolApi'
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';

function AddBranch() {
    var [addbranchFn] = useAddBranchMutation();
     const navigate=useNavigate()
 

    var initialValues = {
        branchname : '',
        principalname : '',
        mobile : '',
        principal_id : '',
        password : ''
    }
    var onSubmit = (values)=>{
        console.log(values);
        addbranchFn(values).then((res)=>{
            console.log(res);
            navigate('/home')
        })
    }
    var validationSchema = object({
        branchname : string().required('Branch Name is required'),
        principalname : string().required('Principal Name is required'),
        mobile : string().required('Mobile is required'),
        principal_id :  string().matches(/^p/, 'Principal ID must start with the letter p'),
        password : string().required('Password is required')
    })
  

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {
            ()=>{
                return (
                    <div className="row justify-content-center" style={{ marginTop: '50px' }}>
                        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                            <div className='border border-light p-4 rounded shadow'>
                                <h1 className='text-center mb-4'>Add Branch</h1>
                                <Form>
                                    <div>
                                    <Field name='branchname' className='form-control p-2 mb-3' placeholder='Branch Name'/> 
                                        <ErrorMessage name='branchname' component='div' className='text-danger'/>
                                    </div>
                                    <div>
                                            <Field name='principalname' className='form-control p-2 mb-3' placeholder='Principal Name' />
                                        <ErrorMessage name='principalname' component='div' className='text-danger'/>

                                    </div>
                                    <div>
                                    <Field name='mobile' className='form-control p-2 mb-3' placeholder='Mobile'/>
                                        <ErrorMessage name='mobile' component='div' className='text-danger'/>
                                       
                                    </div>
                                    <div>
                                    <Field name='principal_id' className='form-control p-2 mb-3' placeholder='Principal ID'/>
                                        <ErrorMessage name='principal_id' component='div' className='text-danger'/>

                                    </div>
                                    <div>
                                    <Field name='password' className='form-control p-2 mb-3' placeholder='Password'/>
                                        <ErrorMessage name='password' component='div' className='text-danger'/>

                                    </div>
                                    <button className='btn btn-primary w-100 mb-2'>Add Branch</button>
                                </Form>
                            </div>
                        </div>
                    </div>
                )
            }
        }
      </Formik>
    </div>
  )
}

export default AddBranch
