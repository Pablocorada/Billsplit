import React, { useContext } from 'react';
import { AccountContext } from './AccountContext';

export const NewGastoTotal = () => {

    let  {total, handleTotalInputChange}  = useContext(AccountContext);

  return (
        <>
            <input  
                type='text'
                name='total'
                id='inputTotal'
                className='form-control'
                placeholder='Coste...'
                autoComplete='off'
                value={total}
                onChange={ handleTotalInputChange }
            />
            <p className='m-auto ms-2'>€</p>        
        </>
    );
};
