namespace Whiteboard.Models
{
	public class Line
	{
		public int Id { get; set; }
		public string Points { get; set; } // Для линии или фигур это может быть строка JSON
		public string Stroke { get; set; } // Цвет линии или фигуры
		public string Tool { get; set; }   // Тип инструмента: pencil, rect, circle, arrow
		public float? StartX { get; set; } // Начальная координата для фигур
		public float? StartY { get; set; } // Начальная координата для фигур
		public float? EndX { get; set; }   // Конечная координата для фигур
		public float? EndY { get; set; }   // Конечная координата для фигур
	}
}
