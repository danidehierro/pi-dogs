import axios from 'axios';


export const GET_DOGS ="getdogs";
export const GET_TEMPERAMENTS ="gettemperaments";
export const GET_DETAIL="getdetail";
export const GET_NAMEDOG="getnamedog";
export const POST_DOG="postdog";
export const ORDER_NAME="ordername"
export const ORDER_WEIGHT= "orderweight"
export const FILTER_TEMPERAMENT="filtertemperament"
export const FILTER_CREATED="filtercreated"





export function getDogs(){
    return async function(dispatch){
      try {
        const res = await axios.get('http://localhost:3001/dogs')
        return dispatch({
            type: GET_DOGS,
            payload:res.data
        });
      } catch (error) {
          console.log(error)
      } 
     };
};
export function getTemperament(){
    return async function(dispatch){
    try {
        var json = await axios.get("http://localhost:3001/temperament");
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: json.data
        });           
   } catch (error) {
       console.log(error)
   }
    }}
    export function getNameDog(name){
        return async function (dispatch){
            try {
                var json = await axios.get(`http://localhost:3001/dogs?name=${name}`)
                  return dispatch({
                    type: GET_NAMEDOG,
                    payload: json.data
                })
                
            } catch (error){
                alert("dogs not found");
                window.location.href = "http://localhost:3000/home";
                console.log(error)
                
            }
        }}
    export function postDog(payload){
        return async (dispatch) => {
          try {
            var createDog= await axios.post("http://localhost:3001/dog",payload);
            console.log("soy la accion",payload)
               return dispatch({
                type: POST_DOG,
                payload: createDog
            })

          } catch (e) {
            alert("Dogs name already exist");
            console.log(e);
          }
        };
      }; 
      export function getDetail(id) {
        // console.log('soy el id en las actions ',id)
        return async function (dispatch) {
            try{
                const results = await axios.get(`http://localhost:3001/dogs/${id}`);
                dispatch({
                    type: GET_DETAIL,
                    payload: results.data
                })
            }
            catch(e){
                console.log(e)
            }
        }
    };
    export function filterByTemp(value) {
        console.log("soy la accion",value)
        return {
            type: FILTER_TEMPERAMENT,
            payload: value,
        }
    };
    export function filterCreated(payload){
        return{
            type: FILTER_CREATED,
            payload
        }
    }
    export function orderName(payload){
        console.log("soy la accion ",payload)
        return{
            type: ORDER_NAME,
            payload
        }
    }
   /*  export function orderWeight(payload){
        return{
            type: ORDER_WEIGHT,
            payload
        }
    } */