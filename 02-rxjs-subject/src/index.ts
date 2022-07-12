import { Observable, Observer, Subject } from 'rxjs';
// ##########################################################################################################################
// SI CREO VARIAS SUBSCRIPCIONES, CADA SUSCRIPCIÓN GENERA UNA NUEVA EJECUCIÓN DEL FLUJO DE DATOS DEL OBSERVER DESDE EL INICIO 
// LO CUAL SE CONOCE COMO COLD OBSERVABLES (que es el comportamiento por defecto de cualquier OBSERVABLE).
// SI QUEREMOS QUE VARIAS SUSCRIPCIONES SE HAGAN A LA VEZ SOBRE EL MISMO OBSERVABLE, PODEMOS USAR SUBJECT O BEHAVIORSUBJECT,
// CREANDO ASI LO QUE SE CONOCE COMO HOT OBSERVABLE.
// TAMBIÉN SE CONOCE COMO COLD OBSERVABLE EL HECHO DE QUE EL FLUJO DE DATOS SEA PRODUCIDO POR EL OBSERVABLE ÚNICAMENTE.
// CUANDO EL FLUJO DE DATOS ES PRODUCIDO DESDE FUERA DEL OBSERVABLE, SE CONOCE TAMBIÉN COMO HOT OBSERVABLE.
// ##########################################################################################################################
const observable$ = new Observable<number>(subscriber => {
    const id = setInterval(() => {
        subscriber.next(Math.floor(Math.random()*100))
    }, 1000);

    return () => {
        clearInterval(id);
        console.log('OBSERVABLE TERMINADO, YA NO EMITO NADA Y NO HAY FUGAS DE MEMORIA');
    }
});

const observer: Observer<any> = {
    next: value => console.log('NEXT: ', value),
    error: err => console.warn('ERROR: ', err),
    complete: () => console.info('OBSERVER COMPLETADO, DEJO DE OBSERVAR PERO OBSERVABLE SIGUE EMITIENDO')
};


// ##############################
// COLD OBSERVABLE
// ##############################
//Cada suscripción emite valores diferentes porque cada una inicia un Observable diferente
// const subscription1 = observable$.subscribe(value => console.log('SUSCRIPCION 1', value));
// const subscription2 = observable$.subscribe(value => console.log('SUSCRIPCION 2', value));

//-------------------------------------------------------------------------------------------------------------
// Si queremos que cada suscripción sea sobre el mismo Observable (Hot Observables) tenemos que usar un Subject
// Subject es un tipo de Observable (Hot Observable).
//-------------------------------------------------------------------------------------------------------------

// ############################################
// CARACTERÍSTICAS DE SUBJECT -> HOT OBSERVABLE
// ############################################
// 1.- Multi-Cast -> Muchas subscripciones van a estar sujetas a este Observable
// 2.- Es un Observable, pero TAMBIÉN ES UN OBSERVER -> Lo podemos mandar como argumento al Subscribe
//                                                   -> por tanto, podemos manejar el next, error y complete
const subject$ = new Subject();
const subscription1 = observable$.subscribe(subject$); //observable$ -> ACTÚA COMO SUBSCRIBER
// Ahora me suscribo al subject$ en lugar de al observable$ -> ACTÚA COMO OBSERVABLE
const subscription2 = subject$.subscribe(value => console.log('SUSCRIPCION 2', value));
const subscription3 = subject$.subscribe(value => console.log('SUSCRIPCION 3', value));
const subscription4 = subject$.subscribe(observer);
// Podemos ver que ahora las subscripciones toman el valor de un mismo Observable porque emiten el mismo valor.

// A continuación, vamos a ver que podemos INSERTAR INFORMACIÓN AL FLUJO DE DATOS QUE EL OBSERVABLE INICIAL
// ESTÁ EMITIENDO, LO QUE SE CONOCE COMO HOT OBSERVABLE.
setTimeout(() => {
    console.log('HAN PASADO 10 SEGUNDOS, VOY A EMITIR UN VALOR EXTERNO AL OBSERVABLE');
    subject$.next(1);
    subject$.complete();
    subscription1.unsubscribe(); //VIP -> ¡¡SI NO DESUSCRIBO LA SUSCRIPCIÓN PRINCIPAL, NO TERMINA DE EMITIR!!
}, 10000);

// ################################################################################################################
// COMO HEMOS VISTO, CREAR OBSERVABLES MANUALMENTE ES SUSCEPTIBLE DE GENERAR MÚLTIPLES VÍAS PARA LA FUGA DE MEMORIA
// ES POR ELLO QUE RARA VEZ LOS CREAREMOS ASÍ. 
// LO SUYO ES USAR TODAS LAS FUNCIONALIDADES Y OPERATORS QUE TRAE YA RXJS Y QUE SE ENCARGAN DE ENCAPSULAR TODO ESTO
// CENTRÁNDONOS ÚNICAMENTE EN LO QUE HACEN Y NO COMO LO HACEN.
// ################################################################################################################