using fastSelectionProject.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class PresencasController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public PresencasController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Presencas/1
    [HttpGet("{id_workshop}")]
    public async Task<IActionResult> GetWorkshopPresencas(int id_workshop)
    {
        return Ok(await (from p in _context.Presenca
                         from c in _context.Colaborador
                         where p.Id_workshop == id_workshop
                         where p.Id_colaborador == c.Id
                         select new
                         {
                             c.Id,
                             c.Nome
                         }).ToListAsync());
    }


    // GET: api/Presencas
    [HttpGet]
    public async Task<IActionResult> GetPresencas()
    {
        return Ok(await (from w in _context.Workshop
                         select new
                         {
                             Workshop_id = w.Id,
                             Workshop_nome = w.Nome,
                             Workshop_data = w.Data_realizacao,
                             Colaboradores = (from col in _context.Colaborador
                                              from pre in _context.Presenca
                                              where pre.Id_workshop == w.Id
                                              where pre.Id_colaborador == col.Id
                                              select new
                                              {
                                                  col.Id,
                                                  col.Nome
                                              }).ToList()
                         }).ToListAsync());
    }

    // POST: api/Presencas
    [HttpPost]
    public async Task<IActionResult> PostColaborador(Presenca presenca)
    {
        _context.Presenca.Add(presenca);
        var retorno = await _context.SaveChangesAsync();

        Console.WriteLine(retorno);

        return retorno > 0 ? Ok() : BadRequest();
    }
}
// 