// AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML
function calcular() {
    // 1. Validamos que los 3 nuevos campos y los demás tengan datos correctos
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

    // 2. Capturamos los valores de los 3 nuevos campos
    let ingresos = parseFloat(document.getElementById("txtIngresos").value) || 0;
    let arriendo = parseFloat(document.getElementById("txtArriendo").value) || 0;
    let alimentacion = parseFloat(document.getElementById("txtAlimentacion").value) || 0;
    let varios = parseFloat(document.getElementById("txtVarios").value) || 0;

    // 3. REALIZAMOS LA SUMA (Esto es lo que te faltaba)
    let totalEgresos = arriendo + alimentacion + varios;

    // 4. Mostramos el total de la suma en el HTML
    // Asegúrate de que en tu HTML el span tenga id="spnTotalGastos"
    document.getElementById("spnTotalGastos").innerText = totalEgresos.toFixed(2);

    // 5. Seguimos con los cálculos originales usando el 'totalEgresos'
    let valorDisponible = calcularDisponible(ingresos, totalEgresos);
    document.getElementById("spnDisponible").innerText = valorDisponible.toFixed(2);

    let capacidad = calcularCapacidadPago(valorDisponible);
    document.getElementById("spnCapacidadPago").innerText = capacidad.toFixed(2);

    // Cálculos de préstamo (se mantienen igual)
    let monto = parseFloat(document.getElementById("txtMonto").value);
    let plazo = parseFloat(document.getElementById("txtPlazo").value);
    let tasa = parseFloat(document.getElementById("txtTasaInteres").value);

    let interes = calcularInteresSimple(monto, tasa, plazo);
    document.getElementById("spnInteresPagar").innerText = interes.toFixed(2);

    let totalPagar = calcularTotalPagar(monto, interes);
    document.getElementById("spnTotalPrestamo").innerText = totalPagar.toFixed(2);

    let cuota = calcularCuotaMensual(totalPagar, plazo);
    document.getElementById("spnCuotaMensual").innerText = cuota.toFixed(2);

    // Aprobación
    let aprobado = aprobarCredito(capacidad, cuota);
    let spnEstado = document.getElementById("spnEstadoCredito");
    if (aprobado) {
        spnEstado.innerText = "APROBADO";
        spnEstado.style.color = "green";
    } else {
        spnEstado.innerText = "RECHAZADO";
        spnEstado.style.color = "red";
    }
}

    // 2. CAPTURA DE DATOS
    let ingresosFloat = parseFloat(document.getElementById("txtIngresos").value) || 0;
    let arriendoFloat = parseFloat(document.getElementById("txtArriendo").value) || 0;
    let alimentacionFloat = parseFloat(document.getElementById("txtAlimentacion").value) || 0;
    let variosFloat = parseFloat(document.getElementById("txtVarios").value) || 0;

    // 3. CÁLCULO DE GASTOS TOTALES (Punto 3 de la Parte 3)
    let totalEgresosFloat = arriendoFloat + alimentacionFloat + variosFloat;
    
    // Mostrar el total de gastos en el nuevo span
    document.getElementById("spnTotalGastos").innerText = totalEgresosFloat.toFixed(2);

    // 4. DISPONIBILIDAD Y CAPACIDAD DE PAGO
    let valorDisponibleFloat = calcularDisponible(ingresosFloat, totalEgresosFloat);
    document.getElementById("spnDisponible").innerText = valorDisponibleFloat.toFixed(2);

    let capacidadPago = calcularCapacidadPago(valorDisponibleFloat);
    document.getElementById("spnCapacidadPago").innerText = capacidadPago.toFixed(2);

    // 5. CÁLCULOS DEL CRÉDITO
    let monto = parseFloat(document.getElementById("txtMonto").value);
    let plazo = parseFloat(document.getElementById("txtPlazo").value);
    let tasa = parseFloat(document.getElementById("txtTasaInteres").value);

    let interes = calcularInteresSimple(monto, tasa, plazo);
    document.getElementById("spnInteresPagar").innerText = interes.toFixed(2);

    let totalPagar = calcularTotalPagar(monto, interes);
    document.getElementById("spnTotalPrestamo").innerText = totalPagar.toFixed(2);

    let cuota = calcularCuotaMensual(totalPagar, plazo);
    document.getElementById("spnCuotaMensual").innerText = cuota.toFixed(2);

    // 6. APROBACIÓN
    let aprobado = aprobarCredito(capacidadPago, cuota);
    let cmpEstado = document.getElementById("spnEstadoCredito");

    if (aprobado) {
        cmpEstado.innerText = "CRÉDITO APROBADO";
        cmpEstado.style.color = "green";
    } else {
        cmpEstado.innerText = "CRÉDITO RECHAZADO";
        cmpEstado.style.color = "red";
    }
}

function reiniciar() {
    // Limpiar todos los inputs incluyendo los nuevos
    document.getElementById("txtIngresos").value = "";
    document.getElementById("txtArriendo").value = "";
    document.getElementById("txtAlimentacion").value = "";
    document.getElementById("txtVarios").value = "";
    document.getElementById("txtMonto").value = "";
    document.getElementById("txtPlazo").value = "";
    document.getElementById("txtTasaInteres").value = "";

    // Limpiar resultados visuales
    document.getElementById("spnTotalGastos").innerText = "0.00";
    document.getElementById("spnDisponible").innerText = "";
    document.getElementById("spnCapacidadPago").innerText = "";
    document.getElementById("spnInteresPagar").innerText = "";
    document.getElementById("spnTotalPrestamo").innerText = "";
    document.getElementById("spnCuotaMensual").innerText = "";
    document.getElementById("spnEstadoCredito").innerText = "ANALIZANDO...";
    document.getElementById("spnEstadoCredito").style.color = "black";

    // Limpiar todos los mensajes de error
    const errores = ["errorIngresos", "errorArriendo", "errorAlimentacion", "errorVarios", "errorMonto", "errorPlazo", "errorTasaInteres"];
    errores.forEach(id => {
        document.getElementById(id).textContent = "";
    });

    // Quitar estilos de error de los inputs
    const inputs = ["txtIngresos", "txtArriendo", "txtAlimentacion", "txtVarios", "txtMonto", "txtPlazo", "txtTasaInteres"];
    inputs.forEach(id => {
        document.getElementById(id).classList.remove("error-input");
    });
}

// Función de validación original mantenida
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