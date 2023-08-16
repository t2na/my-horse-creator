const router = require('express').Router();
const { horseCharacter } = require('../../models');
const withAuth = require('../../utils/auth');


//THIS ONE WORKS
  // find all horses
router.get('/', async (req, res) => {

  try {
  const horseData = await horseCharacter.findAll();

res.json(horseData);
} catch (error) {
  console.error(error);
  res.status(500).send('Server Error');
}
});

//THIS ONE WORKS
//get a horse by id
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try{
    const horseData = await horseCharacter.findByPk(req.params.id);

    if (!horseData) {
      return res.status(400).json({ message: 'No horse found with this id'});
    }

    res.status(200).json(horseData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//THIS ONE WORKS
//update horse
router.put('/horseCharacter/:id',async (req, res) => {
 try {
    const {id} = req.params;
      const updatedHorse = await horseCharacter.update(
         {
             horse_power: req.body.horse_power,
             horse_speed: req.body.horse_speed,
             horse_smarts: req.body.horse_smarts,
             horse_weight: req.body.horse_weight,
            likeCount: req.body.likeCount, 
            description: req.body.description,
        },
      {
        where: {id:id},
      }
    );

    if(updatedHorse[0] === 0) {
      return res.status(400).json({ message: 'Horse character not found'})
    }

    res.json({ message: 'Horse character updated successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error'});
  }
});

//THIS WORKS
  //to create a horse, hopefully
  router.post('/', async (req, res) => {
    try {
      const newHorse = await horseCharacter.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(201).json(newHorse);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  //THIS WORKS
    // delete a category by its `id` value
  router.delete('/:id', async (req, res) => {

  try{
    const horseRoute = await horseCharacter.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!horseRoute) {
      res.status(404).json({ message: 'No horse found with this id'});
    }

    res.status(200).json(horseRoute);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;