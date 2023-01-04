import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../AccountContext';
import { BottomButton } from '../general/BottomButton';

export const Home = () => {
    
    const {userData} = useContext(AccountContext);

    const navigate = useNavigate();
    const handleClickRegistro = (evt) => {
        navigate('/registro');
    }
    
    useEffect(() => {
        sessionStorage.setItem('usuario', JSON.stringify(userData));
    }, [userData]);

    return (
        <>
            <div className='mb-5'>
                <div className='w-75 m-auto mt-3 mb-4'>
                    <h2 id='home-title'>Organiza tus gastos!</h2>
                    <hr className='m-auto w-75'/>
                </div>
                <div className='w-75 m-auto mt-3 d-flex flex-column flex-md-row'>
                    <div className='col-12 col-md-6 my-auto'>
                        <h3>Con tu pareja</h3>
                        <p className='w-75 m-auto'>Mantén tu relación justa y financieramente transparente. Realiza un seguimiento de los gastos comunes con tu pareja y divídelos equitativamente a través de BillSplit.</p>
                    </div>
                    <div className='col-12 col-md-6 align-items-center my-auto'>
                        <img src='https://www.zankyou.com.pe/images/mag-card-c/44a/0eee/878/623/-/pe/wp-content/uploads/2018/04/befunky-collage-5-2.jpg.webp' className='rounded w-75 mx-auto img-fluid' />
                    </div>
                </div>
                <hr className='m-auto my-4 w-75'/>
                <div className='w-75 m-auto mt-3 d-flex flex-column flex-md-row'>
                    <div className='col-12 col-md-6 my-auto'>
                        <h3>Con tus amigos</h3>
                        <p className='w-75 m-auto'>Ya sea que estén planificando un emocionante viaje, una salida a comer o un escape room, BillSplit hace los cálculos para que puedas relajarte y disfrutar con tus amigos.</p>
                    </div>
                    <div className='col-12 col-md-6 align-items-center my-auto'>
                        <img src='https://img.bekiaviajes.com/articulos/portada/67000/67625-h.jpg' className='rounded w-75 mx-auto img-fluid' />
                    </div>
                </div>
                <hr className='m-auto my-4 w-75'/>
                <div className='w-75 m-auto mt-3 d-flex flex-column flex-md-row'>
                    <div className='col-12 col-md-6 my-auto'>
                        <h3>Con tus compañeros de piso</h3>
                        <p className='w-75 m-auto'>Ya sea dvidir las cuentas, un pedido a domicilio o renovar el piso, tú y tus compañeros podrán hacer una división justa de los gastos.</p>
                    </div>
                    <div className='col-12 col-md-6 align-items-center my-auto'>
                        <img src='https://cadena100-cdnmed.agilecontent.com/resources/jpg/4/7/1596278045974.jpg' className='rounded w-75 mx-auto img-fluid' />
                    </div>
                </div>
            </div>
            <hr className='m-auto my-4 w-75'/>

            <div className = 'pt-3'>
                <BottomButton 
                    id = {'Registrate'}
                    onClickFunction = {handleClickRegistro}
                    title = {'Regístrate!'}
                />                
            </div>

        </>

    );
};
