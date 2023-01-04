import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { AccountContext } from '../AccountContext';
import { CuentaList } from './CuentaList';
import { NewCuenta } from './NewCuenta';
import { BottomButton } from '../general/BottomButton';
import { convertDates } from '../../helpers/convertDates';
import { Constantes } from '../general/Constantes';

export const MisCuentas = () => {

    const {userData} = useContext(AccountContext);
    let {cuentas,setCuentas} = useContext(AccountContext);
    let {setCurrentId} = useContext(AccountContext);
    const {setAddCuenta} = useContext(AccountContext);
    const {backToAccounts, setBackToAccounts} = useContext(AccountContext);


    const  [{title}, handleTitleInputChange, resetTitle]  = useForm({
        title: '',
    });
    const  [{name}, handleNameInputChange, resetName]  = useForm({
        name: '',
    });

    useEffect(() => {  
        const btnBackToAccounts = document.querySelector('#btnBackToAccounts');
        if(!backToAccounts){
            btnBackToAccounts.classList = 'd-none'
        }else{
            btnBackToAccounts.classList = 'btn btn-outline-success m-auto mt-2 d-block px-5 py-0 py-sm-1 fw-bold'
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    });
    
    const navigate = useNavigate();
    const showCuenta = (id) => {
        setCurrentId(id);
        navigate('/cuenta');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(title.trim().length <= 1 || title.trim().length > 30) {
            alert('El nombre del título debe tener un mínimo dos y un máximo de 30 caracteres.');
            resetTitle();
            resetName();
            return;
        };       

        const fecha = convertDates(new Date());

        const url = Constantes.serverURL + 'nueva-cuenta.php';
        const formData = new FormData();
        formData.append('idUsuario', userData.id);
        formData.append('nombre', title);
        formData.append('fecha', fecha);
        formData.append('precioTotal', 0);

        const respuesta = await fetch(url, {
            method: "POST",
            body: formData
        });
        
        const respJson = await respuesta.json();

        if (respJson){
            const idCuentaActual = JSON.parse(respJson).id;
            setCurrentId(idCuentaActual);

            const newCuenta = {
                id: idCuentaActual,
                idUsuario: userData.id,
                nombre: title,
                participantes: [],
                gastos: [],
                fecha: fecha,
                precioTotal: 0,
            }

            const divAddMember = document.querySelector('#divAddMember');
            const inputNewMember = document.getElementsByClassName('inputNewMember');

            for(let i=inputNewMember.length-1; i>=0; i--){
                if(inputNewMember[i].value!==''){
                    newCuenta.participantes.push({
                        idCuenta: idCuentaActual,
                        nombre: inputNewMember[i].value,
                        gasto: 0,
                        deuda: 0
                    })
                }
                divAddMember.removeChild(inputNewMember[i]);
            }

            if(newCuenta.participantes.length===0) {
                alert('Debe haber al menos un participante.')
                return;
            };
            for(let participante of newCuenta.participantes){
                if(participante.nombre.trim().length <= 1) {
                    alert('Los nombres de los participantes deben tener como mínimo dos caracteres.')
                    return;
                };
            }

            const urlNuevoPart = Constantes.serverURL + 'nuevo-participante-cuenta.php';
            const formDataNuevoPart = new FormData();
            formDataNuevoPart.append('participantes', JSON.stringify(newCuenta.participantes));
            
            const respuestaNuevoPart = await fetch(urlNuevoPart, {
                method: "POST",
                body: formDataNuevoPart
            });

            const respJsonNuevoPart = await respuestaNuevoPart.json();

            if(respJsonNuevoPart){
                const urlGetAllData = Constantes.serverURL + 'get-all-data.php';
                const formDataGetAllData = new FormData();
                formDataGetAllData.append('idUsuario', userData.id);
                const respuestaGetAllData = await fetch(urlGetAllData, {
                    method: "POST",
                    body: formDataGetAllData
                });
                const respJsonGetAllData = await respuestaGetAllData.json();
                
                sessionStorage.setItem('usuario', JSON.stringify(JSON.parse(respJsonGetAllData)));
                setCuentas(JSON.parse(sessionStorage.getItem('usuario')).cuentas);

                resetTitle();
                resetName();
                navigate('/cuenta');
            }

        }else{
            alert('Ha habido un error. No hemos podido guardar la nueva cuenta. Inténtalo más tarde.')
        }
        
        
        
    }

    const handleDelete = async (e) => {

        const currentBtn = e.target;

        const deleteAccount = document.getElementsByClassName('deleteAccount')
        let cuenta = [];
        for(let i=0; i<deleteAccount.length; i++){
            if(deleteAccount[i]===currentBtn){
                cuenta = cuentas[i];
            }
        }
        const idCuenta = cuenta.id;


        const url = Constantes.serverURL + 'eliminar-cuenta.php';
        const formData = new FormData();
        formData.append('id', idCuenta);
        
        const respuesta = await fetch(url, {
            method: "POST",
            body: formData
        });
        const respJson = await respuesta.json();

        if (respJson){
            cuentas = cuentas.filter(item => item.id !== cuenta.id);
            setCuentas(cuentas);
        }

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

    const newCuentaFunction = () => {
        setBackToAccounts(true)
        setAddCuenta(true); 
    }
    
    const backToAccountsFunction = () => {
                    
        const divAddMember = document.querySelector('#divAddMember');
        const inputNewMember = document.getElementsByClassName('inputNewMember');
        
        for(let i=inputNewMember.length-1; i>=0; i--){                        
            divAddMember.removeChild(inputNewMember[i]);
        }
        
        setBackToAccounts(false)
        setAddCuenta(false);
        navigate('/mis-cuentas');
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
            />

            <BottomButton 
                id={'btnNewCuenta'}
                title={'Nueva Cuenta'}
                onClickFunction={newCuentaFunction}
            />

            <BottomButton 
                id={'btnBackToAccounts'}
                title={'Volver a Mis Cuentas'}
                onClickFunction={backToAccountsFunction}
            />

        </>

    );
};
