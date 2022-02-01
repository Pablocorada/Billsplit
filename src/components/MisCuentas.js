import React, { useContext, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { AccountContext } from './AccountContext';
import { Cuenta } from './Cuenta';
import { CuentaList } from './CuentaList';
import { NewCuenta } from './NewCuenta';
;





export const MisCuentas = () => {

    let {cuentas,dispatch} = useContext(AccountContext);
    let {setCurrentId} = useContext(AccountContext);
    const {addCuenta, setAddCuenta} = useContext(AccountContext);
    const {setCuenta} = useContext(AccountContext);
    const {setCancel} = useContext(AccountContext);
    const {setGasto} = useContext(AccountContext);
    const {backToAccounts, setBackToAccounts} = useContext(AccountContext);

    const  [{title}, handleTitleInputChange, resetTitle]  = useForm({
        title: '',
    });
    const  [{name}, handleNameInputChange, resetName]  = useForm({
        name: '',
    });

    useEffect(() => {
        localStorage.setItem('cuentas', JSON.stringify(cuentas));
    }, [cuentas]);

    useEffect(() => {
        
        const btnBackToAccounts = document.querySelector('#btnBackToAccounts');
        if (backToAccounts){
            btnBackToAccounts.classList = 'btn btn-outline-success m-auto mt-2 d-block px-5 py-0 py-sm-1 fw-bold'
        }else{
            btnBackToAccounts.classList = 'd-none'
            };
    }, [backToAccounts]);

    const showCuenta = (id) => {
        setCurrentId(id);
        const addCuentaBox = document.querySelector('#addCuentaBox');
        const historialBox = document.querySelector('#historialBox');
        const cuentaBox = document.querySelector('#cuentaBox');
        
        addCuentaBox.classList = 'd-none'
        historialBox.classList = 'd-none'
        cuentaBox.classList = 'box w-75'
        setCuenta(false)
        setCancel(false)
        setGasto(true)
        setBackToAccounts(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(title.trim().length <= 1 || title.trim().length > 30) {
            alert('El nombre del título debe tener un mínimo dos y un máximo de 30 caracteres.');
            resetTitle();
            resetName();
            return;
        };
        
        const newCuenta = {
            id: new Date().getTime(),
            title: title,
            total: 0,
            members: [],
            concepts: [],
            date: new Date(),
        }
        setCurrentId(newCuenta.id);
        
        const divAddMember = document.querySelector('#divAddMember');
        const inputNewMember = document.getElementsByClassName('inputNewMember');

        for(let i=inputNewMember.length-1; i>=0; i--){
            if(inputNewMember[i].value!==''){
                newCuenta.members.push({
                    id: (new Date().getTime()+Math.random()),
                    name: inputNewMember[i].value,
                    money: 0
                })
            }
            divAddMember.removeChild(inputNewMember[i]);
        }

        if(newCuenta.members.length===0) {
            alert('Debe haber al menos un participante.')
            return;
        };
        for(let member of newCuenta.members){
            if(member.name.trim().length <= 1) {
                alert('Los nombres de los participantes deben tener como mínimo dos caracteres.')
                return;
            };
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

    const handleDelete = (e) => {

        const currentBtn = e.target;

        const deleteAccount = document.getElementsByClassName('deleteAccount')
        let cuenta = [];
        for(let i=0; i<deleteAccount.length; i++){
            if(deleteAccount[i]===currentBtn){
                cuenta = cuentas[i];
            }
        }
        const action = {
            type: 'delete',
            payload: cuenta.id,
        }

        dispatch(action);
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
                <div className='mt-1'>
                    <h2>Mis Cuentas</h2>
                    <hr className='m-auto w-75'/>
                </div>

                {
                    cuentas.length===0
                    ?
                        <h4 className='align-self-center m-auto mt-5'>Aún no tienes ninguna cuenta.</h4>
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

            <Cuenta />

            <button 
                id='btnNewCuenta'
                className='btn btn-outline-success m-auto mt-2 d-block px-5 py-0 py-sm-1 fw-bold'
                onClick={() => {
                    setAddCuenta(true); 
                }}
                >
                    Nueva Cuenta
            </button>
            <button
                id='btnBackToAccounts'
                onClick={() => {
                    
                    setCancel(true);
                    setBackToAccounts(false);
                    const divAddMember = document.querySelector('#divAddMember');
                    const inputNewMember = document.getElementsByClassName('inputNewMember');

                    for(let i=inputNewMember.length-1; i>=0; i--){                        
                        divAddMember.removeChild(inputNewMember[i]);
                    }

                }}
                className='btn btn-outline-success m-auto mt-2 d-block px-5 py-0 py-sm-1 fw-bold'
            >
                Volver a Mis Cuentas
            </button>

        </>

    );
};
