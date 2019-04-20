# Warning: The repo is in maintenance mode now. 
Reason: More and more projects are migrating their front-end framework to React, Vue or Angular, so I would not add new features in future but still would be able to solve issues till the end of 2019.  

# jQuery UI Inputpicker

This is a jQuery UI input picker plugin built to match with other official jQuery UI widgets. It would blend nicely multiple columns view with your form. The plugin is very easy to integrate in your form for your inputs.

I built this plugin because I could not find a suitable plugin to support multiple columns in drop-down selection perfectly that what I needed for my projects.

### Core Features
* Easy to use
* Multiple fields
* Filter input
* JSON Remote url with pagination
* Responsive design
* Creatable input
* Multiple values like tags
* And so on...

### How to use
* Download `src/jquery.inputpicker.js` and `src/jquery.inputpicker.css`
* Load them in your script
* Use it
<pre><code class="html">&lt;link rel=&quot;stylesheet&quot; href=&quot;./jquery.inputpicker.css&quot; /&gt;
&lt;script src=&quot;./jquery.inputpicker.js&quot;&gt;&lt;/script&gt;

&lt;input id=&quot;test&quot; value=&quot;Text 2&quot; /&gt;
&lt;script&gt;
$('#test').inputpicker({
   data:[ &quot;Text 1&quot;, &quot;Text 2&quot;, &quot;Text 3&quot; ]
});
&lt;/script&gt;</code></pre>

## Demo and Document

http://inputpicker.ukalpa.com


## License

The plugin is licensed under the MIT licenses.  &copy; 2017 
 
 ## Author
 
 Ukalpa http://www.ukalpa.com
