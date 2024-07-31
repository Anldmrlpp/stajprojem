import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Permission.css';

const Permission = () => {
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const { statuses } = useSelector((store) => ({
        
        statuses: store.statuses

    }));


    const employees = [
        { id: 1, name: 'Mehmet Baran', permissions: [{ name: 'İzin 1', createdDate: '2024-08-05' }, { name: 'İzin 2', createdDate: '2024-07-28' }] },
        { id: 2, name: 'Anıl Demiralp', permissions: [{ name: 'İzin 2', createdDate: '2024-08-08' }] },
    ];

    const allPermissions = employees.flatMap(employee => employee.permissions).sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));

    const showPermissions = (permissions) => {
        setSelectedPermissions(permissions);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="text-center">Çalışan Listesi</h1>
                {statuses=="ADMIN" && <button className="btn btn-primary" onClick={() => window.location.href = 'create_permission.html'}>İzin Oluştur</button>}
            </div>
            <div className="row">
                <div className="col-md-6">
                    <ul className="list-group">
                        {employees.map(employee => (
                            <li key={employee.id} className="list-group-item" onClick={() => showPermissions(employee.permissions)}>
                                {employee.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    <div>
                        <h2>İzinler</h2>
                        <ul className="list-group">
                            {selectedPermissions.map((permission, index) => (
                                <li key={index} className="list-group-item">
                                    {permission.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12">
                    <h2>Tüm İzinler</h2>
                    <ul className="list-group">
                        {allPermissions.map((permission, index) => (
                            <li key={index} className="list-group-item">
                                {`${permission.name} - ${permission.createdDate}`}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Permission;
