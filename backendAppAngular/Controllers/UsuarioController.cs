using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAppAngular.Clases;
using BackendAppAngular.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackendAppAngular.Controllers
{
    public class UsuarioController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/Usuario/listarTipoUsuario")]
        public IEnumerable<TipoUsuarioCLS> ListarTipoUsuario()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<TipoUsuarioCLS> listaTipoUsuario = (from tipoUsuario in bd.TipoUsuario
                                                 where tipoUsuario.Bhabilitado == 1
                                                 select new TipoUsuarioCLS
                                                 {
                                                     IidTipoUsuario =   tipoUsuario.Iidtipousuario,
                                                     Nombre = tipoUsuario.Nombre
                                                 }).ToList();
                return listaTipoUsuario;
            }
        }

        [HttpGet]
        [Route("api/Usuario/listarUsuario")]
        public IEnumerable<UsuarioCLS> ListarUsuario()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<UsuarioCLS> listaUsuario = (from usuario in bd.Usuario
                                                 join persona in bd.Persona
                                                 on usuario.Iidpersona equals persona.Iidpersona
                                                 join TipoUsuario in bd.TipoUsuario
                                                 on usuario.Iidtipousuario equals TipoUsuario.Iidtipousuario
                                                         where usuario.Bhabilitado == 1
                                                         select new UsuarioCLS
                                                         {
                                                             iidUsuario = usuario.Iidusuario,
                                                             nombreUsuario = usuario.Nombreusuario,
                                                             nombrePersona = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno,
                                                             nombreTipoUsuario = TipoUsuario.Nombre
                                                         }).ToList();
                return listaUsuario;
            }
        }

        [HttpGet]
        //{idTipo?} permite el parametro vacio y lo ihualamos a 0
        [Route("api/Usuario/filtrarUsuarioPorTipo/{idTipo?}")]
        public IEnumerable<UsuarioCLS> filtrarUsuarioPorTipo(int idTipo=0)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<UsuarioCLS> listaUsuario = (from usuario in bd.Usuario
                                                 join persona in bd.Persona
                                                 on usuario.Iidpersona equals persona.Iidpersona
                                                 join TipoUsuario in bd.TipoUsuario
                                                 on usuario.Iidtipousuario equals TipoUsuario.Iidtipousuario
                                                 where usuario.Bhabilitado == 1
                                                 && usuario.Iidtipousuario == idTipo
                                                 select new UsuarioCLS
                                                 {
                                                     iidUsuario = usuario.Iidusuario,
                                                     nombreUsuario = usuario.Nombreusuario,
                                                     nombrePersona = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno,
                                                     nombreTipoUsuario = TipoUsuario.Nombre
                                                 }).ToList();
                return listaUsuario;
            }
        }



    }
}