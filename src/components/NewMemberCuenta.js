import React, { useContext, useEffect, useMemo } from 'react';
import { AccountContext } from './AccountContext';
;


export const NewMemberCuenta = ({cuenta}) => {    

    

    let {setNewMemberCuenta, newMemberCuenta, setGasto, cuentas, name, handleNameInputChange, resetNameInput,} = useContext(AccountContext);

    const members = useMemo(() => {
        return cuenta.members || [{}];
    },[cuenta.members])     

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
    
    const handleNewMemberCuenta = (e) => {
        e.preventDefault();
        if(name.trim().length <= 1)  {
            alert('El nombre debe contener al menos dos caracteres.')
            return;
        };
        
        const newMember = {  
            id: (new Date().getTime()+Math.random()),          
            name: name,
            money: 0,
        }        

        members.push(newMember);

        resetNameInput();
        setNewMemberCuenta(false);
        setGasto(true);
        localStorage.setItem('cuentas', JSON.stringify(cuentas));
        
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
