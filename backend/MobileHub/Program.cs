using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using MobileHub.Src.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

var ip = Env.GetString("LOCAL_IP");

var mobileHubOrigin = "_mobilehub";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: mobileHubOrigin,
                      policy  =>
                      {
                          policy.WithOrigins(ip)
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                      });
});

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            ValidateIssuerSigningKey = true,
            ValidateAudience = true,
            ValidateIssuer = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                builder.Configuration.GetSection("AppSettings:Token").Value))
        };
    }
);

builder.Services.AddDbContext<DataContext>(opt => opt.UseSqlite("Data Source=MobileHub.db"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(mobileHubOrigin);

app.UseAuthorization();

app.MapControllers();

app.Run();
