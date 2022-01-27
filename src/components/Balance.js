import React, { useContext } from 'react';
import { AccountContext } from './AccountContext';
import { BalanceItem } from './BalanceItem';

export const Balance = ({id}) => {

  let {cuentas} = useContext(AccountContext);
  cuentas = cuentas || [];

  let cuenta = {};

  cuentas.forEach(element => {
      if(element.id===id){
          cuenta = element;
      }
  });

  let members = [];
  if(cuenta.members){
      members = cuenta.members;
  }

  return (
    <div className='col-12 col-sm-5 mt-4'>
        <h2>Balance</h2>
        <hr className='my-0'/>
        <div>
            <ul className="list-group list-group-flush text-start mt-3">
                {  
                    members.map( (member) => {
                        return (<BalanceItem 
                            key={member.id}
                            member={member}
                            />
                        );
                    })
                }
            </ul>
        </div>
    </div>
    );
};