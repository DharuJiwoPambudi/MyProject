using Microsoft.EntityFrameworkCore;
using MyProject.Context;
using MyProject.Models;
using MyProject.Repository.Interface;
using MyProject.ViewModels;
using System.Text.RegularExpressions;

namespace MyProject.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        //readonly myContext untuk penghubung data dengan database
        private readonly MyContext myContext;
        public EmployeeRepository(MyContext myContext)
        {
            this.myContext = myContext;
        }

        public int Delete(string NIK)
        {
            var myNik = myContext.Employees.Find(NIK);
            if (myNik != null)
            {
                myContext.Employees.Remove(myNik);
                return myContext.SaveChanges();
            }
            return CheckValidation.NullPointer;
        }

        public IEnumerable<Employee> Get()
        {
            var myEmp = myContext.Employees.Count();
            if (myEmp != 0)
            {
                return myContext.Employees
                    .Include(e => e.Department)
                    .Include(e => e.Account)
                    .ToList();
            }
            return CheckValidation.NullPointerEmpList;
        }

        public Employee Get(string NIK)
        {
            var myEmp = myContext.Employees.Find(NIK);
            if (myEmp != null)
            {
                return myContext.Employees
                    .Include(e => e.Department)
                    .Include(e => e.Account)
                    .SingleOrDefault(e => e.NIK == NIK);
            }
            return CheckValidation.NullPointerEmp;
        }

        //public Employee GetByPhone(string other)
        //{
        //    return myContext.Employees.FirstOrDefault(e => e.Phone == other);

        //}

        //public Employee GetByMail(string other)
        //{
        //    return myContext.Employees.FirstOrDefault(e => e.Email == other);
        //}

        public int Insert(Employee employee)
        {
            if (myContext.Employees.SingleOrDefault(e => e.Email == employee.Email) == null)
            {
                if (myContext.Employees.SingleOrDefault(e => e.Phone == employee.Phone) == null)
                {
                    //if (myContext.Employees.Count() == 0)
                    //{
                    //    //generate NIK
                    //    string myNik = DateTime.Today.ToString("ddMMyyyy") +
                    //        Convert.ToString((myContext.Employees.Count() + 1)).PadLeft(3, '0');
                    //    employee.NIK = myNik;
                    //    myContext.Entry(employee).State = EntityState.Added;
                    //    var save = myContext.SaveChanges();
                    //    return CheckValidation.Successful;
                    //}
                    ////else kondisi
                    //else
                    //{
                    //    long temp = (Convert.ToInt64(myContext.Employees.Max(e => e.NIK)) + 1);
                    //    String myNik2 = Convert.ToString(temp).PadLeft(11, '0');
                    //    employee.NIK = myNik2;
                    //    myContext.Entry(employee).State = EntityState.Added;
                    //    var save = myContext.SaveChanges();
                    //    return CheckValidation.Successful;
                    //}
                    employee.NIK = NewNIK(employee);
                    myContext.Entry(employee).State = EntityState.Added;
                    myContext.SaveChanges();
                    return CheckValidation.Successful;
                }
                return CheckValidation.PhoneExist;
            }
            return CheckValidation.EmailExist;
        }

        public int Update(Employee employee)
        {

            if (myContext.Employees.SingleOrDefault(e => e.Email == employee.Email) == null)
            {
                if (myContext.Employees.SingleOrDefault(e => e.Phone == employee.Phone) == null)
                {
                    //myEmp.BirthDate = employee.BirthDate;
                    //myEmp.FirstName = employee.FirstName;
                    //myEmp.LastName = employee.LastName;
                    //myEmp.Email = employee.Email;
                    //myEmp.Phone = employee.Phone;
                    //myEmp.Salary = employee.Salary;
                    //myEmp.Gender = employee.Gender;
                    //myEmp.Department = employee.Department;
                    //myContext.Entry(myEmp).State = EntityState.Modified;
                    //myContext.Employees.Entry(myEmp).CurrentValues.SetValues(employee);
                    //return myContext.SaveChanges();
                    //return CheckValidation.Successful;
                    //Unknown

                    myContext.Attach(employee);
                    myContext.Entry(employee).State = EntityState.Unchanged;
                    myContext.Entry(employee).State = EntityState.Modified;
                    return myContext.SaveChanges();

                }
                return CheckValidation.PhoneExist;
            }
            return CheckValidation.EmailExist;

        }

        public IEnumerable<Object> GetSaveralRows()
        {

            var myObject = (from e in myContext.Employees
                            join d in myContext.Departments
                            on e.Department.Id equals d.Id
                            select new
                            {
                                NIK = e.NIK,
                                //FirstName = e.FirstName,
                                //LastName = e.LastName,
                                FullName = e.FirstName + " " + e.LastName,
                                DepartmentName = d.DepartmentName
                            });
            if (myObject.Count() != 0)
            {
                return myObject.ToList();
            }
            return CheckValidation.NullPointerEmpList;
        }
        public string NewNIK(Employee employee)
        {
            string myNIK = "";
            if (myContext.Employees.Count() == 0)
            {
                //generate NIK
                string myNik = DateTime.Today.ToString("ddMMyyyy") +
                    Convert.ToString((myContext.Employees.Count() + 1)).PadLeft(3, '0');
            }
            //else kondisi
            else
            {
                long temp = (Convert.ToInt64(myContext.Employees.Max(e => e.NIK)) + 1);
                String myNik2 = Convert.ToString(temp).PadLeft(11, '0');
            }
            return myNIK;
        }
        public int Register(NewAccount newAccount)
        {
            var checkUserName = IsValidUserName(newAccount.UserName);
            if (checkUserName)
            {
                Employee myEmp = new Employee
                {
                    NIK = NewNIK(),
                    Email = newAccount.Email,
                    FirstName = newAccount.FirstName,
                    LastName = newAccount.LastName,
                    Gender = (Gender)newAccount.Gender,
                    Phone = newAccount.Phone,
                    Salary = newAccount.Salary,
                    BirthDate = newAccount.BirthDate,
                    //departmentId => maybe given as foreign key
                    DepartmentId = newAccount.DeptId
                };
                var checkPassword = IsValidPassword(newAccount.Password);

                if (checkPassword == true)
                {
                    if (myContext.Employees.SingleOrDefault(e => e.Email == newAccount.Email) == null)
                    {
                        if (myContext.Employees.SingleOrDefault(e => e.Phone == newAccount.Phone) == null)
                        {
                            if (myContext.Departments.Find(newAccount.DeptId) != null)
                            {
                                var passwordHash = BCrypt.Net.BCrypt.HashPassword(newAccount.Password);
                                myContext.Entry(myEmp).State = Microsoft.EntityFrameworkCore.EntityState.Added;
                                Account myAcc = new Account
                                {
                                    Id = myEmp.NIK,
                                    Password = passwordHash,
                                    UserName = newAccount.UserName,
                                    //Id = myEmp.NIK
                                };
                                myContext.Entry(myAcc).State = Microsoft.EntityFrameworkCore.EntityState.Added;
                                myContext.SaveChanges();
                                return CheckValidation.Successful;
                            }
                            return CheckValidation.DeptIdNull;
                        }
                        return CheckValidation.PhoneExist;
                    }
                    return CheckValidation.EmailExist;
                }
                return CheckValidation.InvalidPassword;
            }
            return CheckValidation.InvalidUserName;

        }
        public string NewNIK()
        {
            string myNIK = "";
            if (myContext.Employees.Count() == 0)
            {
                //generate NIK
                myNIK = DateTime.Today.ToString("ddMMyyyy") +
                   Convert.ToString((myContext.Employees.Count() + 1)).PadLeft(3, '0');
            }
            //else kondisi
            else
            {
                long temp = (Convert.ToInt64(myContext.Employees.Max(e => e.NIK)) + 1);
                myNIK = Convert.ToString(temp).PadLeft(11, '0');
            }
            return myNIK;
        }
        public static bool IsValidPassword(string plainText)
        {
            Regex regex = new Regex("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_><.,]).{8,}$");
            Match match = regex.Match(plainText);
            return match.Success;
        }
        public bool IsValidUserName(string plainText)
        {
            Regex regex = new Regex("^[A-Za-z\\s]*$");
            Match match = regex.Match(plainText);
            return match.Success;
        }
        public class CheckValidation
        {
            public const int Successful = 1;
            public const int PhoneExist = 2;
            public const int EmailExist = 3;
            public const int NullPointer = 4;
            public const Employee[] NullPointerEmpList = null;
            public const Employee NullPointerEmp = null;
            public const int DeptIdNull = 5;
            public const int InvalidPassword = 6;
            public const int InvalidUserName = 7;
        }
    }

}
/// <summary>
///     Finds an entity with the given primary key values. If an entity with the given primary key values
///     is being tracked by the context, then it is returned immediately without making a request to the
///     database. Otherwise, a query is made to the database for an entity with the given primary key values
///     and this entity, if found, is attached to the context and returned. If no entity is found, then
///     null is returned.
/// </summary>
//return myContext.Employees.Find(NIK);

// <summary>Returns the first element of a sequence, or a default value if the sequence contains no elements.</summary>
// return myContext.Employees.FirstOrDefault(e => e.NIK == NIK);

// The second one.All other things being equal, the iterator in the second case can stop as soon as it finds a match,
// where the first one must find all that match, and then pick the first of those.
//return myContext.Employees.Where(e => e.NIK == NIK).FirstOrDefault();
// < summary > Returns the only element of a sequence, or a default value if the sequence is empty; this method throws an exception if there is more than one element in the sequence.</ summary >
//return myContext.Employees.Where(e => e.NIK == NIK).SingleOrDefault();  