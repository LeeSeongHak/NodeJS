//1.기본 매개 변수(Deafult Parameters)

//기존 ES5
var link = function (height, color) {
    var height = height || 50
    var color = color || red
    //...
}

//ES6
let link = function (height = 50, color = 'red') {
    //...
    //undefined를 제외한 모든 값(0, false, null 등)을 인정하므로 주의할 것.
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

//2.템플릿 리터럴

//기존 ES5
var name = 'Your name is ' + first + ' ' + last + '.'
var url = 'http://localhost:3000/api/messages/' + id

//ES6 - back tricked문자열 안에 ${}라는 구문이 사용가능해짐.
const name = 'Your name is ${first} ${last}'
const url = 'http://localhost:3000/api/messages/${id}'

/////////////////////////////////////////////////////////////////////////////////////////////////////

//3.멀티 라인 문자열

//기존 ES5
var roadPoem = 'blahblah\n\t'
    + 'blahblah\n\t'
    + '....\n\t'

//ES6 - ???? 안되네
//const roedPoem = 'blahblah
//    blah blah....'

/////////////////////////////////////////////////////////////////////////////////////////////////////

//4.비구조화 할당

//기존 ES5
//browser
var data = $('body').data(),
    house = data.house,
    mouse = data.mouse
//Node.js
var jsonMiddleware = require('body-parser').json
var body = req.body,
    username = body.username,
    password = body.password

//ES6
const { house, mouse } = $('body').data()
const { jsonMiddleware } = require('body-parser')
const { username, password } = req.body
const [col1, col2] = $('.column'),
    [line1, line2, line3, , line5] = file.split('\n')

/////////////////////////////////////////////////////////////////////////////////////////////////////

//5.향상된 객체 리터럴

//기존 ES5
var serviceBase = { port: 3000, url: 'azat.co' },
    getAccounts = function () { return [1, 2, 3] }

var accountServiceES5 = {
    port: serviceBase.port,
    url: serviceBase.url,
    getAccounts: getAccounts,
    toString: function () {
        return JSON.stringify(this.valueOf())
    },
    getUrl: function () { return "http://" + this.url + ':' + this.port },
    valueOf_1_2_3: getAccounts()
}
//serviceBase를 확장하길 원한다면 Object.create로 프로토타입화 후 상속받을 수 있다.
var accountServiceES5ObjectCreate = {
    getAccounts: getAccounts,
    toString: function () {
        return JSON.stringify(this.valueOf())
    },
    getUrl: function () { return "http://" + this.url + ':' + this.port },
    valueOf_1_2_3: getAccounts()
}
accountServiceES5ObjectCreate.__proto__ = Object.create(serviceBase)

//ES6
const serviceBase = { port: 3000, url: 'azat.co' },
    getAccounts = function () { return [1, 2, 3] }
const accountService = {
    __proto__ = serviceBase,    //__proto__속성을 사용하여 바로 프로토타입을 설정할 수 있다.
    getAccounts,                //변수명으로 속성이름을 지정할 수 있다.
    toString() {
        return JSON.stringify((super.valueOf))
    },
    getUrl() { return "http://" + this.url + ':' + this.port },
    ['valueOf_' + getAccounts().join('_')]: getAccounts()     //동적으로 속성 이름을 정의할 수 있다.
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

//6.화살표 함수(화살표 함수는 항상 익명 함수이며 this의 값을 현재 문맥에 바인딩시킨다.)

//기존 ES5
//1)
var _this = this
$('.btn').click(function (event) {
    _this.sendData()
})

//2)
var logUpperCase = function () {
    var _this = this

    this.string = this.string.toUpperCase()
    return function () {
        return console.log(_this.string)
    }
}
logUpperCase.call({ string: 'es6 rocks' })()

//3)
var ids = ['5632953c4e345e145fdf2df8', '563295464e345e145fdf2df9']
var messages = ids.map(function (value) {
    return "ID is " + value // explicit return
});

//4)
var ids = ['5632953c4e345e145fdf2df8', '563295464e345e145fdf2df9'];
var messages = ids.map(function (value, index, list) {
    return 'ID of ' + index + ' element is ' + value + ' ' // explicit return
});

//ES6
//1)
$('.btn').click((event) => {
    this.sendData()
})

//2)
const logUpperCase = function () {
    this.string = this.string.toUpperCase()
    return () => console.log(this.string)
}
logUpperCase.call({ string: 'es6 rocks' })()

//3)
var ids = ['5632953c4e345e145fdf2df8', '563295464e345e145fdf2df9']
var messages = ids.map(value => `ID is ${value}`) // implicit return

//4)
var ids = ['5632953c4e345e145fdf2df8', '563295464e345e145fdf2df9']
var messages = ids.map((value, index, list) => `ID of ${index} element is ${value} `) // implicit return

var ids = ['5632953c4e345e145fdf2df8', '563295464e345e145fdf2df9']
var messages = ids.map((value, index, ...abc) => ({ v: value, i: index, a: abc }))

/////////////////////////////////////////////////////////////////////////////////////////////////////

//7.Promise(ES6에서는 표준 Promise를 제공한다.)

//기존 ES5
setTimeout(function () {
    console.log('Yay!')
    setTimeout(function () {
        console.log('Wheeyee!')
    }, 1000)
}, 1000)

//ES6
var wait1000 = () => new Promise((resolve, reject) => { setTimeout(resolve, 1000) })

wait1000()
    .then(function () {
        console.log('Yay!')
        return wait1000()
    })
    .then(function () {
        console.log('Wheeyee!')
    });

/////////////////////////////////////////////////////////////////////////////////////////////////////

//8.블록 범위 생성자 Let 및 Const

//기존 ES5
function calculateTotalAmount(vip) {
    var amount = 0
    if (vip) {
        var amount = 1
    }
    { // more crazy blocks!
        var amount = 100
        {
            var amount = 1000
        }
    }
    return amount
}
console.log(calculateTotalAmount(true))

//ES6
function calculateTotalAmount(vip) {
    var amount = 0 // probably should also be let, but you can mix var and let
    if (vip) {
        let amount = 1 // first amount is still 0
    }
    { // more crazy blocks!
        let amount = 100 // first amount is still 0
        {
            let amount = 1000 // first amount is still 0
        }
    }
    return amount
}
console.log(calculateTotalAmount(true))

/////////////////////////////////////////////////////////////////////////////////////////////////////

//9.클래스 - ES6에는 class 키워드가 추가되어 ES5의 prototype 기반 상속보다 명확하게 class를 정의할 수 있다.

//ES6
class baseModel {
    constructor(options = {}, data = []) { // class constructor
        this.name = 'Base'
        this.url = 'http://azat.co/api'
        this.data = data
        this.options = options
    }

    getName() { // class method
        console.log(`Class name: ${this.name}`)
    }
}

//상속받는 경우
class AccountModel extends baseModel {
    constructor(options, data) {
        super({ private: true }, ['32113123123', '524214691']) //call the parent method with super
        this.name = 'Account Model'
        this.url += '/accounts/'
    }

    get accountsData() { //calculated attribute getter
        // ... make XHR
        return this.data
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

//10.모듈 - ES6부터는 모듈을 공식적으로 제공한다. 그 이전까지는 CommonJS, AMD, RequireJS등의 비공식 모듈 스펙을 사용해왔다.

//기존 ES5 - CommonJS이용
//module.js
module.exports = {
    port: 3000,
    getAccounts: function() {
      // ...
    }
  }
//main.js
var service = require('module.js')
console.log(service.port) // 3000

//ES6
//module.js
export var port = 3000
export function getAccounts(url) {
  // ...
}
//main.js
import {port, getAccounts} from 'module'
console.log(port) // 3000