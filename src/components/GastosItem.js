

export const GastosItem = ( {concept} ) => {

    const membersCost = concept.membersCost || [];

  return (
    <>
        <li 
            key={(Number(concept.id))}
            className="list-group-item w-100 w-sm-75 mx-0 py-3 pe-0 bg-transparent"
        >
            <div className="btn-group">
                <button type="button" className="row dropdown-toggle bg-transparent align-items-center" data-bs-toggle="dropdown" aria-expanded="false">
                        <div className='col-10 col-lg-11 d-flex justify-content-between'>
                            <span className='align-self-start fw-bold'>
                                {concept.description}                     
                            </span>
                            <span className='text-end'>
                                    {concept.totalConcept}€                    
                            </span>
                        </div>                        
                </button>
                <hr/>
                <ul
                    className="dropdown-menu py-0">
                    {
                        membersCost.map(element => {
                            return (
                                <li 
                                    key={(Number(concept.id)+Math.random())}
                                    className=''>
                                    <div 
                                        className="dropdown-item-text d-flex m-auto w-75 align-items-around">
                                        <p className="col-6 fw-bold text-start">
                                            {element.whoPays}
                                        </p>
                                        <p className="col-5 text-end">
                                            {element.costGasto}€
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
