const express = require('express');
const multer = require('multer');

const { extractPdf, extractOcr,getSuggestions ,getAiSuggestions} = require('../controller/serverExtraction');

const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/extract/pdf', upload.single('file'), extractPdf);
router.post('/extract/ocr', upload.single('file'), extractOcr);
router.post('/analyze/suggestions', upload.single('file'), getSuggestions);
router.post('/analyze/ai-suggestions', upload.single('file'), getAiSuggestions);

module.exports = router;

