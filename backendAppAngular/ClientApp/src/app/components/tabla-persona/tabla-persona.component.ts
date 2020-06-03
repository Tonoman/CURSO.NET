import { Component, OnInit, Input } from '@angular/core';
//importamos el servicio
import { PersonaService } from '../../services/persona.service'

@Component({
  selector: 'tabla-persona',
  templateUrl: './tabla-persona.component.html',
  styleUrls: ['./tabla-persona.component.css']
})
export class TablaPersonaComponent implements OnInit {

    @Input() personas: any;
    @Input() isMantenimiento = false;
    p:number=1;

    cabeceras: string[] = ["Id Persona", "Nombre Completo", "Telefono", "Correo"];
    constructor(private personaService: PersonaService) {

    }

    ngOnInit() {
        this.personaService.getPersona().subscribe(
            data => this.personas = data
        );
    }

    eliminar(idPersona) {
        if (confirm("Desea eliminar al usuario") == true) {
          this.personaService.eliminarPersona(idPersona).subscribe(data => {
              this.personaService.getPersona().subscribe(
                  data => this.personas = data
              );
          });
        }

        //alert(idPersona);

    }

}
