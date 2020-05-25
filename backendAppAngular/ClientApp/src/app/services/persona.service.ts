import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class PersonaService {

    //sacar url base
    urlBase: string = ""
    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
        //urlBase tiene el nombre del dominio
        this.urlBase = baseUrl;
    }

    //metodo de listar productos
    public getPersona() {
        return this.http.get(this.urlBase + "api/Persona/listarPersonas").map(res => res.json());
    }

}
