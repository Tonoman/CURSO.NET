using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAppAngular.Clases;
using BackendAppAngular.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackendAppAngular.Controllers
{
    public class CategoriaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/Categoria/listarCategorias")]
        public IEnumerable<CategoriaCLS> ListarCategorias()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<CategoriaCLS> listaCategoria = (from categoria in bd.Categoria
                                           where categoria.Bhabilitado == 1
                                           select new CategoriaCLS
                                           {
                                               iidCategoria = categoria.Iidcategoria,
                                               nombreCategoria = categoria.Nombre,
                                           }).ToList();
                return listaCategoria;
            }
        }
    }


}