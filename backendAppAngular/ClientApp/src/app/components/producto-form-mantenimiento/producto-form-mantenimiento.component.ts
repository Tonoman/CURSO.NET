import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from '../../services/persona.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'producto-form-mantenimiento',
  templateUrl: './producto-form-mantenimiento.component.html',
  styleUrls: ['./producto-form-mantenimiento.component.css']
})
export class ProductoFormMantenimientoComponent implements OnInit {

    //variables
    producto: FormGroup;
    titulo: string = "";
    parametro: string;
    constructor(private personaService: PersonaService, private router: Router, private activatedRoute: ActivatedRoute) {
        this.producto = new FormGroup(
            {
                'iidproducto': new FormControl("0"),
                'nombre': new FormControl("", [Validators.required, Validators.maxLength(100)]),
                'precio': new FormControl("", [Validators.required, Validators.maxLength(150)]),
                'stock': new FormControl("", [Validators.required, Validators.maxLength(150)]),
                'categoria': new FormControl("", Validators.required),
            });

        this.activatedRoute.params.subscribe(parametro => {
            this.parametro = parametro["id"];
            if (this.parametro == "nuevo") {
                this.titulo = "Agregando producto";
            } else {
                this.titulo = "Editando  producto";
            }
        });

    }

  ngOnInit() {
  }

}
