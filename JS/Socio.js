var UrlSocios = "http://52.152.236.67:90/G8_19/controller/socio_negocio.php?op=GetSocios";
var UrlPostSocio = "http://52.152.236.67:90/G8_19/controller/socio_negocio.php?op=InsertSocio";
var UrlPostInsert = "http://52.152.236.67:90/G8_19/controller/socio_negocio.php?op=InsertSocio";
var UrlPutUpdate = "http://52.152.236.67:90/G8_19/controller/socio_negocio.php?op=UpdateSocio";
var UrlDeleteSocio ="http://52.152.236.67:90/G8_19/controller/socio_negocio.php?op=DeleteSocio";

$(document).ready(function(){
    CargarSocios();
});

function CargarSocios(){
    $.ajax({
        url:UrlSocios,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems= reponse;
            var Valores = '';
            console.log(MiItems)
            for( i=0; i < MiItems.length; i++){
                Valores +='<tr>'+
                '<td>'+ MiItems[i].ID +'</td>'+
                '<td>'+ MiItems[i].NOMBRE +'</td>'+
                '<td>'+ MiItems[i].RAZON_SOCIAL +'</td>'+
                '<td>'+ MiItems[i].DIRECCION +'</td>'+
                '<td>'+ MiItems[i].TIPO_SOCIO +'</td>'+
                '<td>'+ MiItems[i].CONTACTO +'</td>'+
                '<td>'+ MiItems[i].EMAIL +'</td>'+
                '<td>'+ MiItems[i].FECHA_CREADO +'</td>'+
                '<td>'+ MiItems[i].TELEFONO +'</td>'+
                '<td>'+ MiItems[i].ESTADO +'</td>'+
                '<td>'+
                '<button class="btn btn-warning" onclick="CargarSocios(' + MiItems[i].ID +')>Editar</button>' +
                '<button class="btn btn-outline-danger" onclick="EliminarSocios(' + MiItems[i].ID +')>Eliminar</button>' +
                '<td>'+
                '</tr>';
                
                $('.Sociosnegocio').html(Valores);
            }
            
        }
    });
     
}

function CargarSocio(){
    var datossocio = {
        ID: idsocio
    };

    var datossociojson = JSON.stringify(datossocio);

    $.ajax({
        Url: UrlGetSocio,
        type:'POST',
        data: datossociojson,
        datatype: 'JSON',
        contenttype:'application/json',
        success: function(reponse){
            var MiItems = reponse;
             $('#NOMBRE').val(MiItems [0].NOMBRE);
             $('#RAZON_SOCIAL').val(MiItems [0].RAZON_SOCIAL);
             $('#DIRECCION').val(MiItems [0].DIRECCION);
             $('#TIPO_SOCIO').val(MiItems [0].TIPO_SOCIO);
             $('#CONTACTO').val(MiItems [0].CONTACTO);
             $('#EMAIL').val(MiItems [0].EMAIL);
             $('#FECHA_CREADO').val(MiItems [0].FECHA_CREADO);
             $('#TELEFONO').val(MiItems [0].TELEFONO);
             $('#ESTADO').val(MiItems [0].ESTADO);
        var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarSocio(' + MiItems[0].ID + 
        'value=" Actualizar Socio" class="btn btn primary"></input';
        $('#btnsocio').html(btnactualizar);
        }
    });
}

function AgregarSocio(){
    var datossocio={
        NOMBRE: $('#NOMBRE').val(),
        RAZON_SOCIAL : $('#RAZON_SOCIAL').val(),
        DIRECCION: $('#DIRECCION').val(),
        TIPO_SOCIO: $('#TIPO_SOCIO').val(),
        CONTACTO: $('#CONTACTO').val(),
        EMAIL: $('#EMAIL').val(),
        FECHA_CREADO: $('#FECHA_CREADO').val(),
        TELEFONO: $('#TELEFONO').val(),
        ESTADO: $('#ESTADO').val()
    };
    var datossociojson = JSON.stringify(datossocio);

    $.ajax({
        Url: UrlPostSocio,
        type:'POST',
        data: datossociojson,
        datatype: 'JSON',
        contenttype:'application/json',
        success: function(reponse){
            console.log(reponse);
        },
        error: function(){
            alert('Error al Crear Socio');
        }
    });
    alert('Socio Agregado Exitosamente')

}

function ActualizarSocio(){
    var datossocio = {
        id: idsocio,
        nombre: $('#NOMBRE').val(),
        razon_social: $('#RAZON_SOCIAL').val(),
        direccion: $('#DIRECCION').val(),
        tipo_socio: $('#TIPO_SOCIO').val(),
        contacto: $('#CONTACTO').val(),
        email: $('#EMAIL').val(),
        fecha_creado: $('#FECHA_CREADO').val(),
        telefono: $('#TELEFONO').val(),
        estado: $('#ESTADO').val()
    };
    var datossociojson = JSON.stringify(datossocio);

    $.ajax({
        Url: UrlPutSocio,
        type:'PUT',
        data: datossociojson,
        datatype: 'JSON',
        contenttype:'application/json',
        success: function(reponse){
            console.log(reponse);
        },
        error: function(){
            alert('Error al Crear Socio');
        }
    });
    alert('Socio Actualizado')

}

function EliminarSocio(idsocio){    
    var datossocio={
        id: idsocio
    };
    var datossociojson = JSON.stringify(datossocio);

    $.ajax({
        url: UrlDeleteSocio,
        type: 'DELETE',
        data: datossociojson,
        datatype:'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
        },
        error: function(textStatus, errorThrown){
            alert('Error al eliminar Socio' + errorThrown + '/'+ textStatus );
        }


    });
    alert("Socio Eliminado");

}
