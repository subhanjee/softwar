const express = require('express');
const router = express.Router();
const footer = require('../controller/footer');

//create a new footer
router.post('/', footer.createFooterCtrl);

//  fetch all footers
router.get('/', footer.getAllFootersCtrl);

//  single footer by ID
router.get('/:id', footer.getFooterByIdCtrl);

// footer by ID
router.put('/:id', footer.updateFooterByIdCtrl);

// delete a footer by ID
router.delete('/:id', footer.deleteFooterByIDCtrl);

module.exports = router;
