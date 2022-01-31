import React from 'react';

export const BalanceItem = ({member}) => {
  return (
    <>
        <li 
            key={member.id+Math.random()+1}
            className="list-group-item w-100 w-sm-75 mx-0 py-3 bg-transparent d-flex align-items-center justify-content-between"
        >
            <div 
                className='d-flex justify-content-between w-100'
            >
                <p className='fw-bold'>
                    {member.name}                     
                </p>
                <p>
                    {member.money} €                    
                </p>
            </div>
            
        </li>
        <hr/>
    </>
  );
};
