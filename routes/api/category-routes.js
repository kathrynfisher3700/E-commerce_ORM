const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categories = await Category.findAll({
    include: [{model: Product}]
  }).catch((err)=> {
    res.json(err);
  });
  res.json(categories);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const categoryID = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if (!categoryID) {
      res.status(404).json({ message: 'No category with this ID' });
      return;
    }
    res.status(200).json(categoryID);
  } catch (err) {
    res.status(500).json(err);
  }
  });

router.post('/', async (req, res) => {
  try {
    const catergoryData = await Category.create(req.body);
    res.status(200).json(catergoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryUpdate = await Category.update(req.body, {
      where: {id: req.params.id,},
    });
    if (!categoryUpdate[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryDelete = await Category.destroy({
      where: {id: req.params.id,},
    });
    if (!categoryDelete) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
