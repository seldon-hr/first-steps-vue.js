<template>
  <c-basic-card v-show="showFormAdd">
    <v-card-title>
      <h4 class="secondary--text">Registrar Perfil</h4>
    </v-card-title>

    <v-container fluid>
      <v-container>
        <v-form ref="formAdd" lazy-validation>
          <v-row dense justify="center">
            <v-col cols="12" md="4">
              <c-text-field
                v-model.trim="nombre"
                :rules="[rules.required]"
                label="Nombre del Perfil"
                @input="nombre = nombre.toUpperCase()"
              />
            </v-col>
            <!-- Componente que se despliega si el número de opciones es mayor que 6
                    así se pinta un botón por cada uno. -->

            <v-col cols="12" md="6">
              <template v-if="listperfiles.length > 2">
                <c-select-perfiles
                  v-model="autocompleteValue"
                  cols="12"
                  md="10"
                  class="mt-0 pt-0"
                />
              </template>

              <template v-else>
                <v-col class="ml-md-16 mt-n5">
                  <span class="text-body-2">
                    Obtener Permisos de Perfil Base:
                    {{ selectedOption }}
                  </span>
                  <c-menu-perfiles v-model="selectedOption" cols="12" md="12" />
                </v-col>
              </template>
            </v-col>
          </v-row>
        </v-form>

        <v-card class="background">
          <v-toolbar color="primary" flat>
            <v-toolbar-title class="white--text">
              {{ nameInstanceProfile }}</v-toolbar-title
            >
          </v-toolbar>
          <v-tabs vertical>
            <v-tab
              v-for="option in opcionesMenuPerfil"
              :key="option.name"
              :value="option"
              class="justify-start background"
            >
              <v-icon left> {{ option.icon }} </v-icon>
              {{ option.name }}
            </v-tab>

            <template v-for="(option, i) in opcionesMenuPerfil">
              <v-tab-item :key="i">
                <v-card flat class="background">
                  <!-- Skeleton loader -->
                  <div v-if="loadingShowData">
                    <v-data-table dense class="elevation-1">
                      <template slot="no-data">
                        <v-skeleton-loader
                          class="mx-1"
                          type="table-tbody"
                        ></v-skeleton-loader>
                      </template>
                    </v-data-table>
                  </div>
                  <!-- End skeleton loader -->
                  <!-- And here, the v-data-table already have the search
                    method and its properties, then gonna search the register inside
                    the texfiel we have and the texfield search 'cause we define in 
                    its v-model -->
                  <v-data-table
                    v-else
                    dense
                    class="elevation-1"
                    :headers="[
                      {
                        text: 'Nombre',
                        value: 'name',
                      },
                    ]"
                    :items="option.children"
                  >
                    <template v-slot:no-data>
                      No hay datos disponibles</template
                    >
                  </v-data-table>
                </v-card>
              </v-tab-item>
            </template>
          </v-tabs>
        </v-card>
      </v-container>
      <v-row dense>
        <v-divider class="primary"></v-divider>
      </v-row>
      <!-- Form buttons -->
      <v-row>
        <c-cancel-button
          :cols="12"
          :md="3"
          :loading="loadingSendData"
          :disabled="loadingSendData"
          offsetmd="6"
          text="Cancelar"
          @click="onCancel()"
        />

        <c-confirm-button
          :cols="12"
          :md="3"
          :text="textConfirmButton"
          :loading="loadingSendData"
          :disabled="loadingSendData"
          @click="onSave()"
        ></c-confirm-button>
      </v-row>
    </v-container>
  </c-basic-card>
</template>
          
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      rules: {
        required: (val) => (val && !!val.trim()) || "Este campo es requerido",
      },
      autocompleteValue: null,
      selectedOption: {
        rutas: [],
      },
      nameInstanceProfile: "",
      menuOptions: [],
      perfilesTest: [
        {
          id: 1,
          name: "ADMINISTRADOR",
          clave: "",
          rutas: [
            {
              id: 1,
              clave: "admin",
              name: "Administración",
              icon: "mdi-laptop",
              children: [
                {
                  id: 11,
                  clave: "catalogos",
                  name: "Catálogos",
                  children: [],
                },
                {
                  id: 12,
                  clave: "perfiles",
                  name: "Perfiles",
                  children: [],
                },
              ],
            },
            {
              id: 2,
              clave: "comercial",
              name: "Instancia Comercial",
              icon: "mdi-point-of-sale",
              children: [],
            },
            {
              id: 3,
              clave: "constructor",
              name: "Constructor",
              icon: "mdi-account-hard-hat",
              children: [
                {
                  id: 31,
                  clave: "plantillas",
                  name: "Plantillas",
                  children: [],
                },
                {
                  id: 32,
                  clave: "Variables Globales",
                  name: "variablesGlobales",
                  children: [],
                },
                {
                  id: 33,
                  clave: "Variables Locales",
                  name: "variablesLoacales",
                  children: [],
                },
                {
                  id: 34,
                  clave: "Calendarios",
                  name: "calendarios",
                  children: [],
                },
              ],
            },
            {
              id: 4,
              clave: "cobranza",
              name: "Cobranza",
              icon: "mdi-cash-refund",
              children: [],
            },
            {
              id: 5,
              clave: "reportes",
              name: "Reportes",
              icon: "mdi-clipboard-file",
              children: [],
            },
          ],
        },
        {
          id: 2,
          name: "IMPLEMENTADOR",
          clave: "",
          rutas: [
            {
              id: 1,
              clave: "admin",
              name: "Administración",
              icon: "mdi-laptop",
              children: [
                {
                  id: 11,
                  clave: "catalogos",
                  name: "Catálogos",
                  children: [],
                },
              ],
            },
            {
              id: 2,
              clave: "comercial",
              name: "Instancia Comercial",
              icon: "mdi-point-of-sale",
              children: [],
            },
            {
              id: 3,
              clave: "constructor",
              name: "Constructor",
              icon: "mdi-account-hard-hat",
              children: [],
            },
            {
              id: 4,
              clave: "cobranza",
              name: "Cobranza",
              icon: "mdi-cash-refund",
              children: [],
            },
          ],
        },
      ],
    };
  },
  created() {
    /* this.selectedOption = null; */
  },
  computed: {
    ...mapGetters({
      perfilModel: "perfilController/getPerfil",
      listperfiles: "perfilController/getListPerfil",
      showFormAdd: "perfilController/getShowFormAdd",
      indexPerfil: "perfilController/getIndexPerfil",
      loadingSendData: "perfilController/getLoadingSendData",
      loadingShowData: "perfilController/getLoadingShowData",
    }),

    opcionesMenuPerfil() {
      const perfilAux = this.perfilesTest.filter((v) => {
        return v.name === this.selectedOption.nombre;
      });
      return this.selectedOption?.rutas ?? perfilAux[0].rutas;
    },

    textConfirmButton() {
      return this.perfilModel.id != 0 ? "Actualizar" : "Guardar";
    },

    id() {
      return this.perfilModel.id;
    },
    clave: {
      get() {
        return this.perfilModel.clave;
      },
      set(valor) {
        this.updatePropsPerfil({
          propiedad: "clave",
          valor: valor,
        });
      },
    },

    nombre: {
      get() {
        return this.perfilModel.nombre;
      },
      set(valor) {
        this.updatePropsPerfil({
          propiedad: "nombre",
          valor: valor,
        });
      },
    },

    esActivo: {
      get() {
        return this.perfilModel.esActivo;
      },
      set(valor) {
        this.updatePropsPerfil({
          propiedad: "esActivo",
          valor: valor,
        });
      },
    },
  },

  methods: {
    ...mapActions({
      guardarPerfil: "perfilController/guardarPerfil",
      resetPerfil: "perfilController/resetPerfil",
      updatePropsPerfil: "perfilController/updatePropsPerfil",
      toggleShowFormAdd: "perfilController/toggleShowFormAdd",
      showAppMessage: "app/showAppMessage",
    }),

    onSave() {
      const formAddValidate = this.$refs.formAdd.validate();

      if (formAddValidate) {
        this.guardarPerfil();
      } else {
        this.showAppMessage({
          type: "error",
          text: "Faltan campos requeridos",
        });
      }
    },

    onCancel() {
      this.resetPerfil();
      this.selectedOption = null;
      this.autocompleteValue = null;
      this.nameInstanceProfile = null;
    },

    /* Método que escribe el nombre en la instancia si se escoge a partirl de u
    perfil existente. */
    writeNameInstance(value) {
      if (value) {
        this.listperfiles.forEach((perfil) => {
          if (perfil.id === value) {
            console.log(perfil.nombre);
            this.nameInstanceProfile = perfil.nombre;
          }
        });
      }
    },

    profileMenuOptions(value) {
      const perfil = this.perfilesTest.find((perfil) => perfil.id === value);
      if (perfil) {
        this.menuOptions = perfil.options;
      } else {
        this.menuOptions = [];
      }
    },
  },

  watch: {
    showFormAdd(newVal) {
      if (!newVal) {
        this.$refs.formAdd.resetValidation();
      } else {
        this.$refs.formAdd.resetValidation();
      }
    },

    /* Cambia el nombre de la instancia, si escribe en el nombre del perfil */
    nombre(newNombre) {
      this.nameInstanceProfile = newNombre;
    },

    /* Estableciendo el nombre a partir de un perfil existente. */
    autocompleteValue(value) {
      this.writeNameInstance(value);
    },

    selectedOption(value) {
      this.writeNameInstance(value);
      this.profileMenuOptions(value);
    },
  },
};
</script>
          
<style>
</style>