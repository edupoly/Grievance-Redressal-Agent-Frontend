import React, { useEffect, useState } from 'react'
import { useComplaintClosedMutation, useGetbranchByMobileQuery, useGetComplaintsQuery } from '../services/complaintApi'
import { useGetbranchesQuery } from '../services/schoolApi';

function Callcenter() {
    var [search,setSearch] = useState('');
    var [selbranch,setSelBranch] = useState([]);
    var [selstatus,setSelStatus] = useState('all');
    var {isLoading,data,refetch} = useGetComplaintsQuery({
        branches: selbranch,
        status: selstatus !== "all" ? selstatus : null,
        mobile: search,
    });
    console.log(isLoading,data);

    var { isLoading:bLoading, data:bdata } = useGetbranchesQuery();
    var [closedFn] = useComplaintClosedMutation();
    // var {isLoading : bloading ,data : mdata} = useGetbranchByMobileQuery(search);
    var [click,setClick] = useState(false);
    useEffect(() => {
        refetch();
    }, [selbranch, selstatus, search,click]);
    
    function comclosed(id){
        closedFn(id).then((res)=>{
            console.log(res);
        })
        setClick(prev => !prev);
    }

    function handleBranch(e){
        const { value, checked } = e.target;
        setSelBranch((prev) =>
          checked ? [...prev, value] : prev.filter((b) => b !== value)
        );
    };

    function handleStatus(e){
        setSelStatus(e.target.value);
    }
    return (
        <div className="container-fluid py-4">
            <div className="row justify-content-center">
                <div className="col-12">
                    <h3 className='text-center mb-4'>
                        <i className="bi bi-headset me-2"></i>
                        Complaints Management System
                    </h3>
                    
                    {/* Search Section */}
                    <div className="row justify-content-center mb-4">
                        <div className="col-md-6 col-lg-4">
                            <div className="input-group">
                                <span className="input-group-text bg-primary text-white">
                                    <i className="bi bi-search"></i>
                                </span>
                                <input 
                                    type="text" 
                                    className='form-control form-control-lg shadow-sm' 
                                    placeholder='Search by Mobile Number'
                                    value={search} 
                                    onChange={(e)=>{ setSearch(e.target.value)}}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* Branch Filter Section */}
                        <div className="col-md-3">
                            <div className="card shadow-sm border-0 mb-4">
                                <div className="card-header bg-primary text-white">
                                    <i className="bi bi-building me-2"></i>
                                    Branch Filter
                                </div>
                                <div className="card-body">
                                    {!bLoading && bdata?.map((b,i)=>(
                                        <div key={i} className="form-check custom-checkbox mb-3">
                                            <input 
                                                type="checkbox" 
                                                id={`branch-${i}`}
                                                value={b.branchname} 
                                                className='form-check-input'
                                                checked={selbranch.includes(b.branchname)}  
                                                onChange={handleBranch}
                                            />
                                            <label className='form-check-label ms-2' htmlFor={`branch-${i}`}>
                                               
                                                {b.branchname}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Content Section */}
                        <div className="col-md-9">
                            <div className="card shadow-sm border-0 mb-4">
                                <div className="card-body">
                                    {/* <div className="btn-group w-100 mb-4" role="group">
                                        {[
                                            {value: 'all', icon: 'bi-collection', label: 'All'},
                                            {value: 'assigned', icon: 'bi-person-check', label: 'Assigned'},
                                            {value: 'accepted', icon: 'bi-hourglass-split', label: 'Pending'},
                                            {value: 'solved', icon: 'bi-check-circle', label: 'Solved'},
                                            {value: 'closed', icon: 'bi-archive', label: 'Closed'}
                                        ].map(status => (
                                            <label key={status.value} 
                                                className={`btn ${selstatus === status.value ? 'btn-primary' : 'btn-outline-primary'}`}>
                                                <input 
                                                    type="radio" 
                                                    value={status.value}
                                                    checked={selstatus === status.value}
                                                    onChange={handleStatus}
                                                    className="d-none"
                                                />
                                                <i className={`bi ${status.icon} me-2`}></i>
                                                {status.label}
                                            </label>
                                        ))}
                                    </div> */}

                                    <div className="table-responsive">
                                        <table className='table table-hover align-middle'>
                                            <thead className="table-light text-center">
                                                <tr>
                                                    <th><i className="bi bi-person me-2"></i>Student Name</th>
                                                    <th><i className="bi bi-phone me-2"></i>Mobile</th>
                                                    <th><i className="bi bi-building me-2"></i>Branch</th>
                                                    <th><i className="bi bi-chat-left-text me-2"></i>Complaint</th>
                                                    <th><i className="bi bi-flag me-2"></i>Status</th>
                                                </tr>   
                                            </thead>
                                            <tbody>
                                                {!isLoading && data?.map((d,i)=>(
                                                    <tr key={i}>
                                                        <td className='text-center'>{d.studentname}</td>
                                                        <td><span className="badge bg-light text-dark text-center">{d.mobile}</span></td>
                                                        <td className='text-center'><span className="">{d.branch}</span></td>
                                                        <td className='text-center'>{d.complaint}</td>
                                                        <td className='text-center'>
                                                            {[...d.status].sort((a,b)=>{ return a.timestamp < b.timestamp ? 1 : -1})[0].code === 'solved' && (
                                                                <button className='btn btn-success btn-sm ' onClick={()=>comclosed(d._id)}>
                                                                    <i className="bi bi-check2-circle me-1"></i>Close
                                                                </button>
                                                            )}
                                                            {[...d.status].sort((a,b)=>{return a.timestamp < b.timestamp ? 1 : -1})[0].code !== 'closed' 
                                                                && [...d.status].sort((a,b)=>{ return a.timestamp < b.timestamp ? 1 : -1})[0].code !== 'solved' && (
                                                                <span className="badge bg-warning">
                                                                    <i className="bi bi-clock-history me-1"></i>Pending
                                                                </span>
                                                            )}
                                                            {[...d.status].sort((a,b)=>{ return a.timestamp < b.timestamp ? 1 : -1})[0].code === 'closed' && (
                                                                <span className="badge bg-secondary">
                                                                    <i className="bi bi-check2-all me-1"></i>Closed
                                                                </span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Callcenter

