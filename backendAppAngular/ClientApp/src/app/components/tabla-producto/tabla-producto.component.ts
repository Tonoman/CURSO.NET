import { Component, OnInit, Input } from '@angular/core';
//importamos el servicio
import { productoService } from '../../services/producto.service'

@Component({
  selector: 'tabla-producto',
  templateUrl: './tabla-producto.component.html',
  styleUrls: ['./tabla-producto.component.css']
})
export class TablaProductoComponent implements OnInit {

    @Input() productos: any;
    cabaceras: string[] = ["Id Persona", "Nombre", "1 Apellido", "2 Apellido", "Telefono", "Correo"];

    constructor(private producto:productoService) {

    }

    //se ejecuta al cargar la pagina
    ngOnInit() {
        this.producto.getProducto().subscribe(
            data => this.productos = data
        );
  }

}
