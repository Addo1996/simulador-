//AQUI TODA LA LOGICA DE LAS FUNCIONES DEL NEGOCIO
function calcularDisponible(ingresos,egresos){
    let valorDisponible=0;
    valorDisponible=ingresos-egresos;
    if (valorDisponible<0){
        return 0;
    }
    return valorDisponible;
}