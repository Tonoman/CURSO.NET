﻿using System;
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

        [HttpGet]
        [Route("api/Producto/obtenerProductoPorId/{idProducto}")]
        public ProductoCLS obtenerProductoPorId(int idProducto)
        {

            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    var oProductoCLS = (from producto in bd.Producto
                                                where producto.Bhabilitado == 1
                                                && producto.Iidproducto==idProducto
                                                select new ProductoCLS
                                                {
                                                    idproducto = producto.Iidproducto,
                                                    nombre = producto.Nombre,
                                                    idcategoria = (int)producto.Iidcategoria,
                                                    idmarca = (int)producto.Iidmarca,
                                                    precio = (decimal)producto.Precio,
                                                    stock = (int)producto.Stock,
                                                }).First();
                    return oProductoCLS;

                }

            }
            catch (Exception ex)
            {
                return null;
            }

        }

        [HttpPost]
        [Route("api/Producto/registrarProducto")]
        public int registrarProducto([FromBody] ProductoCLS oProductoCLS)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                    if (oProductoCLS.idproducto == 0)
                    {
                        Producto oProducto = new Producto();
                        oProducto.Nombre = oProductoCLS.nombre;
                        oProducto.Precio = oProductoCLS.precio;
                        oProducto.Stock = oProductoCLS.stock;
                        oProducto.Iidmarca = oProductoCLS.idmarca;
                        oProducto.Iidcategoria = oProductoCLS.idcategoria;
                        oProducto.Bhabilitado = 1;

                        bd.Producto.Add(oProducto);
                        bd.SaveChanges();
                        rpta = 1;
                    }
                    else
                    {
                        //recuperar todala fila
                        Producto oProducto = bd.Producto.Where(p => p.Iidproducto == oProductoCLS.idproducto).First();
                        oProducto.Nombre = oProductoCLS.nombre;
                        oProducto.Precio = oProductoCLS.precio;
                        oProducto.Stock = oProductoCLS.stock;
                        oProducto.Iidmarca = oProductoCLS.idmarca;
                        oProducto.Iidcategoria = oProductoCLS.idcategoria;
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
        [Route("api/Producto/eliminarProducto/{idProducto}")]
        public int eliminarProducto(int idProducto)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    Producto oProducto = bd.Producto.Where(p => p.Iidproducto == idProducto).First();
                    oProducto.Bhabilitado = 0;
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


    }
}