function JSONDateconverter(fecha, withtime, getjsdate, real) {
    var strdate = fecha.substr(6, fecha.length - 8);
    var myDate = "";
    if (real == true)
        myDate = NDateR(parseInt(strdate));
    else
        myDate = NDate(parseInt(strdate), withtime);
    if (getjsdate)
        return myDate;

    if (withtime)
        return formatDateWithTime(myDate);
    else
        return formatDate(myDate);
}
function esconde_elemento(x) {
    var elemento = document.getElementById(x);
    elemento.style.display = 'none';
}

function visible_elemento(x) {
    var elemento = document.getElementById(x);
    elemento.style.display = 'block';
}
function formatDate(date) {
    var monthNames = [
        "01", "02", "03",
        "04", "05", "06", "07",
        "08", "09", "10",
        "11", "12"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return year + "-" + monthNames[monthIndex] + "-" + (day > 9 ? day : "0" + day);
}

function formatDateWithTime(date) {
    var monthNames = [
        "01", "02", "03",
        "04", "05", "06", "07",
        "08", "09", "10",
        "11", "12"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var hours = date.getHours();
    var min = date.getMinutes();
    return year + "-" + monthNames[monthIndex] + "-" + (day > 9 ? day : "0" + day) + " " + hours + ":" + min;
}

function NDate(cadena, withtime) {
    var d = new Date();
    if (cadena != undefined)
        d = new Date(cadena);
    if (withtime == false || withtime == undefined || withtime == "")
        d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
    return d;
}
function formatDate(date) {
    var monthNames = [
        "01", "02", "03",
        "04", "05", "06", "07",
        "08", "09", "10",
        "11", "12"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return year + "-" + monthNames[monthIndex] + "-" + (day > 9 ? day : "0" + day);
}


function NDateR(cadena) {
    var d = new Date();
    if (cadena != undefined)
        d = new Date(cadena);
    return d;
}
function Validador(idform, rules, mensajes) {
    if (mensajes == undefined)
        mensajes = []
    var validator = $("#" + idform).validate({
        lang: "ES",
        ignore: 'input[type=hidden], .select2-search__field', // ignore hidden fields
        errorElement: 'span',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        },
        rules: rules,
        messages: mensajes
    });
    return validator;
}

function soloNumeros(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    //Tecla de retroceso para borrar, siempre la permite
    if (tecla == 8) {
        return true;
    }
    // Patron de entrada, en este caso solo acepta numeros
    patron = /[0-9]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}

function SwalErrorMsj(data) {
    swal({
        title: "¡Atencion!",
        text: data,
        //confirmButtonColor: "#ab2328",
        type: "error",
        closeOnConfirm: true,
    });
}


function SwalErrorMsj(data, IrUrl) {
    swal({
        title: "¡Atencion!",
        text: data,
        //confirmButtonColor: "#ab2328",
        type: "error",
        closeOnConfirm: true,
    },
        function (isConfirm) {
            if (isConfirm) {
                window.location.href = IrUrl;
            }
        });
}

function RenderTable(id, ncol, anchoColum, parametros, orden) {

    $.extend($.fn.dataTable.defaults, {
        columnDefs: [{
            targets: ncol,
            orderable: false
        }],
        "columns": anchoColum,
        autoWidth: false,
        "ordering": false,
        order: orden,
        //dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
        language: {
            search: 'Buscar: _INPUT_',
            lengthMenu: 'Mostrar: _MENU_ ',
            paginate: {
                first: 'Primero',
                last: 'Último',
                next: '&rarr;',
                previous: '&larr;'
            },

            zeroRecords: "No se encontraron resultados",
            emptyTable: "Ningún dato disponible en esta tabla",
            info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            infoEmpty: "Ningún dato disponible",
            infoFiltered: "(filtrado de un total de _MAX_ registros)",
            infoPostFix: "",
            infoThousands: ",",
            loadingRecords: "Cargando...",
            aria: {
                sortAscending: ": Activar para ordenar la columna de manera ascendente",
                sortDescending: ": Activar para ordenar la columna de manera descendente"
            }
        }
    });

    if (parametros != null && parametros != undefined) {
        $('#' + id).DataTable(parametros);
    } else {
        // Basic datatable
        $('#' + id).DataTable();
    }

    //// Alternative pagination
    //$('.datatable-pagination').DataTable({
    //    pagingType: "simple",
    //    language: {
    //        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
    //    }
    //});


    // Datatable with saving state
    $('.datatable-save-state').DataTable({
        stateSave: true
    });


    // Scrollable datatable
    $('.datatable-scroll-y').DataTable({
        autoWidth: true,
        scrollY: 300
    });

    // External table additions
    // ------------------------------

    // Add placeholder to the datatable filter option
    $('.dataTables_filter input[type=search]').attr('placeholder', 'Búsqueda...');


    // Enable Select2 select for the length option
    $('.dataTables_length select').select2({
        minimumResultsForSearch: Infinity,
        width: 'auto'
    });

}