import React, { useContext, useMemo } from 'react';
import { AccountContext } from '../AccountContext';
import { convertDates } from '../../helpers/convertDates';
import { Constantes } from '../general/Constantes';

export const ConfirmGasto = ({cuenta}) => {

    let {setNewGasto, setNumberOptions, resetDescription, resetTotal, cuentas} = useContext(AccountContext);
    const {userData, currentId, setGasto} = useContext(AccountContext);

    const participantesCuenta = useMemo(() => {
        return cuenta.participantes || [{}];
    },[cuenta.participantes]) 

    let nombre;
    let precio;
    const fecha = convertDates(new Date());

    if(document.getElementById('inputDescription')){
        nombre = document.getElementById('inputDescription').value;
    }
    if(document.getElementById('inputTotal')){
        precio = document.getElementById('inputTotal').value;
    }

    const rellenarParticipantes = (cuenta) => {
        cuenta.participantes.forEach(participante => {
            participante.gasto = 0;
        });
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

    const handleConfirmGasto = async (e) => {
        e.preventDefault();
        if(nombre.trim().length <= 1 || precio<=0)  {
            alert('Debes agregar una descripción y un precio al gasto.')
            return;
        };
        
        let totalGasto = 0;
        const costGasto = document.getElementsByClassName('costGasto');
        const participante = document.getElementsByClassName('whoPays');
        const whoPaysOptions = document.getElementsByClassName('whoPaysOptions');
        let gastosInd = [];
        
        if(participante.length===0)  {
            alert('Debes asignar el gasto a al menos un participante.')
            return;
        };
        
        for(let i=0; i<costGasto.length; i++){
            if(isNaN(Number(costGasto[i].value.trim())) || isNaN(Number(precio))){
                alert('Debes asignar valores numéricos a los gastos.')
                return;
            }
            totalGasto += Number(costGasto[i].value.trim())
            gastosInd.push(
                {
                    participante: participante[i].value.trim(),
                    precio: costGasto[i].value.trim()
                }
            )
        }

        if(totalGasto!==Number(precio)) {
            alert('La suma de cada aporte no se corresponde al monto total del gasto!')
            return;
        };

        const url = Constantes.serverURL + 'nuevo-gasto.php';
        const formData = new FormData();
        formData.append('idCuenta', currentId);
        formData.append('nombre', nombre);
        formData.append('precio', precio);
        formData.append('fecha', fecha);

        const respuesta = await fetch(url, {
            method: "POST",
            body: formData
        });

        const respJson = await respuesta.json();

        if (respJson){

            const idGasto = JSON.parse(respJson).id;

            const newGasto = {            
                idCuenta: currentId,
                nombre: nombre,
                precio: precio,
                fecha: fecha,
                gastosInd: []
            }        

            for(let i=0; i<participante.length; i++){
                for(let j=0; j<participantesCuenta.length; j++){
                    if(participante[i].value===whoPaysOptions[j].value){
                        participantesCuenta[j].money = Number(participantesCuenta[j].money) + Number(costGasto[i].value.trim());
                    }
                }
            }

            gastosInd.forEach(gastoInd => {
                gastoInd.idGasto = idGasto;
            });

            newGasto.gastosInd = [...newGasto.gastosInd, ...gastosInd];

            if(cuenta.gastos){
                cuenta.gastos.push(newGasto);
            }else{
                cuenta.gastos = [newGasto];
            }

            const urlNuevoGastosInd = Constantes.serverURL + 'nuevos-gastos-ind.php';
            const formDataNuevoGastosInd = new FormData();
            formDataNuevoGastosInd.append('gastosInd', JSON.stringify(gastosInd));
            
            const respuestaNuevoPart = await fetch(urlNuevoGastosInd, {
                method: "POST",
                body: formDataNuevoGastosInd
            });

            const respJsonNuevoGastosInd = await respuestaNuevoPart.json();
            
            if(respJsonNuevoGastosInd){
                rellenarParticipantes(cuenta);

                const participantes = cuenta.participantes;
        
                const urlActPart = Constantes.serverURL + 'actualizar-gasto-participantes.php';
                const formDataActPart = new FormData();
                formDataActPart.append('participantes', JSON.stringify(participantes));
        
                const respuesta = await fetch(urlActPart, {
                    method: "POST",
                    body: formDataActPart
                });
        
                const respJsonActPart = await respuesta.json();
        
                if (respJsonActPart){
                    const urlGetAllData = Constantes.serverURL + 'get-all-data.php';
                    const formDataGetAllData = new FormData();
                    formDataGetAllData.append('idUsuario', userData.id);
                    const respuestaGetAllData = await fetch(urlGetAllData, {
                        method: "POST",
                        body: formDataGetAllData
                    });
                    const respJsonGetAllData = await respuestaGetAllData.json();

                    sessionStorage.setItem('usuario', JSON.stringify(JSON.parse(respJsonGetAllData)));

                    resetTotal();
                    resetDescription();
                    setNewGasto(false);
                    setNumberOptions([1]);
                    localStorage.setItem('cuentas', JSON.stringify(cuentas));
                }
            }
        }
        
    }

  return (
      <>
        <button
            id='btnConfirmMember'
            onClick={(e) => {
                handleConfirmGasto(e);
                setGasto(true);
            }}
            className='botonBox mt-1 btn-block w-100 m-auto'
        >
            Aceptar
        </button>
        <button
            id='btnCancelMember'
            onClick={() => {
                resetTotal();
                resetDescription();
                setGasto(true);
                setNewGasto(false);
                setNumberOptions([1]);
            }}
            className='botonBox mt-1 btn-block w-100 m-auto'
        >
            Cancelar
        </button>      
      </>
  );
};
