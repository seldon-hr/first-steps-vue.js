export default class Grua {
    id = 0;
    clave = "";
    tipo = "";
    tonelaje = "";
    kilometroSct = "";
    banderazoSct = "";
    kilometroSctUma = "";
    banderazoSctUma = "";
    esActivo = 1;

    constructor(item) {
        if (item) {
            this.id = item.id;
            this.clave = item.clave;
            this.tipo = item.tipo;
            this.tonelaje = item.tonelaje;
            this.kilometroSct = item.kilometroSct;
            this.banderazoSct = item.banderazoSct;
            this.kilometroSctUma = item.kilometroSctUma ?? "0.0000";
            this.banderazoSctUma = item.banderazoSctUma ?? "0.0000";
            this.esActivo = item.esActivo;
        } else {
            this.id = 0;
            this.clave = "";
            this.tipo = "";
            this.tonelaje = "";
            this.kilometroSct = "";
            this.banderazoSct = "";
            this.kilometroSctUma = "";
            this.banderazoSctUma = "";
            this.esActivo = 1;
        }
    }
}