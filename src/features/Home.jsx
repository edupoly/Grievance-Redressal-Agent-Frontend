import React from 'react'
import { useDeleteBranchMutation, useGetbranchesQuery, useLazyGetbranchesQuery } from '../services/schoolApi'
import { Link, useAsyncError } from 'react-router-dom';
import Zonalofficerdetails from './Zonalofficers/zonalofficerdetails';
import { useGetzonalofficerdetailsQuery } from '../services/schoolZonalApi';

function Home() {
    var {isLoading,data} = useGetbranchesQuery();
    var {isLoading:zloading,data:zonaldata} = useGetzonalofficerdetailsQuery()
    var [delbranchFn] = useDeleteBranchMutation();
    var [lazyfn]=useLazyGetbranchesQuery()
    const role = localStorage.getItem('role');
    console.log("zonaldata:",zonaldata)

    async function delbranch(id){
        delbranchFn(id).then((res)=>{
            console.log(res)
            
        })
        await lazyfn()
    }

    return (
        <div className="container-fluid ">
            {/* Dashboard Header */}
            <div className="card  border-0  mb-4">
                <div className="card-body text-center ">
                    <i className="bi bi-mortarboard-fill display-3 mb-3"></i>
                    <h2 className="mb-2 ">School Administration Dashboard</h2>
                    <p className="lead mb-0 ">Branch & Zonal Management System</p>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="row g-4 mb-4">
                <div className="col-12 col-md-4">
                    <div className="card border-0 bg-info bg-opacity-10 h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="rounded-circle bg-info p-3">
                                    <i className="bi bi-building-fill text-white fs-4"></i>
                                </div>
                                <div className="ms-3">
                                    <h6 className="text-info mb-1">Total Branches</h6>
                                    <h2 className="mb-0">{data?.length || 0}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card border-0 bg-success bg-opacity-10 h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="rounded-circle bg-success p-3">
                                    <i className="bi bi-person-fill text-white fs-4"></i>
                                </div>
                                <div className="ms-3">
                                    <h6 className="text-success mb-1">Customer Care</h6>
                                    <h2 className="mb-0">{0|| 0}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card border-0 bg-primary bg-opacity-10 h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="rounded-circle bg-primary p-3">
                                    <i className="bi bi-people-fill text-white fs-4"></i>
                                </div>
                                <div className="ms-3">
                                    <h6 className="text-primary mb-1">Zonal Officers</h6>
                                    <h2 className="mb-0">{  zonaldata &&  zonaldata?.zonalofficer.length || 0}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Branch Details Section */}
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-header bg-white py-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">
                            <i className="bi bi-building me-2"></i>Branch Details
                        </h5>
                        {role === 'Admin' && (
                            <Link to="/addbranch" className="btn btn-primary btn-sm">
                                <i className="bi bi-plus-lg me-1"></i>Add Branch
                            </Link>
                        )}
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle  mb-0">
                            <thead className="table-light text-center">
                                <tr>
                                    <th className="px-4 py-3">Branch Name</th>
                                    <th className="px-4 py-3">Principal</th>
                                    <th className="px-4 py-3">Contact</th>
                                    {role === 'Admin' && <th className="px-4 py-3 text-center">Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {!isLoading && data?.map((d, i) => (
                                    <tr key={i}>
                                        <td className="px-4 py-3">
                                            <div className="d-flex justify-content-center">
                                                <span className="fw-medium">{d.branchname}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <div className="rounded-circle bg-primary text-white p-2 me-2" 
                                                    style={{width: '35px', height: '35px', display: 'flex', 
                                                           alignItems: 'center', justifyContent: 'center'}}>
                                                    {d.principalname.charAt(0).toUpperCase()}
                                                </div>
                                                <span>{d.principalname}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="d-flex justify-content-center">
                                                <span className="badge bg-light text-dark">
                                                    <i className="bi bi-phone me-1"></i>{d.mobile}
                                                </span>
                                            </div>
                                        </td>
                                        {role === 'Admin' && (
                                            <td className="px-4 py-3">
                                                <div className="d-flex justify-content-center gap-2">
                                                    <Link to={`/editbranch/${d._id}`} 
                                                        className="btn btn-outline-primary btn-sm">
                                                        <i className="bi bi-pencil"></i>
                                                    </Link>
                                                    <button className="btn btn-outline-danger btn-sm" 
                                                        onClick={() => delbranch(d._id)}>
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Zonal Officer Details */}
            {/* <Zonalofficerdetails/> */}
        </div>
    );
}

export default Home
