import React from 'react';

export const BalanceItem = ({participante}) => {
  return (
        <li 
            key={Number(participante.id)+Math.random()}
            className="list-group-item w-100 w-sm-75 mx-0 py-3 bg-transparent"
        >
            <div className="w-100 w-sm-75 mx-0 d-flex align-items-center justify-content-between">
                <div 
                    className='d-flex justify-content-between w-100'
                >
                    <p className='fw-bold'>
                        {participante.nombre}                     
                    </p>
                    <p>
                        {participante.gasto} €                    
                    </p>
                </div>  
            </div>
            <hr />
        </li>
  );
};
