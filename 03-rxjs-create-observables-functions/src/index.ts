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


// ####################################################################################################################
// Función fromEvent() de RxJS
// --------------------------------------------------------------------------------------------------------------------
// Asocia un Observable a un Event Target concreto para emitir los eventos generados por este.
// Se pueden canalizar Eventos de un elemento del DOM (o Event Emitters en NODE por ejemplo también).
// ####################################################################################################################

//---------------------------------------------------------------------------------------------------------------------
// Ejemplo 4
//---------------------------------------------------------------------------------------------------------------------
const observable4$: Observable<PointerEvent> = fromEvent<PointerEvent>(document, 'click');
const observable5$: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(document, 'keyup');

// // 1.- Creo la siguiente construcción para averiguar el tipado del evento.
// const observer = {
//     next: next => console.log('NEXT: ', next),
//     error: null,
//     complete: () => console.log('SECUENCIA COMPLETADA')
// } 
// const subscription4 = observable4$.subscribe(observer);
// const subscription5 = observable5$.subscribe(observer);

// // 2.- Ahora ya puedo trabajar con las propiedades del EVENTO CONCRETO y no con las del EVENT genérico.
// const subscription6: Subscription = observable4$.subscribe( ({x,y}) => {
//     console.log(`X: ${x}`,`Y: ${y}`);
// });
// const subscription7: Subscription = observable5$.subscribe( (evento) => {
//     console.log(`TECLA PULSADA: ${evento.key}`);
// });



// ####################################################################################################################
// Funcion of() de RxJS
// --------------------------------------------------------------------------------------------------------------------
// of() -> Crea un Observable que emite una secuencia variable de Objetos, incluso de distinto tipo.
//         Emite los valores de manera SÍNCRONA y cuando termina de emitirlos, se Completa()
// ####################################################################################################################

//---------------------------------------------------------------------------------------------------------------------
// Ejemplo 5 - Básico
//---------------------------------------------------------------------------------------------------------------------

// // 1.- Importamos of de rxjs
// // 2.- Creamos el Observable
// const observable6$: Observable<number> = of(1, 2, 3, 4, 5, 6);
// const observable7$: Observable<number> = of(...[1,2,3,4,5,6],7,8,9);
// // 3.- Creamos un Observer
// const observer: Observer<number> = {
//     next: next => console.log('NEXT: ', next),
//     error: null,
//     complete: () => console.log('SECUENCIA COMPLETADA')
// } 
// // 4.- Creamos una Subscription para que se ejecute el Observable.
// const subscription8 = observable6$.subscribe(observer);
// const subscription9 = observable7$.subscribe(observer);

//---------------------------------------------------------------------------------------------------------------------
// Ejemplo 6 - Complejo
//---------------------------------------------------------------------------------------------------------------------

// //1.- Importamos of de rxjs
// //2.- Creamos el Observable
// const observable8$ = of(
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
// //3.- Creamos una Subscription para que se ejecute el Observable (simplificado, solo next).
// const subscription10 = observable8$.subscribe(console.log);

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
// Ejemplo 7
//------------------------------
//1.- Importamos range de rxjs
//2.- Creamos el Observable
console.log('INICIO');
// const observable9$ = range(3,100); //Rango de números que empieza en el 3 y tiene 100 EMISIONES
// const observable10$ = range(100); //Rango de números que empieza en el 3 y tiene 100 EMISIONES
const observable10Async$ = range(1, 20, asyncScheduler);
//3.- Creamos una Subscription para que se ejecute el Observable (simplificado, solo next).
// const subscription11 = observable9$.subscribe(console.log);
// const subscription12 = observable10$.subscribe(console.log);//HACE 100 EMISIONES EMPEZANDO EN 0
const subscription12Async = observable10Async$.subscribe(console.log);
console.log('FIN');
//---------
//RESULTADO
//---------
//Se crea una secuencia ordenada Y SINCRONA desde 3 hasta 100
//Si le añado el asyncScheduler la secuencia será ASÍNCRONA (vemos que primero imprime INICIO Y FIN, y luego la EMISIÓN).





// ####################################################################################################################
// Funciones interval() y timer() de RxJS
// --------------------------------------------------------------------------------------------------------------------
// La función inteval() sirve para emitir secuencias de valores cada cierto intervalo.
// Es el equivalente RxJS del método global de JS setInterval().
// La función timer() que equivale al método global setTimeout().
// ####################################################################################################################

//------------------------------
// Ejemplo 8
//------------------------------
// 1.- Importamos interval de rxjs

// 2.- Creamos el Observable
// console.time('EXECUTION TIME');
// console.log('Comienza el contador... 0')
// const observable7$ = interval(1000); //Emite cada segundo un evento
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
// Ejemplo 9
//------------------------------
// const observable8$ = timer(5000, 1000); // Comienza 5 segundos de retardo, y luego emite eventos cada segundo
// const subscription8 = observable8$.subscribe( function(data){
//     console.log(`2 - ${data + 1}`) // Backticks o Template Strings de ES6
// });

// timer(15000).subscribe(() => subscription8.unsubscribe());