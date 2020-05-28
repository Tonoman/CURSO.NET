import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from '../../services/persona.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'persona-form-mantenimiento',
  templateUrl: './persona-form-mantenimiento.component.html',
  styleUrls: ['./persona-form-mantenimiento.component.css']
})
export class PersonaFormMantenimientoComponent implements OnInit {
    // /nuevo 
    persona: FormGroup;
    titulo: string= "";
    parametro: string;

    constructor(private personaService: PersonaService, private router: Router, private activatedRoute: ActivatedRoute) {
        this.persona = new FormGroup(
            {
                'iidPersona': new FormControl("0"),
                'nombre': new FormControl("", [Validators.required, Validators.maxLength(100)]),
                'apPaterno': new FormControl("", [Validators.required, Validators.maxLength(150)]),
                'apMaterno': new FormControl("", [Validators.required, Validators.maxLength(150)]),
                'telefono': new FormControl("", [Validators.required, Validators.maxLength(10)]),
                'correo': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[^@]+@[^@]+\.[a-zA-Z]{2,}$")]),
                'fechaNacimiento': new FormControl("",Validators.required),
            });

        this.activatedRoute.params.subscribe(parametro => {
            this.parametro = parametro["id"];
            if (this.parametro == "nuevo") {
                this.titulo = "Agregando persona";
            } else {
                this.titulo = "Editando  persona";
            }
        });
    }

    ngOnInit() {
        //programar(recuperar la informacion)
        if (this.parametro != "nuevo") {


            this.personaService.recuperarPersona(this.parametro).subscribe(param => {
                this.persona.controls["iidPersona"].setValue(param.iidPersona);
                this.persona.controls["nombre"].setValue(param.nombre);
                this.persona.controls["apPaterno"].setValue(param.apPaterno);
                this.persona.controls["apMaterno"].setValue(param.apMaterno);
                this.persona.controls["telefono"].setValue(param.telefono);
                this.persona.controls["correo"].setValue(param.correo);
                this.persona.controls["fechaNacimiento"].setValue(param.fechaCadena);

            });
        }
  }

    guardarDatos() {
        
        //siempre es valido antes de agregar o editar
        if (this.persona.valid == true) {
            //la fecha siempre se calcula como 2009-10-12 en C# dd/mm/yyyy
            var fechaNac = this.persona.controls["fechaNacimiento"].value.split("-");
            var anio = fechaNac[0];
            var mes = fechaNac[1];
            var dia = fechaNac[2];

            this.persona.controls["fechaNacimiento"].setValue(mes+"/"+dia+"/"+anio);

            this.personaService.agregarPersona(this.persona.value).subscribe(data => { this.router.navigate(["/mantenimiento-persona"]) });
      }
    }


}
