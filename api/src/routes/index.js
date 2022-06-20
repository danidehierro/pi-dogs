const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

const dogRouter = require('./dogpost');
const dogsRouter = require('./dogget');
const tempRouter = require('./temperament');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs', dogsRouter);
router.use('/dog', dogRouter);
router.use('/temperament', tempRouter);


module.exports = router;
