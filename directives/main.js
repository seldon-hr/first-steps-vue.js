
const vm = Vue.createApp({
    data() {
        return {
            variableText: "a text but inside a variable."
        }
    },
    /* methods: {
        
    }, */
    template: `
        <h3>Here is a demo in Vue</h3>
        <p ref="test" v-bind:text="variableText">{{ variableText }}</p>
    `,
    created() {
        this.variableText = "created";
        console.log(this.$refs.test, "created");
        
       
    },
    mounted() {
        console.log(this.$refs.test,"mounted");
        setTimeout(() => {
            this.variableText = "Text was changed after two seconds";
        }, 2000); 
        this.$refs.test.tex= "nuevo texto";
    },
});

vm.mount("#app");


