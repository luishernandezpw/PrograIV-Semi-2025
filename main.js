const {createApp, ref} = Vue;
const Dexie = window.Dexie,
    db = new Dexie('db_academico');

const app = createApp({
    components: {
        alumno,
        materia,
        buscaralumno
    },
    data() {
        return {
            forms : {
                alumno: {mostrar: false},
                buscarAlumno: {mostrar: false},
                materia: {mostrar: false},
                matricula: {mostrar: false},
            },
        };
    },
    methods: {
        abrirFormulario(componente) {
            this.forms[componente].mostrar = !this.forms[componente].mostrar;
        }
    },
    created() {
        db.version(1).stores({
            alumnos: '++idAlumno, codigo, nombre, direccion, telefono, email',
            materias: '++idMateria, codigo, nombre, uv',
        });
    }
});
app.mount('#app');
