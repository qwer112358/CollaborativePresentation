namespace Whiteboard.Models
{
	public class Line
	{
		public int Id { get; set; }
		public string Points { get; set; } // Для линии или фигур это может быть строка JSON
		public string Stroke { get; set; } // Цвет линии или фигуры
		public string Tool { get; set; }   // Тип инструмента: pencil, rect, circle, arrow
		public float? StartX { get; set; } 
		public float? StartY { get; set; } 
		public float? EndX { get; set; }   
		public float? EndY { get; set; }   
	}
}
