<template>
  <c-the-card :title="'Grúa'" botonCerrar @cerrar="onCerrarFormAgregar()">
    <v-container fluid>
      <v-form ref="formAgregar" lazy-validation>
        <v-row dense>
          <v-col cols="12" md="3" offset-md="1">
            <c-text-field
              v-model.trim="clave"
              :rules="[rules.required]"
              label="Clave"
              placeholder="Clave"
              maxlength="2"
              :disabled="indexGrua > 0"
            />
          </v-col>
          <v-col cols="12" md="3">
            <c-text-field
              v-model.trim="tipo"
              :rules="[rules.required]"
              label="Tipo"
              maxlength="1"
              placeholder="Tipo"
            />
          </v-col>
          <v-col cols="12" md="3">
            <c-text-field
              v-model.trim="tonelaje"
              :rules="[rules.required]"
              label="Tonelaje"
              placeholder="Tonelaje"
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" class="text-center">
            <v-chip color="warning">
              <span>Valor UMA: {{ parametroUma?.valor }}</span>
            </v-chip>
          </v-col>
        </v-row>
        <v-row dense>
          <c-input-currency
            v-model="kilometroSctUma"
            cols="12"
            md="3"
            offsetmd="3"
            label="Kilometro SCT UMAS"
            :rules="[rules.validateMayorCero]"
            :options="{
              precision: 4,
            }"
          />

          <c-input-currency
            v-model="kilometroSct"
            cols="12"
            md="3"
            label="Kilometro SCT"
            picon="mdi-currency-usd"
            disabled
            :rules="[rules.validateMayorCero]"
          />
        </v-row>
        <v-row dense>
          <c-input-currency
            v-model="banderazoSctUma"
            cols="12"
            md="3"
            offsetmd="3"
            label="Banderazo SCT UMAS"
            :rules="[rules.validateMayorCero]"
            :options="{
              precision: 4,
            }"
          />

          <c-input-currency
            v-model="banderazoSct"
            cols="12"
            md="3"
            label="Banderazo SCT"
            picon="mdi-currency-usd"
            disabled
            :rules="[rules.validateMayorCero]"
          />
        </v-row>
        <v-row>
          <v-col cols="12" offset-md="5" offset="5" md="2">
            <v-switch
              :true-value="1"
              :false-value="0"
              v-model="esActivo"
              inset
              dense
              label="Es Activo"
            ></v-switch>
          </v-col>
        </v-row>
      </v-form>

      <v-row dense>
        <c-button-cancel
          :cols="12"
          :md="2"
          :offsetmd="8"
          :tooltip="'Limpiar campos grúa'"
          :text="'Cancelar'"
          :icon="'mdi-delete'"
          @click="onCancelar()"
        />
        <c-button-confirm
          v-if="indexGrua === -1"
          :cols="12"
          :md="2"
          :tooltip="'Guardar Grúa'"
          :text="'Guardar'"
          :icon="'mdi-content-save-outline'"
          :disabled="permisoLectura"
          @click="onGuardar()"
        />
        <c-button-confirm
          v-else
          :cols="12"
          :md="2"
          :tooltip="'Actualizar Grúa'"
          :text="'Actualizar'"
          :icon="'mdi-refresh'"
          :disabled="permisoLectura"
          @click="onGuardar()"
        />
      </v-row>
    </v-container>
  </c-the-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { redondearNumero } from "../../../../_helpers";

export default {
  created() {
    this.solicitarParametros();
  },
  props: {
    permisos: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      rules: {
        required: (val) => (val && !!val.trim()) || "Este campo es requerido.",
        validateMayorCero: (val) =>
          this.validateMayorCero(val) || "El numero debe ser mayor a cero",
      },
    };
  },
  computed: {
    ...mapGetters({
      grua: "gruasController/getGrua",
      parametroUma: "gruasController/getParametroUma",
      verFormAgregar: "gruasController/getVerFormAgregar",
      indexGrua: "gruasController/getIndexGrua",
    }),

    permisoLectura() {
      return !this.permisos.includes("T") && this.permisos.includes("L");
    },
    permisoEdicion() {
      return this.permisos.includes("T") || this.permisos.includes("E");
    },

    id() {
      return this.grua.id;
    },
    clave: {
      get() {
        return this.grua.clave;
      },
      set(valor) {
        this.actualizarPropsGrua({ propiedad: "clave", valor: valor });
      },
    },
    tipo: {
      get() {
        return this.grua.tipo;
      },
      set(valor) {
        this.actualizarPropsGrua({ propiedad: "tipo", valor: valor });
      },
    },
    tonelaje: {
      get() {
        return this.grua.tonelaje;
      },
      set(valor) {
        this.actualizarPropsGrua({ propiedad: "tonelaje", valor: valor });
      },
    },
    kilometroSct: {
      get() {
        return this.grua.kilometroSct;
      },
      set(valor) {
        this.actualizarPropsGrua({ propiedad: "kilometroSct", valor: valor });
      },
    },
    banderazoSct: {
      get() {
        return this.grua.banderazoSct;
      },
      set(valor) {
        this.actualizarPropsGrua({ propiedad: "banderazoSct", valor: valor });
      },
    },
    kilometroSctUma: {
      get() {
        return this.grua.kilometroSctUma;
      },
      set(valor) {
        this.actualizarPropsGrua({
          propiedad: "kilometroSctUma",
          valor: valor,
        });
      },
    },
    banderazoSctUma: {
      get() {
        return this.grua.banderazoSctUma;
      },
      set(valor) {
        this.actualizarPropsGrua({
          propiedad: "banderazoSctUma",
          valor: valor,
        });
      },
    },
    esActivo: {
      get() {
        return this.grua.esActivo;
      },
      set(valor) {
        this.actualizarPropsGrua({ propiedad: "esActivo", valor: valor });
      },
    },
  },
  methods: {
    ...mapActions({
      actualizarPropsGrua: "gruasController/actualizarPropsGrua",
      toggleVerFormAgregar: "gruasController/toggleVerFormAgregar",
      resetGrua: "gruasController/resetGrua",
      guardarGrua: "gruasController/guardarGrua",
      solicitarParametros: "gruasController/solicitarParametros",
      showAppMessage: "app/showAppMessage",
    }),

    onGuardar() {
      const formAgregarValido = this.$refs.formAgregar.validate();

      if (formAgregarValido) {
        this.guardarGrua();
      } else {
        this.showAppMessage({
          type: "error",
          text: "Faltan campos requeridos.",
        });
      }
    },
    onCancelar() {
      this.resetGrua();
    },
    onCerrarFormAgregar() {
      this.toggleVerFormAgregar(false);
    },

    validateMayorCero(val) {
      val = val.replaceAll(",", "");
      return Number(val) > 0;
    },
  },
  watch: {
    kilometroSctUma(newVal) {
      const numeroRedondeado = redondearNumero(
        newVal * this.parametroUma.valor,
        2
      );
      this.kilometroSct = numeroRedondeado;
    },
    banderazoSctUma(newVal) {
      const numeroRedondeado = redondearNumero(
        newVal * this.parametroUma.valor,
        2
      );
      this.banderazoSct = numeroRedondeado;
    },
    verFormAgregar(newVal) {
      if (!newVal) {
        this.$refs.formAgregar.resetValidation();
      } else {
        this.$refs.formAgregar.resetValidation();
      }
    },
  },
};
</script>

<style>
</style>