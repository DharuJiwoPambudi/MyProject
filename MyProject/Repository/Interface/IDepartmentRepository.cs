using MyProject.Models;

namespace MyProject.Repository.Interface
{
    public interface IDepartmentRepository
    {
        Task<IEnumerable<Department>> Get();
        //method Get(nik) untuk mengambil data dengan nik tertentu
        Department Get(int ID);
        //method inset untuk memasukkan data baru ke dalam basis data
        int Insert(Department department);
        //method update untuk memperbarui data
        int Update(Department department);
        //metod delete untuk menghapus data dengan nik tertentu
        int Delete(int ID);
    }
}
