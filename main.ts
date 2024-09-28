/** Mapa de la habitación (0 = sucia, 1 = limpia) */
//  Verificar si toda la habitación está limpia
function is_room_clean(): boolean {
    for (let row of room) {
        if (row.indexOf(0) != -1) {
            return false
        }
        
    }
    return true
}

//  Función para detectar obstáculos usando ultrasonido
function detect_obstacle(): boolean {
    //  Si hay un obstáculo a menos de 10 cm, devuelve verdadero
    if (maqueen.Ultrasonic(PingUnit.Centimeters) < 10) {
        return true
    }
    
    return false
}

//  Función para mover hacia adelante
function move_forward() {
    
    //  Mueve físicamente el robot
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
    //  Tiempo para que avance una celda
    basic.pause(1000)
    //  Actualizar la posición (según la dirección)
    if (direction == 0 && y > 0) {
        //  Norte
        y += 0 - 1
    } else if (direction == 1 && x < N - 1) {
        //  Este
        x += 1
    } else if (direction == 2 && y < N - 1) {
        //  Sur
        y += 1
    } else if (direction == 3 && x > 0) {
        //  Oeste
        x += 0 - 1
    }
    
}

//  Función para girar 90 grados a la derecha
function turn_right() {
    
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 100)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 100)
    //  Tiempo para girar
    basic.pause(1000)
    //  Actualiza la dirección
    direction = (direction + 1) % 4
}

let direction = 0
let x = 0
let y = 0
let room : number[][] = []
let N = 0
N = 5
for (let index = 0; index < N; index++) {
    room.push([0, 0, 0, 0, 0])
}
//  Bucle principal
while (!is_room_clean()) {
    //  Si el robot detecta un obstáculo, gira
    if (detect_obstacle()) {
        turn_right()
    } else {
        //  Si no hay obstáculos, avanza y limpia la celda
        move_forward()
        //  Marca la celda como limpia
        //  Marca la celda como limpia
        room[y][x] = 1
    }
    
    //  Si el robot llega a un borde, gira
    if (x == 0 || x == N - 1 || y == 0 || y == N - 1) {
        turn_right()
    }
    
}
//  Regresa al punto de inicio (0, 0)
while (x != 0 || y != 0) {
    if (x > 0) {
        x += 0 - 1
    } else if (x < 0) {
        x += 1
    } else if (y > 0) {
        y += 0 - 1
    } else if (y < 0) {
        y += 1
    }
    
}
