const express = require('express')
const app = express();
const cors = require('cors');
const ejs = require('ejs');
const courses = require('./routes/course');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json())
app.use(cors());
app.use('/courses', courses);



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