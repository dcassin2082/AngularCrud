using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using NgCrud.Models;

namespace NgCrud.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        internal DbSet<T> dbSet;
        internal CustomerOrdersEntities dbContext;

        public Repository(CustomerOrdersEntities context)
        {
            dbContext = context;
            dbSet = dbContext.Set<T>();
        }

        public T GetSingle(int id)
        {
            return dbSet.Find(id);
        }

        public IQueryable<T> GetAll()
        {
            return dbSet;
        }

        public void Add(T entity)
        {
            dbSet.Add(entity);
        }

        public void Attach(T entity)
        {
            dbSet.Attach(entity);
            dbContext.Entry(entity).State = EntityState.Modified;
        }

        public void Delete(T entity)
        {
            dbSet.Remove(entity);
        }

        public IEnumerable<T> GetEntities(Expression<Func<T, bool>> predicate)
        {
            return dbContext.Set<T>().AsQueryable().Where(predicate).ToList();
        }

        public T GetEntity(Expression<Func<T, bool>> predicate)
        {
            return dbContext.Set<T>().AsQueryable().Where(predicate).FirstOrDefault();
        }

       
    }
}