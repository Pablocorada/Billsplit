import React, { useContext, useEffect, useReducer, useState } from 'react';
import { listReducer } from '../helpers/listReducer';
import { useForm } from '../hooks/useForm';
import { AccountContext } from './AccountContext';
import { Cuenta } from './Cuenta';
import { CuentaList } from './CuentaList';
import { NewCuenta } from './NewCuenta';
;





export const MisCuentas = () => {

    let id = 1643307973698;
    let {cuentas,dispatch} = useContext(AccountContext);
    const {addCuenta, setAddCuenta} = useContext(AccountContext);
    const {setCuenta} = useContext(AccountContext);
    const {setCancel} = useContext(AccountContext);

    const  [{title}, handleTitleInputChange, resetTitle]  = useForm({
        title: '',
    });
    const  [{name}, handleNameInputChange, resetName]  = useForm({
        name: '',
    });

    const  [{description}, handleDescInputChange, resetDesc]  = useForm({
        description: '',
    });
    const  [{total}, handleTotalInputChange, resetTotal]  = useForm({
        total: '',
    });

    useEffect(() => {
        localStorage.setItem('cuentas', JSON.stringify(cuentas));
    }, [cuentas]);

    const showCuenta = () => {

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(title.trim().length <= 1) {
            return;
        };
        
        const newCuenta = {
            id: new Date().getTime(),
            title: title,
            total: 0,
            members: [],
            concepts: [{
                id: 1,
                description: 'a',
                totalConcept: 0
            },
            {
                id: 2,
                description: 'b',
                totalConcept: 0
            }
            ],
            date: new Date(),
        }
        
        const divAddMember = document.querySelector('#divAddMember');
        const inputNewMember = document.getElementsByClassName('inputNewMember');

        for(let i=inputNewMember.length-1; i>=0; i--){
            if(inputNewMember[i].value!==''){
                newCuenta.members.push({
                    id: new Date().getTime()+2,
                    name: inputNewMember[i].value,
                    money: 0
                })
            }
            divAddMember.removeChild(inputNewMember[i]);
        }
        
        const action = {
            type: 'add',
            payload: newCuenta,
        }

        dispatch(action);
        resetTitle();
        resetName();
        setCuenta(true);
        
    }

    const handleDelete = () => {


        /* dispatch(action); */
    }

    const handleAddMember = (e) => {

        e.preventDefault();
        const newMember = document.createElement('input');
        newMember.type='text'
        newMember.name='name'
        newMember.className='inputNewMember form-control mb-1'
        newMember.placeholder='Agrega a tu colega!'
        newMember.autoComplete='off'
        newMember.value=''
        newMember.onChange={ handleNameInputChange }

        const btnAddMember = document.querySelector('#btnAddMember');
        const divAddMember = document.querySelector('#divAddMember')
        divAddMember.insertBefore(newMember,btnAddMember);
        
    }


    return (
        <>
            

            <div id='historialBox' className='container w-75 m-auto box d-flex flex-column align-items-around'>
                <div className='mt-4'>
                    <h2>Historial de Cuentas</h2>
                    <hr className='m-auto w-75'/>
                </div>

                {
                    cuentas.length===0
                    ?
                        <h3 className='align-self-center m-auto'>Aún no has guardado ninguna cuenta.</h3>
                    :
                        <CuentaList
                            cuentas={cuentas}
                            showCuenta={showCuenta}
                            handleDelete={handleDelete}
                        />                    
                }    

                
            </div>
        
            <NewCuenta
                title={title} 
                name={name} 
                handleAddMember={handleAddMember}
                handleSubmit={handleSubmit} 
                handleTitleInputChange={handleTitleInputChange} 
                handleNameInputChange={handleNameInputChange}
                addCuenta={addCuenta}
                setAddCuenta={setAddCuenta}
            />

            <Cuenta 
                id={id}
            />

            <button 
                id='btnNewCuenta'
                className='btn btn-outline-success m-auto mt-2 d-block px-5 py-0 py-sm-1 fw-bold'
                onClick={() => {
                    setAddCuenta(true); 
                }}
                >
                    Nueva Cuenta
            </button>

        </>

    );
};
