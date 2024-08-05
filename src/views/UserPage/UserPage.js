import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBIcon, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import { getAdmin, getUser } from '../../api/apiCalls';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../components/Spinner';
import profile from '../../images/profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus, faCalendarCheck, faClipboard, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { logoutSuccess } from '../../redux/authActions';
import PermissionFeed from '../../components/PermissionFeed';

const UserPage = () => {

    const [user, setUser] = useState({});
    const [userNotFound, setUserNotFound] = useState(false);

    const { storeEmail, statuses } = useSelector((store) => ({
        storeEmail: store.email,
        statuses: store.statuses
    }));

    const { email } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        loadUser(email);
    }, [email]);

    const loadUser = async (email) => {
        try {
            if(statuses === "ADMIN" && email === storeEmail) {
                const response = await getAdmin(email);
                setUser(response.data);
            }
            else if(statuses === "ADMIN" && email !== storeEmail) {
                const response = await getUser(email);
                setUser(response.data);
            }
            else {
                const response = await getUser(email);
                setUser(response.data);
            }
            
        } catch(error) {
            setUserNotFound(true);
        }
    }

    const onClickLogout = () => {
        dispatch(logoutSuccess());
        navigate("/");
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const calculateDaysRegistered = (createdDate) => {
        const createdDateObj = new Date(createdDate);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate - createdDateObj);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    if(userNotFound) {
        return(
            <div className="container">
                <div className="alert alert-danger text-center">
                    <div>
                        <span className="material-icons" style={{fontSize: '48px'}}>error</span>
                    </div>
                    User Or Admin Not Found
                </div>
            </div>
        );
    }

    if(user.email !== email) {
        return(
            <Spinner />
        );
    }

    return (
        <section style={{ backgroundColor: '#eee' }}>
        <MDBContainer className="py-5">

            <MDBRow className="mb-5">
                <MDBCol lg="4">
                    <MDBCard className="mb-4">
                    <MDBCardBody className="text-center">
                        <MDBCardImage
                        src={user.imageUrl || profile}
                        alt={email}
                        className="rounded-circle"
                        style={{ width: '150px' }}
                        fluid />
                        <p className="text-muted mb-1"><i>{user.department || user.role || "Belirtilmedi"}</i></p>
                        <h4 className="text-muted mb-4">{user.firstName} {user.lastName}</h4>
                        <div className="d-flex justify-content-center mb-2">
                        {storeEmail === email &&
                            <div>
                                <Link to={`/profile/update/${email}`} className="btn btn-primary">Güncelle</Link>
                                <button className="ms-1 btn btn-danger" onClick={onClickLogout}>Çıkış Yap</button>
                            </div>
                        }
                        </div>
                    </MDBCardBody>
                    </MDBCard>

                    <MDBCard className="mb-4 mb-lg-0">
                    <MDBCardBody className="p-0">
                        <MDBListGroup flush className="rounded-3">
                            <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                <MDBIcon fas icon="fa-lg">  
                                    <FontAwesomeIcon icon={faCalendarPlus} className="fa-lg text-primary me-2" />
                                    Oluşturulma Tarihi:
                                </MDBIcon>
                                <MDBCardText>{formatDate(user.createdDate)}</MDBCardText>
                            </MDBListGroupItem>
                            <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                <MDBIcon fab icon="fa-lg">
                                    <FontAwesomeIcon icon={faCalendarCheck} className="fa-lg text-success me-2" />
                                    Güncellenme Tarihi:
                                </MDBIcon>
                                <MDBCardText>{formatDate(user.updatedDate)}</MDBCardText>
                            </MDBListGroupItem>
                            {(statuses === "ADMIN" && storeEmail==email) &&
                                <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                    <MDBIcon fab icon="fa-lg">
                                        <FontAwesomeIcon icon={faClipboard} className="fa-lg text-danger me-2" />
                                        İzin İşlemleri:
                                    </MDBIcon>
                                    <MDBCardText>
                                        <Link to={"/permission/create"} className="btn btn-danger">Yeni Bir İzin Oluştur</Link>
                                    </MDBCardText>
                                </MDBListGroupItem>
                            }
                            {(statuses === "ADMIN" && storeEmail==email) &&
                                <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                    <MDBIcon fab icon="fa-lg">
                                        <FontAwesomeIcon icon={faEnvelope} className="fa-lg text-warning me-2" />
                                        İletişim:
                                    </MDBIcon>
                                    <MDBCardText>
                                        <Link to={"/contact/message"} className="btn btn-warning">Mesajları Görüntüle</Link>
                                    </MDBCardText>
                                </MDBListGroupItem>
                            }
                        </MDBListGroup>
                    </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol lg="8">
                    <MDBCard className="mb-4">
                    <MDBCardBody>
                        <MDBRow>
                        <MDBCol sm="3">
                            <MDBCardText>Ad Soyad</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                            <MDBCardText className="text-muted">{user.firstName} {user.lastName}</MDBCardText>
                        </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                        <MDBCol sm="3">
                            <MDBCardText>Email</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                            <MDBCardText className="text-muted">{user.email}</MDBCardText>
                        </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                        <MDBCol sm="3">
                            <MDBCardText>Telefon</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                            <MDBCardText className="text-muted">{user.phoneNumber || "Belirtilmedi"}</MDBCardText>
                        </MDBCol>
                        </MDBRow>
                        {((statuses === "ADMIN" && storeEmail != email) || statuses !== "ADMIN") &&
                        <div>
                            <hr />
                            <MDBRow>
                            <MDBCol sm="3">
                                <MDBCardText>Doğum Günü</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                                <MDBCardText className="text-muted">{user.birthday || "Belirtilmedi"}</MDBCardText>
                            </MDBCol>
                            </MDBRow>
                        </div>
                        }
                        
                        
                        {(statuses === "ADMIN" && storeEmail == email) && 
                        <div>
                            <hr />
                            <MDBRow>
                            <MDBCol sm="3">
                                <MDBCardText>Rol</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                                <MDBCardText className="text-muted">{user.role || "Belirtilmedi"}</MDBCardText>
                            </MDBCol>
                            </MDBRow>
                        </div>
                        }
                        {((statuses === "ADMIN" && storeEmail != email) || statuses !== "ADMIN") && 
                        <div>
                            <hr />
                            <MDBRow>
                            <MDBCol sm="3">
                                <MDBCardText>Departman</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                                <MDBCardText className="text-muted">{user.department || "Belirtilmedi"}</MDBCardText>
                            </MDBCol>
                            </MDBRow>
                        </div>
                        }
                        
                        {((statuses === "ADMIN" && storeEmail != email) || statuses !== "ADMIN") &&
                        <div>
                            <hr />
                            <MDBRow>
                            <MDBCol sm="3">
                                <MDBCardText>Biyografi</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                                <MDBCardText className="text-muted">{user.biography || "Belirtilmedi"}</MDBCardText>
                            </MDBCol>
                            </MDBRow>
                        </div>
                        }
                        
                    </MDBCardBody>
                    </MDBCard>

                    {((statuses === "ADMIN" && storeEmail!=email) || statuses !== "ADMIN") &&
                        <MDBRow>
                        <MDBCol md="12">
                            <MDBCard className="mb-4 mb-md-0">
                            <MDBCardBody>
                                <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">{user.firstName} {user.lastName}:</span> Kalan İzinli Gün Sayınız</MDBCardText>
                                <h3>{user.leaveBalance} Gün İzniniz Bulunmaktadır.</h3>
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        </MDBRow>
                    }
                    <MDBRow>
                    <MDBCol md="12">
                        <MDBCard className="mb-4 mb-md-0">
                        <MDBCardBody>
                            <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">{user.firstName} {user.lastName}:</span> Siteye Kayıtlı Olduğu Gün Sayısı</MDBCardText>
                            <h3>{calculateDaysRegistered(user.createdDate)} Gün Önce Kayıt Oldunuz.</h3>
                        </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
            {((statuses === "ADMIN" && storeEmail!==email) || statuses !== "ADMIN") &&
                <MDBRow className="mb-5">
                    <PermissionFeed cardLocation="ProfilePage" userId={user.id} />
                </MDBRow>
            }
            
        </MDBContainer>
        </section>
    );
}

export default UserPage;