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
        return Ok(await _context.Colaborador.OrderBy(c => c.data_final).ToListAsync());
    }

    // GET: api/Colaboradores/atuais/20-10-2021
    [HttpGet("atuais/{data_atual}")]
    public async Task<IActionResult> GetColaboradoresAtuais(DateOnly data_atual)
    {
        return Ok(await _context.Colaborador.Where(c => c.data_inicial <= data_atual && (c.data_final == DateOnly.MinValue || c.data_final >= data_atual)).ToListAsync());
    }

    // GET: api/Colaboradores/passados
    [HttpGet("passados")]
    public async Task<IActionResult> GetColaboradoresPassados()
    {
        return Ok(await _context.Colaborador.Where(c => c.data_final != DateOnly.MinValue).ToListAsync());
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
    public async Task<IActionResult> DeleteColaborador(int id)
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