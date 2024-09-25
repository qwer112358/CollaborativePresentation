class DrawingService {
  constructor() {
    this.lines = [];
    this.isDrawing = false;
    this.currentStroke = 'black';
    this.currentStrokeWidth = 5;
  }

  // Метод для начала рисования линий (карандаш или ластик)
  startDrawing(position, stroke = 'black', strokeWidth = 5) {
    this.isDrawing = true;
    this.currentStroke = stroke;
    this.currentStrokeWidth = strokeWidth;

    this.lines.push({
      points: [position.x, position.y],
      stroke: this.currentStroke,
      strokeWidth: this.currentStrokeWidth,
      tool: 'pencil',
    });
  }

  // Метод для продолжения рисования линии
  continueDrawing(position) {
    if (!this.isDrawing) return;

    const currentLine = this.lines[this.lines.length - 1];
    currentLine.points = currentLine.points.concat([position.x, position.y]);
  }

  // Метод завершения рисования линии
  endDrawing() {
    this.isDrawing = false;
    return this.lines[this.lines.length - 1];
  }

  // Методы для рисования фигур (если они вам нужны)
  startShapeDrawing(tool, startX, startY) {
    this.isDrawing = true;
    this.currentShape = {
      tool,
      startX,
      startY,
      endX: startX,
      endY: startY,
      stroke: this.currentStroke,
      strokeWidth: this.currentStrokeWidth,
    };
  }

  continueShapeDrawing(endX, endY) {
    if (!this.isDrawing || !this.currentShape) return;

    this.currentShape.endX = endX;
    this.currentShape.endY = endY;
  }

  endShapeDrawing() {
    this.isDrawing = false;
    this.lines.push(this.currentShape);
    const shape = this.currentShape;
    this.currentShape = null;
    return shape;
  }

  // Возвращает все линии и фигуры
  getLines() {
    return this.lines;
  }

  // Добавление внешних линий/фигур
  addExternalDraw(lines) {
    this.lines = this.lines.concat(lines);
  }

  clearCanvas() {
    this.lines = [];
  }
}

const drawingService = new DrawingService();
export default drawingService;
