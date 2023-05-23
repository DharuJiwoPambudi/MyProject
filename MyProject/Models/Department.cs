using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyProject.Models
{
    [Table("MyProject_Department")]
    public class Department
    {
        [Key]
        public int Id { get; set; }
        public string DepartmentName { get; set; }

        //navigation property
        //[JsonIgnore]
        //public virtual ICollection<Employee> Employees { get; set; }

    }
}
