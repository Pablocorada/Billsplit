import React from 'react'

export const CuentaItem = ({cuenta,i,showCuenta, handleDelete}) => {
    return (
        <div>
            <li 
                key={Number(cuenta.id)}
                className="list-group-item selectable-list w-75 m-auto py-3 bg-transparent d-flex align-items-center justify-content-between"
            >
                <span 
                    className='align-self-center d-block w-100'
                    onClick={() => {showCuenta (cuenta.id)}} 
                >
                    {i + 1}. {cuenta.title}
                </span>
                <button 
                    type="button" 
                    className="deleteAccount btn-close btn-sm" 
                    aria-label="Close"
                    onClick={handleDelete}
                    >
                </button>
            </li>
        </div>
    )
};
