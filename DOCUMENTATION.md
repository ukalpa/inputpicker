# jQuery InputPicker — Full Documentation

A jQuery plugin for rich dropdown selection with multiple columns, filtering, remote data, and chained pickers.

---

## Table of Contents

1. [Installation](#installation)
2. [Basic Usage](#basic-usage)
3. [All Options Reference](#all-options-reference)
4. [Methods](#methods)
5. [Events](#events)
6. [New Features](#new-features)
   - [openAfterLoad](#openafterload)
   - [nextPicker](#nextpicker)
   - [autoOpen Fix — Pending Open](#autoopen-fix--pending-open)
7. [Examples](#examples)

---

## Installation

```html
<link rel="stylesheet" href="./src/jquery.inputpicker.css" />
<script src="./src/jquery.inputpicker.js"></script>
```

> Requires jQuery.

---

## Basic Usage

```html
<input id="myInput" name="myInput" />

<script>
$('#myInput').inputpicker({
    data: ['Apple', 'Banana', 'Cherry'],
    fieldValue: 'value',
    fieldText: 'text'
});
</script>
```

### With objects and multiple columns:

```js
$('#myInput').inputpicker({
    data: [
        { id: 1, name: 'Alice', role: 'Admin' },
        { id: 2, name: 'Bob',   role: 'User'  }
    ],
    fieldValue: 'id',
    fieldText: 'name',
    fields: [
        { name: 'name', text: 'Name', width: '120px' },
        { name: 'role', text: 'Role', width: '80px'  }
    ],
    headShow: true
});
```

---

## All Options Reference

### Layout

| Option | Type | Default | Description |
|---|---|---|---|
| `width` | string | `'100%'` | Width of the inputpicker div |
| `height` | string | `'200px'` | Max height of the dropdown list |
| `responsive` | boolean | `true` | Adjust width on window resize |

### Data

| Option | Type | Default | Description |
|---|---|---|---|
| `data` | array | `[]` | Inline data. Accepts flat strings or objects |
| `fieldValue` | string | `'value'` | Object key used as the stored value |
| `fieldText` | string | `''` | Object key shown in the input (defaults to `fieldValue`) |
| `fields` | array | `[]` | Columns to display in the dropdown. Each item can be a string or `{ name, text, width }` |
| `headShow` | boolean | `false` | Show column header row |
| `limit` | number | `0` | Max number of rows to show (0 = unlimited) |

### Remote URL

| Option | Type | Default | Description |
|---|---|---|---|
| `url` | string | `''` | API endpoint to fetch JSON data from |
| `urlParam` | object | `{}` | Extra params merged into every request |
| `urlCache` | boolean | `false` | Cache remote results by param signature |
| `urlDelay` | number | `0` | Debounce delay (seconds) before triggering URL fetch on keyup |

### Filtering

| Option | Type | Default | Description |
|---|---|---|---|
| `filterOpen` | boolean | `false` | Filter the dropdown rows as the user types |
| `filterType` | string | `''` | `'start'` = match from start of string; `''` = match anywhere |
| `filterField` | string/array | `''` | Field(s) to apply filter on. Defaults to all fields |
| `highlightResult` | boolean | `false` | Highlight rows that best match the typed keyword |

### Selection Behaviour

| Option | Type | Default | Description |
|---|---|---|---|
| `autoOpen` | boolean | `false` | Open the dropdown when the input receives focus |
| `tabToSelect` | boolean | `false` | Pressing Tab selects the currently active row |
| `selectMode` | string | `'restore'` | What happens on Tab/blur: `'restore'` (revert), `'active'` (pick active row), `'new'` (keep typed text), `null` (clear) |
| `creatable` | boolean | `false` | Allow user to submit a value not in the list |

### Multiple / Tags

| Option | Type | Default | Description |
|---|---|---|---|
| `multiple` | boolean | `false` | Allow selecting multiple values |
| `tag` | boolean | `false` | Tag input mode (chip UI) |
| `delimiter` | string | `','` | Separator used between multiple values |

### Pagination

| Option | Type | Default | Description |
|---|---|---|---|
| `pagination` | boolean | `false` | Enable server-side pagination |
| `pageMode` | string | `''` | `''` = default footer; `'scroll'` = infinite scroll |
| `pageField` | string | `'p'` | Request param name for page number |
| `pageLimitField` | string | `'limit'` | Request param name for page size |
| `pageCurrent` | number | `1` | Starting page |
| `pageCountField` | string | `'count'` | Response field that contains total count |

### Styling

| Option | Type | Default | Description |
|---|---|---|---|
| `listBackgroundColor` | string | `''` | Dropdown background color |
| `listBorderColor` | string | `''` | Dropdown border color |
| `rowSelectedBackgroundColor` | string | `''` | Background of selected/active row |
| `rowSelectedFontColor` | string | `''` | Font color of selected/active row |

### 🆕 New Options

| Option | Type | Default | Description |
|---|---|---|---|
| `openAfterLoad` | boolean | `false` | Automatically open the dropdown once data has initialized and loaded |
| `nextPicker` | string | `null` | CSS selector of the next inputpicker to open when current picker has no results |

---

## Methods

Call methods via `$('#el').inputpicker('methodName', arg)`.

| Method | Arguments | Description |
|---|---|---|
| `init` | `options` | Initialize the inputpicker |
| `loadData` | `data, callback` | Reload data and re-render. Triggers `change` if value changed |
| `val` | `value` | Programmatically set selected value and trigger `change` |
| `data` | `array` | Get or set the data array |
| `show` | — | Open the dropdown |
| `hide` | — | Close the dropdown |
| `toggle` | — | Toggle the dropdown open/closed |
| `element` | `value, field` | Get the data object for a given value |
| `data_highlighted` | — | Get data object of currently highlighted row |
| `value_highlighted` | — | Get value of currently highlighted row |
| `removeValue` | `value` | Remove a specific value (multiple mode) |
| `jumpToPage` | `page` | Jump to a specific page (pagination mode) |
| `set` | `key, value` | Get or set an internal option at runtime |
| `destroy` | — | Remove the inputpicker and restore original input |

### Examples

```js
// Set value
$('#myInput').inputpicker('val', 42);

// Get currently selected data object
var obj = $('#myInput').inputpicker('element');

// Reload with new data
$('#myInput').inputpicker('loadData', newDataArray, function() {
    console.log('Reloaded');
});

// Programmatic open/close
$('#myInput').inputpicker('show');
$('#myInput').inputpicker('hide');
```

---

## Events

Listen on the **original** input element.

| Event | Description |
|---|---|
| `change` | Fires when the selected value changes |
| `change_highlight.inputpicker` | Fires when the highlighted/active row changes |

```js
$('#myInput').on('change', function() {
    console.log('New value:', $(this).val());
});

$('#myInput').on('change_highlight.inputpicker', function() {
    var highlighted = $('#myInput').inputpicker('value_highlighted');
    console.log('Highlighted:', highlighted);
});
```

---

## New Features

### `openAfterLoad`

**What it does:** Opens the dropdown automatically once the data has finished loading — including async/URL-based loading. Without this, the dropdown only opens when the user explicitly clicks or focuses the input.

**Why it's useful:** When you want users to immediately see the options after the picker is ready, without requiring an extra click.

```js
$('#myInput').inputpicker({
    url: '/api/items',
    fieldValue: 'id',
    fieldText: 'name',
    openAfterLoad: true   // dropdown opens automatically after URL data arrives
});
```

**Also works with inline data:**

```js
$('#myInput').inputpicker({
    data: myDataArray,
    openAfterLoad: true
});
```

**Tab-to-open:** When `openAfterLoad: true`, tabbing into the field will also open the dropdown (same as `autoOpen: true`).

---

### `nextPicker`

**What it does:** When a picker has no data (or a search returns no results), it automatically closes the current dropdown and opens the next picker specified by a CSS selector.

**Requires:** `openAfterLoad: true`.

**Jump triggers:**
| Scenario | Jumps? |
|---|---|
| Init — no data at all | ✅ Yes |
| User types something → no results | ✅ Yes (only if keyword is non-empty) |
| User clears the field → no results | ❌ No (stays in current picker so user can re-try) |
| Data exists | ❌ No (shows data normally) |

```js
// Picker 1 → if no results, jump to Picker 2
$('#picker1').inputpicker({
    url: '/api/categories',
    fieldValue: 'id',
    fieldText: 'name',
    openAfterLoad: true,
    nextPicker: '#picker2'
});

// Picker 2 → if no results, jump to Picker 3
$('#picker2').inputpicker({
    url: '/api/subcategories',
    fieldValue: 'id',
    fieldText: 'name',
    openAfterLoad: true,
    nextPicker: '#picker3'
});

// Final picker — no nextPicker, stays here
$('#picker3').inputpicker({
    url: '/api/items',
    fieldValue: 'id',
    fieldText: 'name',
    openAfterLoad: true
});
```

**Chain as many pickers as needed.** Each picker jumps to the next one only on empty results with a non-empty search keyword.

---

### `autoOpen` Fix — Pending Open

**Problem:** When `url` is set, the shadow input is **disabled** while data loads (to prevent interaction). If the user tabs into the field or the browser auto-focuses it during loading, the focus event is silently dropped — the dropdown never opens even after data arrives.

**Fix:** The plugin now tracks a `pending-open` flag:

1. If focus fires on a **disabled** (loading) input and `autoOpen` or `openAfterLoad` is `true` → a pending flag is set.
2. Once `_loadData` completes and re-enables the input → the pending flag is checked and the dropdown opens.

This makes `autoOpen: true` reliable even with URL-based data sources.

```js
// This now works reliably even with URL data
$('#myInput').inputpicker({
    url: '/api/data',
    fieldValue: 'id',
    fieldText: 'name',
    autoOpen: true   // works even if page auto-focuses this field on load
});
```

---

## Examples

### 1. Simple inline dropdown

```js
$('#fruit').inputpicker({
    data: ['Apple', 'Banana', 'Cherry']
});
```

### 2. Object data with multiple columns

```js
$('#user').inputpicker({
    data: [
        { id: 1, name: 'Alice', dept: 'Engineering' },
        { id: 2, name: 'Bob',   dept: 'Marketing'   }
    ],
    fieldValue: 'id',
    fieldText: 'name',
    fields: [
        { name: 'name', text: 'Name', width: '150px' },
        { name: 'dept', text: 'Department' }
    ],
    headShow: true
});
```

### 3. Remote URL with filtering

```js
$('#city').inputpicker({
    url: '/api/cities',
    fieldValue: 'city_id',
    fieldText: 'city_name',
    filterOpen: true,
    urlDelay: 0.3   // 300ms debounce
});
```

### 4. Auto-open on load + chained pickers

```js
// Step 1: Select a country
$('#country').inputpicker({
    url: '/api/countries',
    fieldValue: 'id',
    fieldText: 'name',
    openAfterLoad: true,
    nextPicker: '#state'
});

// Step 2: Select a state (opens automatically if country has no results)
$('#state').inputpicker({
    url: '/api/states',
    fieldValue: 'id',
    fieldText: 'name',
    openAfterLoad: true,
    nextPicker: '#city'
});

// Step 3: Select a city
$('#city').inputpicker({
    url: '/api/cities',
    fieldValue: 'id',
    fieldText: 'name',
    openAfterLoad: true
});
```

### 5. Multiple values (tags)

```js
$('#skills').inputpicker({
    data: [
        { id: 'js',  label: 'JavaScript' },
        { id: 'py',  label: 'Python'     },
        { id: 'go',  label: 'Go'         }
    ],
    fieldValue: 'id',
    fieldText: 'label',
    multiple: true,
    delimiter: ','
});
```

### 6. Paginated remote data

```js
$('#products').inputpicker({
    url: '/api/products',
    fieldValue: 'product_id',
    fieldText: 'product_name',
    pagination: true,
    limit: 10,
    pageField: 'page',
    pageLimitField: 'per_page',
    pageCountField: 'total'
});
```

---

## License

MIT License © 2017 Ukalpa — https://ukalpa.com/inputpicker
