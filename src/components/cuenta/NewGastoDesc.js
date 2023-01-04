import React, { useContext } from 'react';
import { AccountContext } from '../AccountContext';

export const NewGastoDesc = () => {

    const  {description, handleDescInputChange}  = useContext(AccountContext);

  return (
    <input  
        type='text'
        name='description'
        id='inputDescription'
        className='form-control'
        placeholder='Descripción del gasto...'
        autoComplete='off'
        value={description}
        onChange={ handleDescInputChange }
    />
    );
};
