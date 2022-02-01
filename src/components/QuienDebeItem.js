import React from 'react';

export const QuienDebeItem = ({members, cuenta}) => {

    const {total} = cuenta || 0;

    const pagoInd = (Number(total)/members.length).toFixed(2);

    members.sort((a,b) => {
        return (Number(b.money-a.money));
    })

    for(let member of members){
        member.deuda = member.money - pagoInd;                    
    }

    const deudaList = [];

    for(let i=0; i<members.length; i++){
        
        for(let j=members.length-1; j>=0; j--){
            const deudaMayor = members[i].deuda;
            const deudaMenor = members[j].deuda;
            
            if(deudaMenor>=0 || deudaMayor<=0 || members[i]===members[j]){
                continue;
            };

            if(deudaMayor >= Math.abs(deudaMenor)){
                const textoDeuda = `
                    ${members[j].name} le debe ${(Math.abs(deudaMenor).toFixed(2))}€ a ${members[i].name}
                `;
                members[i].deuda -= Math.abs(deudaMenor);
                members[j].deuda = 0;
                deudaList.push(textoDeuda);
            }else{
                const textoDeuda = `
                    ${members[j].name} le debe ${(Math.abs(deudaMayor).toFixed(2))}€ a ${members[i].name}
                `;
                members[j].deuda += Math.abs(deudaMayor);
                members[i].deuda = 0;
                deudaList.push(textoDeuda);
            }
        }
    }


  return (
    <>
        {
            deudaList.map(textoDeuda => {
                return (
                    <>
                        <li 
                        className="listWho w-75 mb-0 py-3 m-auto fs-5 bg-transparent"
                        >
                            {textoDeuda}
                        </li>                
                    </>                    
                )
            })
        }
    </>
  );
};