"""

Mapa de la habitación (0 = sucia, 1 = limpia)

"""
# Verificar si toda la habitación está limpia
def is_room_clean():
    for row in room:
        if row.index_of(0) != -1:
            return False
    return True
# Función para detectar obstáculos usando ultrasonido
def detect_obstacle():
    # Si hay un obstáculo a menos de 10 cm, devuelve verdadero
    if maqueen.ultrasonic(PingUnit.CENTIMETERS) < 10:
        return True
    return False
# Función para mover hacia adelante
def move_forward():
    global y, x
    # Mueve físicamente el robot
    maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, 100)
    # Tiempo para que avance una celda
    basic.pause(1000)
    # Actualizar la posición (según la dirección)
    if direction == 0 and y > 0:
        # Norte
        y += 0 - 1
    elif direction == 1 and x < N - 1:
        # Este
        x += 1
    elif direction == 2 and y < N - 1:
        # Sur
        y += 1
    elif direction == 3 and x > 0:
        # Oeste
        x += 0 - 1
# Función para girar 90 grados a la derecha
def turn_right():
    global direction
    maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 100)
    maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CCW, 100)
    # Tiempo para girar
    basic.pause(1000)
    # Actualiza la dirección
    direction = (direction + 1) % 4
direction = 0
x = 0
y = 0
room: List[List[number]] = []
N = 0
N = 5
for index in range(N):
    room.append([0, 0, 0, 0, 0])
# Bucle principal
while not (is_room_clean()):
    # Si el robot detecta un obstáculo, gira
    if detect_obstacle():
        turn_right()
    else:
        # Si no hay obstáculos, avanza y limpia la celda
        move_forward()
        # Marca la celda como limpia
        # Marca la celda como limpia
        room[y][x] = 1
    # Si el robot llega a un borde, gira
    if x == 0 or x == N - 1 or y == 0 or y == N - 1:
        turn_right()
# Regresa al punto de inicio (0, 0)
while x != 0 or y != 0:
    if x > 0:
        x += 0 - 1
    elif x < 0:
        x += 1
    elif y > 0:
        y += 0 - 1
    elif y < 0:
        y += 1