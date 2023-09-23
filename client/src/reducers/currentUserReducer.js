export const currentUserReducer = (state = null, action) =>{
    switch(action.type){
        case 'CURRENT_USER':
            return action?.payload;
            default :
            return state;
    }
}