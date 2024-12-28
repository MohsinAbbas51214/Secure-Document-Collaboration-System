const express = require('express');
const multer = require('multer');
const Document = require('../models/documentModel');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, DOCX, PNG, and JPG are allowed.'), false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter,
});

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { originalname, mimetype, size, path } = req.file;
        const document = new Document({
            name: originalname,
            type: mimetype,
            size,
            path,
            owner: req.user.id,
        });
        await document.save();
        res.status(201).json({ message: 'File uploaded successfully', document });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

module.exports = router;
