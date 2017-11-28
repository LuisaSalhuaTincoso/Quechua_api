var express = require('express');
var router = express.Router();

var ctrlWord= require('../controllers/word');

/*Word api*/

router.get('/words', ctrlWord.WordListById); //Obtenemos la lista de palabras
router.get('/words/:wordname', ctrlWord.WordReadOne);//Mostrar una palabra especifica
router.get('/words/category/:categoryname',ctrlWord.WordListByCategory);
router.post('/words', ctrlWord.WordCreate); //Añadir nueva vocabulario
router.put('/words/:wordname', ctrlWord.WordUpdateOne);//Actuaizar vocabulario especifico
router.delete('/words/:wordname', ctrlWord.WordDeleteOne);//Eliminar vocabulario especifico

/*Categorias*/


module.exports = router;
