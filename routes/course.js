const express = require('express');
const Course = require('../models/course');
const router = express.Router();


router.get('/create', (req, res) => {
    res.render('course/create');
})

router.delete('/:id', async (req, res) => {
    const idCourse = req.params.id;
    const myCourse = await Course.findById(idCourse);

    const result = await myCourse.delete();

    res.send(result)
});

router.put('/:id', async (req, res) => {
    
    const myId = req.params.id;
    const course = await Course.updateOne({ _id: myId }, {
        $set: {
            name: req.body.name,
            author: req.body.author,
            price: req.body.price,
            category: req.body.category,
            isPublished: req.body.isPublished
        }
    })

    res.send(course);
})

router.get('/:id', async (req, res) => {
    const idCourse = req.params.id;
    const myCourse = await Course.findById(idCourse);
    
    if(!myCourse) return res.status(404).send('this course is not found...')

    res.send(myCourse);
})

router.get('/', (req, res) => {
  getCourses().then((courses) => {
    res.send(courses);
  });


//    res.render('course/index', {
//        courses: myCourses
//    })
})


router.post('/', async (req, res) => {
    
 const course = new Course({
     name: req.body.name,
     author: req.body.author,
     tags: ['java', 'backend'],
     price: req.body.price,
     category: req.body.category,
     isPublished: req.body.isPublished
 });
 
 try {
    const result = await course.save()
    res.send(result);
 }catch(ex) {
     res.send(ex.errors.category.message);
 }
  
 })


async function newCourse() {
    const result = await course.save();
    console.log(result);    
}

async function getCourses() {
    
  const courses = await Course.find();
  //console.log(courses);
  return courses;
}

module.exports = router;