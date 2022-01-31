import React, { useContext } from 'react';
import { AccountContext } from './AccountContext';

export const GastosItem = ( {concept} ) => {

    const {cuentas} = useContext(AccountContext);

  return (
    <div>
        <li 
            key={cuentas.id+2}
            className="list-group-item w-100 w-sm-75 mx-0 py-3 bg-transparent d-flex align-items-center justify-content-between"
        >
            <div 
                className='d-flex justify-content-between align-items-center w-100'
            >
                <p className='fw-bold'>
                    {concept.description}                     
                </p>
                <p>
                       {concept.totalConcept}€                    
                </p>
            </div>
        </li>
    </div>
)
};
