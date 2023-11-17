const router = require('express').Router();

const enLang = require('../language/en.json');
const esLang = require('../language/es.json');

router.get('/api/languages', (req, res) => {
  res.status(200).json({ en: enLang, es: esLang });
});

router.get('/api/languages/en', (req, res) => {
  res.status(200).json(enLang);
});

router.get('/api/languages/es', (req, res) => {
  res.status(200).json(esLang);
});

module.exports = router;

/********************* Propiedad de Métrica Móvil SA de CV **************************/