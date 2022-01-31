import React, { useContext, useEffect } from 'react';
import { AccountContext } from './AccountContext';
import { NewGastoDesc } from './NewGastoDesc';
import { AddMemberGasto } from './AddMemberGasto';
import { ConfirmGasto } from './ConfirmGasto';
import { NewGastoTotal } from './NewGastoTotal';
;


export const NewGasto = ({cuenta}) => {    

    

    let {newGasto} = useContext(AccountContext);

    useEffect(() => {
      
        const newGastoBox = document.querySelector('#newGastoBox');
        if (newGasto){
            newGastoBox.classList = 'container w-75 m-auto mt-4 box py-4 px-5';
        }else{
            newGastoBox.classList = 'd-none'
        };
    }, [newGasto]);
    


  return (
    <div id='newGastoBox'>
        <h2>Nuevo gasto</h2>
        <hr className='my-0'/>

        <div className='row'>
            <div className='col-12 col-sm-8 mt-4 m-auto'>
                <label className='col-12 col-form-label text-start fs-5 p-0'>Descripción:</label>
                <div className='col-12 mt-1 p-0'>
                    <NewGastoDesc />
                </div>
            </div>
            <div className='col-12 col-sm-4 mt-4 m-auto'>
                <label className='col-12 col-form-label text-start fs-5 p-0'>Precio:</label>
                <div className='col-12 mt-1 p-0 d-flex justify-content-center align-content-center'>
                    <NewGastoTotal />
                </div>
            </div>
        </div>
        <div className='row mt-4' id='divAddPayMember'>   
            <div>
                <label className='col-12 col-form-label text-start fs-5 p-0'>¿Quién pagó?</label>                
            </div>         
            <div className='row m-auto justify-content-between align-items-start'
                             id='divOptionsContain'
                             key={(new Date().getTime()+Math.random())}>
                            
                        </div>  
        </div>
        <div className='row mt-4 w-100 m-auto'>
                <AddMemberGasto />
            </div>
        <div id='divConfirmGasto' className='row mt-4 w-100 m-auto'>
            <ConfirmGasto 
                cuenta={cuenta}
                />
        </div>
    </div>
    );
};
