var $aniodesde = 0;

$(document).ready(function(){

    $('#datetimepicker12').datepicker({
        inline: true,
        sideBySide: true
    });

    var itemDia = "";
    var itemMeses = "";
    var itemAnio = "";
    var itemLugar = "";
    var fecha = new Date();
	var anio = fecha.getFullYear();

    var count = 1;
    var aniohasta = anio - 18
    var aniodesde = anio - 65

    $aniodesde = aniodesde;

    $("#cbdia").html("");
    $("#cbmeses").html("");
    $("#cbanio").html("");
    $("#cblugar").html("");

    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio","Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",];
    const lugar = ["Independencia", "San Miguel", "Lince", "Miraflores","San Borja", "La Molina","Surco","Villa El Salvador"];

    for (let index = 1; index <= 31; index++) {
        itemDia += "<option value="+index+">"+index+"</option>";
        $("#cbdia").html(itemDia);
    }

    meses.forEach(mes => {
        itemMeses += "<option value="+count+">"+mes+"</option>";
        $("#cbmeses").html(itemMeses);
        count++;
    });

    for (let index = aniodesde; index <= aniohasta; index++) {
        itemAnio += "<option value="+index+">"+index+"</option>";
        $("#cbanio").html(itemAnio);
    }

    lugar.forEach(lugares => {
        itemLugar += "<option value='"+lugares+"'>"+lugares+"</option>";
        $("#cblugar").html(itemLugar);
    });

});

$(document).on('click','#btnAlerta', function(){
    /*Validar*/
    var $validate = true;

    $('.nombrecompleto, documento, celular, correo').hide();

    if($("#nombrecompleto").val()=="" || $("#nombrecompleto").val()==null){
        $validate = false;
        $('.nombrecompleto').show();
    }
    if($("#documento").val()=="" || $("#documento").val()==null){
        $validate = false;
        $('.documento').show();
    }
    if($("#celular").val()=="" || $("#celular").val()==null){
        $validate = false;
        $('.celular').show();
    }
    if($("#correo").val()=="" || $("#correo").val()==null){
        $validate = false;
        $('.correo').show();
    }


    if( $validate){

        /*Fecha Nacimiento */
    var $month = $("#cbmeses").val();
    var $day = $("#cbdia").val();

    $month = ($month < 10)?  ('0' + $month) : $month;
    $day = ($day < 10)?  ('0' + $day) : $day;
    var fecha = $("#cbanio").val() +"-"+ $month +"-"+$day;

    /*Fecha de la cita*/
    var $fechacita =  $('div#datetimepicker12').datepicker('getDate');
    if($fechacita!=null && $fechacita!='' && $fechacita!=undefined){

        var $yearcita = $fechacita.getFullYear();
        var $monthcita = $fechacita.getMonth() + 1;
        var $daycita = $fechacita.getDate();

        $monthcita = ($monthcita < 10)?  ('0' + $monthcita) : $monthcita;
        $daycita  = ($daycita < 10)?  ('0' + $daycita) : $daycita;
        $fechacita = $yearcita +"-"+ $monthcita +"-"+$daycita;
    }

    const objct ={
        vNombreCompleto: $("#nombrecompleto").val(),
        vDocumento: $("#documento").val(),
        dFechaNac: fecha,       
        vCelular: $("#celular").val(),
        vCorreo: $("#correo").val(),
        dCita: $fechacita,   
        vLugar: $("#cblugar").val(),
        Key:"!SDFT$$$$&F(/GF7&F7f))?=0'===IY(&&%$%$!H(U/GFD%VBN(MI YT% %RCGRCVBBUJNU(NN"
    }
    
    console.log(objct);
    fetch("https://service.poclab.pe/agendarcita/api/cita/PostAgendarCita", {
        method: "POST",
        body: JSON.stringify(objct),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then((res) => res.json())
    .then((response) => {
        $('#exampleModal').modal('show');
    })
    .catch((error) => console.log("Error: ", error));
    }
});

$(document).on('click','#btnCerrarModal', function(){
    $("#nombrecompleto").val("");
    $("#documento").val("");
    $("#celular").val("");
    $("#correo").val("");
    $("#cbdia").val("1");
    $("#cbmeses").val("1");
    $("#cbanio").val($aniodesde);
});

$(document).on('keyup', '#documento', function(){
    this.value = this.value.replace(/[^0-9]/g,''); 
});

$(document).on('keyup', '#celular', function(){
    this.value = this.value.replace(/[^0-9]/g,''); 
});




