import React from 'react';
import { useForm } from '../hooks/useForm';

export const NewGastoOptionPrecio = () => {

    const  [{money}, handleMoneyInputChange]  = useForm({
        money: '',
      });

    return (
        <input  
            type='text'
            name='money'
            className='costGasto form-control d-block'
            placeholder='Coste...'
            autoComplete='off'
            value={money}
            onChange={ handleMoneyInputChange }
        />
        );
};
