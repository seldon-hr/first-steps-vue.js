<template>
  <c-the-card title="Gruas" :botonCerrar="false" :loading="loadingEnviarDatos">
    <v-container fluid>
      <v-row dense class="mt-7 mb-3">
        <v-col cols="6" md="10">
          <span class="text-h6">Lista Gruas</span>
        </v-col>
        <c-button-confirm
          v-if="!verFormAgregar"
          cols="3"
          md="1"
          icon="mdi-chevron-up"
          tooltip="Mostrar Formulario Registro"
          :text="''"
          @click="onMostrarFormAgregar()"
        />
        <c-button-confirm
          v-else
          cols="3"
          md="1"
          icon="mdi-chevron-down"
          tooltip="Ocultar Formulario Registro"
          :text="''"
          @click="onOcultarFormAgregar()"
        />
        <c-button-cancel
          cols="3"
          md="1"
          icon="mdi-reload"
          tooltip="Actualizar tabla proveedores"
          :text="''"
          :block="false"
          @click="onReload()"
        />
      </v-row>
      <v-row dense>
        <v-col cols="12" md="12">
          <div v-if="loadingMostrarDatos">
            <v-data-table :headers="registrosHeaders" dense>
              <template slot="no-data">
                <v-skeleton-loader
                  class="mx-1"
                  type="table-tbody"
                ></v-skeleton-loader>
              </template>
            </v-data-table>
          </div>
          <v-data-table
            v-else
            dense
            :items="listaGruas"
            :headers="registrosHeaders"
          >
            <!-- En este caso template se usa para modificar la propiedad
          de la tabla.
          e.g
            Si tienes que mostrar un tipo de dato como moneda.
            se preprocesa el valor que viene, ya que, este (en eta db)
            solo viene como un integer, no como moneda.
           -->
            <template v-slot:[`item.kilometro`]="{ item }">
              <span>{{ getCurrency(item.kilometroSct) }}</span>
            </template>
            <template v-slot:[`item.banderazo`]="{ item }">
              <span>{{ getCurrency(item.banderazoSct) }}</span>
            </template>

            <template v-slot:[`item.esActivo`]="{ item }">
              <v-chip small pill color="transparent">
                <v-chip
                  class="mr-1 pa-2"
                  :color="getEsActivoColor(item.esActivo)"
                  x-small
                  pill
                >
                </v-chip>
                {{ getEsActivoText(item.esActivo) }}
              </v-chip>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    class="ma-1 rounded-pill"
                    small
                    elevation="0"
                    color="transparent"
                    @click="onEditarGrua(item)"
                  >
                    <v-icon small> mdi-pencil </v-icon>
                  </v-btn>
                </template>
                <span>Editar Grúa</span>
              </v-tooltip>

              <v-tooltip v-if="!permisoLectura" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    class="ma-1 rounded-pill"
                    small
                    elevation="0"
                    color="transparent"
                    @click="showDialogEliminarGrua(item)"
                  >
                    <v-icon small> mdi-delete </v-icon>
                  </v-btn>
                </template>
                <span>Eliminar Grúa</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>

    <c-dialog-confirm
      :show="showDialog"
      :text="'¿Desea eliminar la Grúa?'"
      @confirm="confirmarEliminar()"
      @cancel="cancelarEliminar()"
      @setShowDialog="setShowDialog($event)"
    />
  </c-the-card>
</template>
  
  
  <script>
import { getCurrencyFormat } from "@/_helpers";
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    permisos: {
      type: String,
      default: "",
    },
  },

  created() {
    this.obtenerGruas();
  },

  computed: {
    ...mapGetters({
      loadingEnviarDatos: "gruasController/getLoadingEnviarDatos",
      loadingMostrarDatos: "gruasController/getLoadingMostrarDatos",
      listaGruas: "gruasController/getListaGruas",
      verFormAgregar: "gruasController/getVerFormAgregar",
    }),

    permisoLectura() {
      return !this.permisos.includes("T") && this.permisos.includes("L");
    },
    permisoEdicion() {
      return this.permisos.includes("T") || this.permisos.includes("E");
    },
  },

  data() {
    return {
      registrosHeaders: [
        {
          text: "Clave",
          value: "clave",
        },
        {
          text: "Tipo",
          value: "tipo",
        },
        {
          text: "Tonelaje",
          value: "tonelaje",
        },
        {
          text: "Kilometro SCT UMAS",
          value: "kilometroSctUma",
        },
        {
          text: "Kilometro SCT",
          value: "kilometro",
        },
        {
          text: "Banderazo SCT UMAS",
          value: "banderazoSctUma",
        },
        {
          text: "Banderazo SCT",
          value: "banderazo",
        },
        {
          text: "Activo",
          value: "esActivo",
        },
        {
          text: "",
          value: "actions",
        },
      ],
      showDialog: false,
    };
  },

  methods: {
    ...mapActions({
      toggleVerFormAgregar: "gruasController/toggleVerFormAgregar",
      obtenerGruas: "gruasController/obtenerGruas",
      editarGrua: "gruasController/editarGrua",
      eliminarGrua: "gruasController/eliminarGrua",
      seleccionarGrua: "gruasController/seleccionarGrua",
    }),

    onMostrarFormAgregar() {
      this.toggleVerFormAgregar(true);
    },
    onOcultarFormAgregar() {
      this.toggleVerFormAgregar(false);
    },
    onEditarGrua(item) {
      this.editarGrua({ index: -1, item });
    },
    onEliminarGrua() {
      this.eliminarGrua();
    },
    onReload() {
      this.obtenerGruas();
    },

    setShowDialog(v) {
      this.showDialog = v;
    },
    showDialogEliminarGrua(item) {
      this.seleccionarGrua({ index: -1, item });
      this.setShowDialog(true);
    },
    confirmarEliminar() {
      this.onEliminarGrua();
      this.setShowDialog(false);
    },
    cancelarEliminar() {
      this.seleccionarGrua({ index: -1, item: null });
      this.setShowDialog(false);
    },

    getEsActivoText(esActivo) {
      if (esActivo) return "SI";
      if (!esActivo) return "NO";
    },
    getEsActivoColor(esActivo) {
      if (esActivo) return "green";
      if (!esActivo) return "orange";
    },
    getCurrency(value) {
      value = String(value);
      return getCurrencyFormat({ entry: value });
    },
  },
};
</script>
  
  <style>
</style>