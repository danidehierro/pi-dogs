








import { GET_DOGS,
         GET_DETAIL,
         GET_TEMPERAMENTS,
         GET_NAMEDOG,
         POST_DOG,
        FILTER_TEMPERAMENT,
        FILTER_CREATED,
      ORDER_NAME, 
      ORDER_WEIGHT} from "../action";









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
                case GET_NAMEDOG:
                    return{
                        ...state,
                        Dogs: action.payload
                    }
                    case POST_DOG:
                        return{
                            ...state,
                        }

                case FILTER_TEMPERAMENT:
                    state.Dogs = state.allDogs;
                    let Filtered = action.payload === 'All' ?  state.Dogs :  state.Dogs.filter(el => el.temperament.split(", ").map(ele => ele).includes(action.payload))
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
                 case FILTER_CREATED:
        console.log("filtro reducer", action.payload)
        let copy = state.allDogs;
        let createdFiltered;
        if (action.payload === "created") {
          createdFiltered = copy.filter((e) => e.createdInDb);
          createdFiltered.length === 0
            ? alert("videogame not created")
            : console.log("ok");
        } else if (action.payload === "api") {
          createdFiltered = copy.filter((e) => !e.createdInDb);
        } else {
          createdFiltered = copy;
        }
        console.log(createdFiltered)
        return {
          ...state,
          Dogs: createdFiltered //length === 0 ? copy : createdFiltered,
        };
        case ORDER_NAME: {
            const Dogs1 =  [...state.Dogs]
            let sortDogs
            if(action.payload === "a-z") {
               sortDogs = Dogs1.sort((a, b) => {
                if (a.name > b.name) {
                  return 1;
                }
                if (a.name < b.name) {
                  return -1;
                }
                return 0;
              })
            } else if(action.payload === "z-a"){
               sortDogs = Dogs1.sort((a, b) => {
                if (a.name > b.name) {
                  return -1;
                }
                if (a.name < b.name) {
                  return 1;
                }
                return 0;
              })
            } else if(action.payload === "high"){
               sortDogs = Dogs1.sort((a, b) => {
                if (a.weight > b.weight) {
                  return 1;
                }
                if (a.weight < b.weight) {
                  return -1;
                }
                return 0;
              })
            } else if(action.payload === "low"){
               sortDogs = Dogs1.sort((a, b) => {
                if (a.weight > b.weight) {
                  return -1;
                }
                if (a.weight < b.weight) {
                  return 1;
                }
                return 0;
              });
            }
              return {
                  ...state,
                  Dogs: action.payload === "alpha" ? Dogs1 : sortDogs
              }
          }
                  
         default:
        return { ...state };
    }
  }




            export default rootReducer;