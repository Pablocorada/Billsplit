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
        divNewMemberGasto.className = 'divWhoPays row m-auto justify-content-between px-0';
        divNewMemberGasto.innerHTML = `
            <div class='col-12 col-sm-8'>
                <select 
                class="whoPays form-select form-select-sm"
                    name='name'
                    > 

                    </select>
                
            </div>
            <div class="inputCostGasto col-12 col-sm-4 input-group d-flex justify-content-center align-content-center">
                <input type="text" 
                    class="costGasto form-control d-block"
                    placeholder="Pago..." 
                    aria-label="Username" 
                    aria-describedby="input-group-right" 
                    autoComplete='off'
                    value='${money}'
                    onChange='${ handleMoneyInputChange }'>
                <span class="input-group-text" id="input-group-right-example">€</span>
            </div>   
            `;
                        
                        
        const divOptionsContain = document.querySelector('#divOptionsContain');
        divOptionsContain.appendChild(divNewMemberGasto);
        
        const selectMember = document.querySelectorAll('.whoPays');
        members.forEach(member => {
            const option = document.createElement('option');
            option.className ='whoPaysOptions';
            option.key = (new Date().getTime()+2);
            option.value = member.name
            option.innerHTML = member.name;
    
            selectMember[selectMember.length-1].appendChild(option);
        });
    }

  return (
    
    <button
        id='btnAddPayMember'
        onClick={handleAddPayMember}
        className='botonBox btn-block w-100 m-auto'
    >
        Agregar Participante
    </button>
  )
  };

