const vm = Vue.createApp({
    //.createApp means Sea un JSON que describe nuestra applicación, conocida como optionAPI
    data(){
        return {
            img: "https://th.bing.com/th/id/R.7e3a593e859d6744211ce271aac09ce9?rik=TGQk6mM8EWzncQ&pid=ImgRaw&r=0"
        };
    },
    template: `
    <img v-bind:src="img" alt="">
    `  
    /* <!-- 🔝 Una variable dinámica, dónde src sea igual a lo guardado en img */
}).mount('#app');

