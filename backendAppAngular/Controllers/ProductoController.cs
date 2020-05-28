
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAppAngular.Clases;
using BackendAppAngular.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackendAppAngular.Controllers
{
    public class ProductoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        [Route("api/Producto/listarProductos")]
        public IEnumerable<ProductoCLS> ListarProductos()
        {
            using(BDRestauranteContext bd=new BDRestauranteContext())
            {
                List<ProductoCLS> lista= (from producto in bd.Producto
                                         join categoria in bd.Categoria
                                         on producto.Iidcategoria equals categoria.Iidcategoria
                                          where producto.Bhabilitado == 1
                                          select new ProductoCLS
                                         {
                                             idproducto=producto.Iidproducto,
                                             nombre=producto.Nombre,
                                             precio=(decimal)producto.Precio,
                                             stock=(int)producto.Stock,
                                             nombreCategoria=categoria.Nombre

                                         }).ToList();
                return lista;
            }
        }

        [HttpGet]
        [Route("api/Producto/listarProductosPorNombre/{nombre}")]
        public IEnumerable<ProductoCLS> ListarProductosPorNombre(string nombre)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<ProductoCLS> lista = (from producto in bd.Producto
                                           join categoria in bd.Categoria
                                           on producto.Iidcategoria equals categoria.Iidcategoria
                                           where producto.Bhabilitado==1
                                           && producto.Nombre.ToLower().Contains(nombre.ToLower())
                                           select new ProductoCLS
                                           {
                                               idproducto = producto.Iidproducto,
                                               nombre = producto.Nombre,
                                               precio = (decimal)producto.Precio,
                                               stock = (int)producto.Stock,
                                               nombreCategoria = categoria.Nombre

                                           }).ToList();
                return lista;
            }
        }

        [HttpGet]
        [Route("api/Producto/filtarProductosPorCategoria/{idcategoria}")]
        public IEnumerable<ProductoCLS> filtarProductosPorCategoria(int idcategoria)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<ProductoCLS> lista = (from producto in bd.Producto
                                           join categoria in bd.Categoria
                                           on producto.Iidcategoria equals categoria.Iidcategoria
                                           where producto.Bhabilitado == 1
                                           && producto.Iidcategoria == idcategoria
                                           select new ProductoCLS
                                           {
                                               idproducto = producto.Iidproducto,
                                               nombre = producto.Nombre,
                                               precio = (decimal)producto.Precio,
                                               stock = (int)producto.Stock,
                                               nombreCategoria = categoria.Nombre

                                           }).ToList();
                return lista;
            }
        }

        [HttpGet]
        [Route("api/Producto/listarMarcas")]
        public IEnumerable<MarcaCLS> listarMarcas()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<MarcaCLS> lista = (from marca in bd.Marca
                                           where marca.Bhabilitado == 1
                                           select new MarcaCLS
                                           {
                                               iidmarca=marca.Iidmarca,
                                               nombre=marca.Nombre

                                           }).ToList();
                return lista;
            }
        }


    }
}