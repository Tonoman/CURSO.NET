import { Component, OnInit } from '@angular/core';
import { productoService } from '../../services/producto.service';

@Component({
  selector: 'filtrado-producto-nombre',
  templateUrl: './filtrado-producto-nombre.component.html',
  styleUrls: ['./filtrado-producto-nombre.component.css']
})
export class FiltradoProductoNombreComponent implements OnInit {

    productos: any;
    constructor(private productoService: productoService) {


    }

  ngOnInit() {
  }

 filtrarDatos(nombre) {
        if (nombre.value == "") {
            console.log("El nombre esta vacio");
            this.productoService.getProducto().subscribe(data=>this.productos=data);
        } else {
           console.log("el valor es: "+nombre.value);
            this.productoService.getFiltroProductoPorNombre(nombre).subscribe(data=>this.productos = data);
       }

 }

    limpiar(nombre) {
        nombre.value = "";
        this.productoService.getProducto().subscribe(data => this.productos = data);
  }

}
