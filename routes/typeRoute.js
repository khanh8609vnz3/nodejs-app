const express = require('express');
const Joi = require('@hapi/joi');

const router = express.Router();

const typeList = [
    {
        id: 1,
        name: 'Điện thoại'
    },
    {
        id: 2,
        name: 'Laptop'
    },
    {
        id: 3,
        name: 'Máy tính bảng'
    }, {
        id: 4,
        name: 'Phụ kiện'
    },
]

// Get list type
router.get('/', (req, res) => {
    res.send(typeList);
})

// Get type by id
router.get('/:id', (req, res) => {
    const type = typeList.find((type) => type.id === +req.params.id);
    if (type) res.send(type.name);
    else res.status(404).send("Lỗi! Không tìm thấy");
})

// Post create new type
router.post('/', (req, res) => {

    // Validate for type name
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(20)
            .required(),
    });
    const validation = schema.validate(req.body);

    // Show error when validate fail
    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
        return;
    }

    // Add new type and return this type to response
    const type = {
        id: typeList.length + 1,
        name: req.body.name
    }
    typeList.push(type);
    res.send(type);
})

// Put update type
router.put('/:id', (req, res) => {

    // Find type by id
    const updatetype = typeList.find((type) => type.id === +req.params.id);
    if (!updatetype) {
        res.status(400).send('Khong tim thay');
        return;
    }

    // Validate new type name
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required()
    })
    const validation = schema.validate(req.body);
    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
        return;
    }

    // Update type if don't have error
    updatetype.name = req.body.name;
    res.send(updatetype);
})

// Delete type
router.delete('/:id', (req, res) => {
    // Find type by id
    const deletetype = typeList.find((type) => type.id === +req.params.id);
    if (!deletetype) {
        res.status(400).send('Khong tim thay bai hat nay!');
        return;
    }

    const index = typeList.indexOf(deletetype);
    typeList.splice(index, 1);
    res.send(typeList);
})

module.exports = router;