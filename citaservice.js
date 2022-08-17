onload=function(){
    var ejemplo = 'https://t3.ftcdn.net/jpg/04/19/17/68/360_F_419176802_9s4AoYMfzxDt3kaSYV55whCkTB76NsHN.jpg'
    /*Imágenes*/
    document.getElementById("logoCAMP").src = './assets/logos/logo-CAMP.jpg';
    document.getElementById("logoPTMS").src = './assets/logos/logo-PTMS-w.png';
    document.getElementById("logoDONAR").src = './assets/logos/logo-DONAR.jpg';
    document.getElementById("logoATV").src = './assets/logos/logo-ATV.png';
    document.getElementById("logoSISA").src = './assets/logos/logo-SA-w.png';
    document.getElementById("logoHAVAS").src = './assets/logos/logo-HAVAS.png';

    var sliderImgs = [
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3947459/car.jpg',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3947459/sunset.jpg',
        ejemplo
    ]

    //Completa slider
    for (let i = 1; i <= 3; i++) {
        //El primer hijo es la imagen
        document.getElementById("slide"+i).children[0].src = sliderImgs[i-1];
    }
}

const btnAgendar = document.getElementById("btnAgendar");


btnAgendar.addEventListener('click', () => {
    const objct ={
        vNombre: document.getElementById('nombres').value,
        vApellido: document.getElementById('apellidos').value,
        vDocumento: document.getElementById('dni').value,
        dFechaNac: document.getElementById('fecnacimiento').value,
        vCelular: document.getElementById('celular').value,
        vCorreo: document.getElementById('correo').value,
        dDia: document.getElementById('dia').value,
        vLugar: document.getElementById('lugar').value,
        Key:"!SDFT$$$$&F(/GF7&F7f))?=0'===IY(&&%$%$!H(U/GFD%VBN(MI YT% %RCGRCVBBUJNU(NN"
    }

    fetch("https://service.poclab.pe/agendarcita/api/cita/PostAgendarCita", {
        method: "POST",
        body: JSON.stringify(objct),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then((res) => res.json())
    .then((response) => {
        $("#mensaje").text(response.mensaje);
        alerta(response);
    })
    .catch((error) => console.log("Error: ", error));
});


function alerta(response){
    if(response.swt == 1){           
        $('.alert').addClass("show");
        $('.alert').removeClass("hide");
        $('.alert').addClass("showAlert");
        setTimeout(function(){
          $('.alert').removeClass("show");
          $('.alert').addClass("hide");
        },5000);
    }else{
        $('.alert').addClass("show");
        $('.alert').removeClass("hide");
        $('.alert').addClass("showAlert");
        setTimeout(function(){
          $('.alert').removeClass("show");
          $('.alert').addClass("hide");
        },5000);
    }
}