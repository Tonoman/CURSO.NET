import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { PersonaService } from '../../services/persona.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'usuario-form-mantenimiento',
  templateUrl: './usuario-form-mantenimiento.component.html',
  styleUrls: ['./usuario-form-mantenimiento.component.css']
})
export class UsuarioFormMantenimientoComponent implements OnInit {

  //variables
    usuario: FormGroup;
    titulo: string = "";
    parametro: string;
    tipoUsuarios: any;
    personas: any;

    constructor(private usuarioService: UsuarioService, private activatedRoute: ActivatedRoute, private personaService: PersonaService, private router: Router) {
        this.usuario = new FormGroup(
            {
                'iidUsuario': new FormControl("0"),
                'nombreUsuario': new FormControl("", [Validators.required, Validators.maxLength(100)], this.noRepetirUsuario.bind(this)),
                'contra': new FormControl("", [Validators.required, Validators.maxLength(100)]),
                'contra2': new FormControl("", [Validators.required, Validators.maxLength(100), this.validarContraIguales.bind(this)]),
                'iidPersona': new FormControl("", Validators.required),
                'iidTipoUsuario': new FormControl("", Validators.required)
            });

        this.activatedRoute.params.subscribe(parametro => {
            this.parametro = parametro["id"];
            console.log(this.parametro);
            if (this.parametro == "nuevo") {
                this.titulo = "Agregando Usuario";
            } else {
                this.titulo = "Editando  Usuario";
            }
        });

    }

    ngOnInit() {
        this.usuarioService.getTipoUsuario().subscribe(data => {
            this.tipoUsuarios = data;
        });

        this.personaService.getPersonasCombo().subscribe(data => {
            this.personas = data;
        });
    }

    validarContraIguales(control:FormControl) {
        //para validar que la contraseña sea igual
        if (control.value != "" && control.value != null) {

            if (this.usuario.controls["contra"].value != control.value) {
                return { noIguales: true };
            } else {
                return null;
            }
        }
    }

    guardarDatos() {
        //siempre es valido antes de agregar o editar
        if (this.usuario.valid == true) {
             this.router.navigate(["/mantenimiento-usuario"]);
        }
    }

    noRepetirUsuario(control: FormControl) {
        var promesa = new Promise((resolve, reject) => {

            if (control.value != "" && control.value != null) {
                this.usuarioService.validarUsuario(this.usuario.controls["iidUsuario"].value, this.usuario.controls["nombreUsuario"].value)
                    .subscribe(data => {
                        if (data == 1) {
                            resolve({ yaExiste: true });
                        } else {
                            resolve(null);
                        }
                    })
            }
        });
        return promesa;
    }

}
