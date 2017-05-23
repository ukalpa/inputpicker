/**
 * jQuery-inputpicker - A jQuery input picker plugin. It supports showing multiple columns select in input.
 * Copyright (c) 2017 Ukalpa - https://ukalpa.com/inputpicker
 * License: MIT
 */

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
})(function ($) {

    var methods = {
        init: function (options) {
            return this.each(function () {
                var original = $(this);
                var input;   // Shadow input
                // Check if has been initiated
                if (original.hasClass('inputpicker-original')){
                    input = _i(original);
                }
                else{
                    var uuid = _generateUid();
                    original.data('inputpicker-uuid', uuid);

                    // Clone input
                    var input = original.clone();

                    // Initiate input
                    input.val('').data('inputpicker-uuid', uuid).addClass('inputpicker-input').prop('id', 'inputpicker-' + uuid).prop('name', 'inputpicker-' + uuid);

                    // Inputpicker div ( wrap fake input and arrow )
                    var inputpicker_div = $("<div id=\"inputpicker-div-" + uuid + "\" class=\"inputpicker-div\" data-uuid=\"" + uuid + "\"><span class=\"inputpicker-arrow\" data-uuid=\"" + uuid + "\" onclick=\"$(this).parent().find('input').inputpicker('toggle');event.stopPropagation();\"><b></b></span></div>").append(input);
                    original.after(inputpicker_div);

                    // Add Classes to the original element
                    original
                        .addClass('inputpicker-original')
                        .addClass('inputpicker-original-' + uuid)
                        .attr('tabindex', -1)
                        .data('inputpicker-input', input)
                        .data('inputpicker-original-css', {
                            'position' : original.css('position')
                        })
                        .css({
                            'position' : 'fixed',
                            'top' : '-10000px'
                        });

                    input.data('inputpicker-original', original)
                        .prop('autocomplete', 'off');

                }

                // Start loading Settings -----------------------
                // Pick up settings from data attributes
                var _options = [];
                for(var k in $.fn.inputpicker.defaults){
                    if(input.data(k)){
                        _options[k] = input.data(k);
                    }
                }

                // Merge settings by orders: 1.options > 2 attr > 3.defaults
                // If option is array, set it as data
                var settings = $.extend({ cache: {} }, $.fn.inputpicker.defaults, _options,  Array.isArray(options) ? {data:options} : options);

                // Set default value for fieldText
                if(!settings['fieldText'])  settings['fieldText'] = settings['fieldValue'];

                // Set default value for fields
                if (!settings['fields'].length){
                    settings['fields'].push(settings['fieldText']);
                }

                // input.data('inputpicker-settings', settings);
                _set(input, settings);

                // End loading settings -------------------------

                // Start events handlers

                // Original events
                original.on('focus', function(){
                    var original = $(this);
                    var input = _i(original);
                    input.trigger('focus');

                }).on('change', function () {
                    var original = $(this);
                    var input = _i(original);
                    // dd(['on Change original:' + original.val(), original] );
                    _setValue(input, original.val());
                });

                // input Events
                input.on( 'focus.inputpicker', _eventFocus)
                    .on( 'blur.inputpicker', _eventBlur)
                    .on('keydown.inputpicker', _eventKeyDown)
                    .on('keyup.inputpicker', _eventKeyUp);

                // Load data and set value
                _loadData(input, settings['data'], function (input) {
                    _setValue(input, original.val());
                });
            })
        },

        /**
         * Load data manually when having changed url or params
         * It may trigger change if the value was changed
         * @param func - callback
         */
        loadData: function (data, func) {
            return this.each(function () {
                var input = _i($(this));
                _loadData.call(input,
                    input, data, function (input, data) {
                        if ( _setValue(input, _o(input).val()) ){
                            _o(input).trigger('change');
                        }
                        else{
                            // No change
                        }

                        if(typeof func == 'function'){
                            func.call(input, input, data);
                        }
                    });

            });
        },

        destroy: function (options) {
            return this.each(function () {
                var input = _i($(this));
                input.removeClass('inputpicker-input');
                input.removeData('inputpicker-settings');
            })
        },

        /**
         * Get / Set options
         * @param k
         * @param v
         * @returns {*}
         */
        set: function (k, v) {
            var input = _i($(this));
            if (typeof k == 'undefined' && typeof v == 'undefined'){
                return _set(input);
            }
            if (typeof v == 'undefined'){
                return _set(input, k);
            }
            else{
                return _set(input, k, v);
            }
        },

        /**
         * Get / Set data
         * @param data
         * @returns {*}
         */
        data: function (data) {
            if (typeof data == 'undefined'){
                return _set(_i($(this)), 'data');
            }
            else{
                return this.each(function () {
                    var input = _i($(this));
                    _set(input, 'data', _formatData(_set(input, 'fieldValue'),data));
                });
            }
        },

        /**
         * Show or hide the input
         */
        toggle: function (e) {
            return this.each(function () {
                var input = _i($(this));
                if( _isWrappedListVisible(input) ){
                    methods.hide.call(input, e);
                    dd('_isWrappedListVisible');
                }
                else{
                    if(input.is(":focus")) {    // has focus, only need to show
                        methods.show.call(input, e);
                        dd('input.is focus');
                    }
                    else{   // not focused yet, check if need show after focus
                        dd('input.focus');
                        input.focus();
                        if (!_set(input, 'autoOpen')){  // not autoOpen, need to open manually
                            methods.show.call(input, e);
                        }
                    }
                }
            });
        },

        /**
         * Show the input
         * @param e
         * @returns {*}
         */
        show: function (e) {
            return this.each(function () {
                var input = _i($(this)) ;
                var uuid = _uuid(input);

                // Check the input is visible
                if (!_isInputVisible(input)) {
                    _alert('input[name=' + _name(input) + '] is not visible.');
                    return;
                }
                else if( _uuid(_getWrappedList()) == uuid){
                    dd('_getWrappedList().show()');
                    _getWrappedList().show();
                }
                else{
                    dd('_render');
                    _getWrappedList(input).show();
                    _render(input);
                }
            });
        },

        hide: function (e) {
            _hideWrappedList();
            // return this.each(function () {
            //     var input = $(this);
            // });
        },


        /**
         * Change the value and trigger change
         * @param value
         */
        val: function (value) {
            return this.each(function () {
                var original = _o($(this));
                var input = _i(original);
                if ( _setValue(input, value) ){
                    original.trigger('change');
                }
            });
        },

        // /**
        //  * Add change function
        //  * @param func
        //  */
        // change: function (func) {
        //     return this.each(function () {
        //         var original = $(this);
        //         original.on('change', func);
        //     });
        // }

        debug: true
    };

    // ----------------------------------------------------------------
    function dd() {
        var args = Array.prototype.slice.call(arguments);
        console.log(args.length == 1 ? args[0] : args);
    }

    // function _debug(input){
    //     if(methods.debug){
    //         var args = Array.prototype.slice.call(arguments);
    //         var pre = 'inputpicker(' + _uuid(input);
    //         if(_o(input))   {
    //             pre += '--' + _o(input).attr('name');
    //         }
    //         if(arguments.callee.caller.name){
    //             pre += '--' +  arguments.callee.caller.name;
    //         }
    //         args.unshift( pre + ')');
    //         dd(args);
    //     }
    // }

    function _name(input) {
        return _o(input).attr('name');
    }

    function _error(msg, input) {
        if(typeof input != 'undefined'){
            var original = _o(input);
            if(original){
                if(original.attr('name')){
                    msg += " for input[name=" + original.attr('name') + "]";
                }
                else if(original.attr('id')){
                    msg += " for input[id=" + original.attr('id') + "]";
                }
            }
        }
        throw msg + " in inputpicker.js";
    }

    function _alert(msg, input) {
        if (typeof input != 'undefined'){
            if(_name(input)){
                msg += ' input[name=' + _name(input) + ']';
            }
        }
        alert(msg);
    }

    // Check data and format it
    function _formatData(fieldValue, data) {
        if(!Array.isArray(data)){
            return [];
        }
        if (data.length && typeof data[0] != 'object') {
            var new_data = [];
            for (var i in data) {
                var o = {};
                o[fieldValue] = data[i];
                new_data.push(o);
            }
            data = new_data;
            new_data = null;
        }
        return data;
    }

    // Load remote json data
    function _execJSON(input, param, func) {
        var url = _set(input, 'url');

        if(typeof param == 'undefined' && typeof func == 'undefined'){
            _alert('The param is incorrect. input[name=' + _name(input) + ']');
            return;
        }
        if (typeof func == 'undefined' && typeof param == 'function'){
            func = param;
            param = {};
        }
        if (typeof func != 'function'){
            _alert('The callback function is incorrect. input[name=' + _name(input) + ']');
            return;
        }

        param = $.extend({
            q: input.val(),
            limit : _set(input, 'limit'),
            fieldValue: _set(input, 'fieldValue'),
            fieldText: _set(input, 'fieldText'),
            value: _o(input).val()
        }, _set(input, 'urlParam'), param);

        var param_serialised = 'urlParams|' + $.param(param);


        var cacheData = _cache(input, param_serialised);
        if(_set(input, 'urlCache') ){
            if( typeof cacheData == 'undefined' ){
                dd('Set cache:' + _name(input));
                $.get(url, param, function (ret) {
                    _cache(input, param_serialised, ret);
                    func(ret);
                }, "json");
            }
            else{
                func(cacheData);
                dd('Use cache');
            }
        }
        else{
            dd('Not use cache');
            $.get(url, param, func, "json");
        }

    }
    
    /**
     * Get wrapped list
     * If div wrapped list doest not exist, initiate it
     * If input is not undefined, init it.
     * @returns {*|null}
     * @private
     */
    function _getWrappedList(input) {
        // if ( !$.fn.inputpicker.wrapped_list){
        //     $.fn.inputpicker.wrapped_list = $('<div />', {
        //         id: 'inputpicker-wrapped-list',
        //         tabindex: -1,
        //
        //     }).css({
        //         'display':'none',
        //         'position': 'absolute',
        //         'overflow' : 'all'
        //     }).addClass('inputpicker-wrapped-list').data('inputpicker-uuid', 0).appendTo(document.body);
        //
        //     $(document).on('click', function (e) {
        //         if(!($(e.target).hasClass('inputpicker-input'))){
        //             _hideWrappedList();
        //         }
        //     });
        //
        //     $.fn.inputpicker.wrapped_list.on('click', function (e) {
        //         e.preventDefault();
        //         e.stopPropagation();
        //     });
        // }
        //
        // if (typeof input != 'undefined'){
        //     // Reset setting for wrapped list
        //     if ( $.fn.inputpicker.wrapped_list.data('inputpicker-uuid') != input.data('inputpicker-uuid')){
        //         $.fn.inputpicker.wrapped_list.data('inputpicker-uuid', _uuid(input)).html("");
        //     }
        // }
        // return $.fn.inputpicker.wrapped_list;

        var wrapped_list = $('#inputpicker-wrapped-list');
        if ( ! wrapped_list.length){
            wrapped_list = $('<div />', {
                id: 'inputpicker-wrapped-list',
                tabindex: -1
            }).css({
                'display':'none',
                'position': 'absolute',
                'overflow' : 'all'
            }).addClass('inputpicker-wrapped-list')
                .data('inputpicker-uuid', 0)
                .appendTo(document.body);

            $(document).on('click', function (e) {
                if(!($(e.target).hasClass('inputpicker-input'))){
                    _hideWrappedList();
                }
            });

            wrapped_list.on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
        }

        if (typeof input != 'undefined'){
            // Reset setting for wrapped list
            if ( _uuid(wrapped_list) != _uuid(input)){
                _uuid(wrapped_list.html(""), _uuid(input));
            }
        }
        return wrapped_list;

    }

    /**
     *
     * @param input
     * @param offset
     * @private
     */
    function _changeWrappedListSelected(input, offset) {
        var wrapped_list = _getWrappedList();
        var wrapped_elements = _getWrappedListElements();
        // check if wrapped_list
        if ( _isWrappedListVisible(input) && wrapped_elements.length){
            // Move to the first if not selected

            // Select first if not any selected
            if ( wrapped_elements.length && _getWrappedListElements(true).length == 0){
                wrapped_elements.first().addClass('selected');
            }
            else{
                var tr_selected = _getWrappedListElements(true);
                if (offset){    // Change selected if necessary
                    if ( offset < 0 && tr_selected.prev().length ){
                        tr_selected.removeClass('selected').prev().addClass('selected');
                        if (tr_selected.prev().position().top < tr_selected.outerHeight()) {
                            wrapped_list.scrollTop(wrapped_list.scrollTop() - tr_selected.outerHeight());
                        }
                    }
                    else if (  offset > 0 && tr_selected.next().length) {
                        tr_selected.removeClass('selected').next().addClass('selected');
                        if ( ( tr_selected.next().position().top + 2 * tr_selected.outerHeight()) > wrapped_list.outerHeight()) {
                            wrapped_list.scrollTop(wrapped_list.scrollTop() + tr_selected.outerHeight());
                        }


                    }



                }
            }



            // // Check and change the cursor position if necessary
            // if ( tr_selected.length && ( ( tr_selected.position().top + 2 * tr_selected.outerHeight()) > wrapped_list.outerHeight()) ) {
            //     wrapped_list.scrollTop(wrapped_list.scrollTop() + tr_selected.data('i') * tr_selected.outerHeight());
            // }

        }


    }

    // Get the original input
    function _o(input) {
        return input.data('inputpicker-original') ? input.data('inputpicker-original') : input;
    }

    // Get the target input
    function _i(original) {
        return original.data('inputpicker-input') ? original.data('inputpicker-input') : original ;
    }

    function _uuid(o, uuid) {
        return typeof uuid == 'undefined' ? o.data('inputpicker-uuid') : o.data('inputpicker-uuid', uuid);

    }

    function _cache(input, name, value) {
        var settings = input.data('inputpicker-settings') ;
        if (typeof value == 'undefined'){
            if (typeof name == 'undefined'){    // get all settings
                return settings['cache'];
            }
            else if( typeof name == 'object'){  // set all settings
                settings['cache'] = name;
                input.data('inputpicker-settings', settings);
            }
            else{
                return settings['cache'][name];  // get setting
            }
        }
        else{
            settings['cache'][name] = value;
            input.data('inputpicker-settings', settings);
            return input;
        }
    }

    /**
     * Get / Set settings
     * Do not use it to set data, use _loadData
     * @param input
     * @param name
     * @param value
     * @returns {*}
     * @private
     */
    function _set(input, name, value) {
        var settings = input.data('inputpicker-settings') ;
        if (typeof value == 'undefined'){
            if (typeof name == 'undefined'){    // get all settings
                return settings;
            }
            else if( typeof name == 'object'){  // set all settings
                input.data('inputpicker-settings', name);
            }
            else{
                return settings[name];  // get setting
            }
        }
        else{   // set setting
            // if (name == 'data'){ // special check for "data"
            //     if( value = _formatData(input, value) ){
            //         settings[name] = value;
            //     }
            //     else{
            //         // Nothing to do
            //     }
            // }
            // else{
            settings[name] = value;
            // }
            input.data('inputpicker-settings', settings);
            return input;
        }
    }

    function _filterData(input) {
        var fields = _set(input, 'fields');
        var fieldValue = _set(input, 'fieldValue');
        var filterType =  _set(input, 'filterType');
        var filterField =  _set(input, 'filterField');
        var data = _formatData(fieldValue, methods.data.call(input));
        var input_value = input.val();
        var input_value_low = input_value.toString().toLowerCase();

        // var limit = _set(input, 'limit');
        // var page = ( typeof page == 'undefined' || page < 1 ) ? 1 : parseInt(page);
        // dd(data, limit, page);

        if (!_set(input, 'filterOpen') || !input_value_low || _set(input, 'url') || !_isArray(data) ){
            return data;
        }

        var new_data = [];
        var isShown;
        for(var i = 0; i < data.length; i++){
            isShown = false;
            if (typeof filterField == 'string' && filterField) // Search specific field
            {
                var fieldValue = data[i][filterField].toString().toLowerCase();
                if (filterType == 'start' && fieldValue.substr(0, input_value_low.length) == input_value_low) {
                    isShown = true;
                }
                else if (fieldValue.indexOf(input_value_low) != -1) {
                    isShown = true;
                }
            }
            else {
                if (typeof filterField != 'array' && typeof filterField != 'object') {
                    filterField = [];
                    for(var k in fields)    filterField.push(typeof fields[k] == 'object' ? fields[k]['name'] : fields[k] );
                }

                for (var k in filterField) {
                    var fieldValue = data[i][filterField[k]].toString().toLowerCase();
                    if (filterType == 'start' && fieldValue.substr(0, input_value_low.length) == input_value_low) {
                        isShown = true;
                    }
                    else if (fieldValue.indexOf(input_value_low) != -1) {
                        isShown = true;
                    }
                }
            }

            if(isShown) new_data.push(data[i]);
        }
        return new_data;
    }

    /**
     * Draw the results list
     * @param input
     * @private
     */
    function _render(input) {
        var wrapped_list = _getWrappedList(input);
        var uuid = _uuid(input);
        var settings = _set(input);
        // var data = _set(input, 'data');
        var data = _filterData(input);
        var fields = _set(input, 'fields');
        var fieldValue = _set(input, 'fieldValue');
        var filterOpen = settings['filterOpen'];
        var filterType = settings['filterType'];
        var filterField = settings['filterField'];
        var value = _o(input).val();
        var left = input.offset().left , //+ input.outerWidth()
            top = input.offset().top + input.outerHeight();
        var html_table = "";
        var tmp, tmp1, tmp2;

        var width, height;
        if ( settings['width'].substr(-1) == '%'){
            var p = parseInt(settings['width'].slice(0, -1));
            width = parseInt(100 * input.outerWidth() / p);
        }
        else{
            width = settings['width'] ? settings['width'] : input.outerWidth();
        }
        height = settings['height'];

        // Change the list position
        wrapped_list.css({
            left: left + 'px',
            top: top + 'px',
            width: width,
            maxHeight: height,
            display: '',
        }).data('inputpicker-uuid', uuid).html('');

        // Load CSS
        html_table += "<style>";
        if ( tmp = _set(input, 'listBackgroundColor') ){
            wrapped_list.css('backgroundColor', tmp);
        }
        if ( tmp = _set(input, 'listBorderColor') ){
            wrapped_list.css('borderColor', tmp);
        }

        tmp1 = _set(input, 'rowSelectedBackgroundColor');
        tmp2 = _set(input, 'rowSelectedFontColor')
        if ( tmp1 || tmp2 ){
            html_table += ".inputpicker-wrapped-list .table .selected{ ";
            if(tmp1)    html_table += "background-color: " + tmp1 + "; ";
            if(tmp2)    html_table += "color: " + tmp2 + "; ";
            html_table += "}";
        }
        html_table += "</style>";

        // Draw table
        html_table += "<table class=\"table small\">" ;

        // Show head
        if(_set(input, 'headShow')){
            html_table += '<thead><tr>';
            for(var i = 0; i < fields.length; i++){
                var text = '';
                if (typeof fields[i] == 'object'){
                    text = fields[i]['text'] ? fields[i]['text'] : fields[i]['name'];
                }
                else{
                    text = fields[i];
                }
                html_table += '<th>' + text + '</th>';
            }
            html_table += '</thead>';
        }

        // Show data
        if(data.length){
            html_table += "<tbody>";
            var isSelected = false;
            for(var i = 0; i < data.length; i++) {
                isSelected = value == data[i][ fieldValue ] ? true : false;
                html_table += '<tr class="inputpicker-wrapped-element inputpicker-wrapped-element-' + i + ' ' + (isSelected ? 'selected' : '') + '" data-i="' + i + '" data-value="' + data[i][fieldValue] + '">';
                for (var j = 0; j < fields.length; j++) {

                    var k = (typeof fields[j] == 'object') ? fields[j]['name'] : fields[j];
                    var text = typeof data[i][k] != 'undefined' ? data[i][k] : '';

                    // Check if value is empty and set it is shown value
                    if (!text){
                        text = '&nbsp;';
                    }

                    html_table += '<td';
                    var html_style = "";
                    if(_isObject(fields[j])){
                        if(fields[j]['width']){
                            html_style += "width:" + fields[j]['width'];
                        }

                        // ...
                    }
                    html_table += ' style="' + html_style + '" ';

                    html_table += '>' + text + '</>';
                }
                html_table += '</tr>';
            }

            html_table += "</tbody>";
        }
        else{
            html_table += "<thead><tr><td colspan='" + fields.length + "' align='center'>No results.</td></thead></tr>";
        }

        html_table += "</table>";

        wrapped_list.append($(html_table));

        // Set events
        wrapped_list.find('tbody').find('tr').each(function () {
            var that = $(this);
            that.on('mouseover', function (e) {
                wrapped_list.find('.inputpicker-wrapped-element').each(function () {
                    $(this).removeClass('selected');
                });
                that.addClass('selected');
            }).on('click', function (e) {
                var i = $(this).data('i');
                var uuid = $('#inputpicker-wrapped-list').data('inputpicker-uuid') ;
                var input = $('#inputpicker-' + uuid);
                var data = _set(input, 'data');

                _setValue(input, data[i][ _set(input, 'fieldValue') ]);
                _o(input).trigger('change');

                // To fix the bug of unable to close automatically in IE.
                if (!_isMSIE()){
                    input.focus();
                }
                _hideWrappedList();

            })
        });


        // Check and change the cursor position if necessary
        var tr_selected = _getWrappedListElements(true);
        if ( tr_selected.length && ( ( tr_selected.position().top + 2 * tr_selected.outerHeight()) > wrapped_list.outerHeight()) ) {
            wrapped_list.scrollTop(wrapped_list.scrollTop() + tr_selected.data('i') * tr_selected.outerHeight());
        }
    }

    // Check if the specific
    function _isInputVisible(os) {
        var o = os[0];
        return o.offsetWidth > 0 && o.offsetHeight > 0;
    }

    function _isInputWriteable(input) {
        return !input.prop('readonly');
    }

    /**
     * Load data if necessary
     * If url, load from url
     * Else if data is not null, load data into settings
     * Else read data from setting
     * @param input
     * @private
     */
    function _loadData(input, data, func) {
        var original = _o(input);

        if( typeof func == 'undefined' && typeof data == 'undefined'){
            return false;   // Nothing to do
        }

        if( typeof func == 'undefined' && typeof data == 'function'){
            func = data;
            data = null;
        }

        // Add a loading div for
        input.addClass('loading').prop('disabled', true);
        if(_isMSIE())   input.addClass('loading-msie-patch');

        if (_set(input, 'url')){
            // input.prop('disabled', true);
            var param = {};
            if (_isObject(data)){
                param = data;
            }

            _execJSON(input, param, function (ret) {
                var data;
                if(_isArray(ret)){
                    data = ret;
                }
                else{
                    data = ret['data'];
                }

                // var data = ret['data'];
                // Check and format data
                if (! _isArray(data)  ){
                    _alert( "The type of data(" + ( typeof data ) + ") is incorrect.", input);
                    data = _set(input, 'data');    // Still use old data
                }
                else{   // apply new data
                    // _set(input, 'data', _formatData(_set(input, 'fieldValue'), data) );
                    methods.data.call(input, data);
                }

                input.removeClass('loading').prop('disabled', false);
                if(_isMSIE())   input.removeClass('loading-msie-patch');

                if(typeof func == 'function'){
                    // func(input);
                    func.call(this, input, data);
                }
            });
        }
        else{
            if( _isArray(data)){
                // _set(input, 'data', _formatData(_set(input, 'fieldValue'), data) );
                methods.data.call(input, data);
            }
            else{
                data = _set(input, 'data');
            }

            if(typeof func == 'function'){
                // func(input);
                func.call(this, input, data);
            }

            input.removeClass('loading').prop('disabled', false);
            if(_isMSIE())   input.removeClass('loading-msie-patch');
        }

    }



    /**
     * Set value
     *     *
     * @param input
     * @param value
     * @private
     * @return true - value changed, false - not changed
     */
    function _setValue(input, value) {
        var original = _o(input);
        var old_original_value = original.val();

        var fieldValue = _set(input, 'fieldValue');
        var fieldText = _set(input, 'fieldText');
        var data = _set(input, 'data');
        if ( !data.length)  return false;   // No data
        var index_i = -1;
        for(var i = 0; i < data.length; i++){
            if ( data[i][ fieldValue ] == value){
                index_i = i;
            }
        }

        if ( index_i == -1){    // Did not find, set the first data as default value
            index_i = 0;
            value = data[index_i][ fieldValue ];
        }

        input.val( data[index_i][ fieldText ]);
        original.val( data[index_i][ fieldValue ]);

        return old_original_value != value; // If changed
    }

    /**
     * Set selected as value
     * @param uuid
     * @private
     */
    function _setValueAsSelected(input) {
        var wrapped_list = _getWrappedList();
        var tr_selected = _getWrappedListElements(true);

        // Check if is equal
        if (_uuid(wrapped_list) != _uuid(input)){
            return false;
        }

        if ( tr_selected.length){
            // dd('tr_selected.length:' , tr_selected.length);
            return _setValue(input, tr_selected.data('value'));
        }
        else{   // Not selected, Reset to last
            // dd('_o(input).val():' , _o(input).val() );
            _setValue(input, _o(input).val());
            return false;
        }
    }

    function _isWrappedListVisible(input) {
        var wrapped_list = _getWrappedList();
        if (wrapped_list.is(':visible') && _uuid(wrapped_list) == _uuid(input)){
            return true ;
        }
        else{
            return false;
        }
    }

    function _hideWrappedList() {
        return _getWrappedList() ? _getWrappedList().hide() : false;
    }

    /**
     * Get elements
     * @param isSelected
     *      undefined   all elements
     *      true        selected
     *      false       unselected
     * @private
     */
    function _getWrappedListElements(isSelected) {

        var p = '.inputpicker-wrapped-element';
        if (typeof isSelected != 'undefined' ){
            p += isSelected ? '.selected' : ':not(.selected)';
        }
        return _getWrappedList().find(p);
    }

    // function _getWrappedListElement(i) {
    //     return _getWrappedList().find('inputpicker-wrapped-element-' + i);
    // }
    //
    // function _getWrappedListSelectedElement() {
    //     return _getWrappedList().find('tr.selected');
    // }


    function _generateUid() {
        if(!window.inputpickerUUID) window.inputpickerUUID = 0;
        return ++window.inputpickerUUID;
    }

    function _isMSIE()
    {
        var iev=0;
        var ieold = (/MSIE (\d+\.\d+);/.test(navigator.userAgent));
        var trident = !!navigator.userAgent.match(/Trident\/7.0/);
        var rv=navigator.userAgent.indexOf("rv:11.0");

        if (ieold) iev=new Number(RegExp.$1);
        if (navigator.appVersion.indexOf("MSIE 10") != -1) iev=10;
        if (trident&&rv!=-1) iev=11;

        return iev;
    }

    /**
     * The input is focused
     * @param e
     * @private
     */
    function _eventFocus(e) {
        var input = _i($(this));
        if(_set(input, "autoOpen")){
            methods.show.call(input, e);
        }
    }

    function _eventBlur(e) {
        var input = _i($(this));
        var original = _o(input);


        // _hideWrappedList();



        // Clear invalid value
        // if (input.data('inputpicker-i') == -1){
        //     input.val('');
        //     original.val('');
        // }
    }

    function _eventKeyDown(e) {
        var input = $(this);
        var wrapped_list = _getWrappedList();
        // // Close if the wrapped list is invisible
        // if(!_isWrappedListVisible()){
        //     e.stopPropagation();
        //     e.preventDefault();
        //     return;
        // }
        dd( _name(input) + '._eventKeyDown:' + e.keyCode + '; charCode:' + e.charCode);


        switch(e.keyCode){
            case 37:    // Left
            case 38:    // Up
                //_changeWrappedListSelected
                methods.show.call(input, e);
                // var tr_selected = wrapped_list.find('tr.selected');
                // if ( tr_selected.prev('.inputpicker-wrapped-element').length ){
                //     tr_selected.removeClass('selected').prev('.inputpicker-wrapped-element').addClass('selected');
                //     if (tr_selected.prev().position().top < tr_selected.outerHeight()) {
                //         wrapped_list.scrollTop(wrapped_list.scrollTop() - tr_selected.outerHeight());
                //     }
                // }
                _changeWrappedListSelected(input, -1);
                break;
            case 39:    // Down
            case 40:    // Down
                methods.show.call(input, e);
                // var tr_selected = wrapped_list.find('tr.selected');
                // if (tr_selected.next('.inputpicker-wrapped-element').length) {
                //     tr_selected.removeClass('selected').next('.inputpicker-wrapped-element').addClass('selected');
                //     if ( ( tr_selected.next().position().top + 2 * tr_selected.outerHeight()) > wrapped_list.outerHeight()) {
                //         wrapped_list.scrollTop(wrapped_list.scrollTop() + tr_selected.outerHeight());
                //     }
                // }
                _changeWrappedListSelected(input, 1);
                break;
            case 27:    // Esc
                _setValue(input, _o(input).val());
                _hideWrappedList();
                break;
            case 9:
                if ( _setValueAsSelected(input) ){  // Value changed
                    _o(input).trigger('change');
                }
                _hideWrappedList();
                break;
            case 13:    // Enter
                e.preventDefault(); // Prevent from submitting form
                methods.toggle.call(input, e);
                if ( _setValueAsSelected(input) ){
                    _o(input).trigger('change');
                }
                else{
                }
                break;
            default:
                //
                break;
        }

    }

    function _eventKeyUp(e) {
        var input = $(this);
        var wrapped_list = _getWrappedList();
        // if(!_isWrappedListVisible()){
        //     e.stopPropagation();
        //     e.preventDefault();
        //     return;
        // }
        dd( _name(input) + '._eventKeyUp:' + e.keyCode);

        if ($.inArray( e.keyCode, [37, 38, 39, 40, 27, 9, 13, 16]) != -1 ){
            return ;
        }

        // Keyword changes
        if ( _set(input, 'url')){

            // Check if delay
            var delay = parseFloat(_set(input, 'urlDelay'));
            var delayHandler = _set(input, 'delayHandler');
            if ( delayHandler ){
                clearTimeout(delayHandler);
                _set(input, 'delayHandler', false);
            }


            delayHandler = setTimeout(_loadData, delay * 1000, input, function (input) {
                _render(input);
                var wrapped_elements = _getWrappedListElements();
                if ( _isWrappedListVisible(input) && _getWrappedListElements(true).length == 0 &&  wrapped_elements.length){
                    wrapped_list.first().addClass('selected');
                }


                if(!input.is(":focus")) {
                    dd('focus', input)
                    input.focus();
                }

            } );
            _set(input, 'delayHandler', delayHandler);


            // _loadData(input, function (input) {
            //     _render(input);
            //
            //     var wrapped_elements = _getWrappedListElements();
            //     if ( _isWrappedListVisible(input) && _getWrappedListElements(true).length == 0 &&  wrapped_elements.length){
            //         wrapped_list.first().addClass('selected');
            //     }
            //
            // });
        }
        else{
            if(_set(input, 'filterOpen')){  // Need to render with filtering
                _render(input);
            }
            else{   // show straightway
                methods.show.call(input, e);
            }

            var wrapped_elements = _getWrappedListElements();
            if ( _isWrappedListVisible(input) && _getWrappedListElements(true).length == 0 &&  wrapped_elements.length){
                wrapped_list.first().addClass('selected');
            }
        }
    }

    function _isDefined(v) {
        return typeof v != 'undefined';
    }

    function _isObject(v) {
        return typeof v == 'object';
    }

    function _isArray(v) {
        return Array.isArray(v);
    }

    // -------------------------------------------------------------------------------------------
    $.fn.inputpicker = function (method) {
        if(!this.length) return this;
        if(typeof method == 'object' || !method){
            return methods.init.apply(this, arguments);

        }
        else if(methods[method]){
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else { $.error("Method "+ method + " does not exist on jQuery.inputpicker"); }
    }


    $.fn.inputpicker.defaults = {

        /**
         * Width , default is 100%
         */
        width: '100%',

        /**
         * Default Height
         */
        height: '200px',

        /**
         * Selected automatically when focus
         */
        autoOpen: false,


        /**
         * True - show head
         * False
         */
        headShow : false,   // true : show head, false: hide


        /**
         * Data
         */
        data: [],

        /**
         * Fields
         * Store fields need to been shown in the list
         * (Sting) - 'value'
         * (Object) - {name:'value', text:'Value'}
         */
        fields: [],

        /**
         * The field posting to the field
         */
        fieldValue: 'value',

        /**
         * The field shown in the input
         * Will use fieldValue if empty
         */
        fieldText :'',


        // filter Setting

        /**
         * True - filter rows when changing the input content
         * False - do not do any spliation
         */
        filterOpen: false,

        /**
         * Choose the method of filtering
         * 'start' - start filtering from the beginning
         * others - all content matches
         */
        filterType: '',  // 'start' - start from beginning or ''

        /**
         * Choose the fields need to be filtered
         * (String)'name' - one field
         * (Array)['name', 'value'] - multiple fields
         */
        filterField: '',

        /**
         * Limit number
         */
        limit: 0,

        // --- URL settings --------------------------------------------
        url: '',    // set url

        urlCache: false,

        /**
         * Set url params for the remote data
         */
        urlParam: {},

        /**
         * If search interval is too short, will execute
         */
        urlDelay: 0,

        listBackgroundColor: '',
        listBorderColor: '',
        rowSelectedBackgroundColor: '',
        rowSelectedFontColor : '',

        // Un-necessary - Use Pagination
        // pagination: false,

        _bottom: ''

    };

    // $.fn.inputpicker.wrapped_list = null;
});