import React, { useEffect, useState } from "react";
import { getAllPermission, getAllPermissionForEmployee } from "../api/apiCalls";
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import PermissionCard from "./PermissionCard";

const PermissionFeed = ({ cardLocation, userEmail }) => {

    const [permission, setPermission] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [isLastPage, setIsLastPage] = useState(false);
    const [isThereData, setIsThereData] = useState(0);

    const pendingApiCall = useApiProgress('get','/api/v1/permissions/get/all?page=');

    const [error, setError] = useState(null);

    const pageSize = 12;
    const sort = "startDate,DESC";

    const fetchPermissions = async (pageNumber, pageSize, pageSort) => {
        const previousPermissions = [...permission];

        try {
            let response;
            if(cardLocation === "PermissionPage") {
                response = await getAllPermission(pageNumber, pageSize, pageSort);
            }
            if(cardLocation === "ProfilePage") {
                response = await getAllPermissionForEmployee(userEmail, pageNumber, pageSize, pageSort);
            }
            const data = response.data.content;
            setIsLastPage(response.data.last);
            setPageNumber(response.data.pageable.pageNumber);
            setIsThereData(response.data.totalElements);
            const convertedPermissions = data.map(permission => ({
                id: permission.id,
                employeeId: permission.employeeId,
                firstName: permission.firstName,
                lastName: permission.lastName,
                email: permission.email,
                department: permission.department,
                description: permission.description,
                numberOfDays: permission.numberOfDays,
                startDate: permission.startDate,
                endDate: permission.endDate
            }));

            const combinedPermissons = [...previousPermissions, ...convertedPermissions];
            setPermission(combinedPermissons);

        } catch(error) {
            setError("Error "+ error.response.data.status + ": " + error.response.data.detail);
        }
    }

    useEffect(() => {
        fetchPermissions(pageNumber, pageSize, sort);
    }, []);

    const onClickLoadMoreCardButton = () => {
        fetchPermissions(pageNumber + 1, pageSize, sort);
    }

    if((isThereData === 0 && !pendingApiCall) || error != null) {
        return (
          <div className="card h-100 border rounded-3 shadow d-flex align-items-center justify-content-center p-4">
              <FontAwesomeIcon icon={faExclamationCircle} className="rounded-circle bg-danger p-2 text-white me-2" />
              <p className="m-0">Herhangi Bir İzin Bulunmamaktadır...</p>
          </div>
        );
    }

    if(permission.length == 0) {
        return (
          <Spinner />
        );
    }

    return(
        <div id="card-feed">
            <div className="row mt-5">
                <h3 className="card-header text-center mt-5 mb-2">İzinler</h3>
                <hr className="mb-5" />
                {permission.map((permission, index) => (
                    <PermissionCard key={index} permission={permission} />
                ))}
                <button className="btn btn-success" onClick={onClickLoadMoreCardButton} disabled={isLastPage}>
                    {pendingApiCall ? <span className="spinner-border spinner-border-sm"></span> : ''}
                    Daha Fazla Göster
                </button>
            </div>
        </div>
    );
}

export default PermissionFeed;