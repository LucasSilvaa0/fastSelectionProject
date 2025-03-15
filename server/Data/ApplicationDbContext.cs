using fastSelectionProject.Data;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Colaborador> Colaborador { get; set; }
    public DbSet<Workshop> Workshop { get; set; }
    public DbSet<Presenca> Presenca { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Definir a chave primária composta da tabela de junção Presenca
        modelBuilder.Entity<Presenca>()
            .HasKey(p => new { p.Id_colaborador, p.Id_workshop });
    }
}
