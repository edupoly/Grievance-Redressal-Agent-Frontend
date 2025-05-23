import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate, useSearchParams } from 'react-router-dom'
import { useGetComplaintsByZonalQuery } from '../../services/schoolZonalApi'
import { useAssignComplaintMutation } from '../../services/complaintApi';
import { useGetbranchesQuery } from '../../services/schoolApi';
function Zonal() {
  var [search, setSearch] = useState('');
  var [selectBranch, setSelectBranch] = useState([]);
  var [selStatus, setSelStatus] = useState('all');
  var { isLoading, data, refetch } = useGetComplaintsByZonalQuery({
    branches: selectBranch,
    status: selStatus !== 'all' ? selStatus : null,
    mobile: search,
  });
  console.log("data:", data);
  var { isLoading: bLoading, data: bdata } = useGetbranchesQuery();
  var [assignFn] = useAssignComplaintMutation();
  var [assignclick, setAssignClick] = useState(false);
  function handleBranch(e) {
    var { value, checked } = e.target;
    setSelectBranch((prev) =>
      checked ? [...prev, value] : prev.filter((b) => b !== value)
    );
  }

  useEffect(() => {
    refetch();
  }, [data, assignclick, search, selStatus, selectBranch])

  function handleStatus(e) {
    setSelStatus(e.target.value);
  }

  function assignCom(id) {
    assignFn(id).then((res) => {
      console.log(res);
    });
    setAssignClick(prev => !prev);
  }

  // console.log("branches2:",selectBranch)

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-12">
         
          <div className="card bg-primary text-white mb-4 border-0">
            <div className="card-body text-center py-4">
              <i className="bi bi-person-workspace display-4 d-block mb-2"></i>
              <h4 className="mb-1">Zonal  DASHBOARD</h4>
              <p className="mb-0 opacity-75">{window.localStorage.getItem('name')}</p>
            </div>
          </div>

          {/* Search Section */}
          <div className="row justify-content-center mb-4">
            <div className="col-md-6 col-lg-4">
              <div className="input-group">
                <span className="input-group-text bg-primary text-white">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control form-control-lg shadow-sm"
                  placeholder="Search by Mobile Number"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
                  {!bLoading && bdata?.map((d, i) => (
                    <div key={i} className="form-check mb-3">
                      <input
                        type="checkbox"
                        id={`branch-${i}`}
                        value={d.branchname}
                        className="form-check-input"
                        checked={selectBranch.includes(d.branchname)}
                        onChange={handleBranch}
                      />
                      <label className="form-check-label" htmlFor={`branch-${i}`}>
                        {d.branchname}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Section */}
            <div className="col-md-9">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-light">
                        <tr className="text-center">
                          <th><i className="bi bi-person me-2"></i>Student Name</th>
                          <th><i className="bi bi-phone me-2"></i>Mobile</th>
                          <th><i className="bi bi-building me-2"></i>Branch</th>
                          <th><i className="bi bi-chat-left-text me-2"></i>Complaint</th>
                          <th><i className="bi bi-flag me-2"></i>Status</th>
                          <th><i className="bi bi-gear me-2"></i>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!isLoading && data?.map((b, i) => (
                          <tr key={i}>
                            <td className='text-center'>{b.studentname}</td>
                            <td className='text-center'><span className="badge bg-light text-dark text-center ">{b.mobile}</span></td>
                            <td className='text-center'><span className=" text-center">{b.branch}</span></td>
                            <td className='text-center'>{b.complaint}</td>
                            <td className='text-center'>
                              <span className={`badge ${[...b.status].sort((a, b) => { return a.timestamp < b.timestamp ? 1 : -1 })[0].code === 'registered' ? 'bg-primary' :
                                  [...b.status].sort((a, b) => { return a.timestamp < b.timestamp ? 1 : -1 })[0].code === 'assigned' ? 'bg-warning' :
                                    [...b.status].sort((a, b) => { return a.timestamp < b.timestamp ? 1 : -1 })[0].code === 'accepted' ? 'bg-info' :
                                      [...b.status].sort((a, b) => { return a.timestamp < b.timestamp ? 1 : -1 })[0].code === 'solved' ? 'bg-success' : 'bg-secondary'
                                } text-center`}>
                                <i className={`bi ${[...b.status].sort((a, b) => { return a.timestamp < b.timestamp ? 1 : -1 })[0].code === 'registered' ? 'bi-file-earmark-text' :
                                    [...b.status].sort((a, b) => { return a.timestamp < b.timestamp ? 1 : -1 })[0].code === 'assigned' ? 'bi-person-check' :
                                      [...b.status].sort((a, b) => { return a.timestamp < b.timestamp ? 1 : -1 })[0].code === 'accepted' ? 'bi-hourglass-split' :
                                        [...b.status].sort((a, b) => { return a.timestamp < b.timestamp ? 1 : -1 })[0].code === 'solved' ? 'bi-check-circle' : 'bi-archive'
                                  } me-1 text-center`}></i>
                                {[...b.status].sort((a, b) => { return a.timestamp < b.timestamp ? 1 : -1 })[0].code}
                              </span>
                            </td>
                            <td className='text-center'>
                              {[...b.status].sort((a, b) => { return a.timestamp < b.timestamp ? 1 : -1 })[0].code === 'registered' && (
                                <button className='btn btn-warning btn-sm' onClick={() => assignCom(b._id)}>
                                  <i className="bi bi-person-plus-fill me-1"></i>
                                  Assign To Principal
                                </button>
                              )}
                              {[...b.status].sort((a, b) => { return a.timestamp < b.timestamp ? 1 : -1 })[0].code === 'assigned' && (
                                <span className="badge bg-info">
                                  <i className="bi bi-hourglass me-1"></i>
                                  Waiting for Acceptance
                                </span>
                              )}
                              {[...b.status].sort((a, b) => { return a.timestamp < b.timestamp ? 1 : -1 })[0].code === 'accepted' && (
                                <span className="badge bg-primary">
                                  <i className="bi bi-gear-fill me-1"></i>
                                  Processing
                                </span>
                              )}
                              {[...b.status].sort((a, b) => { return a.timestamp < b.timestamp ? 1 : -1 })[0].code === 'solved' && (
                                <span className="badge bg-success">
                                  <i className="bi bi-clock-history me-1"></i>
                                  Waiting for Closed
                                </span>
                              )}
                              {[...b.status].sort((a, b) => { return a.timestamp < b.timestamp ? 1 : -1 })[0].code === 'closed' && (
                                <span className="badge bg-secondary">
                                  <i className="bi bi-check2-all me-1"></i>
                                  Complaint Closed
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

export default Zonal

