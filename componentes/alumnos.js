    
 const alumno = {
    props: ['forms'],
    data() {
        return {
            accion: 'nuevo',
            newHash: '',
            alumno : {
                codigo: '',
                nombre: '',
                direccion: '',
                telefono: '',
                email: '',
                codigo_transaccion: uuidv4()
            },
        }
    },
    methods: {
        buscarAlumno() {
            this.forms.buscarAlumno.mostrar = !this.forms.buscarAlumno.mostrar;
            this.$emit('buscar');
        },
        modificarAlumno(alumno) {
            this.accion = 'modificar';
            this.alumno = {...alumno};
        },
        guardarAlumno() {
            let alumno = {...this.alumno};
            alumno.hash = CryptoJS.SHA256(JSON.stringify({
                codigo: alumno.codigo,
                nombre: alumno.nombre,
                direccion: alumno.direccion,
                telefono: alumno.telefono,
                email: alumno.email
            })).toString();
            db.alumnos.put(alumno);
            fetch(`private/modulos/alumnos/alumno.php?accion=${this.accion}&alumnos=${JSON.stringify(alumno)}`)
                .then(response => response.json())
                .then(data => {
                    if( data != true ){
                        alertify.error(data);
                    }else{
                        this.nuevoAlumno();
                        this.$emit('buscar');
                    }
                })
                .catch(error => console.log(error));
        },
        nuevoAlumno() {
            this.accion = 'nuevo';
            this.alumno = {
                codigo: '',
                nombre: '',
                direccion: '',
                telefono: '',
                email: '',
                codigo_transaccion: uuidv4()
            };
        }
    },
    mounted() {
        this.$watch('alumno', (newValue, oldValue) => {
            this.newHash = CryptoJS.SHA256(JSON.stringify({
                codigo: newValue.codigo,
                nombre: newValue.nombre,
                direccion: newValue.direccion,
                telefono: newValue.telefono,
                email: newValue.email
            })).toString();
        }, { deep: true });
    },
    template: `
        <div class="row">
            <div class="col-6">
                <form id="frmAlumno" name="frmAlumno" @submit.prevent="guardarAlumno">
                    <div class="card border-dark mb-3">
                        <div class="card-header bg-dark text-white">Registro de Alumnos</div>
                        <div class="card-body">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">CODIGO</div>
                                <div class="col-9 col-md-4">
                                    <input required v-model="alumno.codigo" type="text" name="txtCodigoAlumno" id="txtCodigoAlumno" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">NOMBRE</div>
                                <div class="col-9 col-md-6">
                                    <input required pattern="[A-Za-zñÑáéíóú ]{3,150}" v-model="alumno.nombre" type="text" name="txtNombreAlumno" id="txtNombreAlumno" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">DIRECCION</div>
                                <div class="col-9 col-md-8">
                                    <input required v-model="alumno.direccion" type="text" name="txtDireccionAlumno" id="txtDireccionAlumno" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">TELEFONO</div>
                                <div class="col-9 col-md-4">
                                    <input v-model="alumno.telefono" type="text" name="txtTelefonoAlumno" id="txtTelefonoAlumno" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">EMAIL</div>
                                <div class="col-9 col-md-6">
                                    <input v-model="alumno.email" type="text" name="txtEmailAlumno" id="txtEmailAlumno" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">HASH</div>
                                <div class="col-9 col-md-6">
                                    <span class="form-control" id="spnHashAlumno">{{ alumno.hash }}</span>
                                    <span class="form-control" id="spnCurrentHashAlumno">{{ newHash }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer bg-dark text-center">
                            <input type="submit" value="Guardar" class="btn btn-primary"> 
                            <input type="reset" value="Nuevo" class="btn btn-warning">
                            <input type="button" @click="buscarAlumno" value="Buscar" class="btn btn-info">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `
};