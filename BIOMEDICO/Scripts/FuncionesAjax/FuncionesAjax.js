function Save_Data(callbacksussces, Url, ObjetoGuardar, TituloMensaje, Recargar, callbackerror) {
    var formURL = SetUrlForQueryLocal(Url);
    $.ajax(
        {
            url: formURL,
            type: "POST",
            dataType: "json",
            data: JSON.stringify(ObjetoGuardar),
            contentType: "application/json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Error) {
                    swal({
                        title: TituloMensaje,
                        text: data.mensaje,
                        type: "success",
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "Ok",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                        function (isConfirm) {
                            if (isConfirm) {
                                swal.close()
                                callbacksussces(data)
                            }
                            else {
                                swal.close()
                            }
                        });
                    
                    
                }
                else {
                    //SwalErrorMsj(data.mensaje);
                    swal({
                        title: "¡Atencion!",
                        text: data.mensaje,
                        //confirmButtonColor: "#ab2328",
                        type: "error",
                        closeOnConfirm: true,
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });


}

function Update_Data(callbacksussces, Url, ObjetoGuardar, TituloMensaje, Recargar, callbackerror) {
    var formURL = SetUrlForQueryLocal(Url);
    $.ajax(
        {
            url: formURL,
            type: "POST",
            dataType: "json",
            data: JSON.stringify(ObjetoGuardar),
            contentType: "application/json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Error) {
                    swal({
                        title: TituloMensaje,
                        text: data.mensaje,
                        type: "success",
                        closeOnConfirm: true,
                    });
                    callbacksussces(data)
                }
                else {
                    //SwalErrorMsj(data.mensaje);
                    swal({
                        title: "¡Atencion!",
                        text: data.mensaje,
                        //confirmButtonColor: "#ab2328",
                        type: "error",
                        closeOnConfirm: true,
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });


}

function Get_DataGet(callbacksussces, Url, ParametroString, IsCargandoOn, callbackerror) {
    var form_data = new FormData();
    //var Obj = { UserName: DataUser.UserName, Password: DataUser.Password, Telefono: ParametroString, IdUser: DataUser.IdUser };
    var formURL = SetUrlForQueryLocal(Url + "?Parametro=" + ParametroString);
    $.ajax( //con json
        {
            url: formURL,
            type: "GET",
            dataType: "json",
            //data: JSON.stringify(Obj),
            contentType: "application/json",
            processData: false,
            success: function (data, textStatus, jqXHR) {
                if (!data.Error) {
                    callbacksussces(data)
                } else {
                    //if (IsCargandoOn)
                    //    CloseLoading();
                    SwalErrorMsj(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
}

function Get_Data(callbacksussces, Url) {
    var form_data = new FormData();
    //var Obj = { UserName: DataUser.UserName, Password: DataUser.Password, Telefono: ParametroString, IdUser: DataUser.IdUser };
    var formURL = SetUrlForQueryLocal(Url );
    $.ajax( //con json
        {
            url: formURL,
            type: "GET",
            dataType: "json",
            //data: JSON.stringify(Obj),
            contentType: "application/json",
            processData: false,            
            success: function (data, textStatus, jqXHR) {
                if (!data.Error) {
                    callbacksussces(data)
                } else {
                    //if (IsCargandoOn)
                    //    CloseLoading();
                    SwalErrorMsj(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
}


function SetUrlForQueryLocal(stringrelativeserver) {

    return window.location.origin + stringrelativeserver;

//    return window.location.origin + "/CentroBiomedico" + stringrelativeserver;
}

function GetDataOpcion(callbacksussces, Url, Parametro, ParametroString, IsCargandoOn, callbackerror) {
    var form_data = new FormData();
    var formURL = SetUrlForQueryLocal(Url + "?" + Parametro + "=" + ParametroString);
    $.ajax( //con json
        {
            url: formURL,
            type: "GET",
            dataType: "json",
            contentType: "application/json",
            processData: false,
            success: function (data, textStatus, jqXHR) {
                if (!data.Error) {
                    callbacksussces(data)
                } else {
                    //if (IsCargandoOn)
                    //    CloseLoading();
                    SwalErrorMsj(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
}



function Del_DataPost(callbacksussces, Url, Parametro, ParametroString,) {
    swal({
        title: "Atención",
        text: "¿Estas seguro de eliminar este registro?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: false,
        closeOnCancel: false
    },
        function (isConfirm) {
            if (isConfirm) {
                var formURL = SetUrlForQueryLocal(Url + "?" + Parametro + "=" + ParametroString);
                var Obj = {};
                var formURL = SetUrlForQueryLocal(Url);
                $.ajax( //con json
                    {
                        url: formURL,
                        type: "POST",
                        dataType: "json",
                        data: JSON.stringify(Obj),
                        contentType: "application/json",
                        processData: false,
                        success: function (data, textStatus, jqXHR) {
                            swal.close()
                            if (!data.error) {
                                callbacksussces(data)
                            } else {
                                SwalErrorMsj(data);
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log(errorThrown);
                        }
                    });
            }
            else {
                swal.close()
            }
        });
}