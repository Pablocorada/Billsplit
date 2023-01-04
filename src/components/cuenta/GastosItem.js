

export const GastosItem = ( {gasto} ) => {

    const gastosInd = gasto.gastosInd || [];

  return (
    <>
        <li 
            key={(Number(gasto.id))}
            className="list-group-item w-100 w-sm-75 mx-0 py-3 pe-0 bg-transparent"
        >
            <div className="btn-group">
                <button type="button" className="row dropdown-toggle bg-transparent align-items-center" data-bs-toggle="dropdown" aria-expanded="false">
                        <div className='col-10 col-lg-11 d-flex justify-content-between'>
                            <span className='align-self-start fw-bold'>
                                {gasto.nombre}                     
                            </span>
                            <span className='text-end'>
                                    {gasto.precio}€                    
                            </span>
                        </div>                        
                </button>
                <hr/>
                <ul
                    className="dropdown-menu py-0">
                    {
                        gastosInd.map(element => {
                            return (
                                <li 
                                    key={element.id}
                                    className=''>
                                    <div 
                                        className="dropdown-item-text d-flex m-auto w-75 align-items-around">
                                        <p className="col-6 fw-bold text-start">
                                            {element.participante}
                                        </p>
                                        <p className="col-5 text-end">
                                            {element.precio}€
                                        </p>                                       
                                    </div>
                                    <hr/>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            
        </li>
    </>

    
)
};
