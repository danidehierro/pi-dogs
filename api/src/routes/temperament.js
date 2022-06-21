const router = require('express').Router();
const axios = require('axios');
const { API_KEY} = process.env;
const { Temperament } = require('../db');

/*
GET /temperament:
Obtener todos los temperamentos posibles
En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos
y luego ya utilizarlos desde allí
*/

async function getTemperaments(){

    const apiResult = await axios.get(`https://api.thedogapi.com/v1/breeds`,{headers: {'x-api-key': `${API_KEY}`}})
    let temperaments = apiResult.data.map(e => e.temperament);
    
    temperaments = temperaments.join().split(",");
    console.log(temperaments)
    let temp = temperaments.map((e) => {
        if(e[0] === ' '){
            return e.slice(1)
        }
        else{
            return e;
        }
    });
    return temp;
}

router.get('/', async (req, res) =>{
    let temperaments = await getTemperaments();
   
    temperaments.sort().forEach((element) => {
        Temperament.findOrCreate({
            where: { name: element },
        });
    });

    let t = await Temperament.findAll()
    const first = t.shift();

    res.send(t)
});



module.exports = router;
