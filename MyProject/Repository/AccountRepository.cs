
using BCrypt.Net;
using MyProject.Context;
using MyProject.Models;
using MyProject.Repository.Interface;
using MyProject.ViewModels;

namespace MyProject.Repository
{
    public class AccountRepository : IAccount
    {
        private readonly MyContext myContext;
        public AccountRepository(MyContext myContext)
        {
            this.myContext = myContext;
        }

        public IEnumerable<Account> GetAll()
        {
            var myAcc = myContext.Accounts.ToList();
            if (myAcc != null)
            {
                return myAcc;
            }
            return CheckValidation.NullPounterAccount;
        }

       
        public Account Get(string email, string password)
        {

            var myAcc = myContext.Accounts.SingleOrDefault(a => a.Employee.Email == email);

            if (myAcc != null)
            {
                var myPass = BCrypt.Net.BCrypt.Verify(password, myAcc.Password);
                if (myPass != false)
                {
                    return myAcc;
                }
                return CheckValidation.PasswordNotPassed;
            }
            return CheckValidation.NullPointerAnAccount;
        }
        public Account GetByView(ViewLogin viewLogin)
        {

            var myAcc = myContext.Accounts.SingleOrDefault(a => a.Employee.Email == viewLogin.Email);

            if (myAcc != null)
            {
                var myPass = BCrypt.Net.BCrypt.Verify(viewLogin.Password, myAcc.Password);
                if (myPass != false)
                {
                    return myAcc;
                }
                return CheckValidation.PasswordNotPassed;
            }
            return CheckValidation.NullPointerAnAccount;
        }



    }
    public class CheckValidation
    {
        public const int NullPointer = 0;
        public const Account[] NullPounterAccount = null;
        public const Account NullPointerAnAccount = null;
        public const int Succeded = 1;
        public const int PhoneExist = 2;
        public const int EmailExist = 3;
        public const int DeptIdNull = 4;
        public const Account PasswordNotPassed = null;

        //public const int PasswordExist = 4;
    }
}
