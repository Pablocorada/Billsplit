import React, { useContext } from 'react';
import { useForm } from '../hooks/useForm';
import { AccountContext } from './AccountContext';

export const AddMemberGasto = () => {

    const  [{money}, handleMoneyInputChange]  = useForm({
        money: '',
      });
    let {currentId} = useContext(AccountContext);
    let {cuentas} = useContext(AccountContext);

    let currentCuenta = {};
        cuentas.forEach(element => {
            if(element.id===currentId){
                currentCuenta = element;
            }
    });
    const members = currentCuenta.members || [{}] ; 

    
    const handleAddPayMember = (e) => {
        
        e.preventDefault();
        
        const divNewMemberGasto = document.createElement('div');
        divNewMemberGasto.className = 'row m-auto justify-content-between align-items-start px-0';
        divNewMemberGasto.innerHTML = `
            <div class='col-12 col-sm-8 px-0 align-self-end'>
                <select 
                class="whoPays form-select form-select-sm"
                    name='name'
                    > 

                    </select>
                
            </div>
            <div class='col-12 col-sm-3 mt-1 p-0 d-flex justify-content-center align-content-center'>
                    <input  
                        type='text'
                        name='money'
                        class='costGasto form-control d-block'
                        placeholder='Coste...'
                        autoComplete='off'
                        value='${money}'
                        onChange='${ handleMoneyInputChange }'
                        />
                        <p class='m-auto ms-2'>€</p>
                        </div>
                        `;
                        
                        
        const divOptionsContain = document.querySelector('#divOptionsContain');
        divOptionsContain.appendChild(divNewMemberGasto);
        
        const selectMember = document.querySelectorAll('.whoPays');
        members.forEach(member => {
            const option = document.createElement('option');
            option.className ='whoPaysOptions';
            option.key = (new Date().getTime()+Math.random());
            option.value = member.name
            option.innerHTML = member.name;
    
            selectMember[selectMember.length-1].appendChild(option);
        });
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

