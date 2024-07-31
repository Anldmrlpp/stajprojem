// src/api/apiCalls.js
import axios from "axios";

// Kullanıcı kayıt ve giriş API çağrıları
export const signUpUser = (body) => {
    return axios.post("/api/v1/employee/signup", body);
}

export const loginUser = creds => {
    const { email, password } = creds;
    return axios.get(`/api/v1/employee/login/${email}?password=${password}`);
}

export const signUpAdmin = (body, adminKey) => {
    return axios.post("/api/v1/admins/signup", body, { headers: { key: adminKey } });
}

export const loginAdmin = (creds) => {
    const { email, password, adminKey } = creds;
    return axios.get(`/api/v1/admins/login/${email}?password=${password}`, { headers: { key: adminKey } });
}

export const getUser = (email) => {
    return axios.get(`/api/v1/employee/get?email=${email}`);
}

export const getAdmin = (email) => {
    return axios.get(`/api/v1/admins/get/admin/${email}`);
}

export const updateUser = (id, form) => {
    return axios.put(`/api/v1/employee/update/${id}`, form);
}

export const updateAdmin = (id, form, adminKey) => {
    return axios.put(`/api/v1/admins/update/${id}`, form, { headers: { key: adminKey } });
}

// Yeni API çağrıları
export const addPermission = (permissionData) => {
    return axios.post("/api/v1/permissions", permissionData);
}

export const getPermission = (id) => {
    return axios.get(`/api/v1/permissions/get/${id}`);
}

export const getPermissionsForEmployee = (employeeId) => {
    return axios.get(`/api/v1/permissions/get/employee/${employeeId}`);
}

export const updatePermission = (id, permissionData) => {
    return axios.put(`/api/v1/permissions/update/${id}`, permissionData);
}

export const deletePermission = (id) => {
    return axios.delete(`/api/v1/permissions/delete/${id}`);
}

export const deletePermissionsForEmployee = (employeeId) => {
    return axios.delete(`/api/v1/permissions/delete/employee/${employeeId}`);
}

export const setAuthorizationHeader = (userData) => {
    if (userData.isLoggedIn) {
        const { email, password } = userData;
        const userInfo = email + ":" + password;
        const convertBasic = btoa(userInfo);
        const authorizationHeaderValue = "Basic " + convertBasic;
        axios.defaults.headers['Authorization'] = authorizationHeaderValue;
    } else {
        delete axios.defaults.headers['Authorization'];
    }
};
