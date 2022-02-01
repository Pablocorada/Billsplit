import React, { useContext, useMemo } from 'react';
import { AccountContext } from './AccountContext';

export const ConfirmGasto = ({cuenta}) => {

    let {setNewGasto, setNumberOptions, resetDescription, resetTotal} = useContext(AccountContext);
    const {setGasto} = useContext(AccountContext);

    const members = useMemo(() => {
        return cuenta.members || [{}];
    },[cuenta.members]) 

    let description;
    let total;

    if(document.getElementById('inputDescription')){
        description = document.getElementById('inputDescription').value;
    }
    if(document.getElementById('inputTotal')){
        total = document.getElementById('inputTotal').value;
    }

    const handleConfirmGasto = (e) => {
        e.preventDefault();
        if(description.trim().length <= 1 || total<=0)  {
            alert('Debes agregar una descripción y un precio al gasto.')
            return;
        };
        
        let totalGasto = 0;
        const costGasto = document.getElementsByClassName('costGasto');
        const whoPays = document.getElementsByClassName('whoPays');
        const whoPaysOptions = document.getElementsByClassName('whoPaysOptions');
        
        if(whoPays.length===0)  {
            alert('Debes asignar el gasto a al menos un participante.')
            return;
        };
        
        for(let i=0; i<costGasto.length; i++){
            if(isNaN(Number(costGasto[i].value.trim())) || isNaN(Number(total))){
                alert('Debes asignar valores numéricos a los gastos.')
                return;
            }
            totalGasto += Number(costGasto[i].value.trim())
        }

        if(totalGasto!==Number(total)) {
            alert('La suma de cada aporte no se corresponde al monto total del gasto!')
            return;
        };

        for(let i=0; i<whoPays.length; i++){
            for(let j=0; j<members.length; j++){
                if(whoPays[i].value===whoPaysOptions[j].value){
                    members[j].money = Number(members[j].money) + Number(costGasto[i].value.trim());
                }
            }
        }
        
        const newGasto = {            
            id: (new Date().getTime() + Math.random()),
            description: description,
            totalConcept: total
        }        

        cuenta.concepts.push(newGasto);

        resetTotal();
        resetDescription();
        setNewGasto(false);
        setNumberOptions([1]);
        
    }

  return (
      <>
        <button
            id='btnConfirmMember'
            onClick={(e) => {
                handleConfirmGasto(e);
                setGasto(true);
            }}
            className='botonBox mt-1 btn-block w-100 m-auto'
        >
            Aceptar
        </button>
        <button
            id='btnCancelMember'
            onClick={() => {
                resetTotal();
                resetDescription();
                setGasto(true);
                setNewGasto(false);
                setNumberOptions([1]);
            }}
            className='botonBox mt-1 btn-block w-100 m-auto'
        >
            Cancelar
        </button>      
      </>
  );
};
