import { Component } from '@angular/core'

@Component({
    selector: "diasSemana",
    templateUrl: "./diasSemana.component.html"
})

export class DiasSemana {
    nombre: string = "Antonio";
    cursos: string[] = ["LinQ", "Ado.net", "Asp.net MVC", "Angular"];
    persona: Object = {
        nombre: "Antonio",
        apellido: "Albiol"
    }
    enlace: string = "https://www.google.com";
}

