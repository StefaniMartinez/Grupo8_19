var UrlSocios = "http://52.152.236.67:90/G8_19/controller/socio_negocio.php?op=GetSocios";
var UrlPostSocio = "http://52.152.236.67:90/G8_19/controller/socio_negocio.php?op=InsertSocio";
var UrlGetSocio = "http://52.152.236.67:90/G8_19/controller/socio_negocio.php?op=GetSocio";
var UrlPutUpdate = "http://52.152.236.67:90/G8_19/controller/socio_negocio.php?op=UpdateSocio";
var UrlDeleteSocio = "http://52.152.236.67:90/G8_19/controller/socio_negocio.php?op=DeleteSocio";

$(document).ready(function(){
    CargarSocios();
});
function CargarSocios(){
    $.ajax({
        url: UrlSocios,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems= reponse;
            var Valores = '';
            MiItems.forEach(element => {
                Valores += `<tr>
                <td>${element.ID}</td>
                <td>${element.NOMBRE}</td>
                <td>${element.RAZON_SOCIAL}</td>
                <td>${element.DIRECCION}</td>
                <td>${element.TIPO_SOCIO}</td>
                <td>${element.CONTACTO}</td>
                <td>${element.EMAIL}</td>
                <td>${element.FECHA_CREADO}</td>
                <td>${element.TELEFONO}</td>
                <td>${element.ESTADO}</td>
                <td>
                <button class="btn btn-secondary" onclick="CargarSocio(${element.ID})">Editar</button>  
                </td>
                <td>
                <button class="btn btn-warning" onclick="EliminarSocio(${element.ID})">Eliminar</button>
                </td>
                </tr>`
                $('.Sociosnegocio').html(Valores);
            });
        },
        error:function(textStatus,errorThrown){
            alert('Error al crear socio'+ errorThrown);
        }
    });  
}

function CargarSocio(idSocio){
    var datossocio = {
        ID: idSocio
    };
    
    var datossociojson = JSON.stringify(datossocio);
    $.ajax({
        url: UrlGetSocio,
        type:'POST',
        data: datossociojson,
        datatype: 'JSON',
        contenttype:'application/json',
        success: function(reponse){
            var MiItems = reponse;
             $('#NOMBRE').val(MiItems[0].NOMBRE);
             $('#RAZON_SOCIAL').val(MiItems[0].RAZON_SOCIAL);
             $('#DIRECCION').val(MiItems[0].DIRECCION);
             $('#TIPO_SOCIO').val(MiItems[0].TIPO_SOCIO);
             $('#CONTACTO').val(MiItems[0].CONTACTO);
             $('#EMAIL').val(MiItems[0].EMAIL);
             $('#FECHA_CREADO').val(MiItems[0].FECHA_CREADO);
             $('#TELEFONO').val(MiItems[0].TELEFONO);
             $('#ESTADO').val(MiItems[0].ESTADO);
        var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarSocio(' + MiItems[0].ID + 
        ')" value="Actualizar Socio" class="btn btn-primary"></input';
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
        url: UrlPostSocio,
        type: 'POST',
        data: datossociojson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(response){
            
            console.log(response)
        },
        error: function(){
            alert('Error al insertar un nuevo socio')
        }
    });
    alert('Socio Agregado')
}

function ActualizarSocio(idSocio){
    var datossocio={
        id: idSocio,
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
        url: UrlPutUpdate,
        type: 'PUT',
        data: datossociojson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(response){
           alert(response)
            console.log(response);
            CargarSocios()
        },
        error:function(){
            alert('Error al Actualizar Socio')
        }
    }); 
    alert('Socio Actualizado') 
}

function EliminarSocio(idSocio){ 
    var datossocio={
        id: idSocio
    };
    
    var datossociojson = JSON.stringify(datossocio);
    $.ajax({
        url: UrlDeleteSocio,
        type: 'DELETE',
        data: datossociojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(reponse){
            CargarSocios()
            console.log(reponse);
        }
    });
    alert('Socio Eliminado');
}
