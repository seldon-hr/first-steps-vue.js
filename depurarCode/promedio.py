def calcular_promedio(notas):
    suma = 0
    contador = 0
    for nota in notas:
        suma += nota
        contador += 1
    
    promedio = suma / contador
    if promedio >= 7:
        mensaje = 'El estudiante aprobó'
    else:
        mensaje = 'El estudiante reprobó'

    return promedio, mensaje

notas = [85, 75, 90, 75, 80]
promedio, resultado = calcular_promedio(notas)
print('El promedio es: ', promedio)
print('El resultado es: ', resultado)