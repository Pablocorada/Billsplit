import React, { useEffect, useContext }  from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../AccountContext';

export const Header = () => {

    let {userData, setUserData} = useContext(AccountContext);
    const {logged, setLogged} = useContext(AccountContext);
    const {setMisCuentasLink, setLoginLink, setRegistroLink, setPerfilLink, setCuentaLink} = useContext(AccountContext);

    const navigate = useNavigate();
    const handleClickHome = () => {
        navigate('/');
    }
    const handleClickLogin = () => {
        navigate('/login');
    }
    const handleClickRegistro = () => {
        navigate('/registro');
    }
    const handleClickMisCuentas = () => {
        navigate('/mis-cuentas');
    }
    const handleClickPerfil = () => {
        navigate('/perfil');
    }
    const handleClickLogout = () => {
        setMisCuentasLink('/');
        setLoginLink('/login');
        setRegistroLink('/registro');
        setPerfilLink('/');
        setCuentaLink('/');

        setUserData({});
        sessionStorage.clear('usuario');
        setLogged(false);
        navigate('/');
    }

    useEffect(() => {
      
        if(userData.id){
            setMisCuentasLink('/mis-cuentas');
            setLoginLink('/');
            setRegistroLink('/');
            setPerfilLink('/perfil');
            setCuentaLink('/cuenta');
            setLogged(true);
        }
    });

    if(logged){
        return (
            <header className="row justify-content-center align-content-center position-fixed w-100 pb-2 pb-sm-0">
                <div className='m-auto text-center col-6'>
                    <h1 className='d-inline' onClick={handleClickHome}>
                        BillSplit
                    </h1>
                </div>
                <div className='m-auto text-center col-6 row'>
                    <div className='separator col-0 col-md-5'></div>
                    <div className="text-end col-12 col-sm-8 col-md-3 nav-item dropdown">
                        <a className="nav-link dropdown-toggle pb-0" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                            <i className="bi-person-circle fs-1" role="img"></i>
                        </a>
                        <ul className="dropdown-menu w-50 fs-5">
                            <li><a className="dropdown-item" href="#" onClick={handleClickPerfil}>
                                Perfil
                                </a>
                            </li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><a className="dropdown-item" href="#" onClick={handleClickMisCuentas}>
                                Mis cuentas
                                </a>
                            </li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><a className="dropdown-item text-danger" href="#" onClick={handleClickLogout}>
                                Cerrar sesión
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="m-auto text-end text-sm-start col-12 col-sm-4 f-1">
                        <span>Bienvenido, {userData.nombre}</span>
                    </div>
                </div>
            </header>
        );
    }else{
        return (
            <header className="row justify-content-center align-content-center position-fixed w-100">
                <div className='m-auto text-center col-6'>
                    <h1 className='d-inline' onClick={handleClickHome}>
                        BillSplit
                    </h1>
                </div>
                <div className="m-auto text-center col-6">
                    <div className="nav-item dropdown">
                        <a className="d-inline nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                            <i className="bi-person-circle fs-1" role="img"></i>
                        </a>
                        <ul className="dropdown-menu w-50 fs-5">
                            <li><a className="dropdown-item" href="#" onClick={handleClickLogin}>
                                Ingresar
                                </a>
                            </li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><a className="dropdown-item" href="#" onClick={handleClickRegistro}>
                                Registro
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
    
}