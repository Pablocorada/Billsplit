import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../AccountContext';
import { Balance } from './Balance';
import { Gastos } from './Gastos';
import { NewGasto } from './NewGasto';
import { NewMemberCuenta } from './NewMemberCuenta';
import { QuienDebe } from './QuienDebe';
import { BottomButton } from '../general/BottomButton';

export const Cuenta = () => {

    let {cuentas} = useContext(AccountContext);
    let {currentId, setCurrentId} = useContext(AccountContext);
    const {setBackToAccounts, setAddCuenta} = useContext(AccountContext);

    let currentCuenta = {};

    cuentas.forEach(element => {
        if(element.id===currentId){
            currentCuenta = element;
        }
    });
    
    const rellenarParticipantes = (cuenta) => {
        cuenta.participantes.forEach(participante => {
            participante.gasto = 0;
        });
        if(cuenta.gastos){
            cuenta.gastos.forEach(gasto => {
                gasto.gastosInd.forEach(gastoInd => {
                    cuenta.participantes.forEach(participante => {
                        if(participante.nombre === gastoInd.participante){
                            participante.gasto = Number(participante.gasto) + Number(gastoInd.precio);
                        }
                    });
                });
            });
        }
    }

    useEffect(() => {
        rellenarParticipantes(currentCuenta);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cuentas]);

    const navigate = useNavigate();
    const backToAccountsFunction = () => {
        
        setCurrentId(-1);
        setAddCuenta(false);
        setBackToAccounts(false);
        navigate('/mis-cuentas');
    }

  return (
    <>
        <div id='cuentaBox' className='box w-75 pt-3'>
            <div className='row justify-content-center'>
                <h1 className='mt-3 mb-0 fs-1'>{currentCuenta.nombre}</h1>
                <hr className='accountSepTitle'/>
            </div>
            <div className='row justify-content-around'>
                <NewMemberCuenta cuenta={currentCuenta} />
                <NewGasto cuenta={currentCuenta} />
                <Gastos />
                <hr className='accountSep'/>
                <Balance />
                <hr className='accountSep'/>
            </div>
            <div className='row px-3'>
                <QuienDebe />
            </div>

        </div>
        <BottomButton 
            id={'btnBackToAccounts'}
            title={'Volver a Mis Cuentas'}
            onClickFunction={backToAccountsFunction}
        />
    </>
    );
};
