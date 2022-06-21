








import { GET_DOGS,
         GET_DETAIL,
         GET_TEMPERAMENTS,
        FILTER_TEMPERAMENT } from "../action";









const initialState = {
    Dogs: [],
    allDogs: [],
    temperaments: [],
    Detail: [],
    
  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case GET_DOGS:
        return {
          ...state,
          Dogs: action.payload,
          allDogs: action.payload,
          
        };
        case GET_TEMPERAMENTS:
            return{
                ...state,
                temperaments: action.payload
            }
            case GET_DETAIL:
                return{
                    ...state,
                    Detail:action.payload
                }
                case FILTER_TEMPERAMENT:
                    state.Dogs = state.allDogs;
                    let Filtered = action.payload === 'All' ?  state.allDogs :  state.allDogs.filter(el => (el.temperament).split(",").map(el => el.trim()).includes(action.payload)) 
                    console.log(Filtered)
                    if(Filtered.length !== 0){
                   return{
                     ...state,
                     Dogs: Filtered
                     
                 }} 
                 else{
                   alert("I don't know found the temperament the Dogs");
                   return{
                     ...state
                   }
                 }
                  
         default:
        return { ...state };
    }
  }




            export default rootReducer;