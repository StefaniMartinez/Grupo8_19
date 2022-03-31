var UrlMateriales = 'http://localhost:90/G8_19/controller/Materiales.php?op=GetMateriales';

$(document).ready(function(){
     CargarMateriales();
});

function CargarMateriales(){
    $.ajax({
        url: UrlMateriales,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores='';

            for( i = 0; i < MiItems.length; i++){
                Valores +='<tr>' +
                    '<td>'+ MiItems[i].ID +'</td>' +
                    '<td>'+ MiItems[i].DESCRIPCION + '</td>' +
                    '<td>'+ MiItems[i].UNIDAD + '</td>' +
                    '<td>'+ MiItems[i].COSTO + '</td>' +
                    '<td>'+ MiItems[i].PRECIO + '</td>' +
                    '<td>'+ MiItems[i].APLICA_ISV + '</td>' +
                    '<td>'+ MiItems[i].PORCENTAJE_ISV + '</td>' +
                    '<td>'+ MiItems[i].ID_SOCIO + '</td>' +
                '</tr>';
                $('.Materiales').html(Valores);
            }
        }
   });
}