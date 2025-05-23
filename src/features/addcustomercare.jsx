import React from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { useAddcustomerCareMutation } from '../services/schoolApi'
import { object, string } from 'yup'

function Addcustomercare() {
      var  [addcustomerFn] = useAddcustomerCareMutation()
     
    var navigate = useNavigate();
    var initialValues = {
        name :'',
        id : '',
        password : ''
    }
    var onSubmit = (values)=>{
        console.log(values);
        // signupFn(values).then((res)=>{
        //     console.log(res);
        //     navigate('/login')
        // })
       addcustomerFn(values).then((res)=>{
        console.log(res);
        navigate('/home')
       }) 
    }
     var validationSchema = object({
        name : string().required('Name is required'),
        id : string().required('Id is required').matches(/^a/, 'Id must start with the letter a'),
        password : string().required('Password is required')
    })
   
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {
            ()=>{
                return (
                    <div className="row justify-content-center" style={{ marginTop: '40px' }}>
                        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                            <div className='border border-light p-4 rounded shadow'>
                                <h1 className="text-center mb-4"> Add Customercare</h1>
                                <Form>
                                   <div>
                                    <Field name='name' className='form-control p-2 mb-2'placeholder='Name'/>
                                    <ErrorMessage name='name' component='div' className='text-danger'/>

                                   </div>
                                   <div>
                                    <Field type='text' name='id' className='form-control p-2' placeholder='Enter id'/>
                                    <ErrorMessage name='id' component='div' className='text-danger'/>

                                   </div>
                                   <div>
                                    <Field type='password' name='password' className='form-control p-2 mb-3' placeholder='Password'/>
                                    <ErrorMessage name='password' component='div' className='text-danger'/>

                                   </div>
                                    <button className='btn btn-primary w-100 mb-2'>Add Customercare</button>
                                    
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

export default Addcustomercare
