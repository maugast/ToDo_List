//Variables
const tareaInput    = document.querySelector('#tarea');
const agregarBtn    = document.querySelector('#agregar'); 
const limpiarBtn    = document.querySelector('#limpiar');
const listadoTareas = document.querySelector('#listado-tareas');
const errorBox      = document.querySelector('#error-box');
let fecha         = new Date();


//----------------------
//Event Listeners

cargarEventListeners();

function cargarEventListeners(){
    agregarBtn.addEventListener('click', agregarTarea);
    listadoTareas.addEventListener('click', borrarTarea);
    limpiarBtn.addEventListener('click', limpiarTareas);
    tareaInput.addEventListener('blur', mostrarEstadoInput);
    tareaInput.addEventListener('input', inputActivo);
    document.addEventListener('DOMContentLoaded', cambiarFondo);
    document.addEventListener('DOMContentLoaded', localStorageListo);
}


//----------------------
//Funciones

cambiarFondo();


function agregarTarea(e){
    e.preventDefault();
    
    if(validarInput()){
        mostrarEstadoInput();

    }else if(!validarInput()){

        const tarea = document.createElement('li');
        const borrarBtn = document.createElement('i');

        tarea.textContent = tareaInput.value;
        tarea.style.color = 'white';
        tarea.classList.add('mb-3');

        tareaTexto = tarea.textContent;

        borrarBtn.classList.add('fas');
        borrarBtn.classList.add('fa-window-close');
        borrarBtn.classList.add('float-right');
        borrarBtn.classList.add('borrar');
        borrarBtn.style.color = 'white';

        listadoTareas.appendChild(tarea);
        tarea.appendChild(borrarBtn);

        tareaInput.value = '';
        
        let tareas = document.getElementsByTagName('li');
        let tareasArray = Array.from(tareas);

        if(tareasArray.length >= 0){
            
            tareasArray.forEach(function(item, index){
                tarea.setAttribute('id',index);
            });
        }

        guardarEnLS(tareaTexto);
    }
}

function guardarEnLS(tarea){
    let tareas;
    tareas = obtenerDeLocalStorage();
    tareas.push(tarea);
    localStorage.setItem('tareas', JSON.stringify(tareas));

}

function obtenerDeLocalStorage(){
    let tareas;
    if(localStorage.getItem('tareas')===null){
        tareas = [];
    }else{
        tareas =JSON.parse(localStorage.getItem('tareas'));

    }
    return tareas;
    
}


function localStorageListo(){

    let tareas;

    tareas = obtenerDeLocalStorage();

    tareas.forEach(function(tarea, index){
        const tareaB = document.createElement('li');
        const borrarBtnB = document.createElement('i');

        tareaB.textContent = tarea;

        tareaB.style.color = 'white';
        tareaB.classList.add('mb-3');

        tareaTexto = tareaB.textContent;

        borrarBtnB.classList.add('fas');
        borrarBtnB.classList.add('fa-window-close');
        borrarBtnB.classList.add('float-right');
        borrarBtnB.classList.add('borrar');
        borrarBtnB.style.color = 'white';

        listadoTareas.appendChild(tareaB);
        tareaB.appendChild(borrarBtnB);

        tareaInput.value = '';

        tareaB.setAttribute('id',index);
        
    });
}


function borrarTarea(e){
    if(e.target.classList.contains('borrar')){
        e.target.parentElement.remove();

        reasignarIds();

        borrarDeLocalStorage(e.target.parentElement.id);
    }
}


function reasignarIds(){
    let liElements = document.getElementsByTagName('li');
    let arrayLi = Array.from(liElements);

    arrayLi.forEach(function(item,index){
         item.setAttribute('id',index);
    });
}



function borrarDeLocalStorage(ide){
    let tareas, indice;
    indice = ide;
    tareas = obtenerDeLocalStorage();

     tareas.forEach(function(item,index){
        if(indice == index){
            
            tareas.splice(index,1);
        }
    });

    localStorage.setItem('tareas', JSON.stringify(tareas));
}


function limpiarTareas(e){
    e.preventDefault();
    listadoTareas.innerHTML='';
    tareaInput.value = '';

    localStorage.clear();
}


function validarInput(){

    let error;
    
    if(tareaInput.value === ''){
        error = error = true;
    }else{
        error = false;
    }

    return error;
}


function mostrarEstadoInput(){

    if(validarInput()){

        tareaInput.classList.add('is-invalid');

        const mensajeError = document.createElement('small');
        mensajeError.className = 'mensajeError';
        mensajeError.innerText ='No se ha ingresado ninguna tarea';
        mensajeError.style.color = 'white';

        const alertError = document.createElement('i');
        alertError.classList.add('fas');
        alertError.classList.add('fa-exclamation-triangle');
        alertError.classList.add('float-right');
        alertError.style.color = 'white';

        errorBox.appendChild(mensajeError);
        errorBox.appendChild(alertError);

        const errores = Array.from(errorBox.getElementsByClassName('mensajeError'))
        errores.push(mensajeError.innerText);
        
        if(errores.length > 2){
            errorBox.removeChild(mensajeError);
            errorBox.removeChild(alertError);
        }

    }else if(!validarInput()){
        tareaInput.classList.remove('is-invalid');
    }
         
}


function inputActivo (){
    errorBox.innerHTML ='';
    tareaInput.classList.remove('is-invalid');
}


function cambiarFondo(){

    actualizarDia();
    actualizarHora();

    if(fecha.getHours() >=20 && fecha.getHours() <= 23){
        document.body.style.background = "url('../img/night.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
    }
    if(fecha.getHours() >=00 && fecha.getHours() <= 5){
        document.body.style.background = "url('../img/night.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
    }
    else if(fecha.getHours() >=6 && fecha.getHours() <= 10){
        document.body.style.background = "url('../img/sunrise.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
    }
    else if(fecha.getHours() >=11 && fecha.getHours() <= 16){
        document.body.style.background = "url('../img/sunny.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
    }
    else if(fecha.getHours() >=17 && fecha.getHours() <= 19){
        document.body.style.background = "url('../img/sundown.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
    }

    setTimeout("cambiarFondo()",1000)

}

//Fecha y Hora

function actualizarDia(){
    const diaNumero     = document.querySelector('#dia-numero');
    const diaNombre     = document.querySelector('#dia-nombre');
    const mes           = document.querySelector('#mes');
    const anio          = document.querySelector('#anio');

        switch(fecha.getDay()){
            case 0: diaNombre.textContent = 'Domingo';
                break;
            case 1: diaNombre.textContent = 'Lunes';
                break;
            case 2: diaNombre.textContent = 'Martes';
                break;
            case 3: diaNombre.textContent = 'Miércoles';
                break;
            case 4: diaNombre.textContent = 'Jueves';
                break;
            case 5: diaNombre.textContent = 'Viernes';
                break;
            case 6: diaNombre.textContent = 'Sábado';
                break;    
        }

        diaNumero.textContent = fecha.getDate();
        
        switch(fecha.getMonth()){
            case 0: mes.textContent = 'Enero';
                break;
            case 1: mes.textContent = 'Febrero';
                break;
            case 2: mes.textContent = 'Marzo';
                break;
            case 3: mes.textContent = 'Abril';
                break;
            case 4: mes.textContent = 'Mayo';
                break;
            case 5: mes.textContent = 'Junio';
                break;
            case 6: mes.textContent = 'Julio';
                break;
            case 7: mes.textContent = 'Agosto';
                break;
            case 8: mes.textContent = 'Septiembre';
                break;
            case 9: mes.textContent = 'Octubre';
                break;
            case 10: mes.textContent = 'Noviembre';
                break;
            case 11: mes.textContent = 'Diciembre';
                break;
        }

        anio.textContent = fecha.getFullYear();
    }

    
function actualizarHora(){
    let reloj = new Date();
    let hora          = document.querySelector('#hora');
    let minutos       = document.querySelector('#minutos');
    let segundos      = document.querySelector('#segundos');

    hora.innerHTML = reloj.getHours();
    if(reloj.getHours() < 10){
        hora.innerHTML = `0${reloj.getHours()}`;
    }

    minutos.innerHTML= reloj.getMinutes();
    if(reloj.getMinutes() < 10){
        minutos.innerHTML = `0${reloj.getMinutes()}`;
    }

    segundos.innerHTML = reloj.getSeconds();
    if(reloj.getSeconds() < 10){
        segundos.innerHTML = `0${reloj.getSeconds()}`;
    }

    setTimeout("actualizarHora()",1000)
}
