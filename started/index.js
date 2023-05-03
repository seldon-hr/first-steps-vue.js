var app = new Vue({
    el: '#app',
    data: {
        message: 'My first test on vue.js'
    }
})

/* 🔝This is component that was called by its id with 'el' indicator */

var app2 = new Vue({
    el: '#app-2',
    data: {
        message: 'You loaded this page on ' + new Date().toLocaleString()
    }
})

/* 🔝 Un directive que puede manipular el dom */

var app3 = new Vue({
    el: '#app-3',
    data: {
        seen: true
    }
})

/* Un directive tipo condicional, en el cual el estado es para poder verse */

var app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [
            { text: 'Learn JavaScript'},
            { text: 'Learn Vue'},
            { text: 'Build something awesome'}
        ]
    }
})