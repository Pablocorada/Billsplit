/* eslint-disable no-undef */
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../AccountContext';
import { useForm } from '../../hooks/useForm';
import { Constantes } from '../general/Constantes';

export const Registro = () => {

    const {setUserData} = useContext(AccountContext);
    const {toastMessage, setToastMessage} = useContext(AccountContext);

    const  [{nombre}, handleNombreInputChange, resetNombre]  = useForm({
        nombre: '',
    });
    const  [{apellidos}, handleApellidosInputChange, resetApellidos]  = useForm({
        apellidos: '',
    });
    const  [{email}, handleEmailInputChange, resetEmail]  = useForm({
        email: '',
    });
    const  [{nomUsuario}, handleNomUsuarioInputChange, resetNomUsuario]  = useForm({
        nomUsuario: '',
    });
    const  [{password}, handlePasswordInputChange, resetPassword]  = useForm({
        password: '',
    });
    const  [{repPassword}, handleRepPasswordInputChange, resetRepPassword]  = useForm({
        repPassword: '',
    });

    const navigate = useNavigate();

    const handleRegistro = async (evt) => {

        evt.preventDefault();

        const url = Constantes.serverURL + 'registro.php';
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('apellidos', apellidos);
        formData.append('email', email);
        formData.append('nomUsuario', nomUsuario);
        formData.append('password', password);
        formData.append('repPassword', repPassword);
        
        const respuesta = await fetch(url, {
            method: "POST",
            body: formData
        });
        const respJson = await respuesta.json();
        const toastLiveExample = document.getElementById('liveToast');
        const toast = new bootstrap.Toast(toastLiveExample);

        if (respJson === 'campo_empty') {
            setToastMessage('Debes rellenar todos los campos para registrarte.');
            toast.show();
            resetPassword();
            resetRepPassword();
        }else if(respJson === 'different_password'){
            setToastMessage('Las contraseñas ingresadas no coinciden.');
            toast.show();
            resetPassword();
            resetRepPassword();
        }else if(respJson === 'user_exists'){
            setToastMessage('El nombre de usuario ingresado ya está registrado, prueba con uno distinto.');
            toast.show();
            resetNomUsuario();
            resetPassword();
            resetRepPassword();
        }else {
            
            sessionStorage.setItem('usuario', JSON.stringify(JSON.parse(respJson)));
            setUserData(JSON.parse(respJson));
            alert('Te has registrado correctamente!');
            resetNombre();
            resetApellidos();
            resetEmail();
            resetNomUsuario();
            resetPassword();
            resetRepPassword();
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
            <h2>Registro</h2>
            <hr className='m-auto w-75'/>
        </div>
        
        <form id='formNewCuenta'>

            <div className='row mt-4 w-100 m-auto'>
                <label className='col-12 col-form-label text-start fs-5 p-0'>Nombre:</label>
                <div className='col-12 mt-1 p-0'>
                    <input  
                        type='text'
                        name='nombre'
                        className='form-control'
                        placeholder=''
                        autoComplete='off'
                        value={nombre}
                        onChange={ handleNombreInputChange }
                    />
                </div>
            </div>

            <div className='row mt-4 w-100 m-auto'>
                <label className='col-12 col-form-label text-start fs-5 p-0'>Apellidos:</label>
                <div className='col-12 mt-1 p-0'>
                    <input  
                        type='text'
                        name='apellidos'
                        className='form-control'
                        placeholder=''
                        autoComplete='off'
                        value={apellidos}
                        onChange={ handleApellidosInputChange }
                    />
                </div>
            </div>

            <div className='row mt-4 w-100 m-auto'>
                <label className='col-12 col-form-label text-start fs-5 p-0'>Email:</label>
                <div className='col-12 mt-1 p-0'>
                    <input  
                        type='email'
                        name='email'
                        className='form-control'
                        placeholder=''
                        autoComplete='off'
                        value={email}
                        onChange={ handleEmailInputChange }
                    />
                </div>
            </div>

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
            
            <div className='row mt-2 w-100 m-auto'>
                <label className='col-12 col-form-label text-start fs-5 p-0'>Repite tu contraseña:</label>
                <div className='col-12 mt-1 p-0'>
                    <input  
                        type='password'
                        name='repPassword'
                        className='form-control'
                        placeholder=''
                        autoComplete='off'
                        value={repPassword}
                        onChange={ handleRepPasswordInputChange }
                    />
                </div>
            </div>

            <button
                type='submit'
                onClick={handleRegistro}
                className='botonBox mt-5 w-100'
            >
                Registrar
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