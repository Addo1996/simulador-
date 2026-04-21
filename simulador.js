function calcular() {
    // 1. VALIDACIONES: Ahora incluimos los 3 nuevos campos
    if (
        !validarCampo('txtIngresos', 'errorIngresos', 0, 99999) ||
        !validarCampo('txtArriendo', 'errorArriendo', 0, 99999) ||
        !validarCampo('txtAlimentacion', 'errorAlimentacion', 0, 99999) ||
        !validarCampo('txtVarios', 'errorVarios', 0, 99999) ||
        !validarCampo('txtMonto', 'errorMonto', 100, 50000) ||
        !validarCampo('txtPlazo', 'errorPlazo', 1, 30) ||
        !validarCampo('txtTasaInteres', 'errorTasaInteres', 1, 100)
    ) {
        return;
    }

    // 2. CAPTURA DE DATOS
    let ingresos = parseFloat(document.getElementById("txtIngresos").value) || 0;
    let arriendo = parseFloat(document.getElementById("txtArriendo").value) || 0;
    let alimentacion = parseFloat(document.getElementById("txtAlimentacion").value) || 0;
    let varios = parseFloat(document.getElementById("txtVarios").value) || 0;

    // 3. SUMA DE GASTOS (Requisito fundamental)
    let totalEgresos = arriendo + alimentacion + varios;
    document.getElementById("spnTotalGastos").innerText = totalEgresos.toFixed(2);

    // 4. CÁLCULOS FINANCIEROS (Usando tus funciones de funciones.js)
    let valorDisponible = calcularDisponible(ingresos, totalEgresos);
    document.getElementById("spnDisponible").innerText = valorDisponible.toFixed(2);

    let capacidad = calcularCapacidadPago(valorDisponible);
    document.getElementById("spnCapacidadPago").innerText = capacidad.toFixed(2);

    // Datos del préstamo
    let monto = parseFloat(document.getElementById("txtMonto").value);
    let plazo = parseFloat(document.getElementById("txtPlazo").value);
    let tasa = parseFloat(document.getElementById("txtTasaInteres").value);

    let interes = calcularInteresSimple(monto, tasa, plazo);
    document.getElementById("spnInteresPagar").innerText = interes.toFixed(2);

    let totalPagar = calcularTotalPagar(monto, interes);
    document.getElementById("spnTotalPrestamo").innerText = totalPagar.toFixed(2);

    let cuota = calcularCuotaMensual(totalPagar, plazo);
    document.getElementById("spnCuotaMensual").innerText = cuota.toFixed(2);

    // 5. APROBACIÓN
    let aprobado = aprobarCredito(capacidad, cuota);
    let spnEstado = document.getElementById("spnEstadoCredito");
    if (aprobado) {
        spnEstado.innerText = "CRÉDITO APROBADO";
        spnEstado.style.color = "green";
    } else {
        spnEstado.innerText = "CRÉDITO RECHAZADO";
        spnEstado.style.color = "red";
    }
}

function reiniciar() {
    // Limpieza de todos los campos nuevos y viejos
    const ids = ["txtIngresos", "txtArriendo", "txtAlimentacion", "txtVarios", "txtMonto", "txtPlazo", "txtTasaInteres"];
    ids.forEach(id => {
        document.getElementById(id).value = "";
        document.getElementById(id).classList.remove("error-input");
    });

    const errores = ["errorIngresos", "errorArriendo", "errorAlimentacion", "errorVarios", "errorMonto", "errorPlazo", "errorTasaInteres"];
    errores.forEach(id => document.getElementById(id).textContent = "");

    // Resetear resultados
    document.getElementById("spnTotalGastos").innerText = "0.00";
    document.getElementById("spnDisponible").innerText = "0.00";
    document.getElementById("spnCapacidadPago").innerText = "0.00";
    document.getElementById("spnInteresPagar").innerText = "0.00";
    document.getElementById("spnTotalPrestamo").innerText = "0.00";
    document.getElementById("spnCuotaMensual").innerText = "0.00";
    document.getElementById("spnEstadoCredito").innerText = "ANALIZANDO...";
    document.getElementById("spnEstadoCredito").style.color = "black";
}

function validarCampo(idInput, idError, min, max) {
    let input = document.getElementById(idInput);
    let valor = input.value.trim();
    let error = document.getElementById(idError);
    input.classList.remove("error-input");

    if (valor === "" || isNaN(valor) || parseFloat(valor) < min || parseFloat(valor) > max) {
        error.textContent = "Dato inválido";
        input.classList.add("error-input");
        return false;
    }
    error.textContent = "";
    return true;
}