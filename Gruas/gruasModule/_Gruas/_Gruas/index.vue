<template>
  <v-container>
    <c-the-title-bar
      title="Gruas"
      subtitle="Administrador del catálogo de grúas."
    />

    <form-agregar v-show="verFormAgregar" :permisos="permisos" />

    <table-gruas :permisos="permisos" />
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import TableGruas from "./components/TableGruas.vue";
import FormAgregar from "./components/FormAgregar.vue";

export default {
  components: {
    FormAgregar,
    TableGruas,
  },
  data() {
    return {
      permisos: "",
    };
  },
  computed: {
    ...mapGetters({
      verFormAgregar: "gruasController/getVerFormAgregar",

      getPermisosRuta: "app/getPermisosRuta",
    }),
  },
  watch: {
    getPermisosRuta: {
      handler(newVal) {
        if (newVal && newVal != "") {
          this.permisos = newVal;
        }
      },
      immediate: true,
    },
  },
};
</script>

<style>
</style>