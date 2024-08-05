import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PermissionPhoto from '../images/permissionPhoto.jpg'
import Input from "./Input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { useApiProgress } from "../shared/ApiProgress";
import { ToastContainer, toast } from 'react-toastify';
import { getPermission, updatePermission } from "../api/apiCalls";
import Spinner from "./Spinner";

const PermissionUpdate = () => {

    const [employeeId, setEmployeeId] = useState();
    const [description, setDescription] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [error, setError] = useState(null);

    const pendingApiCallLoad = useApiProgress('get','/api/v1/permissions/get/');
    const pendingApiCall = useApiProgress('put','/api/v1/permissions');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        loadPermission();
    }, []);

    const loadPermission = async () => {
        try {
            const response = await getPermission(id);
            setEmployeeId(response.data.employeeId);
            setDescription(response.data.description);
            setStartDate(response.data.startDate);
            setEndDate(response.data.endDate);
        } catch(error) {
            
        }
    }

    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if(name === "employeeId") {
            setEmployeeId(value);
        }
        if(name === "description") {
            setDescription(value);
        }
        if(name === "startDate") {
            setStartDate(value);
        }
        if(name === "endDate") {
            setEndDate(value);
        }

        setError(null);
    }

    const onClickSave = async (event) => {
        event.preventDefault();

        const body = {
            employeeId,
            description,
            startDate,
            endDate
        }

        try {
            await updatePermission(id, body);
            navigate("/permission");
        } catch(error) {
            setError("Error "+ error.response.data.status + ": " + error.response.data.detail);
        }
    }

    if(pendingApiCallLoad) {
        return(
            <Spinner />
        );
    }

    return(
        <div className="container mt-4 mb-4">
            <div className="card text-center h-100 border rounded-3 shadow mb-5">
                <div className="card-header">
                    <img
                        className={"rounded-circle shadow"} 
                        width={200} height={200}
                        alt={"permission"} src={PermissionPhoto}>
                    </img>
                </div>
                <div className="card-body ps-5 pe-5">

                    <Input name="employeeId" label="İzin Alan Çalışan Id'si" type="text" onChangeVeriables={onChange} placeholder="3fa85f64-5717-4562-b3fc-2c963f66afa6" value={employeeId} />

                    <Input name="description" label="İzin Nedeni" type="text" onChangeVeriables={onChange} placeholder="Hasta, Tatil, Kişisel Nedenler..." value={description} />
                    
                    <Input name="startDate" label="İzin Başlangı Günü" onChangeVeriables={onChange} type="date" value={startDate} />

                    <Input name="endDate" label="İzin Bitiş Günü" onChangeVeriables={onChange} type="date" value={endDate} />

                    <div>
                                    
                        <button className="btn btn-primary d-inline-flex"
                                onClick={onClickSave}
                                disabled = {pendingApiCall}>
                            {pendingApiCall ? <span className="spinner-border spinner-border-sm"></span> : ''}
                            <FontAwesomeIcon icon={faSave} className="pe-2 pt-1" />
                            Güncelle
                        </button>

                    </div>

                    {error != null && <label className="alert alert-danger mt-2">{error}</label> }

                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default PermissionUpdate;