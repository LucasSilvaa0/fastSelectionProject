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
    [HttpGet("{id}")]
    public async Task<IActionResult> GetWorkshopPresencas(int id)
    {
        Colaborador? colaborador = await _context.Colaborador.FindAsync(id);

        if (colaborador == null) return NotFound();

        var workshops = _context.Workshop.Where(w => w.Data_realizacao >= colaborador.data_inicial && (w.Data_realizacao <= colaborador.data_final || colaborador.data_final == DateOnly.MinValue));

        int total = workshops.Count();
        var workshopsList = await workshops.ToListAsync();

        int participacoes = _context.Presenca.Where(p => p.Id_colaborador == colaborador.Id).Count();

        return Ok(new
        {
            total,
            participacoes
        });
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