using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NgCrud.Models;

namespace NgCrud.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private IRepository<Customer> customerRepo;
        private IRepository<Product> productRepo;
        private IRepository<Order> orderRepo;
        private IRepository<Supplier> supplierRepo;

        private CustomerOrdersEntities context = new CustomerOrdersEntities();

        public IRepository<Customer> CustomerRepository
        {
            get
            {
                return customerRepo ?? (customerRepo = new Repository<Customer>(context));
            }
        }

        public IRepository<Order> OrderRepository
        {
            get
            {
                return orderRepo ?? (orderRepo = new Repository<Order>(context));
            }
        }

        public IRepository<Product> ProductRepository
        {
            get
            {
                return productRepo ?? (productRepo = new Repository<Product>(context));
            }
        }

        public IRepository<Supplier> SupplierRepository
        {
            get
            {
                return supplierRepo ?? (supplierRepo = new Repository<Supplier>(context));
            }
        }

        public void Commit()
        {
            context.SaveChanges();
        }

        public void Dispose()
        {
            context.Dispose();
        }
    }
}