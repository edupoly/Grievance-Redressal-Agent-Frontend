import React, { useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services/schoolApi";
import { object, string } from "yup";

function Login() {
  var [loginFn] = useLoginMutation();
  var navigate = useNavigate();
  var initialValues = {
    empid: "",
    password: "",
  };
  var [Invalid, setInvalid] = useState(false);
  var onSubmit = (values) => {
    console.log(values);
    loginFn(values).then((res) => {
      console.log(res.data);
      // window.localStorage.setItem("token", res.data.token);
      // window.localStorage.setItem("name", res.data.zonalname);
      if(!res.data){
          alert("Invalid Credentials");
        setInvalid(true);
      }
         else if (res.data.msg == "success") {
        if (res.data.role == "principal"){
          window.localStorage.setItem("token", res.data.token);
          window.localStorage.setItem("name", res.data.principalname);
          window.localStorage.setItem("role", res.data.role);
          navigate("/principal");
        } else if(res.data.role == "Customercare"){
          window.localStorage.setItem("token",res.data.token);
          window.localStorage.setItem("name",res.data.role)
          window.localStorage.setItem("role", res.data.role);
          navigate("/allcomplaints")
        } else if(res.data.role == "Admin"){
          window.localStorage.setItem("token",res.data.token);
          window.localStorage.setItem("name",res.data.role);
          window.localStorage.setItem("role", res.data.role);
          navigate("/home")
        } else {
          window.localStorage.setItem("token", res.data.token);
          window.localStorage.setItem("name", res.data.zonalname);
          window.localStorage.setItem("role", res.data.role);
          navigate("/zonals");
        }
      } 
      
    });
  };
    var validationSchema = object({
        empid: string().required("Empid is required"),
        password: string().required("Password is required"),
    });
    
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}  validationSchema={validationSchema}>
        {
          () => {
                return (
                  <div className="row justify-content-center" style={{ marginTop: "80px" }}>
                    <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                      <div className="border border-light p-4 rounded shadow">
                        <h3 className="text-center mb-4">LOGIN</h3>
                        {Invalid && <div className="text-danger text-center borderd">Invalid Credentials</div>}
                        <Form>
                          <div>
                            <label className="mb-2">Empid</label>
                            <Field name="empid" className="form-control p-2 mb-2" placeholder="Empid"/>
                            <ErrorMessage name="empid" component="div" className="text-danger"/>

                          </div>
                          <div>
                            <label className="mb-2">Password</label>
                          <Field name="password" type="password" className="form-control p-2" placeholder="Password"/>
                            <ErrorMessage name="password" component="div" className="text-danger"/>

                          </div>
                         
                          <br />
                          <button className="btn btn-info w-100 mb-2">Login</button>
                        </Form>
                      </div>
                    </div>
                  </div>
                );
        }}
      </Formik>
    </div>
  );
}

export default Login;
