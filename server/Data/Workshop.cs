using System.ComponentModel.DataAnnotations;

namespace fastSelectionProject.Data
{
    public class Workshop
    {
        [Key]
        public int Id { get; set; }

        public required string Nome { get; set; }
        public DateOnly Data_realizacao { get; set; }
        public required string Descricao { get; set; }
    }
}