// BUFFER
let buffer: any[] = [];

// Funcion que inicializa el buffer
let initBuffer = (length: number) => {
    for (let index = 0; index < length; index++) {
        buffer.push({
            id: index,
            random_id: parseInt("" + Math.random() * 10 + "", 10),
            name: 'srgr' + parseInt("" + Math.random() * 10 + "", 10) + parseInt("" + Math.random() * 10 + "", 10),
        });
    }
}

// Ejecucióin de la funcion del buffer
initBuffer(4096);

// CALBACKS
const cb1 = (payload: any) => {
    console.log('Execute Payload CB1');
    console.log(payload)
}
const cb2 = (payload: any) => {
    console.log('Execute Payload CB2');
    console.log(payload)
}
const cb3 = (payload: any) => {
    console.log('Execute Payload CB3');
    console.log(payload)
}
const cb4 = (payload: any) => {
    console.log('Execute Payload CB4');
    console.log(payload)
}
const cb5 = (payload: any) => {
    console.log('Execute Payload CB5');
    console.log(payload)
}
const cb6 = (payload: any) => {
    console.log('Execute Payload CB6');
    console.log(payload)
}
const cb7 = (payload: any) => {
    console.log('Execute Payload CB7');
    console.log(payload)
}
const cb8 = (payload: any) => {
    console.log('Execute Payload CB8');
    console.log(payload)
}
const cb9 = (payload: any) => {
    console.log('Execute Payload CB9');
    console.log(payload)
}
const cb10 = (payload: any) => {
    console.log('Execute Payload CB10');
    console.log(payload)
}
const cb11 = (payload: any) => {
    console.log('Execute Payload CB11');
    console.log(payload)
}
const cb12 = (payload: any) => {
    console.log('Execute Payload CB12');
    console.log(payload)
}
const cb13 = (payload: any) => {
    console.log('Execute Payload CB13');
    console.log(payload)
}

// Lista de tuplas para ejecutar la funcion de read
let tuple1: [number, number, Function] = [0, 20, cb1]
let tuple2: [number, number, Function] = [6, 13, cb2]
let tuple3: [number, number, Function] = [50, 120, cb3]
let tuple4: [number, number, Function] = [1, 2, cb4]
let tuple5: [number, number, Function] = [10, 50, cb5]
let tuple6: [number, number, Function] = [54, 239, cb6]
let tuple7: [number, number, Function] = [50, 80, cb7]
let tuple8: [number, number, Function] = [65, 54, cb8]
let tuple9: [number, number, Function] = [546, 10, cb9]
let tuple10: [number, number, Function] = [50, 1, cb10]
let tuple11: [number, number, Function] = [59, 10, cb11]
let tuple12: [number, number, Function] = [230, 60, cb12]
let tuple13: [number, number, Function] = [3000, 20, cb13]

// Array de lista de tuplas
let list_tuple = [tuple1, tuple2, tuple3, tuple4, tuple5, tuple6, tuple7, tuple8, tuple9, tuple10, tuple11, tuple12, tuple13];

// Variable contador para verificar el numero de veces que se llama la funcion read
let querys_natural: number = 0;

// Function read
const read = (tuple: [number, number, Function]) => {
    querys_natural++;
    let index: number = tuple[0];
    let length: number = tuple[1];

    var payload_object: any[] = [];

    for (let i = index; i < index + length+1; i++) {
        payload_object.push(buffer[i]);
    }

    return tuple[2]({ index, length, payload_object });
}

// SOLUTION:

// Función para verificar si existe un numero dentro de un array que contiene otros array's de numeros
const find_array_num = (array: any[], number_find: number) => {
    let includes_d = [];
    for (let i = 0; i < array.length; i++) {
        (array[i].includes(number_find)) && includes_d.push(1);
    }

    return (includes_d.length > 0) ? true : false
}

// Función para verificar si existe un callback dentro un indice
const find_array_cb = (array: { index: number, cbs: any[] }[], number_find: number) => {
    let includes_d = [];
    for (let i = 0; i < array.length; i++) {
        (array[i].index == number_find) && includes_d.push(1);
    }

    return (includes_d.length > 0) ? true : false
}

// Función para saber si existe un numero dentro de un arreglo de arreglos y devolver el indice donde esta el numero
const find_index_array_nums = (array: any[], number_find: number) => {
    let includes_d = [];
    for (let i = 0; i < array.length; i++) {
        (array[i].includes(number_find)) && includes_d.push(i);
    }
    return (includes_d.length > 0) ? includes_d[0] : null
}


// Función principal para solucionar el problema de uso de la función read
const new_queryForm = (list_tuples: any[]) => {

    const ordered_list = list_tuples.sort((a: [number, number, Function], b: [number, number, Function]) => {
        return a[0] - b[0];
    });

    let list_num_list: number[][] = [];
    let cbl_list: any[] = [];

    // Recoriendo la lista ordenada de tuples
    for (let i = 0; i < ordered_list.length; i++) {

        const element1: [number, number, Function] = ordered_list[i];
        
        // Verificación si la tupla excede el buffer
        if(element1[0] + element1[1] - 1 > buffer.length + 1){
            throw new Error('Error, the tuple with a tour of ' + element1[1] + ' have length not supporter'); 
        }

        // Verificación que si no existe datos dentro de la lista de indices la crea
        if (!(list_num_list.length > 0)) {
            
            let temp_list: number[] = [];
            
            for (let d = element1[0]; d < element1[0] + element1[1] + 1; d++) {
                temp_list.push(d);
            }
            
            list_num_list.push(temp_list);
            cbl_list.push({ cb: element1[2], index: 0 });

        } else {

            // Verifica si existe el indice dentro de la lista de indices para asignarle mas numeros consecuentes despues de la creación de la lista
            if (find_array_num(list_num_list, element1[0])) {
                
                let temp_list: number[] = [];

                // Recorrer los indices de la tupla para asignarlos a la lista de indices ordenada
                for (let sv = element1[0]; sv < element1[0] + element1[1] + 1; sv++) {
                
                    if (!find_array_num(list_num_list, sv)) {
                        const id_tem = find_index_array_nums(list_num_list, element1[0]);
                        if (id_tem !== null) {
                            let id = id_tem;
                            list_num_list[id].push(sv);
                        }
                    }
                
                }

                (temp_list.length > 0) && list_num_list.push(temp_list);

                let temp_index: number = list_num_list.length - 1;
                cbl_list.push({ cb: element1[2], index: temp_index });

            } else {

                // Si hay datos dentro de la lista, y hacer un nuevo push de otro arreglo de incides
                let temp_list: number[] = [];

                for (let d = element1[0]; d < element1[0] + element1[1] + 1; d++) {
                    (!(find_array_num(list_num_list, d))) && temp_list.push(d);
                }
                
                (temp_list.length > 0) && list_num_list.push(temp_list)

                let index_temp = list_num_list.length - 1;
                cbl_list.push({ cb: element1[2], index: index_temp });
            }
        }
    }

    let new_query_list: { index: number, cbs: any[] }[] = [];

    // Recorrer la lista de callbacks y su indice para organizar una nueva lista que cree un indice y de ello cree un arreglo de callbacks que se asignaran a ese indice que apunta al arreglo de indices antes propuesto
    cbl_list.forEach((cb: { cb: Function, index: number }) => {
        let index = cb.index;
        let cb_into = cb.cb;
        if (new_query_list.length < 1) {
            new_query_list.push({
                index: index,
                cbs: []
            });
            new_query_list[0].cbs.push(cb_into);
        } else {
            if (find_array_cb(new_query_list, index)) {
                let find_index_into_array: number = new_query_list.map(function (e) { return e.index; }).indexOf(index);
                new_query_list[find_index_into_array].cbs.push(cb_into);
            }
            else {
                new_query_list.push({
                    index: index,
                    cbs: []
                });
                let find_index_into_array: number = new_query_list.map(function (e) { return e.index; }).indexOf(index);
                new_query_list[find_index_into_array].cbs.push(cb_into);
            }
        }

    });

    // Ciclo para recorrer el arreglo antes creado para llamar el callback de la información de un solo payload por cada elemento recorrido, de esta forma se extrae la información de ese callback y lo asigna a cada callback independiente
    for (let i = 0; i < new_query_list.length; i++) {
        const element = new_query_list[i];
        
        let min_find: number = list_num_list[element.index][0];
        let max_find: number = list_num_list[element.index][list_num_list[element.index].length - 1];
        
        let diff = (max_find - min_find);
        
        let cb_general: Function = (payload_general: { index: number, length: number, payload_object: any[] }) => {
            element.cbs.forEach((cb_int) => {
                let find_index_into_array: number = ordered_list.map(function (e) { return e[2]; }).indexOf(cb_int);

                let min_str = ordered_list[find_index_into_array][0];
                let max_str = ordered_list[find_index_into_array][1];

                let temp_index_payload_min = payload_general.payload_object.map(function (e) { return e.id; }).indexOf(min_str);
                let temp_index_payload_max = payload_general.payload_object.map(function (e) { return e.id; }).indexOf(min_str + max_str);
                
                let temp_payload = payload_general.payload_object.slice(temp_index_payload_min, temp_index_payload_max + 1);

                // Ejecución de cada callback independiente
                cb_int(temp_payload);
            });
        }

        // llamado de la funcion read con un callback temporal que a su vez extrae el payload y lo asigna a cada callback individual de cada tupla
        read([min_find, diff, cb_general]);
    }
}

// Ejecución de la funcion de solución propuesta con la lista de tuplas
new_queryForm(list_tuple);

// Mostrando información de la ejecución de la función
console.log({
    tuples_number: list_tuple.length,
    calls_read: querys_natural
});