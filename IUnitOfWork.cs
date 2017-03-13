using NgCrud.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NgCrud.Repository
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<Customer> CustomerRepository { get; }
        IRepository<Product> ProductRepository { get; }
        IRepository<Supplier> SupplierRepository { get; }
        IRepository<Order> OrderRepository { get; }
        void Commit();
    }
}