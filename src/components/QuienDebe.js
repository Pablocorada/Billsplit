import React, { useContext } from 'react';
import { AccountContext } from './AccountContext';
import { QuienDebeItem } from './QuienDebeItem';

export const QuienDebe = () => {

    let {currentId} = useContext(AccountContext);
    let {cuentas} = useContext(AccountContext);
    cuentas = cuentas || [];

    let cuenta = {};

    cuentas.forEach(element => {
        if(element.id===currentId){
            cuenta = element;
        }
    });

    let members = [];
    if(cuenta.members){
        members = cuenta.members;
    }

  return (
    <div className='mt-4'>
        <h2>¿Quién debe a quién?</h2>
        <hr className='my-0'/>
        <div className='mb-4'>
            <ul className="list-group text-start mt-3">
                {                          
                    <QuienDebeItem 
                    key={members.id+Math.random()}
                    members={members}
                    cuenta={cuenta}
                    />                               
                }
            </ul>
        </div>
    </div>
    );
};
