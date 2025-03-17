using Microsoft.EntityFrameworkCore;
using MySqlConnector;

var builder = WebApplication.CreateBuilder(args);

// Adiciona o contexto do banco de dados
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrEmpty(connectionString))
{
    throw new Exception("A variável de ambiente DB_CONNECTION_STRING não foi encontrada.");
}


builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 30)),
        mySqlOptions => mySqlOptions.EnableRetryOnFailure(maxRetryCount: 2)));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3000",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

Console.WriteLine(connectionString);

builder.Services.AddControllers();
var app = builder.Build();

app.UseCors("AllowLocalhost3000");

app.UseAuthorization();
app.MapControllers();

app.Run();
