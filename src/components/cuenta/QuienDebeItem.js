import React from 'react';

export const QuienDebeItem = ({participantes, cuenta}) => {

    const {precioTotal} = cuenta || 0;

    const pagoInd = (Number(precioTotal)/participantes.length).toFixed(2);

    participantes.sort((a,b) => {
        return (Number(b.gasto-a.gasto));
    })

    for(let participante of participantes){
        participante.deuda = participante.gasto - pagoInd;      
    }

    const deudaList = [];

    for(let i=0; i<participantes.length; i++){
        
        for(let j=participantes.length-1; j>=0; j--){
            const deudaMayor = participantes[i].deuda;
            const deudaMenor = participantes[j].deuda;
            
            if(deudaMenor>=0 || deudaMayor<=0 || participantes[i]===participantes[j]){
                continue;
            };

            if(deudaMayor >= Math.abs(deudaMenor)){
                const textoDeuda = `
                    ${participantes[j].nombre} le debe ${(Math.abs(deudaMenor).toFixed(2))}€ a ${participantes[i].nombre}
                `;
                participantes[i].deuda -= Math.abs(deudaMenor);
                participantes[j].deuda = 0;
                deudaList.push(textoDeuda);
            }else{
                const textoDeuda = `
                    ${participantes[j].nombre} le debe ${(Math.abs(deudaMayor).toFixed(2))}€ a ${participantes[i].nombre}
                `;
                participantes[j].deuda += Math.abs(deudaMayor);
                participantes[i].deuda = 0;
                deudaList.push(textoDeuda);
            }
        }
    }

  return (
            deudaList.map(textoDeuda => {
                return (
                        <li 
                            key={Number(cuenta.id)+Math.random()}
                            className="listWho w-75 mb-0 py-3 m-auto fs-5 bg-transparent"
                        >
                            {textoDeuda}
                        </li>                    
                )
            })
  );
};