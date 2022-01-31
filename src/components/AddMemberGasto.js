import React, { useContext } from 'react';
import { AccountContext } from './AccountContext';

export const AddMemberGasto = () => {

    
    let {setNumberOptions} = useContext(AccountContext);
    const handleAddPayMember = (e) => {

        e.preventDefault();
        setNumberOptions(number => [...number,1]);
        
    }

  return (
    <button
        id='btnAddPayMember'
        onClick={handleAddPayMember}
        className='botonBox mt-1 btn-block w-100 m-auto'
    >
        Agregar Participante
    </button>
  )
  };