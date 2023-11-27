class Persona:
    def __init__(self, nombre, edad):
        self.nombre = nombre
        self.edad = edad

    def presetnacion(self):
        print("Hola mi nombre es: ", self.nombre, " y mi edad es: ", self.edad)

class Estudiante(Persona):
    def __init__(self, nombre, edad, matricula):
        super().__init__(nombre, edad)
        self.matricula = matricula

    def presentacion(self):
        super().presentacion()
        print("Mi matricula es: ", self.matricula)

def main():
    persona = Persona("Juan", 20)
    persona.presentacion()

    estudiante = Estudiante("Pedro", 20, 123)
    estudiante.presentacion()

if __name__ == "__main__":
    main()

