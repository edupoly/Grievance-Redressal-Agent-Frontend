import React from 'react'
import { useGetzonalofficerdetailsQuery } from '../../services/schoolZonalApi'
import { Link } from 'react-router-dom';

export default function Zonalofficerdetails() {
    const {isLoading, data} = useGetzonalofficerdetailsQuery();

    if(isLoading) {
        return (
            <div className="d-flex justify-content-center p-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid px-4 py-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                    <i className="bi bi-building-fill me-2 text-primary"></i>
                    <h5 className="mb-0">Zonal Officer Details</h5>
                </div>
                <Link to={'/addzonal'}>
                <button className="btn btn-primary btn-sm">
                    <i className="bi bi-plus-lg me-1"></i>
                    
                    Add Zonal Officer
                   
                </button>
                </Link>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
                                <tr className="text-center">
                                    <th className="px-3 py-3">
                                        <div className="d-flex align-items-center">
                                            <i className="bi bi-building me-2"></i>
                                            Branch Name
                                        </div>
                                    </th>
                                    <th className="px-3 py-3">
                                        <div className="d-flex align-items-center">
                                            <i className="bi bi-person me-2"></i>
                                            Zonal Officer Name
                                        </div>
                                    </th>
                                    <th className="px-3 py-3">
                                        <div className="d-flex align-items-center">
                                            <i className="bi bi-telephone me-2"></i>
                                            Contact
                                        </div>
                                    </th>
                                    <th className="px-3 py-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading&& data&&  data.zonalofficer?.map((d, i) => (
                                    <tr key={i}>
                                        <td className="px-3 py-2">
                                            <div className="d-flex align-items-center">
                                                <i className="bi bi-building-fill text-primary me-2"></i>
                                                {d.branches.join(', ')}
                                            </div>
                                        </td>
                                        <td className="px-3 py-2">
                                            <div className="d-flex align-items-center">
                                                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                                                    style={{width: '28px', height: '28px', fontSize: '14px'}}>
                                                    {d.zonalname.charAt(0).toUpperCase()}
                                                </div>
                                                {d.zonalname}
                                            </div>
                                        </td>
                                        <td className="px-3 py-2">
                                            <div className="d-flex align-items-center">
                                                <i className="bi bi-telephone-fill me-2"></i>
                                                {d.mobile}
                                            </div>
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            <button className="btn btn-outline-primary btn-sm me-2">
                                                <i className="bi bi-pencil-fill"></i>
                                            </button>
                                            <button className="btn btn-outline-danger btn-sm">
                                                <i className="bi bi-trash-fill"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
