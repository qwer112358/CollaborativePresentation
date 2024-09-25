class LineService {
  async saveLine(line) {
    // Формируем объект для сохранения линии или фигуры
    const lineToSave = {
      id: 0,
      points: line.points ? JSON.stringify(line.points) : null, // Для фигур это null
      stroke: line.stroke || 'black',
      tool: line.tool || 'line',
      startX: line.startX || 0, // Должно быть числом
      startY: line.startY || 0, // Должно быть числом
      endX: line.endX || 0, // Должно быть числом
      endY: line.endY || 0, // Должно быть числом
    };

    try {
      const response = await fetch('http://localhost:5247/api/whiteboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([lineToSave]), // Отправляем JSON в виде массива объектов
      });

      if (!response.ok) {
        throw new Error('Failed to save line to database');
      }
    } catch (err) {
      console.error('Error saving data to DB: ', err);
    }
  }
}

const lineService = new LineService();
export default lineService;
