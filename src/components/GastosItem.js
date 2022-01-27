import React from 'react';

export const GastosItem = ( {concept} ) => {

  return (
    <div>
        <li 
            key={concept.id}
            className="list-group-item w-100 w-sm-75 mx-0 py-3 bg-transparent d-flex align-items-center justify-content-between"
        >
            <div 
                className='align-self-start d-flex justify-content-between w-100'
            >
                <p>
                    {concept.description}                     
                </p>
                <p>
                    -   {concept.totalConcept}€                    
                </p>
            </div>
            <hr/>
        </li>
    </div>
)
};
