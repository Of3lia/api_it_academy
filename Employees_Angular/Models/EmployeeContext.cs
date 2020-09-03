using Microsoft.EntityFrameworkCore;

namespace empleats_it_academy.Models
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions<EmployeeContext> options)
            : base (options)
        {
        }
        public DbSet<Employee> Employees { get; set; }
    }
}
