import React from 'react';

export const BottomButton = ( { id, title, onClickFunction } ) => {

    return (
        <div>
            <button 
                id={id}
                className='btn btn-outline-success m-auto mt-2 d-block px-5 py-0 py-sm-1 fw-bold'
                onClick={onClickFunction}
                >
                    {title}
            </button>
        </div>
    )
};