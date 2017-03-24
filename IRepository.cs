using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace NgCrud.Repository
{
    public interface IRepository<T> where T : class
    {
        IQueryable<T> GetAll();
        T GetSingle(int id);
        void Attach(T entity);
        void Add(T entity);
        void Delete(T entity);
        T GetEntity(Expression<Func<T, bool>> predicate);
        IQueryable<T> GetEntities(Expression<Func<T, bool>> predicate);
    }
}
