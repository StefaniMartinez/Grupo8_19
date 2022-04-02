var UrlMateriales = "http://52.152.236.67:90/G8_19/controller/Materiales.php?op=GetMateriales";
var UrlPostMaterial = "http://52.152.236.67:90/G8_19/controller/Materiales.php?op=InsertMaterial";
var UrlGetMaterial = "http://52.152.236.67:90/G8_19/controller/Materiales.php?op=GetMaterial";
var UrlPutUpdate = "http://52.152.236.67:90/G8_19/controller/Materiales.php?op=UpdateMaterial";
var UrlDeleteMaterial = "http://52.152.236.67:90/G8_19/controller/Materiales.php?op=DeleteMaterial";

$(document).ready(function () {
CargarMateriales();
});

function CargarMateriales(){
    $.ajax({
        url: UrlMateriales,
        type: 'GET',
        datatype: 'JSON',
        success: function (response){
            var MiItems = response;
            var Valores = '';

            for (i = 0; i < MiItems.length; i++){
                Valores += '<tr>' +
                    '<td>' + MiItems[i].ID + '</td>' +
                    '<td>' + MiItems[i].DESCRIPCION + '</td>' +
                    '<td>' + MiItems[i].UNIDAD + '</td>' +
                    '<td>' + MiItems[i].COSTO + '</td>' +
                    '<td>' + MiItems[i].PRECIO + '</td>' +
                    '<td>' + MiItems[i].APLICA_ISV + '</td>' +
                    '<td>' + MiItems[i].PORCENTAJE_ISV + '</td>' +
                    '<td>' + MiItems[i].ESTADO + '</td>' +
                    '<td>' + MiItems[i].ID_SOCIO + '</td>' +
                    '<td>' +
                    '<button class="btn btn-secondary" onclick="CargarMaterial(' + MiItems[i].ID + ')">Editar</button>'+
                    '<button class="btn btn-outline-danger" onclick="EliminarMaterial(' + MiItems[i].ID + ')">Eliminar</button>' +
                    '</td>' +
                    '</tr>';

                $('.Materiales').html(Valores);
            }
        }
    });
}

function CargarMaterial(idmaterial){
    var datosmaterial = {
        ID:idmaterial
    };

    var datosmaterialjson = JSON.stringify(datosmaterial);
   
    $.ajax({
        url: UrlGetMaterial,
        type: 'POST',
        data: datosmaterialjson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function (response){
            var MiItems = response;
            $('#DESCRIPCION').val(MiItems[0].DESCRIPCION);
            $('#UNIDAD').val(MiItems[0].UNIDAD);
            $('#COSTO').val(MiItems[0].COSTO);
            $('#PRECIO').val(MiItems[0].PRECIO);
            $('#APLICA_ISV').val(MiItems[0].APLICA_ISV);
            $('#PORCENTAJE_ISV').val(MiItems[0].PORCENTAJE_ISV);
            $('#ESTADO').val(MiItems[0].ESTADO);
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarMaterial(' + MiItems[0].ID + ')" value="Actualizar Material" class="btn btn-primary"></input';

            $('#btnmaterial').html(btnactualizar);
        }
    });
}

function AgregarMaterial(){
    var datosmaterial ={

        
        DESCRIPCION: $('#DESCRIPCION').val(),
        UNIDAD: $('#UNIDAD').val(),
        COSTO: $('#COSTO').val(),
        PRECIO: $('#PRECIO').val(),
        APLICA_ISV: $('#APLICA_ISV').val(),
        PORCENTAJE_ISV: $('#PORCENTAJE_ISV').val(),
        ESTADO: $('#ESTADO').val(),
        ID_SOCIO: $('#ID_SOCIO').val(),

    };
    var datosmaterialjson = JSON.stringify(datosmaterial);
    $.ajax({
        url: UrlPostMaterial,
        type: 'POST',
        data: datosmaterialjson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function (response){
            console.log(response)
        },
        error: function(){
            alert('Error al crear un nuevo material')
        }
    });
    alert('Material Agregado');
}

function ActualizarMaterial(id){

    var datosmaterial = {
        id: id,
        descripcion: $('#DESCRIPCION').val(),
        unidad: $('#UNIDAD').val(),
        costo: $('#COSTO').val(),
        precio: $('#PRECIO').val(),
        aplica_isv: $('#APLICA_ISV').val(),
        porcentaje_isv: $('#PORCENTAJE_ISV').val(),
        estado: $('#ESTADO').val(),
        id_socio: $('#ID_SOCIO').val(),

    };

    var datosmaterialjson = JSON.stringify(datosmaterial);

    $.ajax({
        url: UrlPutUpdate,
        type: 'PUT',
        data: datosmaterialjson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function (response) {
            console.log(response);
            
        },
        error: function () {
            alert('Error al Actualizar Material');
        }
    });
    alert('Material Actualizado');
}

function EliminarMaterial(idmaterial) {
    var datosmaterial = {
        id: idmaterial
    };

    var datosmaterialjson = JSON.stringify(datosmaterial);

    $.ajax({
        url: UrlDeleteMaterial,
        type: 'DELETE',
        data: datosmaterialjson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function (response) {
            console.log(response)

        },
        error: function () {
            alert('Error al tratar de eliminar')
        }
    });
    alert('Material Eliminado')


}
