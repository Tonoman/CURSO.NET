import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'tabla-usuario',
  templateUrl: './tabla-usuario.component.html',
  styleUrls: ['./tabla-usuario.component.css']
})
export class TablaUsuarioComponent implements OnInit {

    @Input() usuarios: any;
    cabeceras: string[] = ["Id Usuario", "Nombre Usuario", "Nombre Completo Persona", "Tipo Usuario"];
    constructor(private usuario: UsuarioService) {
    }

    ngOnInit() {
        this.usuario.getUsuario().subscribe(res => this.usuarios = res);
    }
}
