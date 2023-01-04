import React, { useContext, useEffect } from 'react';
import { AccountContext } from '../AccountContext';

export const NewCuenta = ({title, handleAddMember, handleSubmit, handleTitleInputChange}) => {
  
    const {addCuenta, setAddCuenta} = useContext(AccountContext);
    const {setCuenta} = useContext(AccountContext);
    const {setGasto, setBackToAccounts} = useContext(AccountContext);

    useEffect(() => {
      
        const addCuentaBox = document.querySelector('#addCuentaBox');
        const historialBox = document.querySelector('#historialBox');
        if (addCuenta){
            addCuentaBox.classList = 'container w-75 m-auto box py-4 px-5'
            historialBox.classList = 'd-none'
            setBackToAccounts(true)
        };
    }, [addCuenta,setCuenta,setBackToAccounts,setGasto]);
    
    useEffect(() => {
      
        const addCuentaBox = document.querySelector('#addCuentaBox');
        const historialBox = document.querySelector('#historialBox');
        if (!addCuenta){
            addCuentaBox.classList = 'd-none'
            historialBox.classList = 'container w-75 m-auto box py-4 px-5'
            setCuenta(false)
            setAddCuenta(false)
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addCuenta]);
  
    return (

    <div id='addCuentaBox'>
        <div>
            <h2>Nueva Cuenta</h2>
            <hr className='m-auto w-75'/>
        </div>
        
        <form id='formNewCuenta' onSubmit={handleSubmit}>

            <div className='row mt-4 w-100 m-auto'>
                <label className='col-12 col-form-label text-start fs-5 p-0'>Título:</label>
                <div className='col-12 mt-1 p-0'>
                    <input  
                        type='text'
                        name='title'
                        className='form-control'
                        placeholder='Título de la cuenta...'
                        autoComplete='off'
                        value={title}
                        onChange={ handleTitleInputChange }
                    />
                </div>
            </div>
            <div id='divAddMember' className='row mt-4 w-100 m-auto'>
                <label className='col-12 col-form-label text-start fs-5 mb-1 p-0'>Participantes:</label>
                <button
                    id='btnAddMember'
                    onClick={handleAddMember}
                    className='botonBox mt-1 btn-block w-100 m-auto'
                >
                    Agregar Participante
                </button>
            </div>

            <button
                type='submit'
                onClick={handleSubmit}
                className='botonBox mt-5 w-100'
            >
                Agregar Cuenta
            </button>
            <button
                onClick={(e) => {

                    e.preventDefault();
                    
                    setAddCuenta(false)
                    setBackToAccounts(false);
                    const divAddMember = document.querySelector('#divAddMember');
                    const inputNewMember = document.getElementsByClassName('inputNewMember');

                    for(let i=inputNewMember.length-1; i>=0; i--){                        
                        divAddMember.removeChild(inputNewMember[i]);
                    }

                }}
                className='botonBox botonCancel mt-1 w-100'
            >
                Cancelar
            </button>

        </form>
    </div>

  );
};
