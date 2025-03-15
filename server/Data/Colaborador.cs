using System.ComponentModel.DataAnnotations;

namespace fastSelectionProject.Data
{
    public class Colaborador
    {
        [Key]
        public int Id { get; set; }

        public required string Nome { get; set; }
        public DateOnly data_inicial { get; set; }
        public DateOnly data_final { get; set; }

    }
}