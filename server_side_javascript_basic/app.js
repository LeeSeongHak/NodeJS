var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//Static Folder Setting
app.use(express.static('public'));

//Post방식으로 받기위해 사용하는 미들웨어 bodyParser
//이제 어떤 데이터가 들어오면 BodyParser를 먼저 통과하고 이후 라우트된다.
app.use(bodyParser.urlencoded({extended: false}))

//Template Engine Setting
app.locals.pretty = true;
app.set('view engine', 'pug');
app.set('views', './views');    //express는 기본적으로 views를 템플릿 폴더로 생각하기때문에 생략시 자동으로 views에서 찾음.


//get과같은 함수를 라우터라고 하고, 이처럼 어떤 요청이 들어왔을때 요청을 처리하는 과정을 라우팅이라고 한다.
app.get('/', (req, res) => {
    res.send('Hello home page');
});

//템플릿을 사용하는 것은 소스코드를 가져와 랜더링하는 것이므로, send 대신 render를 사용한다.
app.get('/template',(req, res) => {
    res.render('tmp', {time:Date(), _title:'pug'});
});

//정적인 파일은 노드앱을 끄지않아도 바꿀때마다 바뀌지만, 동적인 파일은 노드앱을 껐다 켜야 변화가 적용된다.
//html에서는 변화가 바로 적용되었고 controller단에서는 껐다 켜야했던거랑 같구나.
//동적파일과 정적파일은 서로 장점과 단점이 트레이드오프됨.
//동적파일은 for문을 돌리는 식으로 로직쓸 수 있지만 복잡하고, 정적html파일은html파일 만들듯이 하면되지만, 로직사용을 못함.
//따라서 템플릿 엔진을 사용하여 이 두 개의 장점을 모두 가질 수 있다!
app.get('/dynamic', (req, res) => {
    let lis = '';
    for(let i=0; i<5; i++){
        lis = lis + '<li>coding</li>';
    }
    const time = Date();
    const output = `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title></title>
        </head>
        <body>
            Hello, Dynamic!
            <ul>
            ${lis}
            </ul>
            ${time}
            정적인 파일은 app.js를 껐다 키지 않아도 바로바로 변화가 반영이 되구먼
        </body>
    </html>`;
    res.send(output);
});

app.get('/cat', (req, res) => {
    res.send('Hello cat, <img src="coding_cat.gif">');
});

app.get('/login', (req, res) => {
    res.send('Login please');
});

//쿼리스트링을 이용한 url
app.get('/topic/:id', (req, res) => {
    const topics = [
        'Javascript is...',
        'Nodejs is...',
        'Express is...'
    ];
    const output = `
        <a href='/topic/0'>JavaScript</a><br>
        <a href='/topic/1'>Nodejs</a><br>
        <a href='/topic/2'>Express</a><br>
        ${topics[req.query.id]}
    `
    res.send(output);
});

//시멘틱 URL
app.get('/semantic/:id/:mode', (req, res) => {
    res.send(req.params.id+','+req.params.mode)
});

//form
app.get('/form', (req, res) => {
    res.render('form');
});

app.get('/form_receiver', (req, res) => {
    const title = req.query.title;
    const description = req.query.description;
    res.render('form_receiver', {title: title, description: description});
});

app.post('/form_receiver', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    res.render('form_receiver', {title: title, description: description});
});

app.listen(3000, function () {
    console.log('Connected 3000 port!');
});