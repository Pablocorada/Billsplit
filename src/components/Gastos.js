import React, { useContext } from 'react';
import { AccountContext } from './AccountContext';
import { GastosItem } from './GastosItem';

export const Gastos = () => {

    let {setNewGasto} = useContext(AccountContext);
    let {currentId} = useContext(AccountContext);
    let {cuentas} = useContext(AccountContext);
    cuentas = cuentas || [];

    let cuenta = {};

    cuentas.forEach(element => {
        if(element.id===currentId){
            cuenta = element;
        }
    });

    let total = 0;
    let concepts = [];
    if(cuenta.concepts){
        concepts = cuenta.concepts;
        concepts.forEach(concept => {
            total+=Number(concept.totalConcept);
        });
    }

  return (
    <div className='col-12 col-sm-5 mt-4'>
        <h2>Gastos</h2>
        <hr className='my-0'/>
        <div>
            <ul className="list-group list-group-flush text-start mt-3">
                {  
                    concepts.map( (concept,j) => {
                        return (
                            <>
                                <GastosItem 
                                key={concept.id+Math.random()}
                                concept={concept}
                                i={j}
                                />
                                <hr
                                key={concept.id+Math.random()}
                                />
                            </>
                        );
                    })
                }
            </ul>
        </div>
        <div className='row mt-4'>
            <h3 className='col-6 text-center fw-bold'>Total</h3>
            <h3 className='col-6 text-center'>{total}€</h3>
        </div>
        <button
            id='btnAddGasto'
            className='botonBox mt-1 btn-block w-100 m-auto'
            onClick={() => setNewGasto(true)}
        >
            Agregar Gasto
        </button>
    </div>
    );
};
