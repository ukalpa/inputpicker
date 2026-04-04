# InputPicker — .NET Test Example

Replaces the PHP `example-json.php` backend with an **ASP.NET Core 8 Minimal API**.

---

## Project Structure

```
dotnet-example/
├── InputPickerApi/
│   ├── InputPickerApi.csproj
│   ├── Program.cs                  ← Minimal API (all logic here)
│   ├── appsettings.json
│   └── example-districts.json     ← Same data as PHP example
└── test.html                       ← HTML test page (open in browser)
```

---

## Requirements

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)

---

## How to Run

```bash
# 1. Go to the API project folder
cd dotnet-example/InputPickerApi

# 2. Run the API
dotnet run
```

The API starts at **http://localhost:5000**

```bash
# 3. Open the test page in your browser
#    (serve it from the dotnet-example folder, or just open the file directly)
open test.html
# or on Linux:
xdg-open test.html
```

---

## API Endpoint

### `GET /api/districts`

Mirrors `example-json.php` exactly.

| Param | Type | Description |
|---|---|---|
| `q` | string | Keyword filter (searches name, hasc, region\_name) |
| `p` | int | Page number — enables pagination mode |
| `per_page` | int | Rows per page (default 10, pagination only) |
| `sleep` | int | Artificial delay in seconds (0–3, for testing autoOpen) |

**Filter response:**
```json
{
  "msg": "",
  "data": [
    { "id": 2, "regionId": 1, "name": "Auckland", "hasc": "AL", "regionName": "Auckland" }
  ]
}
```

**Pagination response:**
```json
{
  "msg": "",
  "p": 1,
  "count": 74,
  "per_page": 10,
  "data": [ ... ]
}
```

---

## Test Cases in `test.html`

| Test | Feature | How to test |
|---|---|---|
| **1** | Basic remote search | Type a district name |
| **2** | `openAfterLoad` 🆕 | Dropdown opens automatically after 1 s delay |
| **3** | `nextPicker` 🆕 | Type `"zzz"` in Picker A → jumps to Picker B |
| **4** | `autoOpen` fix 🔧 | Tab from dummy field into picker while it loads (2 s delay) |
| **5** | Pagination | Navigate pages in the dropdown footer |

---

## Comparison with PHP

| PHP (`example-json.php`) | .NET (`Program.cs`) |
|---|---|
| `$_GET['q']` | `string? q` param |
| `$_GET['p']` | `int? p` param |
| `$_GET['per_page']` | `int? per_page` param |
| `sleep($sleep)` | `await Task.Delay(...)` |
| `file_get_contents(...)` | `File.ReadAllText(...)` |
| `json_encode([...])` | `Results.Ok(new { ... })` |
