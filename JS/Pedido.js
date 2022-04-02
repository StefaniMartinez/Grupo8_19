var UrlPedidos = 'http://52.152.236.67:90/G8_19/controller/pedidos_proveedor.php?op=GetPedidos';
var UrlPostPedido = 'http://52.152.236.67:90/G8_19/controller/pedidos_proveedor.php?op=InsertPedido';
var UrlGetPedido = 'http://52.152.236.67:90/G8_19/controller/pedidos_proveedor.php?op=GetPedido';
var UrlPatchPedido = 'http://52.152.236.67:90/G8_19/controller/pedidos_proveedor.php?op=UpdatePedido';
var UrlDeletePedido = 'http://52.152.236.67:90/G8_19/controller/pedidos_proveedor.php?op=DeletePedido';

$(document).ready(function () {
CargarPedidos();
});

function CargarPedidos(){
    $.ajax({
        url: UrlPedidos,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = '';

            for( i = 0; i < MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItems[i].ID +'</td>'+
                '<td>'+ MiItems[i].ID_SOCIO +'</td>'+
                '<td>'+ MiItems[i].FECHA_PEDIDO +'</td>'+
                '<td>'+ MiItems[i].DETALLE +'</td>'+
                '<td>'+ MiItems[i].SUB_TOTAL +'</td>'+
                '<td>'+ MiItems[i].TOTAL_ISV +'</td>'+
                '<td>'+ MiItems[i].TOTAL +'</td>'+
                '<td>'+ MiItems[i].FECHA_ENTREGA +'</td>'+
                '<td>'+ MiItems[i].ESTADO +'</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="CargarPedido(' + MiItems[i].ID + ')">Editar</button>'+
                '<button class="btn btn-outline-danger" onclick="EliminarPedido(' + MiItems[i].ID + ')">Eliminar</button>'+
                '</td>' +
                '</tr>';
            '</tr>';
            $('.Pedidos').html(Valores);
            }
        }
    });
}

function AgregarPedido(){
    var datospedido={
        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_PEDIDO:$('#FECHA_PEDIDO').val(),
        DETALLE:$('#DETALLE').val(),
        SUB_TOTAL:$('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_ENTREGA:$('#FECHA_ENTREGA').val(),
        ESTADO:$('#ESTADO').val()
    };
    var datospedidojson = JSON.stringify(datospedido);
    $.ajax({
        url: UrlPostPedido,
        type: 'POST',
        data: datospedidojson,
        dataType: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
        },
        error: function(){
            alert('Error al Crear Pedido');
        }
    });
    alert('Pedido Agregado');
}

function CargarPedido(idpedido){
    var datospedido = {
        ID: idpedido
    };
    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
        url: UrlGetPedido,
        type: 'POST',
        data: datospedidojson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            var MiItems = reponse;
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            $('#FECHA_PEDIDO').val(MiItems[0].FECHA_PEDIDO);
            $('#DETALLE').val(MiItems[0].DETALLE);
            $('#SUB_TOTAL').val(MiItems[0].SUB_TOTAL);
            $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV);
            $('#TOTAL').val(MiItems[0].TOTAL);
            $('#FECHA_ENTREGA').val(MiItems[0].FECHA_ENTREGA);
            $('#ESTADO').val(MiItems[0].ESTADO);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarPedido(' + MiItems[0].ID + ')"'+
            'value="Actualizar Pedido" class="btn btn-primary"></input>';
            $('.btnPedido').html(btnactualizar);
        }
    });
} 

function ActualizarPedido(idpedido){
    var datospedido = {
        ID: idpedido,
        DETALLE: $('#DETALLE').val(),
        TOTAL: $('#TOTAL').val(),
        ESTADO: $('#ESTADO').val()
    };
    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
        url: UrlPatchPedido,
        type: 'PATCH',
        data: datospedidojson,
        dataType: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
        },
        error: function(){
            alert('Error al Actualizar Pedido');
        }
    });
    alert('Pedido Actualizado');
}

function EliminarPedido(idpedido){
    var datospedido = {
        ID : idpedido
    };
    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
        url: UrlDeletePedido,
        type: 'DELETE',
        data: datospedidojson,
        dataType: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
        },
        error: function(){
            alert('Error al Eliminar Pedido');
        }
    });
    alert('Pedido Eliminado');
}