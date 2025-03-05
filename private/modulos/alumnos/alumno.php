<?php
include('../../Config/Config.php');
extract($_REQUEST); //extrae todas las variables

$alumnos = $alumnos ?? '[]';
$accion = $accion ?? '';
$class_alumnos = new alumnos($conexion);

class alumnos {
    private $datos = [], $db, $respuesta=['msg'='ok'];

    public function __construct($conexion) {
        $this->db = $conexion;
    }
    public function recibir_datos($alumnos){
        global $accion;
        if($accion == 'consultar'){
            return $this->administrar_alumnos($alumnos);
        }else{
            $this->datos = json_decode($alumnos, true);
            return $this->validar_datos();
        }
    }
    public function validar_datos(){
        if( empty($this->datos['codigo']) ){
            $this->respuesta['msg'] = 'El código es requerido';
        }
    }
}
?>