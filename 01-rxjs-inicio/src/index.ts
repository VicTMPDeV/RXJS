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
// NOTA: EN UN SISTEMA PULL, EL OBSERVER(Consumidor) PEDIRÍA LOS DATOS AL OBSERVABLE(Productor) Y ÉSTE SE LOS DEVUELVE.
//       EN UN SISTEMA PUSH, EL OBSERVER(Consumidor) LE DICE AL OBSERVABLE(Productor) QUE ESTÁ INTERESADO EN SU 
//       CONTENIDO, ENTONCES SE SUSCRIBE A ÉL, Y ES EL PRODUCTOR EL QUE ENVÍA DATOS, CUANDO LOS TENGA, AL CONSUMIDOR.
//       LOS OBSERVABLES DE RXJS HACEN PUSH, EMPUJAN, DEL STREAM DE DATOS HACIA SU OBSERVER LLAMANDO AL NEXT() 
//       DE SU OBSERVER
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
//---------------------------------------------------------------------------------------------------------------------
// 3.- SUBSCRIPTION
//---------------------------------------------------------------------------------------------------------------------
// Una Subscripción representa la EJECUCIÓN DE 1 ÚNICO OBSERVABLE. Se invoca mediante el método subscribe()
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

import { Observable, Observer } from 'rxjs';
// ##############################
// MANERAS DE CREAR UN OBSERVABLE
// ##############################
//---------------------------------------------------------------------------------------------------------------------
// Para poder recibir los valores que EMITE, nos tenemos que SUSCRIBIR al OBSERVABLE, creando así una SUBSCRIPTION.
// Observable tiene un método subscribe(), que devuelve una SUBSCRIPTION que recibe un OBSERVER.
//
// Los valores se reciben del OBSERVABLE (objeto iterable) con la función next() del OBSERVER.
//
// El OBSERVER puede llamar una función complete() que indica que ya no va a observar más valores emitidos.
// Aunque el OBSERVER llame a complete(), puede que el OBSERVABLE siga emitiendo valores.
//---------------------------------------------------------------------------------------------------------------------
// 1.- método create(), PASANDOLE UN OBSERVER -> NO SE USA, ESTÁ DEPRECATED
//---------------------------------------------------------------------------------------------------------------------
// EJEMPLO SÍNCRONO
// ----------------
// const observable$ = Observable<string>.create( (observer) => { //Recibe una función Callback
//     observer.next("Hello"); //Hace PUSH del valor "Hello" desde el OBSERVABLE hacia el OBSERVER
//     observer.next("World"); //Hace PUSH del valor "World" desde el OBSERVABLE hacia el OBSERVER
// });

// const suscription = observable$.subscribe( (evento) => { //Suscripción al Observable, que recibe un EVENTO que describe lo que va a hacer la función next()
//     console.log(evento) // Para cada EVENTO que recibe el OBSERVER, me notifica y lo muestro por pantalla.
// }); 

// EJEMPLO ASÍNCRONO
// -----------------
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
// --------------------------
// 1.- Callback solo del next
// --------------------------
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
// ------------------------------------------
// 3.- Pasar un Objeto OBSERVER por parámetro
// ------------------------------------------
// HASTA AHORA HEMOS ESTADO PASANDO UNA VERSIÓN REDUCIDA DEL OBJETO OBSERVER, EN REALIDAD EL OBJETO LITERAL OBSERVER ES ASÍ:
// 3.1.- Pasando objeto Observer por referencia al Observable.
// -----------------------------------------------------------
// const observer: Observer<string> = {
//     next: value => console.log('next: ', value),
//     error: error => console.warn('error: ', error),
//     complete: () => console.info('Completado') 
// }
// Mando el objeto Observer a la Suscripción del Observable.
// obs$.subscribe(observer);

// 3.2.- Declarado directamente en argumentos
// ------------------------------------------
// obs$.subscribe({ 
//     next: value => console.log('next: ', value),
//     error: error => console.warn('error: ', error),
//     complete: () => console.info('Completado') 
// });

// ##########################################################################################################################
// SI CREO VARIAS SUBSCRIPCIONES, CADA SUSCRIPCIÓN GENERA UNA NUEVA EJECUCIÓN DEL FLUJO DE DATOS DEL OBSERVER DESDE EL INICIO 
// LO CUAL SE CONOCE COMO COLD OBSERVABLES (que es el comportamiento por defecto de cualquier OBSERVABLE)
// ##########################################################################################################################
//--------------------------------------------------------------------------------------------------------------------
// EJEMPLO SÍNCRONO. CONSTRUCTOR DEL OBSERVABLE, PASANDOLE POR PARAMETROS UN OBSERVER
//--------------------------------------------------------------------------------------------------------------------
// const obs$ = new Observable<string>(observer => {
//     //SUBSCRIBERS/OBSERVERS -> entidades que van a estar pendientes de las EMISIONES de mi OBSERVABLE/PUBLISHER
//     observer.next('Hola');  //Next EMITE el valor del Observable hacia a los Subscribers.
//     observer.next('Mundo'); //Segunda Emisión
//     observer.next('Hola');  //Tercera Emisión
//     observer.next('Mundo'); //Cuarta Emisión

//     //Error forzado - solo para probar que se ejecuta el error, dejar comentado
//     // const a = undefined;
//     // a.nombre = 'Víctor';

//     observer.complete(); //Metodo del OBSERVER que indica que EL STREAM DE DATOS EMITIDO POR EL OBSERVABLE HA TERMINADO (FINALIZA LA SUSCRIPCIÓN DESDE EL PROPIO FLUJO DE EVENTOS (OBSERVABLE)) 

//     observer.next('Hola');  //Quinta Emisión -> NO SE NOTIFICA
//     observer.next('Mundo'); //Sexta Emisión -> NO SE NOTIFICA
// });

// const observer: Observer<string> = {
//     next: value => console.log('next: ', value),
//     error: error => console.warn('error: ', error),
//     complete: () => console.info('Completado') 
// }
// CADA SUSCRIPCIÓN GENERA UNA NUEVA EJECUCIÓN DEL FLUJO DE DATOS DEL OBSERVER DESDE EL INICIO 
// const subscription1 = obs$.subscribe(observer);
// const subscription2 = obs$.subscribe(observer);

// ###########################################################################################################
// FINALIZAR UN OBSERVABLE
// ###########################################################################################################
// PARA QUE SE EJECUTE EL OBSERVABLE, TIENE QUE EXISTIR AL MENOS UNA SUSCRIPCION 
// (CADA SUSCRIPCION CREA UNA NUEVA INSTANCIA DEL OBSERVABLE)
// La SUBSCRIPTION que nos retorna el método subscribe(), posee un método llamado unsubscribe()
// que podemos llamar cuando deseamos terminar la relación entre OBSERVABLE y OBSERVER.
//------------------------------------------------------------------------------------------------------------
// SI QUIERO CANCELAR UNA SUSCRIPCION, TENGO QUE LLAMAR AL METODO UNSUBSCRIBE
//------------------------------------------------------------------------------------------------------------
// EJEMPLO ASÍNCRONO - LA COLA DE LA CARNICERÍA
//---------------------------------------------
const marcadorTurno$ = Observable.create( (carniceroMira) => { //Recibe una función Callback
    //AQUÍ DENTRO ESTÁN LOS EVENTOS QUE EMITE EL OBSERVABLE HACIA EL OBSERVER
    let numero: number = 0;
    const turnos = setInterval(() => {
        numero++;
        console.log(`EL ${numero} ??`);
        carniceroMira.next(numero);
        }, 1000);

    setTimeout(() => {
        carniceroMira.complete(); //Metodo del OBSERVER que indica que EL STREAM DE DATOS EMITIDO POR EL OBSERVABLE HA TERMINADO (FINALIZA LA SUSCRIPCIÓN DESDE EL PROPIO FLUJO DE EVENTOS (OBSERVABLE)) 
    }, 25000);

    // RETURN de un Observable Se ejecuta cuando se llama al Unsuscribe(), 
    // sino el OBSERVABLE sigue Emitiendo cada una de las instancias y 
    // se producirá una FUGA DE MEMORIA RAM (MEMORY LEAKS) si el Observable emite indefinidamente en el tiempo.
    return () => {
        clearInterval(turnos); //Comentar para ver la FUGA DE MEMORIA (MEMORY LEAKS)
        console.log('HASTA MAÑANA PACO');
    }
});

// Para que la cadena de eventos producida por el Observable se ejecute, necesito tener una suscripcion al mismo:
const suscription = marcadorTurno$.subscribe( (carniceroDice) => { 
    const miTurno: number = 9;
    if(carniceroDice == miTurno){
        console.log(`YO TENGO EL ${carniceroDice}!!!`); // Para cada EVENTO que recibe el OBSERVER, me notifica y lo muestro por pantalla.
        suscription.unsubscribe();//COMPRADOR SE VA, SI NO LO PONGO SIGUE ESCUCHANDO A PACO LLAMANDO A OTROS COMPRADORES -> PUEDE SER QUE EL FLUJO DE DATOS DEL OBSERVABLE NO TERMINE NUNCA... ENTONCES DEJO DE ESCUCHAR CANCELANDO LA SUSCRIPCION.
    }
}); 