var express = require('express');
var router = express.Router();

const {
  GetAllUsers,
  GetUser,
  CreateUser,
  DeleteUser
} = require('../controllers/Users')

const {
  GetNote,
  GetAllNote,
  CreateNote,
  UpdateNotes,
  DeleteNote
} = require('../controllers/Notes')

/* GET home page. */
router.get('/', function (req, res, next) {
  //res.render('index', { title: 'Express' });
  res.send(`Server is runing..`)
});

router.get('/user', async (req, res, next) => {
  try {
    const result = await GetAllUsers();
    res.status(200).json(result);
  }
  catch (error) {
    res.status(500).json({ error: error, status: 500 })
  }
})

router.post('/user', async (req, res, next) => {
  try {
    const result = await CreateUser(req.body)
    var response = {
      status: 'Success',
      data: result
    }
    res.status(200).json(response)
  }
  catch (error) {
    res.status(500).json({ error: error, status: 500, data: req.body })
  }
})

router.post('/user/login', async (req, res, next) => {
  try {
    const result = await GetUser(req.body)
    var response = {}
    if (result) {
      response = {
        status: 'Success',
        data: result
      }
    }
    else {
      response.status = 'Faild'
    }
    res.status(200).json(response)
  }
  catch (error) {
    res.status(500).json(error)
  }
})

router.delete('/user/:id', async (req, res, next) => {
  try {
    const result = await DeleteUser({ _id: req.params.id })
    var response = {
      status: 'success',
      data: result
    }
    res.status(200).json(response)
  }
  catch (error) {
    res.status(500).json({ error: error, status: 500 })
  }
})

router.get('/note/:email', async (req, res, next) => {
  try {
    // console.log(req.params);
    const result = await GetNote(req.params);
    var response = {
      status: 'Success',
      data: result
    }
    res.status(200).json(response);
  }
  catch (err) {
    res.status(500).json({ error: err, status: '500' });
  }
})

router.get('/notes/:email', async (req, res, next) => {
  try {
    const result = await GetAllNote(req.params);
    var response = {
      status: 'Success',
      data: result
    }
    res.status(200).json(response);
  }
  catch (err) {
    res.send(500).json({ error: err, status: '500' });
  }
})

router.post('/note', async (req, res, next) => {
  try {
    const result = await CreateNote(req.body)
    var response = {
      status: 'Success',
      data: result
    }
    res.status(200).json(response)

  }
  catch (error) {
    res.status(500).json({ error: error, status: '500' })
  }
})

router.delete('/note/:id', async (req, res, next) => {
  try {
    const result = await DeleteNote({ _id: req.params.id })
    var response = {
      status: 'success',
      data: result
    }
    res.status(200).json(response);
  }
  catch (error) {
    res.status(500).json({ error: error, status: '500' })
  }
})

router.put('/note/:id', async (req, res, next) => {
  try {
    const result = await UpdateNotes({
      _id: req.params.id
    }, req.body);

    var response = {
      status: 'Success',
      data: result
    };

    res.status(200).json(response);
  }
  catch (error) {
    res.status(500).json({ error: error, status: '500' });
  }
});

module.exports = router;
