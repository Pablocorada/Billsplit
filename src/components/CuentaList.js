import React from 'react'
import {CuentaItem} from './CuentaItem.js';

export const CuentaList = ({cuentas,showCuenta, handleDelete}) => {
    return (
        <ul className="list-group list-group-flush text-start mt-3">
            {
                cuentas.map( (cuenta,i) => {
                    
                    return (<CuentaItem 
                        key={cuenta.id}
                        cuenta={cuenta}
                        i={i}
                        handleDelete={handleDelete}
                        showCuenta={showCuenta}
                        />
                    );
                })
            }
        </ul>
    )
}