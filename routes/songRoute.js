const express = require('express');
const Joi = require('@hapi/joi');
const SongModel = require('../models/songModel');

const router = express.Router();

const songList = [
    {
        id: 1,
        name: 'Giá như chưa từng quen'
    },
    {
        id: 2,
        name: 'Thêm một lần đau'
    },
    {
        id: 3,
        name: 'Nàng kiều lỡ bước'
    },
]

// Get list song
router.get('/', (req, res) => {
    res.send(songList);
})

// Get song by id
router.get('/:id', (req, res) => {
    const song = songList.find((song) => song.id === +req.params.id);
    if (song) res.send(song.name);
    else res.status(404).send("Lỗi! Không tìm thấy bài hát này");
})

// Post create new song
router.post('/', (req, res) => {

    // Validate for song name
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(50)
            .required(),
    });
    const validation = schema.validate(req.body);

    // Show error when validate fail
    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
        return;
    }

    // Add new song and return this song to response
    const song = {
        id: songList.length + 1,
        name: req.body.name
    }
    songList.push(song);
    res.send(song);
})

// router.post('/', (req, res) => {
//     const song = new SongModel({
//         name: req.body.name
//     })

//     song.save()
//         .then(data => {
//             res.json(data);
//         })
//         .catch(err => {
//             res.status(400).json({message: err});
//         })
// })

// Put update song
router.put('/:id', (req, res) => {

    // Find song by id
    const updateSong = songList.find((song) => song.id === +req.params.id);
    if (!updateSong) {
        res.status(400).send('Khong tim thay bai hat nay!');
        return;
    }

    // Validate new song name
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required()
    })
    const validation = schema.validate(req.body);
    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
        return;
    }

    // Update song if don't have error
    updateSong.name = req.body.name;
    res.send(updateSong);
})

// Delete song
router.delete('/:id', (req, res) => {
    // Find song by id
    const deleteSong = songList.find((song) => song.id === +req.params.id);
    if (!deleteSong) {
        res.status(400).send('Khong tim thay bai hat nay!');
        return;
    }

    const index = songList.indexOf(deleteSong);
    songList.splice(index, 1);
    res.send(songList);
})

module.exports = router;