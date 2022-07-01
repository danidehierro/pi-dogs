








import { GET_DOGS,
         GET_DETAIL,
         GET_TEMPERAMENTS,
         GET_NAMEDOG,
         POST_DOG,
        FILTER_TEMPERAMENT,
        FILTER_CREATED,
      ORDER_NAME 
  } from "../action";









const initialState = {
    Dogs: [],
    allDogs: [],
    temperaments: [],
    Detail: [],
    dogsfilter:[]
  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case GET_DOGS:
        return {
          ...state,
          Dogs: action.payload,
          allDogs: action.payload,
          dogsfilter: action.payload
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
                if(action.payload.length === 0){ alert("dog not found");
                return {...state}
              }
                  return {
                    
                    ...state,
                    Dogs: action.payload,
                    
                  };
                    case POST_DOG:
                        return{
                            ...state,
                        }

                case FILTER_TEMPERAMENT:
                 
                   let Filtered = action.payload === 'All' ?  state.dogsfilter :  state.dogsfilter.filter((el) => {
                    if(el.temperament && el.temperament.includes(action.payload)){
                    return el
                  }else if(el.temperaments && el.temperaments.map(el => el.name).includes(action.payload) ){
                   return el
                  }
                    }
                   );
                    console.log(Filtered)
                    if(Filtered.length > 0){
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
            ? alert("Dog not created")
            : console.log("ok");
        } else if (action.payload === "api") {
          createdFiltered = copy.filter((e) => !e.createdInDb);
        } else {
          console.log("ingrese al else")
          createdFiltered = copy;
        }
        console.log(createdFiltered)
        return {
          ...state,
          Dogs: createdFiltered,
          dogsfilter: createdFiltered //length === 0 ? copy : createdFiltered,
        };
        case ORDER_NAME: {
          console.log("soy el payload accion", action.payload);
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
            } else if(action.payload === "low"){
               sortDogs = Dogs1.sort((a,b) => {
                if(parseInt(a.weight.split("-")[0]) === parseInt(b.weight.split("-")[0])) return parseInt(a.weight.split("-")[1]) - parseInt(b.weight.split("-")[1])
                else return parseInt(a.weight.split("-")[0]) - parseInt(b.weight.split("-")[0])})
            } else if(action.payload === "high"){
               sortDogs = Dogs1.sort((a,b) => {
                if(parseInt(b.weight.split("-")[0]) === parseInt(a.weight.split("-")[0])) return parseInt(b.weight.split("-")[1]) - parseInt(a.weight.split("-")[1])
                else return parseInt(b.weight.split("-")[0]) - parseInt(a.weight.split("-")[0])});
            }
              return {
                  ...state,
                  Dogs: action.payload === "All" ? Dogs1 : sortDogs
              }
          }
                  
         default:
        return { ...state };
    }
  }




            export default rootReducer;