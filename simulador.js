//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML
function calcular(){
    let ingresosFloat=0;
    let egresosFloat=0;
    let cmpIngresosFloat;
    let cmpEgresosFloat;
    let total
    let valorDisponibleFloat;
    cmpIngresosFloat=document.getElementById("txtIngresos");
    cmpEgresosFloat=document.getElementById("txtEgresos");
    ingresosFloat=parseFloat(cmpIngresosFloat.value);
    egresosFloat=parseFloat(cmpEgresosFloat.value);
    valorDisponibleFloat=calcularDisponible(ingresosFloat,egresosFloat);
    total=document.getElementById("spnDisponible");
    total.innerText=valorDisponibleFloat

    let capacidadPago;
    capacidadPago = calcularCapacidadPago(valorDisponibleFloat);

    let cmpCapacidad = document.getElementById("spnCapacidadPago");
    cmpCapacidad.innerText = capacidadPago.toFixed(2);
    let monto, plazo, tasa 

    let cmpMonto = document.getElementById("txtMonto");
    let cmpPlazo = document.getElementById("txtPlazo");
    let cmpTasa = document.getElementById("txtTasaInteres");
    monto=parseFloat(cmpMonto.value);
    plazo=parseFloat(cmpPlazo.value);
    tasa=parseFloat(cmpTasa.value);
    if (isNaN(monto) || isNaN(plazo) || isNaN(tasa)) {
    alert("Ingrese datos válidos en crédito");
    return;
}

    let interes;
    interes = calcularInteresSimple(monto, tasa, plazo);

    let cmpInteres = document.getElementById("spnInteresPagar");
    cmpInteres.innerText = interes.toFixed(2);
    let totalPagar;

    totalPagar = calcularTotalPagar(monto, interes);

    let cmpTotal = document.getElementById("spnTotalPrestamo");
    cmpTotal.innerText = totalPagar.toFixed(2);

    let cuota;

    cuota = calcularCuotaMensual(totalPagar, plazo);

    let cmpCuota = document.getElementById("spnCuotaMensual");
    cmpCuota.innerText = cuota.toFixed(2);

}