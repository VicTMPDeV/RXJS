import { Observer, Subscription, from, of, range, interval, timer } from "rxjs";


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


//---------------------------------------------------------------------------------------------------------------------
// Ejemplo 2.- A partir de un string (Array de caracteres)
//---------------------------------------------------------------------------------------------------------------------
// const myString: string = 'Hello World';
// const observable2$ = from(myString);
// const subscription2: Subscription = observable2$.subscribe((value: string) => console.log(value));
// subscription2.unsubscribe();
// ---------
// RESULTADO
// ---------
// En este caso se emite la secuencia de valores 1 a 1, 
// porque la naturaleza del observable es string, que es un array de caracteres.


//---------------------------------------------------------------------------------------------------------------------
// Ejemplo 3.- A partir de una Promise
//---------------------------------------------------------------------------------------------------------------------
// const myPromise = new Promise(resolve => setTimeout(() => {
//     resolve('Soy Una Promesa');
// }, 2000));

// const observable3$ = from(myPromise);
// const subscription3 = observable3$.subscribe(value => console.log(value));
// subscription3.unsubscribe();
// ---------
// RESULTADO
// ---------
// En este caso se emite UN ÚNICO EVENTO CUANDO SE RESUELVE LA PROMISE (a los 2 segundos).
// porque la naturaleza del observable es string, que es un array de caracteres.





// ####################################################################################################################
// Funcion of() de RxJS
// --------------------------------------------------------------------------------------------------------------------
// of() -> Crea un Observable que emite una secuencia variable de Objetos, incluso de distinto tipo.
// ####################################################################################################################

//---------------------------------------------------------------------------------------------------------------------
// Ejemplo 1 - Básico
//---------------------------------------------------------------------------------------------------------------------

// 1.- Importamos of de rxjs
// 2.- Creamos el Observable
// const observable4$ = of(1, 2, 3, 4, 5, 6);
// 3.- Creamos una Subscription para que se ejecute el Observable (simplificado, solo next).
// const subscription4 = observable4$.subscribe(data => console.log(data));

//---------------------------------------------------------------------------------------------------------------------
// Ejemplo 2 - Complejo
//---------------------------------------------------------------------------------------------------------------------

// 1.- Importamos of de rxjs
// 2.- Creamos el Observable
// const observable5$ = of(
//     [1, 2, 3, 4, 5, 6],
//     "Hello World",
//     {
//         name: "Víctor",
//         surname: "Morales Pérez"
//     },
//     function myFunc(){
//         return "Soy una función";
//     },
//     () => {
//         return "Soy una Arrow Function";
//     }
// );
// 3.- Creamos una Subscription para que se ejecute el Observable (simplificado, solo next).
// const subscription5 = observable5$.subscribe(console.log);
// ---------
// RESULTADO
// ---------
// En este caso se han emitido 5 eventos, uno por cada elemento dentro del of()





// ####################################################################################################################
// Funcion range() de RxJS
// --------------------------------------------------------------------------------------------------------------------
// range() -> Crea un Observable que emite una secuencia ORDENADA de números.
// ####################################################################################################################

//------------------------------
// Ejemplo
//------------------------------
// 1.- Importamos range de rxjs
// 2.- Creamos el Observable
// const observable6$ = range(3,10); //Rango de números que empieza en el 3 y tiene 10 números
// 3.- Creamos una Subscription para que se ejecute el Observable (simplificado, solo next).
// const subscription6 = observable6$.subscribe(console.log);
// ---------
// RESULTADO
// ---------
// Se crea una secuencia ordenada desde 3 hasta 12





// ####################################################################################################################
// Funciones interval() y timer() de RxJS
// --------------------------------------------------------------------------------------------------------------------
// La función inteval() sirve para emitir secuencias de valores cada cierto intervalo.
// Es el equivalente RxJS del método global de JS setInterval().
// La función timer() que equivale al método global setTimeout().
// ####################################################################################################################

//------------------------------
// Ejemplo 1
//------------------------------
// 1.- Importamos interval de rxjs

// 2.- Creamos el Observable
console.time('EXECUTION TIME');
console.log('Comienza el contador... 0')
const observable7$ = interval(1000); //Emite cada segundo un evento
// EQUIVALENTE JS
// --------------
// setInterval(() => {
//     numero++;
//     observer.next(numero);
// }, 1000);

// 3.- Creamos una Subscription para que se ejecute el Observable (simplificado, solo next).
// const subscription7 = observable7$.subscribe( data => console.log(data) );
// // CUIDADO!!! Aquí la secuencia no se acaba nunca!!! hay que desuscribirse.
// timer(6000).subscribe( () => {
//     subscription7.unsubscribe();
//     console.timeEnd('EXECUTION TIME');
// });

// EQUIVALENTE JS
// --------------
// setTimeout(() => {
//     subscription7.unsubscribe();
// }, 6000);

// ---------
// RESULTADO
// ---------
// En este caso se emite un valor numerico (un contador) cada X milisegundos, 
// y nos desuscribimos al cabo de Y milisegundos (esto no lo incluye el método, es artesanal).

// ####################################################################################################################
// Nota sobre timer():
// --------------------------------------------------------------------------------------------------------------------
// En realidad timer() sirve para más cosas que setTimeout() de VanillaJS.
// También sirve para crear intervalos a partir del primer evento.
// ####################################################################################################################

//------------------------------
// Ejemplo 2
//------------------------------
// const observable8$ = timer(5000, 1000); // Comienza 5 segundos de retardo, y luego emite eventos cada segundo
// const subscription8 = observable8$.subscribe( function(data){
//     console.log(`2 - ${data + 1}`) // Backticks o Template Strings de ES6
// });

// timer(15000).subscribe(() => subscription8.unsubscribe());