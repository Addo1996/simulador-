//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML
function calcular(){
    if (
        !validarCampo('txtIngresos','errorIngresos', 0, 99999) ||
        !validarCampo('txtEgresos','errorEgresos', 0, 99999) ||
        !validarCampo('txtMonto','errorMonto', 100, 50000) ||
        !validarCampo('txtPlazo','errorPlazo', 1, 30) ||
        !validarCampo('txtTasaInteres','errorTasaInteres', 1, 100)
    ) {
        return;
    }

    let ingresosFloat=0;
    let egresosFloat=0;
    let cmpIngresosFloat;
    let cmpEgresosFloat;
    let total;
    let valorDisponibleFloat;

    cmpIngresosFloat=document.getElementById("txtIngresos");
    cmpEgresosFloat=document.getElementById("txtEgresos");

    ingresosFloat=parseFloat(cmpIngresosFloat.value);
    egresosFloat=parseFloat(cmpEgresosFloat.value);

    valorDisponibleFloat=calcularDisponible(ingresosFloat,egresosFloat);

    total=document.getElementById("spnDisponible");
    total.innerText = valorDisponibleFloat.toFixed(2); // ✅ AQUÍ EL CAMBIO

    let capacidadPago;
    capacidadPago = calcularCapacidadPago(valorDisponibleFloat);

    let cmpCapacidad = document.getElementById("spnCapacidadPago");
    cmpCapacidad.innerText = capacidadPago.toFixed(2);

    let monto, plazo, tasa;

    let cmpMonto = document.getElementById("txtMonto");
    let cmpPlazo = document.getElementById("txtPlazo");
    let cmpTasa = document.getElementById("txtTasaInteres");

    monto=parseFloat(cmpMonto.value);
    plazo=parseFloat(cmpPlazo.value);
    tasa=parseFloat(cmpTasa.value);

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

    let aprobado;
    aprobado = aprobarCredito(capacidadPago, cuota);

    let cmpEstado = document.getElementById("spnEstadoCredito");

    if (aprobado){
        cmpEstado.innerText = "CRÉDITO APROBADO";
        cmpEstado.style.color = "green";
    } else {
        cmpEstado.innerText = "CRÉDITO RECHAZADO";
        cmpEstado.style.color = "red";
    }
}

function reiniciar(){
    // limpiar inputs
    document.getElementById("txtIngresos").value = "";
    document.getElementById("txtEgresos").value = "";
    document.getElementById("txtMonto").value = "";
    document.getElementById("txtPlazo").value = "";
    document.getElementById("txtTasaInteres").value = "";

    // limpiar resultados
    document.getElementById("spnDisponible").innerText = "";
    document.getElementById("spnCapacidadPago").innerText = "";
    document.getElementById("spnInteresPagar").innerText = "";
    document.getElementById("spnTotalPrestamo").innerText = "";
    document.getElementById("spnCuotaMensual").innerText = "";
    document.getElementById("spnEstadoCredito").innerText = "ANALIZANDO...";

    // limpiar errores
    document.getElementById("errorIngresos").textContent = "";
    document.getElementById("errorEgresos").textContent = "";
    document.getElementById("errorMonto").textContent = "";
    document.getElementById("errorPlazo").textContent = "";
    document.getElementById("errorTasaInteres").textContent = "";

    // quitar estilos de error
    document.getElementById("txtIngresos").classList.remove("error-input");
    document.getElementById("txtEgresos").classList.remove("error-input");
    document.getElementById("txtMonto").classList.remove("error-input");
    document.getElementById("txtPlazo").classList.remove("error-input");
    document.getElementById("txtTasaInteres").classList.remove("error-input");
}

function validarCampo(idInput, idError, min, max) {
    let input = document.getElementById(idInput);
    let valor = input.value.trim();
    let error = document.getElementById(idError);

    input.classList.remove("error-input");

    if (valor === "") {
        error.textContent = "Campo obligatorio";
        input.classList.add("error-input");
        return false;
    }

    if (!/^\d+(\.\d+)?$/.test(valor)) {
        error.textContent = "Solo números";
        input.classList.add("error-input");
        return false;
    }

    let numero = parseFloat(valor);

    if (numero < min) {
        error.textContent = `Mínimo: ${min}`;
        input.classList.add("error-input");
        return false;
    }

    if (numero > max) {
        error.textContent = `Máximo: ${max}`;
        input.classList.add("error-input");
        return false;
    }

    error.textContent = "";
    return true;
}