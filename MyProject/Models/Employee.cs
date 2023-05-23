using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyProject.Models
{
    [Table("MyProject_Employee")] //merubah nama table
    public class Employee
    {
        [Key]
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        //[JsonIgnore]
        public string NIK { get; set;}
        //Primarykey yang dari tabel model
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public DateTime BirthDate { get; set; }
        public int Salary { get; set; }
        public string Email { get; set; }
        public Gender Gender { get; set; }
        //Navigation
        public int DepartmentId { get; set; }
        [JsonIgnore]
        public virtual Department? Department { get; set; }
        [JsonIgnore]
        public virtual Account? Account { get; set; }

        
        
        //Pengaplikasian fungsi enum untuk final genarate jenis kelamin

    }
    public enum Gender
    {
        Male,
        Female
    }
}
//duplicate = ctrl + d
//pindah baris = alt + row
//cut = ctrl + l
//to difine pk we can use Id as atribute