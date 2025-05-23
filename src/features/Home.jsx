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
        <div className="container ">
            {/* Dashboard Header */}
            <div className="card  border-0  mb-4">
                <div className="card-body text-center ">
                    <div className="d-flex justify-content-center align-items-center gap-3">
                    <i className="bi bi-mortarboard-fill display-3 lh-1"></i>
                    <h2 className="mb-0 fw-bold">Administration Dashboard</h2>
                    </div>
                    <p className="lead mb-0 fw-bold opacity-75">Branch & Zonal Management System</p>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="row g-4 mb-4">
                <div className="col-12 col-md-4">
                    <div className="card border-0 bg-danger bg-opacity-10 h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="rounded-circle bg-danger px-2 py-1">
                                    <i className="bi bi-building-fill text-white fs-4"></i>
                                </div>
                                <div className="px-3 w-100 row justify-content-between align-items-center">
                                    <h5 className="col-9 text-danger mb-1 fw-bold">Total Branches</h5>
                                    <div className='col-2 d-flex align-items-center gap-2 me-2'>
                                        <h2 className="mb-0">{data?.length || 0}</h2> 
                                        <Link to={'/addbranch'}><i class="bi bi-plus-circle fs-4 text-dark fw-bold"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card border-0 bg-success bg-opacity-10 h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="rounded-circle bg-success px-2 py-1">
                                    <i className="bi bi-person-fill text-white fs-4"></i>
                                </div>
                                <div className="px-3 w-100 row justify-content-between align-items-center">
                                    <h5 className="col-9 text-success mb-1 fw-bold">Customer Care</h5>
                                    <div className='col-2 d-flex align-items-center gap-2 me-2'>
                                        <h2 className="mb-0">{0|| 0} </h2>
                                        <Link to={'/addcustomercare'}><i class="bi bi-plus-circle fs-4 text-dark fw-bold"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card border-0 bg-primary bg-opacity-10 h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="rounded-circle bg-primary px-2 py-1">
                                    <i className="bi bi-people-fill text-white fs-4"></i>
                                </div>
                                <div className="px-3 w-100 row justify-content-between align-items-center">
                                    <h5 className="col-9 text-primary mb-1 fw-bold">Zonal Officers</h5>
                                    <div className='col-2 d-flex align-items-center gap-2 me-2'>
                                        <h2 className="mb-0">{  zonaldata &&  zonaldata?.zonalofficer.length || 0}</h2>
                                        <Link to={'/addzonal'}><i class="bi bi-plus-circle fs-4 text-dark fw-bold"></i></Link>
                                    </div>
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
                        <h5 className="mb-0 fw-bold">
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
                                <tr className=''>
                                    <th className="px-4 py-3">
                                        <div className="text-start ms-5 ps-5">Branch Name</div></th>
                                    <th className="px-4 py-3">
                                        <div className="text-start ms-5 ps-5">Principal</div></th>
                                    <th className="px-4 py-3">Contact</th>
                                    {role === 'Admin' && <th className="px-4 py-3 text-center">Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {!isLoading && data?.map((d, i) => (
                                    <tr key={i}>
                                        <td className="px-4 py-3">
                                            <div className="row justify-content-center">
                                                <div className="col-8">
                                                    <span className="fw-medium">{d.branchname}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="row lh-1 justify-content-center align-items-center gap-3">
                                                <div className="col-1  h-100">
                                                    <span className="rounded-circle bg-primary text-white px-2 py-1 fw-semibold h-25 fs-5 lh-1" >
                                                        {d.principalname.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className='col-5 '>{d.principalname}</div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <span className="badge bg-light text-dark">
                                                    <i className="bi bi-phone me-1 fs-5"></i>
                                                </span>
                                                    {d.mobile}
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
