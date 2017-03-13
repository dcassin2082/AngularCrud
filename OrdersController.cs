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
    public class OrdersController : ApiController
    {
        private IUnitOfWork unitOfWork = new UnitOfWork();

        // GET: api/Orders
        public IQueryable<Order> GetOrders()
        {
            return unitOfWork.OrderRepository.GetAll();
        }

        // GET: api/Orders/5
        [ResponseType(typeof(Order))]
        public IHttpActionResult GetOrder(int id)
        {
            Order order = unitOfWork.OrderRepository.GetSingle(id);
            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        // PUT: api/Orders/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOrder(int id, Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != order.OrderId)
            {
                return BadRequest();
            }

            unitOfWork.OrderRepository.Attach(order);

            try
            {
                unitOfWork.Commit();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/Orders
        [ResponseType(typeof(Order))]
        public IHttpActionResult PostOrder(Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            unitOfWork.OrderRepository.Add(order);
            unitOfWork.Commit();

            return CreatedAtRoute("DefaultApi", new { id = order.OrderId }, order);
        }

        // DELETE: api/Orders/5
        [ResponseType(typeof(Order))]
        public IHttpActionResult DeleteOrder(int id)
        {
            Order order = unitOfWork.OrderRepository.GetSingle(id);
            if (order == null)
            {
                return NotFound();
            }

            unitOfWork.OrderRepository.Delete(order);
            unitOfWork.Commit();

            return Ok(order);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OrderExists(int id)
        {
            return unitOfWork.OrderRepository.GetEntities(e => e.OrderId == id).Count() > 0;
        }
    }
}