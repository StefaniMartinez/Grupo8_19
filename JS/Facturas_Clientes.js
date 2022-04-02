var urlfacturas = 'http://52.152.236.67:90/G8_19/controller/facturas_cliente.php?op=GetFacturas';
var UlrPostFacturas ='http://52.152.236.67:90/G8_19/controller/facturas_cliente.php?op=InsertFactura';
var UrlGetfactura = 'http://52.152.236.67:90/G8_19/controller/facturas_cliente.php?op=GetFactura';
var UrlPutfactura = 'http://52.152.236.67:90/G8_19/controller/facturas_cliente.php?op=UpdateFactura';
var UrlDeletefactura = 'http://52.152.236.67:90/G8_19/controller/facturas_cliente.php?op=DeleteFactura';
$(document).ready(function(){
Cargarfacturas();
});

function Cargarfacturas(){
$.ajax({
    url: urlfacturas,
    type: 'GET',
    datatype: 'JSON',
    success: function(response){
        var MiItems= response;
        var valores='';
        for(i=0; i<MiItems.length; i++){
            valores += '<tr>'+
            '<td>'+MiItems[i].ID+'</td>'+
            '<td>'+MiItems[i].NUMERO_FACTURA+'</td>'+
            '<td>'+MiItems[i].ID_SOCIO+'</td>'+
            '<td>'+MiItems[i].FECHA_FACTURA+'</td>'+
            '<td>'+MiItems[i].DETALLE+'</td>'+
            '<td>'+MiItems[i].SUB_TOTAL+'</td>'+
            '<td>'+MiItems[i].TOTAL_ISV+'</td>'+
            '<td>'+MiItems[i].TOTAL+'</td>'+
            '<td>'+MiItems[i].FECHA_VENCIMIENTO+'</td>'+
            '<td>'+MiItems[i].ESTADO+'</td>'+
            '<td>' + '<button class="btn btn-secondary" onclick="Cargarfactura('+ MiItems[i].ID +')">Editar</button>' +
            '</td>' +
            '<td>' +
            '<button class="btn btn-danger" onclick="Eliminarfactura('+ MiItems[i].ID +')">Eliminar</button>' +
            '</td>' +
            '</tr>';
        $('.Facturas').html(valores);
        }
    
    }
});

}
function Agregarfactura(){
    var datosfactura={
        NUMERO_FACTURA :$('#NUMERO_FACTURA').val(),
        ID_SOCIO :$('#ID_SOCIO').val(),
        FECHA_FACTURA :$('#FECHA_FACTURA').val(),
        DETALLE :$('#DETALLE').val(),
        SUB_TOTAL :$('#SUB_TOTAL').val(),
        TOTAL_ISV :$('#TOTAL_ISV').val(),
        TOTAL :$('#TOTAL').val(),
        FECHA_VENCIMIENTO :$('#FECHA_VENCIMIENTO').val(),
        ESTADO :$('#ESTADO').val()
    };
    var datosfacturajson = JSON.stringify(datosfactura);
    $.ajax({
        url: UlrPostFacturas,
        type: 'POST',
        data : datosfacturajson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(response){
            console.log(response);
        },
       error: function(){
           alert('Error al crear factura')
      }
    });
    alert('Factura Agregada');
}
function Cargarfactura(idfactura){
    var datosfactura = {
        ID: idfactura
    };

    var datosfacturajson = JSON.stringify(datosfactura);

    $.ajax({
        url: UrlGetfactura,
        type:'POST',
        data: datosfacturajson,
        datatype: 'JSON',
        contenttype:'application/json',
        success: function(reponse){
            var MiItems = reponse;
             $('#NUMERO_FACTURA').val(MiItems[0].NUMERO_FACTURA);
             $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
             $('#FECHA_FACTURA').val(MiItems[0].FECHA_FACTURA);
             $('#DETALLE').val(MiItems[0].DETALLE);
             $('#SUB_TOTAL').val(MiItems[0].SUB_TOTAL);
             $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV);
             $('#TOTAL').val(MiItems[0].TOTAL);
             $('#FECHA_VENCIMIENTO').val(MiItems[0].FECHA_VENCIMIENTO);
             $('#ESTADO').val(MiItems[0].ESTADO);
        var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarFactura(' + MiItems[0].ID + ')"'+ 
        'value="Actualizar Factura" class="btn btn-primary"></input';
        
        $('.btnFactura').html(btnactualizar);
        }
    });
}
function ActualizarFactura(idfactura){
    
    var datosfactura={
        ID: idfactura,
        NUMERO_FACTURA :$('#NUMERO_FACTURA').val(),
        ID_SOCIO :$('#ID_SOCIO').val(),
        FECHA_FACTURA :$('#FECHA_FACTURA').val(),
        DETALLE :$('#DETALLE').val(),
        SUB_TOTAL :$('#SUB_TOTAL').val(),
        TOTAL_ISV :$('#TOTAL_ISV').val(),
        TOTAL :$('#TOTAL').val(),
        FECHA_VENCIMIENTO :$('#FECHA_VENCIMIENTO').val(),
        ESTADO :$('#ESTADO').val()
    };
    var datosfacturajson = JSON.stringify(datosfactura);
    $.ajax({
        url: UrlPutfactura,
        type: 'PUT',
        data : datosfacturajson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(response){
            console.log(response)
        },
        error: function(){
            alert('Error al actualizar factura')
        }
    });
    alert('Factura Actualizada');

}
function Eliminarfactura(idfactura){    
    var datosfactura={
        ID: idfactura,
    };
    var datosfacturajson = JSON.stringify(datosfactura);

    $.ajax({
        url: UrlDeletefactura,
        type: 'DELETE',
        data: datosfacturajson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(response){
            console.log(response)
        },

    });
    alert('Factura Eliminada');
    Cargarfacturas();
}

