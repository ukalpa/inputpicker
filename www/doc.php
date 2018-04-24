<?php require_once "./header.php" ?>
<style>
	ul.list-unstyled{
		margin-bottom:-10px;
	}
	ul.list-unstyled li{
		border-bottom:1px solid #dddddd;
		margin-bottom: 5px;
		padding-bottom: 5px;
	}
	ul.list-unstyled li:last-child{
		border-bottom: 0px;

	}
	.alert-message{
		margin-bottom:0px;
		padding:2px;
	}
</style>

	<div class="container">
		<div class="row">
			<div class="col-sm-3 pull-right hidden-xs hidden-sm">
				<div class="ip-side-bar">
					<ul class="nav nav-pills nav-stacked ip-side-nav" data-spy="affix" data-offset-top="55">
						<li>
                            <a href="#options">Options</a>
                            <ul class="nav">
                                <li>
                                    <a href="#options-basic">Basic</a>
                                    <a href="#options-data">Data</a>
                                    <a href="#options-remote-url">Remote Url</a>
                                    <a href="#options-pagination">Pagination</a>
                                    <a href="#options-filter">Filter</a>
                                    <a href="#options-multiple-values">Multiple Values</a>
                                    <a href="#options-destroy">Destroy</a>
                                </li>
                            </ul>
						</li>
                        <li>
                            <a href="#events">Events</a>
                        </li>
<!--                        <li>-->
<!--                            <a href="#actions">Actions</a>-->
<!--                        </li>-->
						<li><a href="#html">HTML</a>
						</li>
						<li><a href="#css">CSS</a>
						</li>
					</ul>
				</div>
			</div>
			<div class="col-sm-9">
				<div class="ip-content" style="">

					<a name="options"></a>
					<h2>Options</h2>
					<section class="row">
						<div class="col-sm-12">
							<p>
								Initiate a basic input with multiple options
							</p>
                            <a name="options-basic"></a>
							<h3>Basic</h3>
							<table class="table table-bordered">
								<thead>
								<tr class="active">
									<th>Name</th>
									<th>Format</th>
									<th>Description</th>
									<th style="width:50%;">Example</th>
								</tr>
								</thead>
								<tbody>
								<tr>
									<td>width</td>
									<td>String</td>
									<td>Set width for the list</td>
									<td>
										<ul class="list-unstyled">
											<li>"100%" - equal with input</li>
											<li>"200px" - 200px</li>
										</ul>
									</td>
								</tr>
                                <tr>
                                    <td>height</td>
                                    <td>String</td>
                                    <td>Set height for the list</td>
                                    <td>
                                        <ul class="list-unstyled">
                                            <li>"200px" - 200px</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>autoOpen</td>
                                    <td>Bool</td>
                                    <td>The list would / would not open when the input is focused</td>
                                    <td>
                                        <ul class="list-unstyled">
                                            <li>true - Open automatically</li>
                                            <li>false - Not open</li>
                                        </ul>
                                    </td>
                                </tr>
								<tr>
									<td>headShow</td>
									<td>Bool</td>
									<td>Set whether showing the list head</td>
									<td>
										<ul class="list-unstyled">
											<li>true - show head</li>
											<li>false - hide head</li>
										</ul>
									</td>
								</tr>
								<tr>
									<td>fields</td>
									<td>Array</td>
									<td>Set fields for the list</td>
									<td>
										<ul class="list-unstyled">
											<li>"{String}" - ["value", "text", "country"]</li>
											<li>"{Object}" - [{"name":"value", "text":"Code"}, {"name":"text", "text":"Area"}, {"name":"country", "text":"Country"}]</li>
										</ul>
									</td>
								</tr>
								<tr>
									<td>fieldValue</td>
									<td>String</td>
									<td>Set the field which would be passed to the input value</td>
									<td>
										<ul class="list-unstyled">
											<li>"value" - the attribute "value" will be passed to the value. </li>
										</ul>
									</td>
								</tr>
                                <tr>
                                    <td>fieldText</td>
                                    <td>String</td>
                                    <td>Set the field which would be shown on the screen</td>
                                    <td>
                                        <ul class="list-unstyled">
                                            <li>"text" - the attribute "text" will be shown on the screen. </li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>highlightResult</td>
                                    <td>Bool</td>
                                    <td>Highlight for the options including the keyword</td>
                                    <td>
                                        <ul class="list-unstyled">
                                            <li>true - Open Highlight mode</li>
                                            <li>false(default) - Close Highlight mode</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>responsive</td>
                                    <td>Bool</td>
                                    <td>Responsive support</td>
                                    <td>
                                        <ul class="list-unstyled">
                                            <li>true(default) - If the "width" option is a percentage, the input width would be changed with resizing the window.</li>
                                            <li>false - Not responsive</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr style="color:#aaaaaa;">
                                    <td>creatable(<b>deprecated</b>)
                                        <br />
                                        <i>Please use the following "selectMode:'creatable'" option to replace this option</i>
                                    </td>
                                    <td>Bool</td>
                                    <td>Support inputing value manually</td>
                                    <td>
                                        <ul class="list-unstyled">
                                            <li>true - Press tab or enter or lose focus will use the current keyword as value.</li>
                                            <li>false(default) - Press tab or enter or lose focus will use the old value</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>selectMode</td>
                                    <td>String</td>
                                    <td>The input value depends on keyword and the selectMode</td>
                                    <td>
                                        <ul class="list-unstyled">
                                            <li>'restore'(default): Use the previous value, the change event is not raised</li>
                                            <li>'active': Use the active row in the dropdown as the value</li>
                                            <li>'creatable': Use the keyword as value</li>
                                            <li>'empty': Use the empty value as value</li>
                                        </ul>
                                    </td>
                                </tr>

								</tbody>
							</table>

                            <a name="options-data"></a>
                            <h3 class="inline-block">Data</h3>
                            <div class="inline-block alert alert-info small alert-message ml10" role="alert" >Only valid when "url" is empty.</div>
                            <table class="table table-bordered">
                                <thead>
                                <tr class="active">
                                    <th>Name</th>
                                    <th>Format</th>
                                    <th>Description</th>
                                    <th style="width:50%;">Example</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>data</td>
                                    <td>Array</td>
                                    <td>Set data for the list
                                    </td>
                                    <td>
                                        <ul class="list-unstyled">
                                            <li>["a", "b", "c"]</li>
                                            <li>[{"value":"AKL", "text":"Auckland", "country":"NZ"}, {"value":"WLG", "text":"Wellington", "country":"NZ"}]</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>element</td>
                                    <td>var</td>
                                    <td>Get the element object
                                    </td>
                                    <td>
                                        <ul class="list-unstyled">
                                            <li>
                                                $('#test').inputpicker('element')
                                                <br /> $('#test').inputpicker('element', 'AKL')
                                                <br /> $('#test').inputpicker('element', 'AKL', 'text')
                                                <br /><i><small>Select the element which the 'text' field is 'AKL'</small></i>
                                            </li>
                                            <li>Return: <br > - Found: {"value":"AKL", "text":"Auckland", "country":"NZ"}<br />
                                            - Not Found: null</li>
                                        </ul>
                                    </td>
                                </tr>
                                </tbody>
                            </table>


                            <a name="options-remote-url"></a>
                            <h3>Remote Url</h3>
                            <table class="table table-bordered">
                                <thead>
                                <tr class="active">
                                    <th>Name</th>
                                    <th>Format</th>
                                    <th>Description</th>
                                    <th style="width:50%;">Example</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>url</td>
                                    <td>String</td>
                                    <td>Set remote data source for the list
                                    </td>
                                    <td>
                                        <ul class="list-unstyled">
                                            <li>"../src/example-regions.json"</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>urlParam</td>
                                    <td>Object</td>
                                    <td>Set specific parameters of url for reading remote data
                                    </td>
                                    <td>
                                        <ul class="list-unstyled">
                                            <li>{"category_id":1, "country", "NZ"}</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>urlHeaders</td>
                                    <td>Object</td>
                                    <td>Set specific headers for reading remote data
                                    </td>
                                    <td>
                                        <ul class="list-unstyled">
                                            <li>{"X-TOKEN":"This is a test token.", "X-User", "Admin"}</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>urlDelay</td>
                                    <td>Int</td>
                                    <td>Set seconds of delaying to read remote data
                                    </td>
                                    <td>
                                        <ul class="list-unstyled">
                                            <li>3 - start getting remote data after having completed to input keywords 3 seconds later </li>
                                        </ul>
                                    </td>
                                </tr>
                                </tbody>
                            </table>



                            <a name="options-pagination"></a>
                            <h3 class="inline-block">Pagination</h3>
                            <div class="inline-block alert alert-info small alert-message ml10" role="alert" >Only valid in the AJAX mode and getting data from the remote server.</div>
                            <table class="table table-bordered">
                                <thead>
                                <tr class="active">
                                    <th>Name</th>
                                    <th>Format</th>
                                    <th>Description</th>
                                    <th style="width:50%;">Example</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>pagination</td>
                                    <td>Bool</td>
                                    <td>Set "true" to open the pagination feature
                                    </td>
                                    <td>
                                        <ul class="list-unstyled">
                                            <li>The default value is "false"</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>pageMode</td>
                                    <td>String</td>
                                    <td>Unuse, will use it later
                                    </td>
                                    <td>
                                    </td>
                                </tr>
                                <tr>
                                    <td>pageField</td>
                                    <td>String</td>
                                    <td>Set the field name posting the request url to the server
                                    </td>
                                    <td>
                                        <ul class="list-unstyled">
                                            <li>The default value is "p", Exp:"&p=1"</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>pageCurrent</td>
                                    <td>Int</td>
                                    <td>Set the current page
                                    </td>
                                    <td>
                                        <ul class="list-unstyled">
                                            <li>The default value is "1", Exp:"&p=1"</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>pageLimitField</td>
                                    <td>String</td>
                                    <td>Set the limit field name posting the request url to the server
                                    </td>
                                    <td>
                                        <ul class="list-unstyled">
                                            <li>The default value is "per_page", Exp:"&per_page=10"</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>limit</td>
                                    <td>Int</td>
                                    <td>Set the default limit number per page getting from the server
                                    </td>
                                    <td>
                                        <ul class="list-unstyled">
                                            <li>The default value is "10"</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr><td colspan="4">Return JSON:

                                        {"msg":"","count":75,"data":[{"id":2,"region_id":1,"name":"Auckland","hasc":"AL","region_name":"Auckland"},...]} <br />
                                        msg: "" // Return error msg<br />
                                        count: 75   // The total amount of items <br />
                                        data:       // The items of current page
                                    </td> </tr>
                                </tbody>
                            </table>

                            <a name="options-filter"></a>
                            <h3>Filter</h3>
							<table class="table table-bordered">
								<thead>
								<tr class="active">
									<th>Name</th>
									<th>Format</th>
									<th>Description</th>
									<th style="width:50%;">Example</th>
								</tr>
								</thead>
								<tbody>
								<tr>
									<td>filterOpen</td>
									<td>Bool</td>
									<td>Set whether filter list when inputting the content</td>
									<td>
										<ul class="list-unstyled">
											<li>true - the list will be filtered by inputting. </li>
											<li>false - the list will not be filtered. </li>
										</ul>
									</td>
								</tr>
								<tr>
									<td>filterType</td>
									<td>String</td>
									<td>Set the filter type when filterOpen is true </td>
									<td>
										<ul class="list-unstyled">
											<li>"start" - match contents from the beginning. </li>
											<li>"{any others}" - match contents from the whole content. </li>
										</ul>
									</td>
								</tr>
								<tr>
									<td>filterField</td>
									<td>String / Array</td>
									<td>Set the filter type when filterOpen is true </td>
									<td>
										<ul class="list-unstyled">
											<li>"" - match in all fields. </li>
											<li>"value" - match the field "value". </li>
											<li>["value", "text"] - match the field "value" and "text". </li>
										</ul>
									</td>
								</tr>
								</tbody>
							</table>



                            <a name="options-multiple-values"></a>
                            <h3>Multiple Values</h3>
                            <table class="table table-bordered">
                                <thead>
                                <tr class="active">
                                    <th>Name</th>
                                    <th>Format</th>
                                    <th>Description</th>
                                    <th style="width:50%;">Example</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>multiple</td>
                                    <td>Bool</td>
                                    <td>Set whether supporting multiple values</td>
                                    <td>
                                        <ul class="list-unstyled">
                                            <li>true - support multiple values. </li>
                                            <li>false - do not support. </li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>delimiter</td>
                                    <td>String</td>
                                    <td>Set the delimiter when "multiple" is true </td>
                                    <td>
                                        <ul class="list-unstyled">
                                            <li>the default value is comma ","</li>
                                        </ul>
                                    </td>
                                </tr>
                                </tbody>
                            </table>


                            <a name="options-destroy"></a>
                            <h3>Destroy</h3>
                            <table class="table table-bordered">
                                <thead>
                                <tr class="active">
                                    <th>Name</th>
                                    <th>Format</th>
                                    <th>Description</th>
                                    <th style="width:50%;">Example</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>destroy</td>
                                    <td>-</td>
                                    <td>Restore the input to original if you do not want</td>
                                    <td>
                                        <ul class="list-unstyled">
                                            <li>$('#test').inputpicker('destroy'); </li>
                                        </ul>
                                    </td>
                                </tr>
                                </tbody>
                            </table>



						</div>
					</section>
					<!-- End Section -->



                    <a name="events"></a>
                    <h2>Events</h2>
                    <section class="row">
                        <div class="col-sm-12">
                            <p>
                                The list of Events handlers
                            </p>
                            <a name="options-basic"></a>
                            <h3>Basic</h3>
                            <table class="table table-bordered">
                                <thead>
                                <tr class="active">
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th style="width:50%;">Example</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>focus(e)</td>
                                    <td>Focus on the input</td>
                                    <td>
                                        <ul class="list-unstyled">
                                            <li>$('#test').focus()</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>change(e)</td>
                                    <td>Activate after updating of the input</td>
                                    <td>
                                        <ul class="list-unstyled">
                                            <li>$('#test').change(function(input){ //... })</li>
                                        </ul>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>



<!--                    <a name="actions"></a>-->
<!--                    <h2>Actions</h2>-->
<!--                    <section class="row">-->
<!--                        <div class="col-sm-12">-->
<!--<!--                            <p>-->-->
<!--<!--                                The list of Actions-->-->
<!--<!--                            </p>-->-->
<!--<!--                            <a name="options-basic"></a>-->-->
<!--<!--                            <h3>Basic</h3>-->-->
<!--                            <table class="table table-bordered">-->
<!--                                <thead>-->
<!--                                <tr class="active">-->
<!--                                    <th>Name</th>-->
<!--                                    <th>Description</th>-->
<!--                                    <th style="width:50%;">Example</th>-->
<!--                                </tr>-->
<!--                                </thead>-->
<!--                                <tbody>-->
<!--                                <tr>-->
<!--                                    <td>focus(e)</td>-->
<!--                                    <td>Focus on the input</td>-->
<!--                                    <td>-->
<!--                                        <ul class="list-unstyled">-->
<!--                                            <li>$('#test').focus()</li>-->
<!--                                        </ul>-->
<!--                                    </td>-->
<!--                                </tr>-->
<!--                                <tr>-->
<!--                                    <td>change(e)</td>-->
<!--                                    <td>Activate after updating of the input</td>-->
<!--                                    <td>-->
<!--                                        <ul class="list-unstyled">-->
<!--                                            <li>$('#test').change(function(input){ //... })</li>-->
<!--                                        </ul>-->
<!--                                    </td>-->
<!--                                </tr>-->
<!--                                </tbody>-->
<!--                            </table>-->
<!--                        </div>-->
<!--                    </section>-->



                    <!-- Start examples-->
					<a name="html"></a>
					<h2>HTML</h2>
					<!-- Begin section 1 -->
					<?php $test_index++; ?>
					<section class="row">
						<div class="col-sm-12">
							<a name="basic-single"></a>
							<h3>Structure</h3>
							<p>
								When using the Inputpicker plugin, it clones the original object to a new object
							</p>
							<h4>Original code</h4>
							<pre><code class="html"><?php echo ip_html("<input name=\"original\" type=\"text\" />");
									?></code></pre>
							<h4>After Loaded</h4>
							<pre><code class="html"><?php echo ip_html("<input name=\"original\" type=\"hidden\" class=\"inputpicker-original inputpicker-original-5\" data-inputpicker-uuid=\"5\" />
<div id=\"inputpicker-div-5\" class=\"inputpicker-div\">
<input id=\"inputpicker-5\" name=\"inputpicker-5\" class=\"inputpicker-input\" data-inputpicker-uuid=\"5\" data-inputpicker-settings=\"{json}\" data-inputpicker-data={json} />
<span class=\"inputpicker-arrow\" data-inputpicker-uuid=\"5\"><b></b></span>
</div>

<div id=\"inputpicker-wrapped-list\" style=\"position:absolute;\" data-inputpicker-uuid=\"5\">
<table class=\"table\">
<thead>
<tr><th></th></tr>
</thead>
<tbody>
<tr class=\"inputpicker-wrapped-element inputpicker-wrapped-element-{i}\" data-i=\"0\">...</tr>
<tr class=\"inputpicker-wrapped-element selected\" data-i=\"1\">...</tr>
</tbody>
</table>
</div>
");
									?></code></pre>
						</div>
					</section>
					<!-- End Section -->


					<!-- Start examples-->
					<a name="css"></a>
					<h2>CSS</h2>
					<!-- Begin section 1 -->
					<?php $test_index++; ?>
					<section class="row">
						<div class="col-sm-12">
							<p>
								You can customise style by your requirements
							</p>
							<h4>Style</h4>
							<pre><code class="css"><?php echo ip_html(file_get_contents('../src/jquery.inputpicker.css'));
									?></code></pre>
						</div>
					</section>
					<!-- End Section -->
				</div>

			</div>
		</div>
	</div>

<?php require_once "./footer.php" ?>