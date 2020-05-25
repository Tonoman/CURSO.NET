import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'buscador-producto-categoria',
  templateUrl: './buscador-producto-categoria.component.html',
  styleUrls: ['./buscador-producto-categoria.component.css']
})
export class BuscadorProductoCategoriaComponent implements OnInit {

    categorias: any;
    //emitir envento a los hijos
    @Output() clickBuscar: EventEmitter<any>;
    @Output() limpiarButton: EventEmitter<any>;

    constructor(private categoriaService: CategoriaService) {
        this.clickBuscar = new EventEmitter;
        this.limpiarButton = new EventEmitter;
    }

    ngOnInit() {
        this.categoriaService.getCategoria().subscribe(p => this.categorias = p );
    }

    public buscar(categoria) {
        this.clickBuscar.emit(categoria);
    }

    public limpiar(categoria) {
        this.limpiarButton.emit(categoria);
    }

}
