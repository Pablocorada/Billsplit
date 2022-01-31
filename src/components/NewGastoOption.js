import React, { useContext } from 'react';
import { AccountContext } from './AccountContext';
import { NewGastoOptionPrecio } from './NewGastoOptionPrecio';

export const NewGastoOption = () => {

    let {currentId} = useContext(AccountContext);
    let {cuentas} = useContext(AccountContext);

    let currentCuenta = {};
        cuentas.forEach(element => {
            if(element.id===currentId){
                currentCuenta = element;
            }
    });
    let {numberOptions} = useContext(AccountContext);
    const members = currentCuenta.members || [{}] ; 

    return (
        <>
            {
                numberOptions.map(() => {

                    return (
                        <div className='row m-auto justify-content-between align-items-start'
                             key={(new Date().getTime()+Math.random())}>
                            <div className='col-12 col-sm-8 px-0 align-self-end'>
                                <select 
                                    id='selectMember'
                                    className="whoPays form-select form-select-sm"
                                    name='name'
                                    >                                                        
                                    {
                                        members.map((member) => {
                                            return <option
                                                    className='whoPaysOptions'
                                                    key={(new Date().getTime()+Math.random())}
                                                    value={member.name}>
                                                        {member.name}
                                                    </option>
                                        })
                                    }
                                </select>
                                
                            </div>
                            <div className='col-12 col-sm-3 mt-1 p-0 d-flex justify-content-center align-content-center'>
                                <NewGastoOptionPrecio />
                                <p className='m-auto ms-2'>€</p>
                            </div>
                        </div>  
        
                    )
                })
            }                
        </>
        ) || null;
          
}  
    
    

