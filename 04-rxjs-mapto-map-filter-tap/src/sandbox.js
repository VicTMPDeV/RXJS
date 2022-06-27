import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { mapTo, map, filter, tap } from "rxjs/operators";

// ####################################################################################################################
// Desde RxJS 5.5 los OPERATORS se aplican a través del método pipe() del Observable, que recibe las funciones de los
// Operators, separadas por comas.
// ####################################################################################################################
// Operador mapTo() de RxJS
// --------------------------------------------------------------------------------------------------------------------
// Es el Operador de Transformación más simple de RxJS.
// Para cada Evento que entra, transforma la salida, devolviendo SIEMPRE EL MISMO VALOR PARA TODO EL STREAM.
// --------------------------------------------------------------------------------------------------------------------
// Operador map() de RxJS
// --------------------------------------------------------------------------------------------------------------------
// map() recibe un callback con el valor del Evento emitido por el Observable. 
// Con ese Evento que recibe map(), podemos TRANSFORMAR TODO EL STREAM de eventos del Observable.
// --------------------------------------------------------------------------------------------------------------------
// Operador filter() de RxJS
// --------------------------------------------------------------------------------------------------------------------
// FILTRA aquellos valores emitidos por el Observable QUE CUMPLAN UNA DETERMINADA CONDICIÓN.
// La función de Predicado (PREDICATE) que se le pasa tiene que devolver TRUE para los valores que queremos dejar pasar
// y FALSE para el resto que no pasan.
// --------------------------------------------------------------------------------------------------------------------
// Operador tap() de RxJS
// --------------------------------------------------------------------------------------------------------------------
// Muy útil para leer datos del stream en cualquier punto y generar acciones fuera del mismo.
// Se usa cuando deseamos introducir efectos colaterales al flujo de eventos.
// Por ejemplo, si queremos modificar algo que no tiene que ver con el flujo de datos que se está tratando (cambiar
// el estado de la interfaz, enviar datos a google analitycs, o sacar algo por consola...).
// tap() NO PUEDE MODIFICAR EL STREAM DE DATOS, LO QUE RECIBE ES LO QUE EMITE.
// tap() SI PUEDE LEER EL STREAM DE DATOS Y EJECUTAR ACCIONES AJENAS AL STREAM DE DATOS (un console.log).
// ####################################################################################################################

export default () => {

    //1.- Accedo al elemento del DOM sobre el que quiero trabajar.
    const grid = document.getElementById('grid');

    //2.- Creamos un Observable de sus Eventos Click y nos suscribimos.
    // const clickGridObs$ = fromEvent(grid, 'click');
    // const subscription = clickGridObs$.subscribe(evt => console.log(evt));

    //3.- Transformamos el valor emitido por el Evento en un único valor constante(refactorizamos el punto 3).
    // const click$ = fromEvent(grid, 'click')
    //     .pipe(
    //         mapTo('HAS HECHO CLICK') //valor emitido.
    //     );
    // const subscription = click$.subscribe(evt => displayLog(evt));

    //4.- Ahora vamos emitir la posición relativa (respecto del grid) x e y de cada click (refactorizamos el punto 5).
    //    Vamos a transformar los datos del flujo de eventos, HACIENDO OPERACIONES SOBRE LOS MISMOS.
    // const click$ = fromEvent(grid, 'click')
    //     .pipe(
    //         map(value => [ 
    //             Math.floor(value.offsetX / 50), //Cada casilla es de 50 x 50 px
    //             Math.floor(value.offsetY / 50)
    //         ])
    //     );
    // const subscription = click$.subscribe(evt => displayLog(evt));

    //5.- Vamos a filtrar -> Solo quiero mostrar los clicks sobre las casillas grises (impares en filas y columnas).
    // const click$ = fromEvent(grid, 'click')
    // .pipe(
    //     map(value => [ // Me da el valor de cada casilla
    //         Math.floor(value.offsetX / 50), 
    //         Math.floor(value.offsetY / 50)
    //     ]),
    //     filter(value => (value[0]+value[1])%2 != 0 ) //casillas impares son las que la suma de su indice fila + columna es impar
    // );
    // const subscription = click$.subscribe(evt => displayLog(evt));

    //6.- Vamos a mostrar un console.log del estado del flujo de datos en cada momento antes de realizar las operaciones anteriores
    const click$ = fromEvent(grid, 'click')
    .pipe(
        tap(value => console.log('BEFORE MAP: ', value)),
        map(value => [ 
            Math.floor(value.offsetX / 50), 
            Math.floor(value.offsetY / 50)
        ]),
        tap(value => console.log('BEFORE FILTER: ', value)),
        filter(value => (value[0]+value[1])%2 != 0 ),
        tap(value => console.log('AFTER FILTER: ', value)) 
    );
    const subscription = click$.subscribe(evt => displayLog(evt));
    // RESULTADO : Vemos como me loga un evento por cada tap en la consola.
    
}