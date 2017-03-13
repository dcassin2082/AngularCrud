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
    public class SuppliersController : ApiController
    {
        private IUnitOfWork unitOfWork = new UnitOfWork();

        // GET: api/Suppliers
        public IQueryable<Supplier> GetSuppliers()
        {
            return unitOfWork.SupplierRepository.GetAll();
        }

        // GET: api/Suppliers/5
        [ResponseType(typeof(Supplier))]
        public IHttpActionResult GetSupplier(int id)
        {
            Supplier supplier = unitOfWork.SupplierRepository.GetSingle(id);
            if (supplier == null)
            {
                return NotFound();
            }

            return Ok(supplier);
        }

        // PUT: api/Suppliers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSupplier(int id, Supplier supplier)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != supplier.SupplierId)
            {
                return BadRequest();
            }

            unitOfWork.SupplierRepository.Attach(supplier);

            try
            {
                unitOfWork.Commit();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SupplierExists(id))
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

        // POST: api/Suppliers
        [ResponseType(typeof(Supplier))]
        public IHttpActionResult PostSupplier(Supplier supplier)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            unitOfWork.SupplierRepository.Add(supplier);
            unitOfWork.Commit();

            return CreatedAtRoute("DefaultApi", new { id = supplier.SupplierId }, supplier);
        }

        // DELETE: api/Suppliers/5
        [ResponseType(typeof(Supplier))]
        public IHttpActionResult DeleteSupplier(int id)
        {
            Supplier supplier = unitOfWork.SupplierRepository.GetSingle(id);
            if (supplier == null)
            {
                return NotFound();
            }

            unitOfWork.SupplierRepository.Delete(supplier);
            unitOfWork.Commit();

            return Ok(supplier);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SupplierExists(int id)
        {
            return unitOfWork.SupplierRepository.GetEntities(e => e.SupplierId == id).Count() > 0;
        }
    }
}