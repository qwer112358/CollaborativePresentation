using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Whiteboard.Data;

namespace Whiteboard.Hubs
{
	public class WhiteboardHub : Hub
	{
		private readonly ApplicationDbContext _context;

		public WhiteboardHub(ApplicationDbContext context)
		{
			_context = context;
		}

		public override async Task OnConnectedAsync()
		{
			// Получение всех линий и фигур из БД
			var lines = await _context.Lines.ToListAsync();

			// Отправка всех элементов (линии, фигуры) новому пользователю
			await Clients.Caller.SendAsync("LoadPreviousDrawings", lines);

			await base.OnConnectedAsync();
		}

		public async Task SendDrawAction(string user, string actionData)
		{
			// Отправляем другим пользователям действия, кроме отправителя
			await Clients.Others.SendAsync("ReceiveDrawAction", user, actionData);
		}
	}

}
