import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'filtrado-usuario-tipo-usuario',
  templateUrl: './filtrado-usuario-tipo-usuario.component.html',
  styleUrls: ['./filtrado-usuario-tipo-usuario.component.css']
})
export class FiltradoUsuarioTipoUsuarioComponent implements OnInit {

  usuarios: any;

    constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  filtrar(tipoUsuario) {
      if (tipoUsuario.value == "") {
          this.usuarioService.getUsuario().subscribe(data => this.usuarios = data);
      } else {
          console.log(tipoUsuario.value)
          this.usuarioService.getFiltrarUsuarioPorTipo(tipoUsuario.value).subscribe(data => this.usuarios = data);
     }
  }

}
