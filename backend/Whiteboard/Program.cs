using Microsoft.EntityFrameworkCore;
using System;
using Whiteboard.Data;
using Whiteboard.Hubs;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();

builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
	options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddCors(options =>
{
	options.AddDefaultPolicy(policy =>
	{
		policy.AllowAnyHeader();
		policy.AllowAnyMethod();
		policy.AllowCredentials();
		policy.SetIsOriginAllowed(hostName => true);
	});
});
var app = builder.Build();
app.UseCors();
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

//app.UseHttpsRedirection();


app.MapControllers();
app.MapHub<WhiteboardHub>("/whiteboardHub");
app.Run();
