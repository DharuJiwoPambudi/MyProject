using MyProject.Models;

namespace MyProject.Repository.Interface
{
    public interface IEmployeeRepository
    {
        //method Get untuk emngambil seluruh data dari database dengan pengembalian berupa list
        IEnumerable<Employee> Get();
        //method Get(nik) untuk mengambil data dengan nik tertentu
        Employee Get(string NIK);
        //method inset untuk memasukkan data baru ke dalam basis data
        int Insert(Employee employee);
        //method update untuk memperbarui data
        int Update(Employee employee);
        //metod delete untuk menghapus data dengan nik tertentu
        int Delete(string NIK);
    }
}
