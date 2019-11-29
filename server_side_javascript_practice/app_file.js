const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.locals.pretty = true;

app.set('views', './views');
app.set('view engine', 'pug');

app.listen('3000', () => {
    console.log('Connected, 3000 port!');
});

app.get('/new', (req, res) => {
    fs.readdir('data', (err, files) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new', {topics:files});
    })
})

app.post('/', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    fs.writeFile('data/' + title, description, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/' + title);
    });
})

app.get(['/', '/:id'], (req, res) => {
    fs.readdir('data', (err, files) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        const id = req.params.id;
        if (id) {
            // id 값이 있을 때
            fs.readFile('data/' + id, 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view', { topics: files, title: id, description: data });
            })
        }
        else {
            //id 값이 없을 때
            res.render('view', { topics: files, title:'Welecome', description: 'Hello, practice!' })
        }
    })
})