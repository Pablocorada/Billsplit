/* eslint-disable no-undef */
import React, { useContext } from 'react';
import { AccountContext } from '../AccountContext';
import { useForm } from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { Constantes } from '../general/Constantes';

export const Login = () => {

    const {setUserData} = useContext(AccountContext);
    const {setCuentas} = useContext(AccountContext);
    const {toastMessage, setToastMessage} = useContext(AccountContext);

    const  [{nomUsuario}, handleNomUsuarioInputChange, resetNomUsuario]  = useForm({
        nomUsuario: '',
    });
    const  [{password}, handlePasswordInputChange, resetPassword]  = useForm({
        password: '',
    });
    
    const navigate = useNavigate();

    const handleLogin = async (evt) => {

        evt.preventDefault();

        const url = Constantes.serverURL + 'login.php';
        const formData = new FormData();
        formData.append('nomUsuario', nomUsuario);
        formData.append('password', password);
        
        const respuesta = await fetch(url, {
            method: "POST",
            body: formData
        });
        const respJson = await respuesta.json();
        const toastLiveExample = document.getElementById('liveToast')
        const toast = new bootstrap.Toast(toastLiveExample);

        if (respJson === 'nomUsuario_empty') {
            setToastMessage('Debes ingresar un nombre de usuario.');
            toast.show();
        }else if(respJson === 'password_empty'){
            setToastMessage('Debes ingresar una contraseña.');
            toast.show();
        }else if(respJson === 'no_records'){
            setToastMessage('No hay coincidencias para este usuario y contraseña.');
            toast.show();
            resetNomUsuario();
            resetPassword();
        } else {
            
            sessionStorage.setItem('usuario', JSON.stringify(JSON.parse(respJson)));
            setCuentas(JSON.parse(sessionStorage.getItem('usuario')).cuentas ? JSON.parse(sessionStorage.getItem('usuario')).cuentas : []);
            setUserData(JSON.parse(respJson));
            resetNomUsuario();
            resetPassword();
            navigate('/');
        }
    }
  
    return (

    <div id='addCuentaBox' className='container w-75 m-auto box py-4 px-5'>
        <div id='liveToast' className="toast toast-demo d-flex align-items-center text-white bg-danger border-0 fade hide w-100 m-auto" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-body text-white f-3">
                {toastMessage}
            </div>
            <button type="button" className="btn-close btn-close-white ms-auto me-2" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div>
            <h2>Login</h2>
            <hr className='m-auto w-75'/>
        </div>
        
        <form id='formNewCuenta'>

            <div className='row mt-4 w-100 m-auto'>
                <label className='col-12 col-form-label text-start fs-5 p-0'>Nombre de usuario:</label>
                <div className='col-12 mt-1 p-0'>
                    <input  
                        type='text'
                        name='nomUsuario'
                        className='form-control'
                        placeholder=''
                        autoComplete='off'
                        value={nomUsuario}
                        onChange={ handleNomUsuarioInputChange }
                    />
                </div>
            </div>
            
            <div className='row mt-2 w-100 m-auto'>
                <label className='col-12 col-form-label text-start fs-5 p-0'>Contraseña:</label>
                <div className='col-12 mt-1 p-0'>
                    <input  
                        type='password'
                        name='password'
                        className='form-control'
                        placeholder=''
                        autoComplete='off'
                        value={password}
                        onChange={ handlePasswordInputChange }
                    />
                </div>
            </div>

            <button
                type='submit'
                onClick={handleLogin}
                className='botonBox mt-5 w-100'
            >
                Ingresar
            </button>
            <button
                onClick={(e) => {

                    e.preventDefault();
                    navigate('/');

                }}
                className='botonBox botonCancel mt-1 w-100'
            >
                Cancelar
            </button>

        </form>
    </div>

  );
};