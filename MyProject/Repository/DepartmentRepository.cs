using Microsoft.EntityFrameworkCore;
using MyProject.Context;
using MyProject.Models;
using MyProject.Repository.Interface;

namespace MyProject.Repository
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly MyContext myContext;
        public DepartmentRepository(MyContext myContext)
        {
            this.myContext = myContext;
        }
        public int Delete(int ID)
        {
            var myDept = myContext.Departments.Find(ID);
            if (myDept != null)
            {
                myContext.Departments.Remove(myDept);
                var get = myContext.SaveChanges();
                return get;
            }
            return CheckValidation.NullPointer;
        }

        public async Task<IEnumerable<Department>> Get()
        {
            var myDept = myContext.Departments.Count();
            if (myDept != 0)
            {
                return await myContext.Departments.ToListAsync();
            }
            return Enumerable.Empty<Department>();
        }

        public Department Get(int ID)
        {
            var myDept = myContext.Departments.Find(ID);
            if (myDept != null)
            {
                return myDept;
            }
            return null;

        }

        public int Insert(Department department)
        {
            var myNameDept = myContext.Departments.SingleOrDefault(d => d.DepartmentName == department.DepartmentName);
            if (myNameDept == null)
            {
                myContext.Departments.Add(department);
                myContext.SaveChanges();
                return CheckValidation.Successful;
            }
            return CheckValidation.NameExists;
        }

        public int Update(Department department)
        {
            var myDept = myContext.Departments.Find(department.Id);
            if (myDept != null)
            {
                if (myContext.Departments.FirstOrDefault(d => d.DepartmentName == department.DepartmentName) == null)
                {
                    myContext.Entry(myDept).CurrentValues.SetValues(department);
                    return myContext.SaveChanges();
                }
                return CheckValidation.NameExists;
            }
            return CheckValidation.NullPointer;
        }
        public class CheckValidation
        {
            public const int Successful = 1;
            public const int NameExists = 2;
            public const int NullPointer = 3;
            public const Department[] NullPointerDeptList = null;
        }
    }
}
