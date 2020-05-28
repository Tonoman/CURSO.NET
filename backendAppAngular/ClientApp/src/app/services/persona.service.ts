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

    //metodo de listar personas
    public getPersona() {
        return this.http.get(this.urlBase + "api/Persona/listarPersonas").map(res => res.json());
    }

    //metodo de listar personas con filtrado
    public getPersonaFiltro(nombreCompleto) {
        return this.http.get(this.urlBase + "api/Persona/filtarPersona/"+nombreCompleto).map(res => res.json());
    }

    //metodo agregar Personas
    public agregarPersona(persona) {
        var url = this.urlBase+"api/Persona/guardarPersona";
        return this.http.post(url, persona).map(res => res.json());
    }

    //metodo recuperar Personas
    public recuperarPersona(idPersona) {
        return this.http.get(this.urlBase+"api/Persona/recuperarPersona/"+idPersona).map(res => res.json());
    }

    //metodo eliminar Personas
    public eliminarPersona(idPersona) {
        return this.http.get(this.urlBase + "api/Persona/eliminarPersona/"+idPersona).map(res => res.json());
    }


}
