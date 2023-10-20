import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { getProductes } from "./copManager.js";

createApp({
    data() {
        return {
            message: 'Ir a tienda!',
            divActual: 'portada',
            pedidoActual: [],
            productes: [],
        };
    },
    methods: {
        calcularTotal() {
            let total = 0;
            for (const actual of this.pedidoActual) {
                total += this.productes[actual.id].precio * actual.cantidad;
            }
            return total;
        },
        afegir(id) {
            const productoAIncrementar = this.pedidoActual.find(producto => producto.id === id);

            if (productoAIncrementar) {
                productoAIncrementar.cantidad += 1;
            } else {
                this.pedidoActual.push({ id, cantidad: 1 });
            }
        },
        treure(id) {
            const index = this.pedidoActual.findIndex(producto => producto.id === id);

            if (index !== -1) {
                if (this.pedidoActual[index].cantidad > 1) {
                    this.pedidoActual[index].cantidad -= 1;
                } else {
                    this.pedidoActual.splice(index, 1);
                }
            }
        },
        mostrar(idDiv) {
            return this.divActual === idDiv;
        },
        cambiarDiv(nuevoDiv) {
            this.divActual = nuevoDiv;
        }
    },
    async created() {
        try {
            this.productes = await getProductes();
        } catch (error) {
            console.error("Error al cargar los productos:", error);
        }
    },
}).mount('#app');
