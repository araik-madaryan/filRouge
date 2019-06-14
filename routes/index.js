const { Router } = require('express');
const app = express();
const port = 3000;
const connection = require('./conf');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const router = Router();

router.get('/api/all', (req, res) => {
  connection.query('SELECT * from redwire', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des données');
    } else {
      res.json(results);
    }
  });
});

router.get('/api/light', (req, res) => {
  connection.query('SELECT id, firstname, age FROM redwire', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des données');
    } else {
      res.json(results);
    }
  });
});

router.get('/api/filter1', (req, res) => {
  connection.query(`SELECT * FROM redwire WHERE firstname like "%ar%"`, (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des données');
    } else {
      res.json(results);
    }
  });
});

router.get('/api/filter2', (req, res) => {
  connection.query(`SELECT * FROM redwire WHERE firstname like "A%"`, (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des données');
    } else {
      res.json(results);
    }
  });
});

router.get('/api/filter3', (req, res) => {
  connection.query(`SELECT * FROM redwire WHERE birthday > "1994/09/10"`, (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des données');
    } else {
      res.json(results);
    }
  });
});

router.get('/api/ordonner', (req, res) => {
  connection.query(`SELECT * FROM redwire ORDER BY age DESC`, (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des données');
    } else {
      res.json(results);
    }
  });
});

router.post('/api/publier', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO redwire SET ?', formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'un utilisateur");
    } else {
      res.sendStatus(200);
    }
  });
});

router.put('/api/modification/:id', (req, res) => {
  const idUser = req.params.id;
  const formData = req.body;
  connection.query('UPDATE redwire SET ? WHERE id = ?', [formData, idUser], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la modification d'un utilisateur");
    } else {
      res.sendStatus(200);
    }
  });
});

router.put('/api/toggle/:id', (req, res) => {
  const idUser = req.params.id;
  const formData = req.body;
  connection.query(`UPDATE redwire SET secret = !secret WHERE id = ?`, [formData, idUser], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la modification d'un utilisateur");
    } else {
      res.sendStatus(200);
    }
  });
});

router.delete('/api/entité/:id', (req, res) => {
  const idUser = req.params.id;
  connection.query('DELETE FROM redwire WHERE id = ?', [idUser], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un utilisateur");
    } else {
      res.sendStatus(200);
    }
  });
});

router.delete('/api/false/:id', (req, res) => {
  const idUser = req.params.id;
  connection.query('DELETE FROM redwire WHERE secret=0', [idUser], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un utilisateur");
    } else {
      res.sendStatus(200);
    }
  });
});



app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`Server is listening on ${port}`);
});