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
        public IEnumerable<PersonaCLS> listarPersonas()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<PersonaCLS> listaPersona = (from persona in bd.Persona
                                           where persona.Bhabilitado == 1
                                           select new ProductoCLS
                                           {
                                               iidpersona = persona.Iidpersona,
                                               nombreCompleto = persona.Nombre+" "+persona.Appaterno+" "+persona.Apmaterno,
                                               telefono = persona.Telefono,
                                               correo = persona.Correo 

                                           }).ToList();
                return listaPersona;
            }
        }

    }
}