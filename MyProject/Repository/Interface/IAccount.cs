
using MyProject.Models;
using MyProject.ViewModels;

namespace MyProject.Repository.Interface
{
    public interface IAccount
    {
        IEnumerable<Account> GetAll();
    }
}
