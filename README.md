# Inputpicker Advanced

A lightweight **jQuery plugin** for building dropdowns with **multi‑column support**.  
***Inputpicker Advanced*** extends the original Inputpicker with modernized documentation, advanced examples, and improved usability for ERP‑style UIs and form integrations.

---

## ✨ Features
- Multi‑column dropdown rendering  
- Search & filter support  
- Works with **local arrays** or **remote JSON data**  
- Pagination for large datasets  
- Supports **creatable inputs** (add new values on the fly)  
- Multi‑value selection (tags)  
- Event hooks for customization (`change_highlight.inputpicker`, etc.)  
- Responsive design  
---
## 📦 Installation
**Download the plugin files:**

- `src/jquery.inputpicker.js`  
- `src/jquery.inputpicker.css`

**Include them in your project:**
```javascript
<link rel="stylesheet" href="jquery.inputpicker.css" />
<script src="jquery.inputpicker.js"></script>
```
**# 🚀 Quick Start**
```javascript
<input id="demo" value="Text 2" />

<script>
  $('#demo').inputpicker({
    data: ["Text 1", "Text 2", "Text 3"],
    fieldText: 'Name',
    fieldValue: 'Code',
    placeholder: '-- Select --',
    filterOpen: true,
    headShow: true
  });
</script>
```
**# **⚡ Advanced Usage****

**1. Multi‑Column Dropdown**
```javascript
$('#employee').inputpicker({
  data: [
    {id:1, name:'John', dept:'HR'},
    {id:2, name:'Sara', dept:'Finance'},
    {id:3, name:'Mike', dept:'IT'}
  ],
  fields: ['id','name','dept'],
  fieldText: 'name',
  fieldValue: 'id',
  headShow: true,
  filterOpen: true
});
```
**2. AJAX Data Source**
```javascript
$('#city').inputpicker({
  url: '/api/cities',
  fields: ['id','name','country'],
  fieldText: 'name',
  fieldValue: 'id',
  pageSize: 10,
  openAfterLoad: true
});
```
**3. Multi‑Select Mode**
```javascript
$('#tags').inputpicker({
  data: ['JavaScript','C#','SQL','React'],
  multiple: true,
  creatable: true
});
```
**4. Event Handling**
```javascript
$('#demo').on('change_highlight.inputpicker', function(e) {
  console.log('Highlighted value:', e.value);
});
```

## **🚧 Project Status**
This is the advanced fork of Inputpicker, actively **maintained and improved by Mukesh**.

- ✅ New features and enhancements are being added.
- ✅ Bug fixes and modernized documentation are supported.
- ✅ Compatible with legacy jQuery projects and ERP‑style UIs

Unlike the original Inputpicker (which entered maintenance mode in 2019), this fork continues to evolve with advanced usage examples, accessibility improvements, and modern integration support.

## **🙏 Credits**

This project is an advanced fork of the original Inputpicker plugin created by **Ukalpa (© 2017)**.Enhancements, modifications, and ongoing improvements are maintained by **Mukesh (© 2026)**.

The original project is licensed under the MIT License, which allows modification and redistribution.This fork builds upon that foundation with additional features, examples, and modernized documentation.
