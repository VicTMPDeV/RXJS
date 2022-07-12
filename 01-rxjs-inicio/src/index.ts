// ####################################################################################################################
// Tanto las PROMISES como los OBSERVABLES permiten EMITIR EVENTOS DE FORMA ASÍNCRONA. 
// Las PROMISES solo permiten emitir 1 evento y NO SE PUEDEN CANCELAR.
// Los OBSERVABLES pertien emitir un FLUJO de eventos y SI SE PUEDEN CANCELAR.
// ####################################################################################################################
// NOTA: UN OBSERVABLE Y SUS OBSERVERS ESTABLECEN UNA RELACIÓN PRODUCTOR-CONSUMIDOR MEDIANTE SISTEMA PUSH
// ####################################################################################################################
//---------------------------------------------------------------------------------------------------------------------
// 1.- OBSERVABLE/PUBLISHER
//---------------------------------------------------------------------------------------------------------------------
// Un OBSERVABLE(aka Publisher) es un FLUJO DE DATOS (del Tipo de dato que le digamos dentro del operador diamante <T>) 
// Es una COLECCION DE EVENTOS QUE SE PUEDEN EMITIR EN UN MOMENTO FUTURO.
// ####################################################################################################################
// ################## UN OBSERVABLE NUNCA SE INVOCA AL MENOS QUE EXISTA UNA SUSCRIPCIÓN AL MISMO ######################
// ####################################################################################################################
//---------------------------------------------------------------------------------------------------------------------
// 2.- OBSERVER/SUBSCRIBER
//---------------------------------------------------------------------------------------------------------------------
// ####################################################################################################################
// NOTA 1: UN OBSERVER Y UN SUBSCRIBER SON LO MISMO, SOLO QUE CUANDO SE PASA COMO PARÁMETRO AL OBSERVABLE SE LE LLAMA
//         SUBSCRIBER, Y CUANDO SE PASA COMO PARÁMETRO AL SUBSCRIBE() , SE CONOCE COMO OBSERVER.
// NOTA 2: EN UN SISTEMA PULL, EL OBSERVER(Consumidor) PEDIRÍA LOS DATOS AL OBSERVABLE(Productor) Y ÉSTE SE LOS DEVUELVE.
//         EN UN SISTEMA PUSH, EL OBSERVER(Consumidor) LE DICE AL OBSERVABLE(Productor) QUE ESTÁ INTERESADO EN SU 
//         CONTENIDO, ENTONCES SE SUSCRIBE A ÉL, Y ES EL PRODUCTOR EL QUE ENVÍA DATOS, CUANDO LOS TENGA, AL CONSUMIDOR.
//         LOS OBSERVABLES DE RXJS HACEN PUSH, EMPUJAN, DEL STREAM DE DATOS HACIA SU OBSERVER LLAMANDO AL NEXT() 
//         DE SU OBSERVER
// ####################################################################################################################
// Un OBSERVER (Event Listener) se encarga de escuchar y actuar sobre lo que emite un OBSERVABLE.
// Los Observers son las funciones CALLBACK (van dentro de los parámetros de subscribe()) que ESCUCHAN EL FLUJO DE 
// DATOS EMITIDOS POR EL OBSERVABLE y que ACTÚAN SOBRE LOS VALORES QUE EMITE EL OBSERVABLE.
// ####################################################################################################################
// Cada EVENTO emitido por el OBSERVABLE (Iterable) es pasado al método next() DE SU OBSERVER (Iterator).
// Si hay un ERROR en el flujo de datos, el OBSERVABLE llama al método error()
// El OBSERVABLE puede saber cuando su OBSERVER no quiere recibir más datos con la función complete()
// Una vez COMPLETADO EL OBSERVER, ya puedo pasarselo al OBSERVABLE a través de la SUSCRIPCIÓN.
// ####################################################################################################################
// Un OBSERVER CON UN COMPLETE DEFINIDO, CIERRA EL FLUJO DE DATOS DEL OBSERVABLE, Y NO SERÍA NECESARIA HACER LA 
// DESUSCRIPCIÓN unsubscribe() de la SUBSCRIPTION.
// ####################################################################################################################
// Para poder recibir los valores que EMITE, nos tenemos que SUSCRIBIR al OBSERVABLE, creando así una SUBSCRIPTION.
// Observable tiene un método subscribe(), que devuelve una SUBSCRIPTION que recibe un OBSERVER.
//
// Los valores se reciben del OBSERVABLE (objeto iterable) con la función next() del OBSERVER.
//
// El OBSERVER puede llamar una función complete() que indica que ya no va a observar más valores emitidos.
// Aunque el OBSERVER llame a complete(), puede que el OBSERVABLE siga emitiendo valores.
//---------------------------------------------------------------------------------------------------------------------
// 3.- SUBSCRIPTION
//---------------------------------------------------------------------------------------------------------------------
// Una Subscripción representa la EJECUCIÓN DE 1 ÚNICO OBSERVABLE. Se invoca mediante el método subscribe().
// Una Subscription es notificada de las emisiones del Subscriber del Observable mediante el Observer.
// También sirve para CANCELAR LA EJECUCIÓN del mismo en un momento dado con el método unsubscribe().
//---------------------------------------------------------------------------------------------------------------------
// 4.- OPERATORS
//---------------------------------------------------------------------------------------------------------------------
// Son FUNCIONES PURAS que permiten trabajar con el FLUJO DE EVENTOS mediante PROGRAMACIÓN FUNCIONAL (pipe, filter...)
//---------------------------------------------------------------------------------------------------------------------
// 5.- SUBJECT
//---------------------------------------------------------------------------------------------------------------------
// Distribuye un OBSERVABLE hacia varios OBSERVERS a la vez.
//---------------------------------------------------------------------------------------------------------------------
// 6.- SCHEDULERS (poco usuales)
//---------------------------------------------------------------------------------------------------------------------
// Controlan el orden de las Suscripciones y el orden y velocidad de la emisión de eventos.
//---------------------------------------------------------------------------------------------------------------------

// ##############################
// MANERAS DE CREAR UN OBSERVABLE
// ##############################
import { Observable, Observer, Subscription } from 'rxjs';

// EJEMPLO SÍNCRONO
//---------------------------------------------------------------------------------------------------------------------
// 1.- método create(), PASANDOLE UN OBSERVER/SUBSCRIBER -> NO SE USA, ESTÁ DEPRECATED
//---------------------------------------------------------------------------------------------------------------------
// const observable$ = Observable<string>.create( (observer) => { //Recibe una función Callback
//     observer.next("Hello"); //Hace PUSH del valor "Hello" desde el OBSERVABLE hacia el OBSERVER
//     observer.next("World"); //Hace PUSH del valor "World" desde el OBSERVABLE hacia el OBSERVER
// });
//---------------------------------------------------------------------------------------------------------------------
// 2.- Instanciando un Objeto Observable con su constructor
//---------------------------------------------------------------------------------------------------------------------
// const observable$ = new Observable((subscriber) => { //Recibe una función Callback
//     subscriber.next("Hello"); //Hace PUSH del valor "Hello" desde el OBSERVABLE hacia el OBSERVER
//     subscriber.next("World"); //Hace PUSH del valor "World" desde el OBSERVABLE hacia el OBSERVER
// });

// const suscription = observable$.subscribe( (evento) => { //Suscripción al Observable, que recibe un EVENTO que describe 
//                                                          //lo que va a hacer la función next()
//     console.log(evento) // Para cada EVENTO que recibe el OBSERVER (next()), me notifica y lo muestro por pantalla.
// }); 

// EJEMPLO ASÍNCRONO
//---------------------------------------------------------------------------------------------------------------------
// const observable$ = Observable<string>.create( (observer) => { //Recibe una función Callback
//     //AQUÍ DENTRO ESTÁN LOS EVENTOS QUE EMITE EL OBSERVABLE HACIA EL OBSERVER
//     observer.next("Hello"); //Hace PUSH del valor "Hello" desde el OBSERVABLE hacia el OBSERVER
//     setTimeout(() => {
//         observer.next("World"); //Hace PUSH del valor "World" desde el OBSERVABLE hacia el OBSERVER
//     }, 2000);
// });

// const suscription = observable$.subscribe( (observerEvents) => { //Suscripción al Observable, que recibe un EVENTO que describe lo que va a hacer la función next() del Observer
//     console.log(observerEvents) // Para cada EVENTO que recibe el OBSERVER, me notifica y lo muestro por pantalla.
// });

// ################################
// FORMAS DE EJECUTAR EL SUBSCRIBE:
// ################################
// --------------------------------------------------------------------------------------------------------------------------
// 1.- Callback solo del next
// --------------------------------------------------------------------------------------------------------------------------
// obs$.subscribe( resp => console.log(resp) );
// --------------------------------------------------------------------------------------------------------------------------
// 2.- Callbacks por parámetros de subscribe (1 para el resultado de next(), otro para los errores y otro para el complete)
// --------------------------------------------------------------------------------------------------------------------------
// DEPRECADA
// obs$.subscribe( 
//     value => console.log('next: ', value),
//     error => console.warn('error: ', error),
//     () => console.info('Completado') 
// );
// --------------------------------------------------------------------------------------------------------------------------
// 3.- Pasar un Objeto OBSERVER por parámetro
// --------------------------------------------------------------------------------------------------------------------------
// HASTA AHORA HEMOS ESTADO PASANDO UNA VERSIÓN REDUCIDA DEL OBJETO OBSERVER, EN REALIDAD EL OBJETO OBSERVER ES ASÍ:
// --------------------------------------------------------------------------------------------------------------------------
// const obs$ = new Observable<string>(subscriber => {
//     //SUBSCRIBERS/OBSERVERS -> entidades que van a estar pendientes de las EMISIONES de mi OBSERVABLE/PUBLISHER
//     subscriber.next('Hola');  //Next EMITE el valor del Observable hacia a los Subscribers.
//     subscriber.next('Mundo'); //Segunda Emisión
//     subscriber.next('Hola');  //Tercera Emisión
//     subscriber.next('Mundo'); //Cuarta Emisión

//     //Error forzado - solo para probar que se ejecuta el error, dejar comentado
//     // const a = undefined;
//     // a.nombre = 'Víctor';

//     subscriber.complete(); //Metodo del OBSERVER que indica que EL STREAM DE DATOS EMITIDO POR EL OBSERVABLE HA TERMINADO (FINALIZA LA SUSCRIPCIÓN DESDE EL PROPIO FLUJO DE EVENTOS (OBSERVABLE)) 

//     subscriber.next('Hola');  //Quinta Emisión -> NO SE NOTIFICA
//     subscriber.next('Mundo'); //Sexta Emisión -> NO SE NOTIFICA
// });

// const observer: Observer<string> = {
//     next: value => console.log('next: ', value),
//     error: error => console.warn('error: ', error),
//     complete: () => console.info('Completado') 
// }

// const subscription1 = obs$.subscribe(observer);


// ###########################################################################################################
// FINALIZAR UN OBSERVABLE
// ###########################################################################################################
// PARA QUE SE EJECUTE EL OBSERVABLE, TIENE QUE EXISTIR AL MENOS UNA SUSCRIPCION 
// (CADA SUSCRIPCION CREA UNA NUEVA INSTANCIA DEL OBSERVABLE)
// La SUBSCRIPTION que nos retorna el método subscribe(), posee un método llamado unsubscribe()
// que podemos llamar cuando deseamos terminar la relación entre OBSERVABLE y OBSERVER.
//------------------------------------------------------------------------------------------------------------
// SI QUIERO CANCELAR UNA SUSCRIPCION, TENGO QUE LLAMAR AL METODO UNSUBSCRIBE
// ¡¡¡OJO!!! UNSUBSCRIBE (desuscribirse) NO ES LO MISMO QUE COMPLETE (terminar el Observable)
//------------------------------------------------------------------------------------------------------------


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// EJERCICIO 1 -> CONTADOR DE NUMEROS SIMPLE (Sin operators)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// const contadorObservable$ = new Observable<number>((subscriber) => {
//     let contador: number = 0;
//     const interval: NodeJS.Timer = setInterval(() => {
//         contador++;
//         subscriber.next(contador);
//         console.log('OBSERVABLE EMITE EL VALOR: ', contador);
//     }, 1000);

//     // RETURN de un Observable Se ejecuta cuando se llama al complete() del observer o unsuscribe() de todas las Subscriciones,
//     // sino el OBSERVABLE sigue Emitiendo y producirá una FUGA DE MEMORIA RAM (MEMORY LEAKS).
//     return () => {
//         subscriber.complete();
//         clearInterval(interval);
//         console.log('COMPLETE');
//     }
// });

// const contadorObserver: Observer<number> = {
//     next: emmitedValue => console.log('OBSERVER NOTIFICA VALOR OBSERVADO: ', emmitedValue),
//     error: err => console.warn('ERROR: ', err),
//     complete: () => console.info('OBSERVABLE COMPLETADO, EL OBSERVABLE NO EMITE MÁS VALORES')
// }

// const subscription: Subscription = contadorObservable$.subscribe(contadorObserver);
// setInterval(() => {
//     subscription?.unsubscribe();
//     console.log('SUSCRIPCIÓN COMPLETADA');
// }, 10000);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// EJERCICIO 2 -> LA COLA DE LA CARNICERÍA
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const marcadorTurno$: Observable<number> = Observable<number>.create( (ticketSubscriber) => { //Recibe una función Callback
    //AQUÍ DENTRO ESTÁN LOS EVENTOS QUE EMITE EL OBSERVABLE HACIA EL OBSERVER
    let numero: number = 0;
    const turnos = setInterval(() => {
        numero++;
        ticketSubscriber.next(numero);
    }, 2000);

    setTimeout(() => {
        ticketSubscriber.complete(); //Metodo del OBSERVER que indica que EL STREAM DE DATOS EMITIDO POR EL OBSERVABLE 
                                     //HA TERMINADO (FINALIZA LA SUSCRIPCIÓN DESDE EL PROPIO FLUJO DE EVENTOS (OBSERVABLE))
        console.log('NO QUEDAN MÁS TICKETS EN EL RULO');
    }, 30000);

    return () => { //SE EJECUTA CUANDO SE EJECUTA EL complete() o NO QUEDAN SUSCRIPCIONES
        clearInterval(turnos); //Comentar para ver la FUGA DE MEMORIA (MEMORY LEAKS)
    }
});


// Para que la cadena de eventos producida por el Observable se ejecute, necesito tener una suscripcion al mismo:
const suscription: Subscription = marcadorTurno$.subscribe( (carniceroObserver: number) => { 
    console.log(`¿¿ QUIÉN TIENE EL ${carniceroObserver} ??`);
    const miTurno: number = 9;
    if(carniceroObserver == miTurno){
        console.log(`YO TENGO EL ${carniceroObserver}!!!`); // Para cada EVENTO que recibe el OBSERVER, me notifica y lo muestro por pantalla.
        // suscription.unsubscribe();// COMPRADOR SE VA, SI NO LO PONGO SIGUE ESCUCHANDO LLAMANDO A OTROS COMPRADORES
                                  // -> PUEDE SER QUE EL FLUJO DE DATOS DEL OBSERVABLE NO TERMINE NUNCA... 
                                  // ENTONCES DEJO DE ESCUCHAR CANCELANDO LA SUSCRIPCION.
    }
    const miTurno2: number = 5;
    if(carniceroObserver == miTurno2){
        console.log(`YO TENGO EL ${carniceroObserver}!!!`); 
        // suscription.unsubscribe(); //SI ME DESUSCRIBO AQUI, CUANDO LLEGUE EL 9, NO ME VOY A ENTERAR
    }
}); 