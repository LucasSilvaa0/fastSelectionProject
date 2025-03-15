using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using fastSelectionProject.Data; // Substitua pelo namespace do seu projeto

[Route("api/[controller]")]
[ApiController]
public class WorkshopsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public WorkshopsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Workshops
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Workshop>>> GetWorkshops()
    {
        return await _context.Workshop.ToListAsync();
    }

    // GET: api/Workshops/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Workshop>> GetWorkshop(int id)
    {
        var workshop = await _context.Workshop.FindAsync(id);

        if (workshop == null)
        {
            return NotFound();
        }

        return workshop;
    }

    // POST: api/Workshops
    [HttpPost]
    public async Task<ActionResult<Workshop>> PostWorkshop(Workshop workshop)
    {
        _context.Workshop.Add(workshop);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetWorkshop), new { id = workshop.Id }, workshop);
    }

    // PUT: api/Workshops/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutWorkshop(int id, Workshop workshop)
    {
        if (id != workshop.Id)
        {
            return BadRequest();
        }

        _context.Entry(workshop).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Workshop.Any(e => e.Id == id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/Workshops/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteWorkshop(int id)
    {
        _context.Presenca.RemoveRange(_context.Presenca.Where(p => p.Id_workshop == id));
        await _context.SaveChangesAsync();

        var workshop = await _context.Workshop.FindAsync(id);
        if (workshop == null)
        {
            return NotFound();
        }

        _context.Workshop.Remove(workshop);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
