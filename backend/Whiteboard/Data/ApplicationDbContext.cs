using Microsoft.EntityFrameworkCore;
using Whiteboard.Models;

namespace Whiteboard.Data
{
	public class ApplicationDbContext : DbContext
	{
		public DbSet<Line> Lines { get; set; }

		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
			: base(options)
		{
		}
	}
}
