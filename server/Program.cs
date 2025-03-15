using Microsoft.EntityFrameworkCore;
using MySqlConnector;

var builder = WebApplication.CreateBuilder(args);

// Adiciona o contexto do banco de dados
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 30)),
        mySqlOptions => mySqlOptions.EnableRetryOnFailure(maxRetryCount: 2)));

Console.WriteLine(connectionString);

builder.Services.AddControllers();
var app = builder.Build();

app.UseAuthorization();
app.MapControllers();

app.Run();
