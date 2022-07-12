import { Observer, Subscription, from, of, range, interval, timer, Observable, fromEvent, asyncScheduler } from 'rxjs';


// ####################################################################################################################
// Función from() de RxJS
// --------------------------------------------------------------------------------------------------------------------
// La función from() sirve para crear Observables a partir de Arrays, Promises e Iteradores.
// ####################################################################################################################


//---------------------------------------------------------------------------------------------------------------------
// Ejemplo 1.- A partir de ARRAY
//---------------------------------------------------------------------------------------------------------------------
// 1.- Importamos from de rxjs
// const myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];  // Vamos a crear un Observable a partir de esta secuencia de números.         
// 2.- Creamos el Observable
// const observable1$ = from(myArray);
// 3.- Creamos el Observer/Subscriber que notificará de los eventos a la Subscription.
// const observer1: Observer<number> = {
//     next: (value: number) => console.log('VALOR EMITIDO: ', value),
//     error: error => console.warn('[ERROR]: ', error),
//     complete: () => console.info('OBSERVER COMPLETADO - FIN DEL FLUJO DE EMISIÓN')
// }
// 4.- Creamos una Subscription para que se ejecute el Observable y mostrar los eventos por pantalla.
// const subscription1 = observable1$.subscribe(observer1);
// La siguiente línea no haría falta porque es un Observable finito y va a ejecutar el complete().
// subscription1.unsubscribe();
// ---------
// RESULTADO
// ---------
// En este caso se emite la secuencia de valores 1 a 1.

