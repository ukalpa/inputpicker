using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Allow CORS so the HTML test page can call the API from any origin
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();
app.UseCors();

// -----------------------------------------------------------------------
// Load the district data once on startup (same JSON used in PHP example)
// -----------------------------------------------------------------------
var jsonPath = Path.Combine(AppContext.BaseDirectory, "example-districts.json");
var jsonText = File.ReadAllText(jsonPath);
var allDistricts = JsonSerializer
    .Deserialize<DistrictFile>(jsonText, new JsonSerializerOptions { PropertyNameCaseInsensitive = true })!
    .Data;

// -----------------------------------------------------------------------
// GET /api/districts
//
// Query params (mirrors example-json.php behaviour):
//   q          – keyword filter (searches id, name, hasc, region_name)
//   p          – page number (enables pagination mode)
//   per_page   – rows per page (default 10, pagination mode only)
//   sleep      – artificial delay in seconds (0–3, for testing autoOpen)
// -----------------------------------------------------------------------
app.MapGet("/api/districts", async (
    string? q,
    int? p,
    int? per_page,
    int? sleep) =>
{
    // Optional artificial delay to test the pending-open / autoOpen fix
    var delay = Math.Clamp(sleep ?? 0, 0, 3);
    if (delay > 0)
        await Task.Delay(TimeSpan.FromSeconds(delay));

    // --- Pagination mode ---
    if (p.HasValue)
    {
        var perPage  = Math.Max(per_page ?? 10, 1);
        var count    = allDistricts.Count;
        var lastPage = (int)Math.Ceiling((double)count / perPage);
        var page     = Math.Clamp(p.Value, 1, Math.Max(lastPage, 1));

        var paged = allDistricts
            .Skip((page - 1) * perPage)
            .Take(perPage)
            .ToList();

        return Results.Ok(new
        {
            msg      = "",
            p        = page,
            count,
            per_page = perPage,
            data     = paged
        });
    }

    // --- Filter mode ---
    var keyword = (q ?? "").Trim().ToLower();
    var filtered = string.IsNullOrEmpty(keyword)
        ? allDistricts
        : allDistricts.Where(d =>
            d.Id.ToString().Contains(keyword) ||
            d.Name.Contains(keyword, StringComparison.OrdinalIgnoreCase) ||
            d.Hasc.Contains(keyword, StringComparison.OrdinalIgnoreCase) ||
            d.RegionName.Contains(keyword, StringComparison.OrdinalIgnoreCase)
        ).ToList();

    return Results.Ok(new { msg = "", data = filtered });
});

app.Run();

// -----------------------------------------------------------------------
// Models
// -----------------------------------------------------------------------
record District(
    int Id,
    int RegionId,
    string Name,
    string Hasc,
    string RegionName);

record DistrictFile(List<District> Data);
