const vm = Vue.createApp({
    //.createApp means Sea un JSON que describe nuestra applicación, conocida como optionAPI
    data(){
        /* En la data, va ir todas aquellas variables o data que se maneja en el
        en el componente. */
        return {  
            counter: 0   
        };
    },
    methods: {
        increment() {
            this.counter++;
            /* Uso de this, para poder hacer uso de los misma data y llamar a los
            components */
        },

        decrement() {
            this. counter--;
        }

    },
    template: `
    <button v-on:click="increment">
        +1
    </button>
    <button v-on:click="decrement">
        -1
    </button>
    <span>
        {{ counter }}
    </span>
    `  
    /* Usando v-on, ya no es necesario llamar a una opción que escuché el dom,
    sino ya solo lo está haciendo. 
    
    Poder emplear métodos de JS*/
}).mount("#app");

