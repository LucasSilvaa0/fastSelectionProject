using fastSelectionProject.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class ColaboradoresController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ColaboradoresController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Colaboradores
    [HttpGet]
    public async Task<IActionResult> GetColaboradores()
    {
        return Ok(await _context.Colaborador.ToListAsync());
    }

    // GET: api/Colaboradores/20-10-2021
    [HttpGet("{data_atual}")]
    public async Task<IActionResult> GetColaboradoresAtuais(DateOnly data_atual)
    {
        return Ok(await _context.Colaborador.Where(c => c.data_inicial <= data_atual && (c.data_final == DateOnly.MinValue || c.data_final >= data_atual)).ToListAsync());
    }

    // POST: api/Colaboradores
    [HttpPost]
    public async Task<IActionResult> PostColaborador(Colaborador colaborador)
    {
        colaborador.data_inicial = DateOnly.FromDateTime(DateTime.Now);
        _context.Colaborador.Add(colaborador);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetColaboradores), new { id = colaborador.Id }, colaborador);
    }

    // DELETE: api/Colaboradores
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteColaborador(Colaborador id)
    {
        var colaborador = await _context.Colaborador.FindAsync(id);
        if (colaborador == null)
        {
            return NotFound();
        }

        colaborador.data_final = DateOnly.FromDateTime(DateTime.Now);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
// 