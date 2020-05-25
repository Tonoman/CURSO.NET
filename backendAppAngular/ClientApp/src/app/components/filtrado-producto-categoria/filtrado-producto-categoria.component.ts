import { Component, OnInit } from '@angular/core';
import { productoService } from '../../services/producto.service';

@Component({
  selector: 'filtrado-producto-categoria',
  templateUrl: './filtrado-producto-categoria.component.html',
  styleUrls: ['./filtrado-producto-categoria.component.css']
})
export class FiltradoProductoCategoriaComponent implements OnInit {

    productos: any;
    constructor(private productoService: productoService) {

    }

  ngOnInit() {
  }

 buscar(categoria) {
     if (categoria.value == "") {
         console.log("Categoria esta vacia");
         this.productoService.getProducto().subscribe(data => this.productos = data);
     } else {
         console.log("La categoria es: " + categoria.value);
         this.productoService.getFiltroProductoPorCategoria(categoria.value).subscribe(data => this.productos = data);
     }
 }

 limpiar(categoria) {
     categoria.value = "";
     this.productoService.getProducto().subscribe(data => this.productos = data);
 }


}
