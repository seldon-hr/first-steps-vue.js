import Grua from "../../../_models/Catalogos/Gruas";

const state = {
    grua: new Grua(),
    parametroUma: {},
    verFormAgregar: false,
    indexGrua: -1,
    listaGruas: [],
    loadingEnviarDatos: false,
    loadingMostrarDatos: false,
}

const actions = {
    
    /* Métodos básicos de un CRUD */
    obtenerGruas({ dispatch }) {
        let itemRequest = {
            esActivoUno: 1,
            esActivoDos: 0,
        };
        dispatch("gruasData/obtenerGruas", itemRequest, { root: true });
    },
    resetGrua({ commit }) {
        commit('mutateSeleccionarGrua', { index: -1, item: null });
        commit('mutateVerFormAgregar', false);
    },
    editarGrua({ commit }, { index, item }) {
        commit('mutateSeleccionarGrua', { index, item });
        commit('mutateVerFormAgregar', true)
    },
    guardarGrua({ dispatch }) {
        dispatch("gruasData/guardarGrua", state.grua, { root: true });
    },
    eliminarGrua({ commit, dispatch }) {
        dispatch("gruasData/eliminarGrua", state.grua.id, { root: true });
        commit('mutateSeleccionarGrua', { index: -1, item: null })
    },
/* End métodos básicos de un CRUD */


actualizarPropsGrua({ commit }, { propiedad, valor }) {
    commit('mutatePropsGrua', { propiedad, valor });
},

seleccionarGrua({ commit }, { index, item }) {
    commit('mutateSeleccionarGrua', { index, item });
},

/* Action para agregar para añadir y mostrar sus valores */
toggleVerFormAgregar({ commit }, valor) {
    commit("mutateVerFormAgregar", valor);
    if (!valor) {
        commit('mutateSeleccionarGrua', { index: -1, item: null });
    }
},


/* Use to call other controller from another module. */
solicitarParametros({ dispatch }) {
    let itemRequest = {
        esActivoUno: 1,
        esActivoDos: 0,
    };
    dispatch("parametros/obtenerParametros", itemRequest, { root: true });
},

asignarParametroUma({ commit }, listaParametros) {
        const busquedaParametroUma = listaParametros?.filter((v) => {
            return v.clave === "08";
        });
        const valor =
            busquedaParametroUma.length > 0 ? busquedaParametroUma[0] : {};

        commit('mutateParametroUma', valor)
    }
}

const mutations = {
    mutatePropsGrua(state, { propiedad, valor }) {
        state.grua[propiedad] = valor;
    },
    mutateSeleccionarGrua(state, { index, item }) {
        if (item) {
            state.grua = new Grua(item);
            state.indexGrua = index;
        } else {
            state.grua = new Grua();
            state.indexGrua = -1;
        }
    },
    mutateVerFormAgregar(state, valor) {
        state.verFormAgregar = valor;
    },
    mutateParametroUma(state, valor) {
        state.parametroUma = valor;
    },

    mutateListaGruas(state, valor) {
        state.listaGruas = valor;
    },
    mutateLoadingMostrarDatos(state, valor) {
        state.loadingMostrarDatos = valor;
    },
    mutateLoadingEnviarDatos(state, valor) {
        state.loadingEnviarDatos = valor;
    },
}

const getters = {
    getGrua() {
        return state.grua;
    },
    getVerFormAgregar() {
        return state.verFormAgregar;
    },
    getParametroUma() {
        return state.parametroUma;
    },
    getListaGruas() {
        return state.listaGruas;
    },
    getIndexGrua() {
        return state.indexGrua;
    },
    getLoadingEnviarDatos() {
        return state.loadingEnviarDatos;
    },
    getLoadingMostrarDatos() {
        return state.loadingMostrarDatos;
    },
}


export const gruasController = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}