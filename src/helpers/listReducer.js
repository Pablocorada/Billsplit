

export const listReducer = (state=[],action) => {

    switch (action.type) {
        case 'add':
            return [action.payload,...state];

        case 'delete':
            return state.filter(item => item.id !== action.payload);
    
        default:
            return state;
    }

}