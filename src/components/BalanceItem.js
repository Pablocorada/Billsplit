import React from 'react';

export const BalanceItem = ({member}) => {
  return (
    <div>
        <li 
            key={member.id+3}
            className="list-group-item w-100 w-sm-75 mx-0 py-3 bg-transparent d-flex align-items-center justify-content-between"
        >
            <div 
                className='align-self-start d-flex justify-content-between w-100'
            >
                <p>
                    {member.name}                     
                </p>
                <p>
                    {member.money}                    
                </p>
            </div>
            <hr/>
        </li>
    </div>
  );
};
