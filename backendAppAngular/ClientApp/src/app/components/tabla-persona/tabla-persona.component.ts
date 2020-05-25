import { Component, OnInit } from '@angular/core';
//importamos el servicio
import { PersonaService } from '../../services/persona.service'

@Component({
  selector: 'tabla-persona',
  templateUrl: './tabla-persona.component.html',
  styleUrls: ['./tabla-persona.component.css']
})
export class TablaPersonaComponent implements OnInit {

    personas: any;
    cabeceras: string[] = ["Id Producto", "Nombre", "Precio", "Stock", "Nombre Categoria"];
    constructor(private personaService: PersonaService) {

    }

    ngOnInit() {
        this.personaService.getPersona().subscribe(
            data => this.personas = data
        );
  }

}
