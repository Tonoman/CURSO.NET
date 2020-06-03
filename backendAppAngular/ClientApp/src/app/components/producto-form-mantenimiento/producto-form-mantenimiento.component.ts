import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from '../../services/persona.service';
import { productoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
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
    categorias: any;
    marcas:any;
    parametro: string;

    constructor(private categoriaService: CategoriaService,private productoService: productoService,private personaService: PersonaService, private router: Router, private activatedRoute: ActivatedRoute) {
        this.producto = new FormGroup(
            {
                'idproducto': new FormControl("0"),
                'nombre': new FormControl("", [Validators.required, Validators.maxLength(100)]),
                'precio': new FormControl("", Validators.required),
                'stock': new FormControl("", [Validators.required, this.noPuntoDecimal]),
                'idcategoria': new FormControl("", Validators.required),
                'idmarca': new FormControl("", Validators.required)
            });

        this.activatedRoute.params.subscribe(parametro => {
            this.parametro = parametro["id"];
            console.log(this.parametro);
            if (this.parametro == "nuevo") {
                this.titulo = "Agregando producto";
            } else {
                this.titulo = "Editando  producto";
            }
        });

    }

    ngOnInit() {
        this.productoService.listarMarcas().subscribe(res => this.marcas = res);
        this.categoriaService.getCategoria().subscribe(p => this.categorias = p);

        if (this.parametro != "nuevo") {
            this.productoService.getObtenerProductoPorId(this.parametro).subscribe(data => {
                
                this.producto.controls["idproducto"].setValue(data.idproducto)
                this.producto.controls["nombre"].setValue(data.nombre)
                this.producto.controls["precio"].setValue(data.precio)
                this.producto.controls["stock"].setValue(data.stock)
                this.producto.controls["idcategoria"].setValue(data.idcategoria)
                this.producto.controls["idmarca"].setValue(data.idmarca)
                
            });
        }
    }

    guardarDatos() {

        //siempre es valido antes de agregar o editar
        if (this.producto.valid == true) {
            this.productoService.registrarProducto(this.producto.value).subscribe(data => { this.router.navigate(["/mantenimiento-producto"]) });
        }
    }

    noPuntoDecimal(control: FormControl) {
        if (control.value != null && control.value != "") {
            if ((<string>control.value.toString()).indexOf(".") > -1) {
                return { puntoDecimal: true };
            }
        } 
        return null;
    }

}
