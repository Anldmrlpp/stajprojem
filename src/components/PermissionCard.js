import React from "react";
import { Link } from "react-router-dom";

const PermissionCard = ({ permission }) => {

    let cardType = (
        <div id="permission-card">
            <div className="card h-100 border rounded-3 shadow my-card">
                <Link to={`/profile/${permission.email}`} className="card-link nav-link">
                    <div className="card-body">
                        <h5 className="card-title">{permission.firstName} {permission.lastName} {"("}{permission.email}{")"}</h5>
                        <hr className="my-2" />
                        <p className="card-text mb-2"><span className="fw-bold">Departman:</span> {permission.department} </p>
                        <p className="card-text"><span className="fw-bold">İzin Nedeni:</span> {permission.description}</p>
                        <p className="card-text mb-3 text-muted fst-italic"><span className="fw-bold">İzin Alınan Gün Sayısı:</span> {permission.numberOfDays}</p>
                        <p className="card-text"><span className="fw-bold">Tarih:</span> {permission.startDate} - {permission.endDate}</p>
                        <button className="btn btn-success">Görüntüle</button>
                    </div>
                </Link>
            </div>
        </div>

    )

    return(
            <div className={`mb-4 card-padding card-for-job col-md-4`}>
                {cardType}
            </div>
    );
}

export default PermissionCard;