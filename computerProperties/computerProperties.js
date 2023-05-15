console.log('a message')
const vm = Vue.createApp({
    data(){
        return{
            firstName: "Dani",
            lastName: "Romero",
            now: new Date()
        }
    },
    computed: {
        fullName(){
            return this.firstName + " " + this.lastName;
        },
        today(){
            return this.now.toLocaleDateString();
        }
    },
    template: `
        <div> {{ fullName }}</div>
        <div> {{ today }}</div>
    `,
}).mount("#app");

/* La diferencia entre hacer la declaración de de la Vue app y hacer el 
el mount al final del bloque de código.
e.g. 

const vm = Vue.createApp({
    ...
}).mount("#app");

En este caso se guarda una referencia a la instancia de la app de Vue en 
una variable, lo que permite acceder a ella en cualquier momento  y manipular
su estado o comportamiento después de haber sido creada.

Por el otro lado, si se realizaá el mount, fuera del bloque de la creación de la app,
no se guardará una referencia a la instancia de la app.

const vm = Vue.createApp({
    ...
});

vm.mount("#app");

*/