import React from 'react';

export const QuienDebeItem = ({members, cuenta}) => {

    const {name, money} = members || {name:'', money:0};
    const {total} = cuenta || 0;

    const pagoInd = Math.trunc(Number(total)/members.length);

    members.sort((a,b) => {
        return (Number(b.money-a.money));
    })

    console.log(members)

  return (
    <div>
        {/* <li 
            key={member.id+Math.random()}
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
        </li> */}
    </div>
  );
};