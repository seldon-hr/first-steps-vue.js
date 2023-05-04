const vm = Vue.createApp({
    //.createApp means Sea un JSON que describe nuestra applicación, conocida como optionAPI
    data(){
        return {
            text: "<h2>A heading two</h2>"
        };
    },
    template: `<div v-once v-html="text"></div>`  //Escribiendo directives dentro del vue
            //v-text estamos crendo una directive que nos llama a la variable que tenemos.
}).mount('#app');

console.log(vm);
/*El retorno que generá el  vm, es un proxy y este puede ser modificado en 
JS vainilla, es decir se modifica con los datos.  

VM, objeto que contiene toda nuestra aplicación
ViewModel como modelo que nos pemirte organizar, estructurar aquellos bloques 
que queremos que se vean, así como su segmentación.
*/