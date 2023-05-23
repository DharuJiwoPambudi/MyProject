
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyProject.Models
{
    [Table("MyProject_Account")]
    public class Account
    {
        [Key]
        public string Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; }
        //Navigation
        [JsonIgnore]
        public Employee Employee { get; set; }
        //public string EmployeeNIK { get; set; }
    }
}
