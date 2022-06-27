import { displayLog } from './utils';
//1.- Importamos fromEvent de rxjs para capturar los eventos del Grid
import { fromEvent } from 'rxjs';

// ####################################################################################################################
// Operador mapTo() de RxJS
// --------------------------------------------------------------------------------------------------------------------
// Es el Operador de Transformación más simple de RxJS.
// Para cada Evento que entra, transforma la salida, devolviendo SIEMPRE EL MISMO VALOR.
// ####################################################################################################################

export default () => {
    //2.- Accedo al elemento del DOM sobre el que quiero trabajar.
    const grid = document.getElementById('grid');
    //3.- Creamos un Observable de sus Eventos Click y nos suscribimos.
    const clickGridObs$ = fromEvent(grid, 'click');
    const subscription = clickGridObs$.subscribe( evt => console.log(evt) );



}