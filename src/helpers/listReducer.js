

export const listReducer = (state=[],action) => {

    switch (action.type) {
        case 'add':
            return [action.payload,...state];

        case 'delete':
            return state.filter(todo => todo.id !== action.payload);
    
        default:
            return state;
    }

}