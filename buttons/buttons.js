const vm = Vue.createApp({
    //.createApp means Sea un JSON que describe nuestra applicación, conocida como optionAPI
    data(){
        return {
            text: "new proof"
        };
    }
}).mount('#app');

console.log(vm)