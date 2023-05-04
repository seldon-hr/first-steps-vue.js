const vm = Vue.createApp({
    //.createApp means Sea un JSON que describe nuestra applicación, conocida como optionAPI
    data(){
        return {
            counter: 0
        };
    },
    methods: {
        increment() {
            this.counter++;
            /* Uso de this, para poder hacer uso de los misma data y llamar a los
            components */
        }
    },
    template: `<button v-on:click="increment">{{ counter }}</button>`  
    /* Usando v-on, ya no es necesario llamar a una opción que escuché el dom,
    sino ya solo lo está haciendo. */
}).mount("#app");

