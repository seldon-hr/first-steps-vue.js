import { gruaService } from '../../../_services';

const SERVICE = gruaService;
const state = {
    loadingObtenerGruaById: false,
    obtenerGruaByIdResponse: {},

    loadingGuardarGrua: false,
    guardarGruaResponse: {},
};

const actions = {
    obtenerGruas({ commit, dispatch }, itemRequest) {
        let mensajeError = "Ocurrió un error al obtener las gruas,";
        commit('gruasController/mutateLoadingMostrarDatos', true, { root: true });
        dispatch('alert/CLEAR_ALERT', '', { root: true });

        SERVICE.showRecords(itemRequest)
            .then(
                response => {
                    if (response.code != 0) {
                        const { code, body, message } = response;

                        commit('gruasController/mutateLoadingMostrarDatos', false, { root: true });

                        if (code > 0) {
                            if (body.length > 0) {
                                commit('gruasController/mutateListaGruas', body, { root: true });
                            } else {
                                dispatch('app/showAppMessage', { type: "error", text: "No hay información que mostrar." }, { root: true });
                            }
                        } else {
                            dispatch('app/showAppMessage', { type: "error", text: message }, { root: true });
                        }
                    } else {
                        commit('gruasController/mutateLoadingMostrarDatos', false, { root: true });
                        dispatch('alert/SHOW_ERROR_ALERT', mensajeError + " verifique la información e inténtelo de nuevo.", { root: true });
                        console.error('Error with code-' + response.code + ": ", response.message);
                    }
                },
                error => {
                    commit('gruasController/mutateLoadingMostrarDatos', false, { root: true });
                    dispatch('alert/SHOW_ERROR_ALERT', mensajeError + " inténtelo de nuevo mas tarde.", { root: true });
                    console.error('Exception Error:', error);
                }
            );
    },

    guardarGrua({ dispatch, commit }, itemRequest) {
        let mensajeError = "Ocurrió un error al guardar la Grúa,";
        commit('gruasController/mutateLoadingEnviarDatos', true, { root: true });
        dispatch('alert/CLEAR_ALERT', '', { root: true });

        SERVICE.saveRecord(itemRequest)
            .then(
                response => {
                    if (response.code != 0) {
                        const { code, message } = response;

                        commit('gruasController/mutateLoadingEnviarDatos', false, { root: true });

                        if (code > 0) {
                            dispatch('app/showAppMessage', { type: "success", text: "Se guardó correctamente la grúa." }, { root: true });
                            dispatch('gruasController/obtenerGruas', null, { root: true });
                            dispatch('gruasController/toggleVerFormAgregar', false, { root: true })
                        } else {
                            dispatch('app/showAppMessage', { type: "error", text: message }, { root: true });
                        }

                    } else {
                        commit('gruasController/mutateLoadingEnviarDatos', false, { root: true });
                        dispatch('alert/SHOW_ERROR_ALERT', mensajeError + " verifique la información e inténtelo de nuevo.", { root: true });
                        console.error('Error with code-' + response.code + ": ", response.message);
                    }
                },
                error => {
                    commit('gruasController/mutateLoadingEnviarDatos', false, { root: true });
                    dispatch('alert/SHOW_ERROR_ALERT', mensajeError + " inténtelo de nuevo mas tarde.", { root: true });
                    console.error('Exception Error:', error);
                }
            );
    },

    eliminarGrua({ dispatch, commit }, id) {
        let mensajeError = "Ocurrió un error al eliminar la Grúa,";
        commit('gruasController/mutateLoadingEnviarDatos', true, { root: true });
        dispatch('alert/CLEAR_ALERT', '', { root: true });

        SERVICE.deleteRecord(id)
            .then(
                response => {
                    if (response.code != 0) {
                        const { code, message } = response;

                        commit('gruasController/mutateLoadingEnviarDatos', false, { root: true });

                        if (code > 0) {
                            dispatch('app/showAppMessage', { type: "success", text: "Se eliminó correctamente la grúa." }, { root: true });
                            dispatch('gruasController/obtenerGruas', null, { root: true });
                            dispatch('gruasController/toggleVerFormAgregar', false, { root: true })
                        } else {
                            dispatch('app/showAppMessage', { type: "error", text: message }, { root: true });
                        }
                    } else {
                        commit('gruasController/mutateLoadingEnviarDatos', false, { root: true });
                        dispatch('alert/SHOW_ERROR_ALERT', mensajeError + " verifique la información e inténtelo de nuevo.", { root: true });
                        console.error('Error with code-' + response.code + ": ", response.message);
                    }
                },
                error => {
                    commit('gruasController/mutateLoadingEnviarDatos', false, { root: true });
                    dispatch('alert/SHOW_ERROR_ALERT', mensajeError + " inténtelo de nuevo mas tarde.", { root: true });
                    console.error('Exception Error:', error);
                }
            );
    },
};

const mutations = {
    setLoadingObtenerGruaById(state, status) {
        state.loadingObtenerGruaById = status;
    },
    successObtenerGruaById(state, entry) {
        state.obtenerGruaByIdResponse = entry;
    },

    setLoadingGuardarGrua(state, status) {
        state.loadingGuardarGrua = status;
    },
    successGuardarGrua(state, entry) {
        state.guardarGruaResponse = entry;
    },
};

const getters = {
    getLoadingObtenerGruaById() {
        return state.loadingObtenerGruaById;
    },
    getResponseObtenerGruaById() {
        return state.obtenerGruaByIdResponse;
    },

    getLoadingGuardarGrua() {
        return state.loadingGuardarGrua;
    },
    getResponseGuardarGrua() {
        return state.guardarGruaResponse;
    },
};

export const gruasData = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};