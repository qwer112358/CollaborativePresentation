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
			var lines = await _context.Lines.ToListAsync();
			await Clients.Caller.SendAsync("LoadPreviousDrawings", lines);
			await base.OnConnectedAsync();
		}

		public async Task SendDrawAction(string user, string actionData)
		{
			await Clients.Others.SendAsync("ReceiveDrawAction", user, actionData);
		}
	}
}
