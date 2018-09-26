const express = require('express')
const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.set('views', './views');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/atosdb')
  .then(() => console.log('node connected with mongoDB...'))
  .catch(err => console.error(err.message));

const schema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    price: Number,
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

app.get('/courses/', (req, res) => {
  getCourses().then((courses) => {
    res.render('course/index', {courses: courses});
  });
   

//    res.render('course/index', {
//        courses: myCourses
//    })
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