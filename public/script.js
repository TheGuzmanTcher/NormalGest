let currentWeeks = 4; // Número inicial de semanas
let totalSemanal = 0;
let totalGeneral = 0;
let totalSemanas = [0, 0, 0, 0, 0]; // Total para cada semana

function updateTotals() {
    const checkboxes = document.querySelectorAll('.checkbox');
    totalSemanal = 0;
    totalGeneral = 0;
    totalSemanas = [0, 0, 0, 0, 0]; // Reiniciar totales de semanas

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            totalSemanal += 10; // cada checkbox vale 10 pesos
            const semanaIndex = parseInt(checkbox.closest('td').cellIndex) - 2; // Obtener el índice de la semana
            totalSemanas[semanaIndex] += 10;
        }
    });

    document.querySelector('#totalSemanal').innerText = totalSemanal;

    // Actualiza el total de cada alumno
    const rows = document.querySelectorAll('#cobrosTable tbody tr');
    rows.forEach(row => {
        const checkboxes = row.querySelectorAll('.checkbox');
        let totalAlumno = 0;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                totalAlumno += 10;
            }
        });
        row.querySelector('.total').innerText = totalAlumno;
        totalGeneral += totalAlumno;
    });

    // Actualiza los totales de cada semana
    for (let i = 0; i < totalSemanas.length; i++) {
        document.querySelector(`#totalSemana${i + 1}`).innerText = totalSemanas[i];
    }

    // Actualiza el total general
    document.querySelector('#totalGeneral').innerText = totalGeneral;
}

function addWeek() {
    if (currentWeeks < 5) {
        currentWeeks++;
        addRemoveWeekColumn('add');
    }
}

function removeWeek() {
    if (currentWeeks > 4) {
        currentWeeks--;
        addRemoveWeekColumn('remove');
    }
}

function addRemoveWeekColumn(action) {
    const table = document.getElementById('cobrosTable');
    const headerRow = table.querySelector('thead tr');

    if (action === 'add') {
        const th = document.createElement('th');
        th.innerText = `Semana ${currentWeeks}`;
        headerRow.insertBefore(th, headerRow.querySelector('.total-header'));

        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const newCell = document.createElement('td');
            newCell.innerHTML = '<input type="checkbox" class="checkbox" onchange="updateTotals()">';
            row.insertBefore(newCell, row.querySelector('.total'));
        });
    } else if (action === 'remove') {
        headerRow.removeChild(headerRow.children[headerRow.children.length - 2]); // Remueve la penúltima columna (Semana 5)

        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            row.removeChild(row.children[row.children.length - 2]); // Remueve la penúltima celda de cada fila
        });
    }
}

// Función para agregar un nuevo alumno a la tabla
function addAlumno() {
    const alumnoNombre = document.getElementById('alumnoNombre').value;
    if (alumnoNombre) {
        const tableBody = document.getElementById('tableBody');
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td><button class="btn btn-delete" onclick="deleteRow(this)">Eliminar</button></td>
            <td>${alumnoNombre}</td>
            <td><input type="checkbox" class="checkbox" onchange="updateTotals()"></td>
            <td><input type="checkbox" class="checkbox" onchange="updateTotals()"></td>
            <td><input type="checkbox" class="checkbox" onchange="updateTotals()"></td>
            <td><input type="checkbox" class="checkbox" onchange="updateTotals()"></td>
            <td><input type="checkbox" class="checkbox" onchange="updateTotals()"></td>
            <td class="total">0</td>
        `;

        tableBody.appendChild(newRow);
        document.getElementById('alumnoNombre').value = ''; // Limpiar el campo de entrada
    } else {
        alert("Por favor ingresa un nombre de alumno.");
    }
}

// Función para eliminar una fila
function deleteRow(button) {
    const row = button.closest('tr');
    row.remove();
    updateTotals(); // Actualizar el total después de eliminar una fila
}

// Obtener la fecha actual
function getCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0!
    const yyyy = today.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
}

function exportToPDF() {
    // Obtener los datos del administrador y otros campos
    const adminNombre = document.getElementById('adminNombre').value || "No proporcionado";
    const grado = document.getElementById('grado').value || "No proporcionado";
    const grupo = document.getElementById('grupo').value || "No proporcionado";
    const licenciatura = document.getElementById('licenciatura').value || "No proporcionado";
    const mes = document.getElementById('mes').value || "No proporcionado"; // Obtener el mes
    const fechaActual = getCurrentDate();

    // Crear un nuevo documento PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Agregar encabezado
    doc.setFontSize(12);
    const headerText1 = "Secretaria de Educación Pública";
    const headerText2 = "Subsecretaria de Educacion Media y Superior";
    const headerText3 = "Escuela Normal Urbana de Balancán";

    const pageWidth = doc.internal.pageSize.getWidth(); // Obtener el ancho de la página

    // Calcular la posición X para centrar el encabezado
    const headerX1 = (pageWidth - doc.getStringUnitWidth(headerText1) * doc.internal.getFontSize() / doc.internal.scaleFactor) / 2;
    const headerX2 = (pageWidth - doc.getStringUnitWidth(headerText2) * doc.internal.getFontSize() / doc.internal.scaleFactor) / 2;
    const headerX3 = (pageWidth - doc.getStringUnitWidth(headerText3) * doc.internal.getFontSize() / doc.internal.scaleFactor) / 2;

    doc.text(headerText1, headerX1, 10);
    doc.text(headerText2, headerX2, 16);
    doc.text(headerText3, headerX3, 22);

    // Agregar información adicional
    doc.setFontSize(10);
    doc.text(`Fecha: ${fechaActual}`, 10, 32);
    doc.text(`Grado: ${grado}`, 10, 38);
    doc.text(`Grupo: ${grupo}`, 10, 44);
    doc.text(`Licenciatura: ${licenciatura}`, 10, 50);
    doc.text(`Mes: ${mes}`, 10, 56); // Agregar el mes

    // Obtener la tabla de cobros
    const table = document.getElementById('cobrosTable');
    const rows = table.querySelectorAll('tbody tr');

    // Crear la tabla manualmente
    let headers = ["Nombre del Alumno", "Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 5", "Total Recaudado"];
    let data = [];

    // Comprobar si es un dispositivo móvil
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    if (isMobile) {
        headers = ["Nombre del Alumno", "Semana 1", "Total Recaudado"];
    }

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowData = [];

        cells.forEach((cell, index) => {
            if (index === 0) return; // Ignorar la primera celda (botón de eliminar)
            if (index === 1) {
                rowData.push(cell.innerText); // Nombre del alumno
            } else {
                const checkbox = cell.querySelector('input[type="checkbox"]');
                if (checkbox) {
                    if (checkbox.checked) {
                        rowData.push("Pagado");
                    } else {
                        rowData.push("No pagado");
                    }
                } else {
                    rowData.push(cell.innerText); // Total recaudado
                }
            }
        });

        if (isMobile) {
            rowData.splice(2, 4); // Eliminar las semanas 2, 3, 4 y 5
        }

        data.push(rowData);
    });

    // Agregar la tabla al PDF
    doc.autoTable({
        head: [headers],
        body: data,
        startY: 66,
        theme: 'grid',
        styles: {
            cellPadding: 3,
            fontSize: 9, // Ajustar el tamaño del texto
            valign: 'middle',
            halign: 'center' // Alinear el texto al centro
        },
        headStyles: {
            fillColor: [0, 150, 136], // Color del encabezado
            textColor: 255
        },
        bodyStyles: {
            textColor: 0
        },
        didParseCell: function (data) {
            const cell = data.cell; // Obtener la celda actual
            const cellText = cell.text[0];

            if (cellText === "Pagado") {
                cell.styles.fillColor = [76, 175, 80]; // Verde
            } else if (cellText === "No pagado") {
                cell.styles.fillColor = [244, 67, 54]; // Rojo
            }
        },
    });

    // Agregar la línea para la firma centrada
    const signatureLineY = doc.autoTable.previous.finalY + 10; // Ajustar la posición
    const signatureLine = "__________________________________";
    const signatureX = (pageWidth - doc.getStringUnitWidth(signatureLine) * doc.internal.getFontSize() / doc.internal.scaleFactor) / 2; // Centrar la línea
    doc.text(signatureLine, signatureX, signatureLineY);

    // Agregar el nombre del administrador debajo de la línea de firma
    const adminNameX = (pageWidth - doc.getStringUnitWidth(`${adminNombre}`) * doc.internal.getFontSize() / doc.internal.scaleFactor) / 2;
    doc.text(`${adminNombre}`, adminNameX, signatureLineY + 10);

    // Agregar la fila de total general al PDF
    const totalGeneral = document.getElementById('totalGeneral').innerText;
    doc.text(`Total Recaudado: ${totalGeneral}`, 10, signatureLineY + 30); // Ajustar la posición

    // Guardar el PDF
    doc.save(`Reporte_Cobros_${fechaActual}.pdf`);
}


document.addEventListener("DOMContentLoaded", function() {
    const toggleBtn = document.querySelector(".toggle-btn");
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.querySelector(".main-content");

    toggleBtn.addEventListener("click", function() {
        sidebar.classList.toggle("hidden"); // Alternar la clase 'hidden'
        mainContent.classList.toggle("expanded"); // Alternar el margen del contenido principal
    });
});
