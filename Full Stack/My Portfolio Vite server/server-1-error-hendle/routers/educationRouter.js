const express = require('express');
const router = express.Router();

const { createEducation, getEducation, getSingleEducation, updateEducation, deleteEducation } = require('../controllers/educationController');


router.post('/', createEducation);
router.get('/', getEducation);
router.get('/:id', getSingleEducation);
router.put('/:id', updateEducation);
router.delete('/id', deleteEducation)

module.exports = router