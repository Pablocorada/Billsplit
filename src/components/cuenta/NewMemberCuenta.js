import React, { useContext, useEffect } from 'react';
import { AccountContext } from '../AccountContext';
import { Constantes } from '../general/Constantes';


export const NewMemberCuenta = ({cuenta}) => {    

    const idCuentaActual = cuenta.id;

    let {setCuentas, userData, setNewMemberCuenta, newMemberCuenta, setGasto, name, handleNameInputChange, resetNameInput,} = useContext(AccountContext);

   /*  const participantes = useMemo(() => {
        return cuenta.participantes || [{}];
    },[cuenta.participantes])   */   

    useEffect(() => {
      
        const divNewMember = document.querySelector('#divNewMember');
        if (newMemberCuenta){
            divNewMember.classList = 'container w-75 m-auto mt-4 box pt-5 px-5';
        }else{
            divNewMember.classList = 'd-none'
        };
    }, [newMemberCuenta]);

    if(document.getElementById('inputNewMemberCuenta')){
        name = document.getElementById('inputNewMemberCuenta').value;
    }
    
    const handleNewMemberCuenta = async (e) => {
        e.preventDefault();
        if(name.trim().length <= 1)  {
            alert('El nombre debe contener al menos dos caracteres.')
            return;
        };

        const participantes = [];
        participantes.push({
            idCuenta: idCuentaActual,
            nombre: name,
            gasto: 0,
            deuda: 0
        })

        const urlNuevoPart = Constantes.serverURL + 'nuevo-participante-cuenta.php';
        const formDataNuevoPart = new FormData();
        formDataNuevoPart.append('participantes', JSON.stringify(participantes));
        
        const respuestaNuevoPart = await fetch(urlNuevoPart, {
            method: "POST",
            body: formDataNuevoPart
        });

        const respJsonNuevoPart = await respuestaNuevoPart.json();

        if(respJsonNuevoPart){
            const urlGetAllData = Constantes.serverURL + 'get-all-data.php';
            const formDataGetAllData = new FormData();
            formDataGetAllData.append('idUsuario', userData.id);
            const respuestaGetAllData = await fetch(urlGetAllData, {
                method: "POST",
                body: formDataGetAllData
            });
            const respJsonGetAllData = await respuestaGetAllData.json();

            
            sessionStorage.setItem('usuario', JSON.stringify(JSON.parse(respJsonGetAllData)));
            setCuentas(JSON.parse(sessionStorage.getItem('usuario')).cuentas);

            resetNameInput();
            setNewMemberCuenta(false);
            setGasto(true);
        }      

        //members.push(newMember);

        
    }

  return (
    <div id='divNewMember'>
        <h2>Nuevo Participante</h2>  
        <hr className='my-0'/>      

        <div className='mt-4 w-100 m-auto px-0'>
            <input  
                type='text'
                name='description'
                id='inputNewMemberCuenta'
                className='form-control'
                placeholder='Agrega a tu colega!'
                autoComplete='off'
                value={name}
                onChange={ handleNameInputChange }
            />
        </div>
        <button
            id='btnConfirmNewMember'
            onClick={(e) => {
                handleNewMemberCuenta(e);
            }}
            className='botonBox mt-3 btn-block w-100 m-auto'
            >
                Aceptar
        </button>
        <button
            id='btnCancelNewMember'
            onClick={() => {
                resetNameInput();
                setGasto(true);
                setNewMemberCuenta(false);
            }}
            className='botonBox mt-1 btn-block w-100 m-auto'
        >
            Cancelar
        </button> 
    </div>
    );
};
