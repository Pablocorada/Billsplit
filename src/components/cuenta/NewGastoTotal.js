import React, { useContext } from 'react';
import { AccountContext } from '../AccountContext';

export const NewGastoTotal = () => {

    let  {total, handleTotalInputChange}  = useContext(AccountContext);

  return (
        <>
            <div className="input-group col-12 d-flex justify-content-center align-content-center">
                <input type="text" 
                       name='total'
                       id='inputTotal'
                       className='form-control'
                       placeholder="Coste..." 
                       aria-label="Username" 
                       aria-describedby="input-group-right" 
                       autoComplete='off'
                       value={total}
                       onChange={ handleTotalInputChange } />
                <span className="input-group-text" id="input-group-right-example">€</span>
            </div>    
        </>
    );
};
