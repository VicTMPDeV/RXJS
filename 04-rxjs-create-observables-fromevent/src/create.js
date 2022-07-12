import { displayLog } from './utils';
//1.- Importamos fromEvent de rxjs
import { fromEvent } from "rxjs";

// ####################################################################################################################
// Función fromEvent() de RxJS
// --------------------------------------------------------------------------------------------------------------------
// Asocia un Observable a un Event Target concreto para emitir los eventos generados por este.
// Se pueden canalizar Eventos de un elemento del DOM (o Event Emitters en NODE por ejemplo también).
// ####################################################################################################################

export default () => {

    //2.- Creamos una referencia al botón.
    const actionBtn = document.getElementById('action-btn');
    //3.- Generamos un Observable a partir de los eventos click de este boton.
    const btnObservable$ = fromEvent(actionBtn, 'click'); // Tengo que indicar los eventos que quiero escuchar.
    //4.- Nos suscribimos al Observable
    let count = 0;
    const suscription = btnObservable$.subscribe( (evt) => { // Callback del Observer (con arrow function)
        // console.log(evt);//Con esta línea veo el tipo de evento emitido y sus propiedades.
        count++;
        displayLog(`Click Event ${count} at position : ( x : ${evt.x} , y : ${evt.y} )`);
        if(count === 5){
            //5.- A los 5 eventos, me desuscribo.
            displayLog('No more Clicks notified');
            displayLog('Open Console (F12) to see another observable in action');
            suscription.unsubscribe();
        }
    });

    //6.- Observable que nos notifique de la posición del ratón (SIN REFERENCIA, NO ME VOY A DESUSCRIBIR).
    fromEvent(document,'mousemove').subscribe( function(evt){ // Callback del Observer (con funcion anónima clásica)
        console.log(`Mouse Position: ( x: ${evt.x} , y : ${evt.y} )`);
    });



}