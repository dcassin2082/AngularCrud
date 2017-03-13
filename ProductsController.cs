using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using NgCrud.Models;
using NgCrud.Repository;

namespace NgCrud.Controllers
{
    public class ProductsController : ApiController
    {
        private IUnitOfWork unitOfWork = new UnitOfWork();

        // GET: api/Products
        public IQueryable<Product> GetProducts()
        {
            return unitOfWork.ProductRepository.GetAll();
        }

        // GET: api/Products/5
        [ResponseType(typeof(Product))]
        public IHttpActionResult GetProduct(int id)
        {
            Product product = unitOfWork.ProductRepository.GetSingle(id);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        // PUT: api/Products/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProduct(int id, Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != product.ProductId)
            {
                return BadRequest();
            }

            unitOfWork.ProductRepository.Attach(product);

            try
            {
                unitOfWork.Commit();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Products
        [ResponseType(typeof(Product))]
        public IHttpActionResult PostProduct(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            unitOfWork.ProductRepository.Add(product);
            unitOfWork.Commit();

            return CreatedAtRoute("DefaultApi", new { id = product.ProductId }, product);
        }

        // DELETE: api/Products/5
        [ResponseType(typeof(Product))]
        public IHttpActionResult DeleteProduct(int id)
        {
            Product product = unitOfWork.ProductRepository.GetSingle(id);
            if (product == null)
            {
                return NotFound();
            }

            unitOfWork.ProductRepository.Delete(product);
            unitOfWork.Commit();

            return Ok(product);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductExists(int id)
        {
            return unitOfWork.ProductRepository.GetEntities(e => e.ProductId == id).Count() > 0;
        }
    }
}