import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class productoService {

    //sacar url base
    urlBase:string = ""
    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
        //urlBase tiene el nombre del dominio
        this.urlBase = baseUrl;
    }

    //metodo de listar productos
    public getProducto() {
        return this.http.get(this.urlBase + "api/Producto/listarProductos").map(res => res.json());
    }

    //metodo de listar filtro productos
    public getFiltroProductoPorNombre(nombre) {
        return this.http.get(this.urlBase + "api/Producto/listarProductosPorNombre/"+nombre.value).map(res => res.json());
    }

    //metodo de listar filtro categorias
    public getFiltroProductoPorCategoria(categoria) {
        return this.http.get(this.urlBase + "api/Producto/filtarProductosPorCategoria/"+categoria).map(res => res.json());
    }


}
