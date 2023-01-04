/* eslint-disable no-undef */
import React, { useContext } from 'react';
import { AccountContext } from '../AccountContext';
import { useForm } from '../../hooks/useForm';
import { Constantes } from '../general/Constantes';

export const Perfil = ({ handleSubmit }) => {

    const {userData, setUserData} = useContext(AccountContext);
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
    const  [{password}, handlePasswordInputChange, resetPassword]  = useForm({
        password: '',
    });
    const  [{newPassword}, handleNewPasswordInputChange, resetNewPassword]  = useForm({
        newPassword: '',
    });
    const  [{repNewPassword}, handleRepNewPasswordInputChange, resetRepNewPassword]  = useForm({
        repNewPassword: '',
    });

    const handleModificarDatos = async (evt) => {

        evt.preventDefault();

        const url = Constantes.serverURL + 'modificar-datos-usuario.php';
        const formData = new FormData();
        formData.append('id', userData.id);
        formData.append('nombre', nombre || userData.nombre);
        formData.append('apellidos', apellidos || userData.apellidos);
        formData.append('email', email || userData.email);
        
        const respuesta = await fetch(url, {
            method: "POST",
            body: formData
        });
        const respJson = await respuesta.json();

        if (respJson === 'campo_empty') {
            alert('Debes rellenar todos los campos.');
            resetNombre();
            resetApellidos();
            resetEmail();
        }else {
            
            sessionStorage.setItem('usuario', JSON.stringify(JSON.parse(respJson)));
            setUserData(JSON.parse(respJson));
            alert('Tus datos han sido modificados correctamente!');
            resetNombre();
            resetApellidos();
            resetEmail();
            resetPassword();
            resetNewPassword();
            resetRepNewPassword();
        }
    }

    const handleModificarPassword = async (evt) => {

        evt.preventDefault();

        const url = Constantes.serverURL + 'modificar-password.php';
        const formData = new FormData();
        formData.append('id', userData.id);
        formData.append('password', password);
        formData.append('newPassword', newPassword);
        formData.append('repNewPassword', repNewPassword);
        
        const respuesta = await fetch(url, {
            method: "POST",
            body: formData
        });
        const respJson = await respuesta.json();
        const toastLiveExample = document.getElementById('liveToast');
        const toast = new bootstrap.Toast(toastLiveExample);

        if (respJson === 'campo_empty') {
            setToastMessage('Debes rellenar todos los tres campos.');
            toast.show();
            resetPassword();
            resetNewPassword();
            resetRepNewPassword();
        }else if(respJson === 'incorrect_password'){
            setToastMessage('La contraseña antigua es incorrecta.');
            toast.show();
            resetPassword();
            resetNewPassword();
            resetRepNewPassword();
        }else if(respJson === 'different_password'){
            setToastMessage('Las nuevas contraseñas no coinciden.');
            toast.show();
            resetPassword();
            resetNewPassword();
            resetRepNewPassword();
        }else {
            alert('Tu contraseña ha sido actualizada correctamente!');
            resetNombre();
            resetApellidos();
            resetEmail();
            resetPassword();
            resetNewPassword();
            resetRepNewPassword();
        }
    }
  
    return (

    <div id='addCuentaBox' className='container w-75 m-auto box py-4 pb-5 px-5'>
        <div>
            <h2>Perfil</h2>
            <hr className='m-auto w-75'/>
        </div>
        
        <form id='formNewCuenta' onSubmit={handleSubmit}>

            <div className='row mt-4 w-100 m-auto'>
                <label className='col-12 col-form-label text-start fs-5 p-0'>Nombre:</label>
                <div className='col-12 mt-1 p-0'>
                    <input  
                        type='text'
                        name='nombre'
                        className='form-control'
                        placeholder={userData.nombre}
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
                        placeholder={userData.apellidos}
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
                        placeholder={userData.email}
                        autoComplete='off'
                        value={email}
                        onChange={ handleEmailInputChange }
                    />
                </div>
            </div>

            <button
                type='submit'
                onClick={handleModificarDatos}
                className='botonBox mt-4 w-100'
            >
                Modificar datos de usuario
            </button>
            
        </form>

        <form id='formNewPass' onSubmit={handleSubmit}>
            <div>
                <hr className='m-auto w-75 my-5'/>
                <div id='liveToast' className="toast toast-demo d-flex align-items-center text-white bg-danger border-0 fade hide w-100 m-auto" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-body text-white f-3">
                        {toastMessage}
                    </div>
                    <button type="button" className="btn-close btn-close-white ms-auto me-2" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <h3>Modificar contraseña:</h3>
            </div>
            
            <div className='row mt-2 w-100 m-auto'>
                <label className='col-12 col-form-label text-start fs-5 p-0'>Contraseña actual:</label>
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
                <label className='col-12 col-form-label text-start fs-5 p-0'>Nueva contraseña:</label>
                <div className='col-12 mt-1 p-0'>
                    <input  
                        type='password'
                        name='newPassword'
                        className='form-control'
                        placeholder=''
                        autoComplete='off'
                        value={newPassword}
                        onChange={ handleNewPasswordInputChange }
                    />
                </div>
            </div>
            
            <div className='row mt-2 w-100 m-auto'>
                <label className='col-12 col-form-label text-start fs-5 p-0'>Repite tu nueva contraseña:</label>
                <div className='col-12 mt-1 p-0'>
                    <input  
                        type='password'
                        name='repNewPassword'
                        className='form-control'
                        placeholder=''
                        autoComplete='off'
                        value={repNewPassword}
                        onChange={ handleRepNewPasswordInputChange }
                    />
                </div>
            </div>

            <button
                type='submit'
                onClick={handleModificarPassword}
                className='botonBox mt-5 w-100'
            >
                Modificar contraseña
            </button>            
        </form>
    </div>

  );
};