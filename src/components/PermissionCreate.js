import React, { useState } from "react";
import PermissionPhoto from '../images/permissionPhoto.jpg';
import Input from "./Input";
import { useApiProgress } from '../shared/ApiProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { createPermission } from "../api/apiCalls";
import { ToastContainer, toast } from 'react-toastify';

const PermissionCreate = () => {

    const [email, setemail] = useState();
    const [description, setDescription] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const [error, setError] = useState(null);

    const pendingApiCall = useApiProgress('post','/api/v1/permissions');

    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if(name === "email") {
            setemail(value);
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
            email,
            description,
            startDate,
            endDate
        };

        try {
            await createPermission(body);
            toast.success("İzin Kaydı Başarıyla Oluşturuldu!");

            setemail("");
            setDescription("");
            setStartDate("");
            setEndDate("");
            setError(null);
        } catch(error) {
            setError("Error "+ error.response.data.status + ": " + error.response.data.detail);
        }
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
                    <Input name="email" label="İzin Alan Çalışan Email Adresi" type="text" onChangeVeriables={onChange} placeholder="ornek@gmail.com" value={email} />

                    <Input name="description" label="İzin Nedeni" type="text" onChangeVeriables={onChange} placeholder="Hasta, Tatil, Kişisel Nedenler..." value={description} />
                    
                    <Input name="startDate" label="İzin Başlangı Günü" onChangeVeriables={onChange} type="date" value={startDate} />

                    <Input name="endDate" label="İzin Bitiş Günü" onChangeVeriables={onChange} type="date" value={endDate} />

                    <div>
                                    
                        <button className="btn btn-primary d-inline-flex"
                                onClick={onClickSave}
                                disabled = {pendingApiCall}>
                            {pendingApiCall ? <span className="spinner-border spinner-border-sm"></span> : ''}
                            <FontAwesomeIcon icon={faSave} className="pe-2 pt-1" />
                            Kaydet
                        </button>

                    </div>

                    {error != null && <label className="alert alert-danger mt-2">{error}</label> }

                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default PermissionCreate;