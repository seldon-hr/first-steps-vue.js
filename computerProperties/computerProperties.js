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