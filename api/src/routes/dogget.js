const router = require('express').Router();
const axios = require('axios');
/* const { NUMBER } = require('sequelize/types'); */
const { API_KEY} = process.env;
const { Dog, Temperament } = require('../db');

/*
GET /dogs:
Obtener un listado de las razas de perro
Debe devolver solo los datos necesarios para la ruta principal
*/

/*
GET /dogs?name="...":
Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
Si no existe ninguna raza de perro mostrar un mensaje adecuado
*/

router.get('/', async (req, res) =>{
     
    const {name} = req.query;
    console.log("soy el nombre ", name)
    if(!name){
        try{
            const apiResult = await axios.get(`https://api.thedogapi.com/v1/breeds`,{headers: {'x-api-key': `${API_KEY}`}})

            const breeds = apiResult.data.map(e => {
                return {
                    id: e.id,
                    img: e.image.url,
                    name: e.name,
                    temperament: [e.temperament].join().split(",").map((e) =>e.trim()),
                    weight: e.weight.metric
                }
            })

            const breedsDB = await Dog.findAll({
                include: {
                    model: Temperament,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    },
                }
            });

            // console.log(breedsDB)
            const allBreeds = [...breeds,...breedsDB]
            res.send(allBreeds)
        }
        catch(e){
            console.log('Error',e)
        }

    }else{
        try{
            const apiResult = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`,{headers: {'x-api-key': `${API_KEY}`}})
            const breeds = []
            console.log("soy la api",apiResult.data);
            apiResult.data.map(e => {
                if(e.name.toLowerCase().includes(name.toLowerCase())){
                    breeds.push({
                        id: e.id,
                        img: `https://cdn2.thedogapi.com/images/${e.reference_image_id}.jpg`,
                        name: e.name,
                        temperament: e.temperament,
                        weight: e.weight.metric
                    })
                }
            });
            console.log("soy el perro",breeds)
            if (breeds.length>0){
                const breedsDB = await Dog.findAll({
                    include: {
                        model: Temperament,
                        attributes: ['name'],
                        through: {
                            attributes: [],
                        },
                    },
                    where: {
                        name: name
                    }
                });
                const allBreeds = breeds.concat(breedsDB)
                console.log("el final",allBreeds)
                res.send(allBreeds)
            }else {
                const breedsDB = await Dog.findAll({
                    include: {
                        model: Temperament,
                        attributes: ['name'],
                        through: {
                            attributes: [],
                        },
                    },
                    where: {
                        name: name
                    }
                });
                if(breedsDB){
                    res.send(breedsDB)
                }
                else return res.status(404).send(`No results found four your search (${name})`)
            }
        }
        catch(e){
            console.log('Error',e)
        }
    }
});

/*
GET /dogs/{idRaza}:
Obtener el detalle de una raza de perro en particular
Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
Incluir los temperamentos asociados
*/

router.get('/:id', async (req, res) =>{
    const {id} = req.params;
    // console.log('SOY EL ID: ',id)
    try{
    if("apiResult"){
        
            const apiResult = await axios.get(`https://api.thedogapi.com/v1/breeds`,{headers: {'x-api-key': `${API_KEY}`}})
            const result = apiResult.data.find(e => e.id === Number(id));
            if(result){
                return res.send({
                    id: result.id,
                    img: result.image.url,
                    name: result.name,
                    temperament: result.temperament,
                    weight: result.weight.metric,
                    height: result.height.metric,
                    age: result.life_span
                })
            
        }
           
             
     }if("result")  {
                
                    const result = await Dog.findByPk(id, {include: Temperament})
                    if(result){
                        console.log("soy el result",result)
                        return res.send({
                            id: result.dataValues.id,
                            img: result.dataValues.img,
                            name: result.dataValues.name,
                            temperament: result.dataValues.temperaments.map(e => e.name).join(", "),
                            weight: result.dataValues.weight,
                            height: result.dataValues.height,
                            age: result.dataValues.age
                        })}
                    
            
            }
        
        
    
}catch(e){
    return res.status(404).send(`No dog founded for id ${id}`)
}}
);


module.exports = router;
