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
    @Input() isMantenimiento = false;
    p: number = 1;
    cabaceras: string[] = ["Id Procducto", "Descripcion", "Precio", "Stock", "Categoria"];

    constructor(private producto:productoService) {

    }

    //se ejecuta al cargar la pagina
    ngOnInit() {
        this.producto.getProducto().subscribe(
            data => this.productos = data
        );
    }

    eliminar(idProducto) {
        if (confirm("Desea eliminar el producto") == true) {
            this.producto.eliminarProducto(idProducto).subscribe(data => {
                this.producto.getProducto().subscribe(
                    data => this.productos = data
                );
            });
        }
    }

}
