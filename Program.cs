using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthorization();
var app = builder.Build();

app.UseHttpsRedirection();

var fileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "dist"));
app.UseDefaultFiles(new DefaultFilesOptions
{
    FileProvider = fileProvider,
    DefaultFileNames = new List<string> { "index.html" }
});
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = fileProvider
});

app.UseRouting();

app.UseAuthorization();

app.Use(async (context, next) =>
{
    if ((string)context.Request.Path !=  "")
    {
        await context.Response.SendFileAsync("dist/index.html");
        return;
    }
    await next();
});

app.Run();
