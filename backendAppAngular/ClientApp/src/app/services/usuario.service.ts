import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {

    //sacar url base
    urlBase: string = ""
    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
        //urlBase tiene el nombre del dominio
        this.urlBase = baseUrl;
    }

    //metodo de listar tipoUsuarios
    public getTipoUsuario() {
        return this.http.get(this.urlBase + "api/Usuario/listarTipoUsuario").map(res => res.json());
    }

    //metodo de listar  usuarios
    public getUsuario() {
        return this.http.get(this.urlBase + "api/Usuario/listarUsuario").map(res => res.json());
    }

    //metodo de listar  usuarios filtrados por tipo
    public getFiltrarUsuarioPorTipo(idTipo) {
        return this.http.get(this.urlBase + "api/Usuario/filtrarUsuarioPorTipo/"+idTipo).map(res => res.json());
    }

}
