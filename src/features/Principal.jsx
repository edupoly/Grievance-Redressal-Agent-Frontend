import React, { useEffect, useState } from 'react'
import { useGetbranchesQuery, useGetcomplaintsBranchQuery } from '../services/schoolApi';
import { useAcceptComplaintMutation, useSolvingComplaintMutation } from '../services/complaintApi';

function Principal() {
  var [search, setSearch] = useState('');
  var [selstatus, setSelStatus] = useState('all');
  var [filcom, setFilCom] = useState([]);

  var { isLoading, data, refetch } = useGetcomplaintsBranchQuery({
    status: selstatus !== 'all' ? selstatus : null,
    mobile: search,
  });

  console.log(isLoading, data);
  var [acceptFn] = useAcceptComplaintMutation();
  var [solveFn] = useSolvingComplaintMutation();
  var [accclick, setAccClick] = useState(false);
  var [solclick, setSolClick] = useState(false);
  function acceptCom(id) {
    acceptFn(id).then((res) => {
      console.log(res);
    })
  }

  function solveCom(id) {
    solveFn(id).then((res) => {
      console.log(res);
    })
  }
  useEffect(() => {
    if (data) {
      var filter = data?.filter((com) => {
        var newstatus = [...com.status].sort((a, b) => { return a.timestamp < b.timestamp ? 1 : -1 })[0];
        return ['assigned', 'accepted', 'solved', 'closed'].includes(newstatus.code);
      })
      setFilCom(filter);
    }
  }, [data])

  useEffect(() => {
    refetch();
  }, [search, filcom, selstatus, accclick, solclick])

  function handleStatus(e) {
    setSelStatus(e.target.value)
  }
  function handleSearch(e) {
    setSearch(e.target.value)
  }
  useEffect(() => {
    refetch();
  }, [search, selstatus, refetch]);
  return (
    <div className="container-fluid py-4">
      {/* Header Section */}
      <div className="card bg-primary text-white mb-4 border-0">
        <div className="card-body text-center py-4">
          <i className="bi bi-person-workspace display-4 d-block mb-2"></i>
          <h4 className="mb-1">PRINCIPAL DASHBOARD</h4>
          <p className="mb-0 opacity-75">{window.localStorage.getItem('name')}</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-primary text-white">
              <i className="bi bi-search text-white"></i>
            </span>
            <input
              type="text"
              className="form-control form-control-lg shadow-sm"
              placeholder="Search by Mobile Number"
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      {/* Status Filter */}
      {/* <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            {[
              { value: 'all', icon: 'bi-collection', label: 'All' },
              { value: 'assigned', icon: 'bi-person-check', label: 'Assigned' },
              { value: 'accepted', icon: 'bi-hourglass-split', label: 'Pending' },
              { value: 'solved', icon: 'bi-check-circle', label: 'Solved' },
              { value: 'closed', icon: 'bi-archive', label: 'Closed' }
            ].map(status => (
              <label key={status.value} className="btn-group">
                <input
                  type="radio"
                  className="btn-check"
                  name="status"
                  value={status.value}
                  checked={selstatus === status.value}
                  onChange={handleStatus}
                />
                <span className={`btn ${selstatus === status.value ? 'btn-primary' : 'btn-outline-primary'}`}>
                  <i className={`bi ${status.icon} me-2`}></i>
                  {status.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div> */}

      {/* Table Section */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="py-3"><i className="bi bi-person me-2"></i>Student Name</th>
                  <th className="py-3"><i className="bi bi-phone me-2"></i>Mobile</th>
                  <th className="py-3"><i className="bi bi-building me-2"></i>Branch</th>
                  <th className="py-3"><i className="bi bi-chat-left-text me-2"></i>Complaint</th>
                  <th className="py-3"><i className="bi bi-flag me-2"></i>Status</th>
                  <th className="py-3"><i className="bi bi-gear me-2"></i>Action</th>
                </tr>
              </thead>
              <tbody>
                
                {filcom?.map((d, i) => {
                  const newstatus = [...d.status].sort((a, b) => a.timestamp < b.timestamp ? 1 : -1)[0];
                  return (
                    <tr key={i}>
                      <td className="py-3">{d.studentname}</td>
                      <td className="py-3">
                        <span className="badge bg-light text-dark">
                          <i className="bi bi-phone me-1"></i>{d.mobile}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className=" ">
                          <i className="bi bi-building me-1"></i>{d.branch}
                        </span>
                      </td>
                      <td className="py-3">{d.complaint}</td>
                      <td className="py-3">
                        <span className={`badge ${newstatus.code === 'assigned' ? 'bg-warning' :
                            newstatus.code === 'accepted' ? 'bg-info' :
                              newstatus.code === 'solved' ? 'bg-success' : 'bg-secondary'
                          }`}>
                          <i className={`bi ${newstatus.code === 'assigned' ? 'bi-person-check' :
                              newstatus.code === 'accepted' ? 'bi-hourglass-split' :
                                newstatus.code === 'solved' ? 'bi-check-circle' : 'bi-archive'
                            } me-1`}></i>
                          {newstatus.code}
                        </span>
                      </td>
                      <td className="py-3">
                        {newstatus.code === 'assigned' && (
                          <button className="btn btn-warning btn-sm" onClick={() => acceptCom(d._id)}>
                            <i className="bi bi-check2-circle me-1"></i>Accept
                          </button>
                        )}
                        {newstatus.code === 'accepted' && (
                          <button className="btn btn-success btn-sm" onClick={() => solveCom(d._id)}>
                            <i className="bi bi-tools me-1"></i>Solve
                          </button>
                        )}
                        {newstatus.code === 'solved' && (
                          <span className="badge bg-info">
                            <i className="bi bi-clock-history me-1"></i>
                            Waiting for Closed
                          </span>
                        )}
                        {newstatus.code === 'closed' && (
                          <span className="badge bg-secondary">
                            <i className="bi bi-check2-all me-1"></i>
                            Closed
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Principal
