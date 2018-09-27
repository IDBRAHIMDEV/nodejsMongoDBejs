const express = require('express')
const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json())

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/atosdb')
  .then(() => console.log('node connected with mongoDB...'))
  .catch(err => console.error(err.message));

const schema = new mongoose.Schema({
    name: { 
            type: String, 
            required: true, 
            minlength: 4, 
            maxlength: 200, 
            set: v => v.toLowerCase(),
            get: v => v.toUpperCase() 
        },
    author: String,
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile']
    },
    tags: [ String ],
    price: { 
        type: Number,
        required: function() {
            return this.isPublished
        },
        set: v => Math.round(v)
     },
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', schema);

const course = new Course({
    name: "Formation en JAVA EE",
    author: "Youssef",
    tags: ['java', 'backend'],
    price: 10,
    isPublished: true
});

app.get('/courses/create', (req, res) => {
    res.render('course/create');
})

app.delete('/courses/:id', async (req, res) => {
    const idCourse = req.params.id;
    const myCourse = await Course.findById(idCourse);

    const result = await myCourse.delete();

    res.send(result)
});

app.put('/courses/:id', async (req, res) => {
    
    const myId = req.params.id;
    const course = await Course.updateOne({ _id: myId }, {
        $set: {
            name: req.body.name
        }
    })

    res.send(course);
})

app.get('/courses/:id', async (req, res) => {
    const idCourse = req.params.id;
    const myCourse = await Course.findById(idCourse);
    
    if(!myCourse) return res.status(404).send('this course is not found...')

    res.send(myCourse);
})

app.get('/courses/', (req, res) => {
  getCourses().then((courses) => {
    res.render('course/index', {courses: courses});
  });


//    res.render('course/index', {
//        courses: myCourses
//    })
})


app.post('/courses', async (req, res) => {
    
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

//comparaison operators on NodeJS
//eq equal
//ne not equal
//lt less than
//lte less than or equal
//gt great than
//gte great than or equal
//in 
//nin not in
 

//newCourse();
//getCourses();
const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))