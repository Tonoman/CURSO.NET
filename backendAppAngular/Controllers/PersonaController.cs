using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAppAngular.Clases;
using BackendAppAngular.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackendAppAngular.Controllers
{
    public class PersonaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/Persona/listarPersonas")]
        public IEnumerable<PersonaCLS> ListarPersonas()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<PersonaCLS> listaPersona = (from persona in bd.Persona
                                           where persona.Bhabilitado == 1
                                           select new PersonaCLS
                                           {
                                               iidPersona = persona.Iidpersona,
                                               nombreCompleto = persona.Nombre+" "+persona.Appaterno+" "+persona.Apmaterno,
                                               telefono = persona.Telefono,
                                               correo = persona.Correo,
                                               

                                           }).ToList();
                return listaPersona;
            }
        }


        [HttpGet]
        [Route("api/Persona/filtarPersona/{nombreCompleto?}")]
        public IEnumerable<PersonaCLS> filtarPersona(string nombreCompleto)
        {
            //declaramos la lista
            List<PersonaCLS> listaPersona;
            //declaramos 
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                if (nombreCompleto == "")
                {
                    listaPersona = (from persona in bd.Persona
                                    where persona.Bhabilitado == 1
                                    select new PersonaCLS
                                    {
                                        iidPersona = persona.Iidpersona,
                                        nombreCompleto = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno,
                                        telefono = persona.Telefono,
                                        correo = persona.Correo,
                                        

                                    }).ToList();
                }
                else
                {
                    listaPersona = (from persona in bd.Persona
                                    where persona.Bhabilitado == 1
                                    && (persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno).ToLower().Contains(nombreCompleto.ToLower())
                                    select new PersonaCLS
                                    {
                                        iidPersona = persona.Iidpersona,
                                        nombreCompleto = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno,
                                        telefono = persona.Telefono,
                                        correo = persona.Correo,
                                        

                                    }).ToList();
                }
                 
                                               
                return listaPersona;
            }
        }


        [HttpPost]
        [Route("api/Persona/guardarPersona")]
        public int guardarPersona([FromBody] PersonaCLS oPersonaCLS)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                    if (oPersonaCLS.iidPersona == 0)
                    {
                        Persona oPersona = new Persona();
                        oPersona.Iidpersona = oPersonaCLS.iidPersona;
                        oPersona.Nombre = oPersonaCLS.nombre;
                        oPersona.Appaterno = oPersonaCLS.apPaterno;
                        oPersona.Apmaterno = oPersonaCLS.apMaterno;
                        oPersona.Correo = oPersonaCLS.correo;
                        oPersona.Telefono = oPersonaCLS.telefono;
                        oPersona.Fechanacimiento = oPersonaCLS.fechaNacimiento;
                        oPersona.Bhabilitado = 1;
                        oPersona.Btieneusuario = 0;
                        bd.Persona.Add(oPersona);
                        bd.SaveChanges();
                        rpta = 1;
                    }
                    else
                    {
                        //recuperar todala fila
                        Persona oPersona = bd.Persona.Where(p => p.Iidpersona == oPersonaCLS.iidPersona).First();
                        oPersona.Nombre = oPersonaCLS.nombre;
                        oPersona.Appaterno = oPersonaCLS.apPaterno;
                        oPersona.Apmaterno = oPersonaCLS.apMaterno;
                        oPersona.Correo = oPersonaCLS.correo;
                        oPersona.Telefono = oPersonaCLS.telefono;
                        oPersona.Fechanacimiento = oPersonaCLS.fechaNacimiento;
                        bd.SaveChanges();
                        rpta = 1;
                    }
            }
            catch(Exception ex)
            {
                rpta = 0;
            }
            return rpta;
        }

        [HttpGet]
        [Route("api/Persona/recuperarPersona/{idPersona}")]
        public PersonaCLS recuperarPersona(int idPersona)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                PersonaCLS oPersonaCLS = (from persona in bd.Persona
                                          where persona.Bhabilitado == 1
                                          && persona.Iidpersona == idPersona
                                          select new PersonaCLS
                                          {
                                              iidPersona = persona.Iidpersona,
                                              nombre = persona.Nombre,
                                              apPaterno = persona.Appaterno,
                                              apMaterno = persona.Apmaterno,
                                              telefono = persona.Telefono,
                                              correo = persona.Correo,
                                              fechaCadena = persona.Fechanacimiento!=null ? ((DateTime)persona.Fechanacimiento).ToString("yyyy-MM-dd"): ""
                                          }).First();
              return oPersonaCLS;
            }
        }

        [HttpGet]
        [Route("api/Persona/eliminarPersona/{idPersona}")]
        public int eliminarPersona(int idPersona)
        {
            int rpta = 0;
            try
                {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                    {
                        Persona oPersona = bd.Persona.Where(p => p.Iidpersona == idPersona).First();
                        oPersona.Bhabilitado = 0;
                        bd.SaveChanges();
                        rpta = 1;
                    }
                }
                catch (Exception ex)
                {
                rpta = 0;
                }
                return rpta;

        }


        [HttpGet]
        [Route("api/Persona/validarCorreo/{id}/{correo}")]
        public int validarCorreo(int id, string correo)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    if (id == 0)
                    {
                        rpta = bd.Persona.Where(p => p.Correo.ToLower() == correo.ToLower()).Count();
                    }
                    //editar
                    else
                    {
                        rpta = bd.Persona.Where(p => p.Correo.ToLower() == correo.ToLower() && p.Iidpersona!=id).Count();
                    }
                   
                }
            }
            catch (Exception ex)
            {
                rpta = 0;
            }
            return rpta;
        }

        [HttpGet]
        [Route("api/Persona/listarPersonasCombo")]
        public IEnumerable<PersonaCLS> ListarPersonasCombo()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                IEnumerable<PersonaCLS> listaPersona = (from persona in bd.Persona
                                                 where persona.Bhabilitado == 1
                                                 && persona.Btieneusuario==0 
                                                 select new PersonaCLS
                                                 {
                                                     iidPersona = persona.Iidpersona,
                                                     nombreCompleto = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno

                                                 }).ToList();
                return listaPersona;
            }
        }


    }
}