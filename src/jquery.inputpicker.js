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
                var settings = $.extend({}, $.fn.inputpicker.defaults, _options,  Array.isArray(options) ? {data:options} : options);

                // Set default value for fieldText
                if(!settings['fieldText'])  settings['fieldText'] = settings['fieldValue'];

                // Set default value for fields
                if (!settings['fields'].length){
                    settings['fields'].push(settings['fieldText']);
                }

                input.data('inputpicker-settings', settings);

                // _set(input, settings);

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
        option: function (k, v) {
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
                    if ( data = _formatData(data) ){
                        _error('set data failed, the format is incorrect');
                    }
                    _set(input, 'data', data);
                });
            }
        },

        /**
         * Show or hide the input
         */
        toggle: function (e) {
            return this.each(function () {
                var input = _i($(this));
                if( _isWrappedListVisible(input) ) {
                    methods.hide.call(input, e);
                }
                else{
                    if(input.is(":focus")) {    // has focus, only need to show
                        methods.show.call(input, e);
                    }
                    else{   // not focused yet, check if need show after focus
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
                // else if( _uuid(_getWrappedList()) == uuid){
                //     dd('_getWrappedList().show()');
                //     _getWrappedList().show();
                // }
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
                _setValue(input, value);
                original.trigger('change');
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

    function _debug(input){
        if(methods.debug){
            var args = Array.prototype.slice.call(arguments);
            var pre = 'inputpicker(' + _uuid(input);
            if(_o(input))   {
                pre += '--' + _o(input).attr('name');
            }
            if(arguments.callee.caller.name){
                pre += '--' +  arguments.callee.caller.name;
            }
            args.unshift( pre + ')');
            dd(args);
        }
    }

    // get Input name
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

    function _alert(msg) {
        alert(msg);
    }

    // Check data and format it
    function _formatData(fieldValue, data) {
        if(!Array.isArray(data)){
            return false;
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
        var original = _o(input);
        var uuid = _uuid(input);
        var url = _set(input, 'url');

        if (typeof func == 'undefined'){
            func = param;
            param = {};
        }

        $.get(url, $.extend({
            q: input.val(),
            qo: $('.inputpicker-original-' + uuid).val(),
            limit : _set(input, 'limit'),
            fieldValue: _set(input, 'fieldValue'),
            value: original.val()
        }, param), func, "json");
    }

    /**
     * Get wrapped list
     * If div wrapped list doest not exist, initiate it
     * If input is not undefined, init it.
     * @returns {*|null}
     * @private
     */
    function _getWrappedList(input) {
        if ( !$.fn.inputpicker.wrapped_list){
            $.fn.inputpicker.wrapped_list = $('<div />', {
                id: 'inputpicker-wrapped-list',
                tabindex: -1,

            }).css({
                'display':'none',
                'position': 'absolute',
                'overflow' : 'all'
            }).addClass('inputpicker-wrapped-list').data('inputpicker-uuid', 0).appendTo(document.body);

            $(document).on('click', function (e) {
                if(!($(e.target).hasClass('inputpicker-input'))){
                    _hideWrappedList();
                }
            });

            $.fn.inputpicker.wrapped_list.on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
        }

        if (typeof input != 'undefined'){
            // Reset setting for wrapped list
            if ( $.fn.inputpicker.wrapped_list.data('inputpicker-uuid') != input.data('inputpicker-uuid')){
                $.fn.inputpicker.wrapped_list.data('inputpicker-uuid', _uuid(input)).html("");
            }
        }
        return $.fn.inputpicker.wrapped_list;

    }

    // Get the original input
    function _o(input) {
        return input.data('inputpicker-original') ? input.data('inputpicker-original') : input;
    }

    // Get the target input
    function _i(original) {
        return original.data('inputpicker-input') ? original.data('inputpicker-input') : original ;
    }

    function _uuid(o) {
        return o.data('inputpicker-uuid');

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
        }
    }

    /**
     * Replaced by _filterData
     * Search Wrapped List and hide un-matched rows
     * @param input
     * @private
    function _filterValue(input) {
        var wrapped_list = _getWrappedList(input);
        var uuid = _uuid(input);
        var settings = _set(input);
        var fields = _set(input, 'fields');
        var fieldValue = _set(input, 'fieldValue');
        var filterOpen = settings['filterOpen'];
        var filterType = settings['filterType'];
        var filterField = settings['filterField'];
        var data = _set(input, 'data');
        var original_value = $('.inputpicker-original-' + uuid).val();
        var original_value_low = original_value.toString().toLowerCase();
        var value = $('#inputpicker-' + uuid).val();
        var value_low = value.toString().toLowerCase();
        var isShown;

        if (!filterOpen || !value_low || !_isWrappedListVisible() || wrapped_list.data('inputpicker-uuid') != uuid){
            return;
        }

        _getWrappedListElements().each(function () {
            var i = $(this).data('i');

            isShown = false;

            // Check if need to see
            // First, the selected need to be shown
            // Check if need to be shown
            if (typeof filterField == 'string' && filterField) // Search specific field
            {
                var fieldValue = data[i][filterField].toString().toLowerCase();
                if (filterType == 'start' && fieldValue.substr(0, value_low.length) == value_low) {
                    isShown = true;
                }
                else if (fieldValue.indexOf(value_low) != -1) {
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
                    if (filterType == 'start' && fieldValue.substr(0, value_low.length) == value_low) {
                        isShown = true;
                    }
                    else if (fieldValue.indexOf(value_low) != -1) {
                        isShown = true;
                    }
                }
            }
            // dd([i + ' => ' + isShown, filterField, fieldValue, value_low]);
            isShown ? $(this).show() : $(this).hide();
        });

    }
     */

    function _filterData(input) {
        var data = _formatData(input, methods.data.call(input));
        var fields = _set(input, 'fields');
        var fieldValue = _set(input, 'fieldValue');
        var filterType =  _set(input, 'filterType');
        var filterField =  _set(input, 'filterField');
        var input_value = input.val();
        var input_value_low = input_value.toString().toLowerCase();

        // var limit = _set(input, 'limit');
        // var page = ( typeof page == 'undefined' || page < 1 ) ? 1 : parseInt(page);
        // dd(data, limit, page);

        if (!_set(input, 'filterOpen') || !input_value_low || _set(input, 'url') || !_isArray(data) ){
            return data;
        }

        var new_data = [];
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
        html_table += "<tbody>";
        if(data.length){
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
        }

        html_table += "</tbody></table>";

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
                _hideWrappedList();
                _o(input).trigger('change');

            })
        });


        // Move to the first if not selected
        var wrapped_elements = _getWrappedListElements();
        if ( _isWrappedListVisible() && wrapped_list.find('.selected:visible').length == 0 &&  wrapped_elements.length){
            wrapped_list.find('.selected').removeClass('selected');
            wrapped_list.find('.inputpicker-wrapped-element:visible').first().addClass('selected');
        }

        // Check and change the cursor position if necessary
        var tr_selected = wrapped_list.find('tr.selected');
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
            _execJSON(input, {
            },function (ret) {
                if(ret['msg'])  alert('Load remote data failed: ' + ret['msg'] + 'input[name='+ original.attr('name') +']');
                else{
                    var data = ret['data'];

                    // Check and format data
                    if (! (data = _formatData(_set(input, 'fieldValue'), data)) ){
                        _alert( "The type of data(" + ( typeof data ) + ") is incorrect.", input);
                        data = settings['data'];    // Still use old data
                    }
                    else{   // apply new data
                        _set(input, 'data', data);
                    }

                    if(typeof func == 'function'){
                        func(input);
                    }

                    input.removeClass('loading').prop('disabled', false);
                    if(_isMSIE())   input.removeClass('loading-msie-patch');
                }
            });
        }
        else{
            if( _isArray(data)){
                if (! (data = _formatData(_set(input, 'fieldValue'), data)) ){
                    _alert( "The type of data(" + ( typeof data ) + ") is incorrect.", input);
                    data = settings['data'];    // Still use old data
                }
                else{   // apply new data
                    _set(input, 'data', data);
                }
            }
            else{
                data = _set(input, 'data');
            }

            if(typeof func == 'function'){
                func(input);
            }

            input.removeClass('loading').prop('disabled', false);
            if(_isMSIE())   input.removeClass('loading-msie-patch');
        }

    }



    /**
     * Set value
     *
     * true - value changed
     * false - not changed
     *
     * @param input
     * @param value
     * @private
     */
    function _setValue(input, value) {
        var original = _o(input);
        var old_original_value = original.val();

        var fieldValue = _set(input, 'fieldValue');
        var fieldText = _set(input, 'fieldText');
        var data = _formatData(fieldValue, _set(input, 'data'));
        for(var i = 0; i < data.length; i++){
            if ( data[i][ fieldValue ] == value){
                input.val( data[i][ fieldText ]);
                original.val( data[i][ fieldValue ]);
                return old_original_value != value;
            }
        }

        // Did not find, set empty
        input.val( '');
        original.val( '');
        return false;
    }

    /**
     * Set selected as value
     * @param uuid
     * @private
     */
    function _setValueAsSelected(input) {
        var tr_selected = $('#inputpicker-wrapped-list').find('tr.selected');
        if (tr_selected.length){
            return _setValue(input, tr_selected.data('value'));
        }
        else{   // Not selected, Reset to last
            _setValue(input, _o(input).val());
            return false;
        }
    }

    function _isWrappedListVisible(input) {
        var is = $('#inputpicker-wrapped-list').is(':visible');
        if (is && typeof input != 'undefined' && $('#inputpicker-wrapped-list').data('inputpicker-uuid') != _uuid(input)){
            is = false ;
        }
        return is;
    }

    function _hideWrappedList() {
        return _getWrappedList() ? _getWrappedList().hide() : false;
    }

    function _getWrappedListElements() {
        if ( !_getWrappedList() ){
            return $([]);
        }
        return $.fn.inputpicker.wrapped_list.find('.inputpicker-wrapped-element');
    }

    function _getWrappedListElement(i) {
        return _getWrappedList().find('inputpicker-wrapped-element-' + i);
    }

    function _getWrappedListSelectedElement() {
        return _getWrappedList().find('.selected');
    }


    function _generateUid() {
        if(!window.inputpickerUUID) window.inputpickerUUID = 0;
        return ++window.inputpickerUUID;
    }

    function _isMSIE()
    {
        return window.navigator.userAgent.indexOf("MSIE ") > 0;
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
        switch(e.keyCode){
            case 37:    // Left
            case 38:    // Up
                methods.show.call(input, e);
                var tr_selected = $('#inputpicker-wrapped-list').find('tr.selected');
                if ( tr_selected.prev('.inputpicker-wrapped-element').length ){
                    tr_selected.removeClass('selected').prev('.inputpicker-wrapped-element').addClass('selected');
                    if (tr_selected.prev().position().top < tr_selected.outerHeight()) {
                        wrapped_list.scrollTop(wrapped_list.scrollTop() - tr_selected.outerHeight());
                    }
                }
                break;
            case 39:    // Down
            case 40:    // Down
                methods.show.call(input, e);
                var tr_selected = $('#inputpicker-wrapped-list').find('tr.selected');
                if (tr_selected.next('.inputpicker-wrapped-element').length) {
                    tr_selected.removeClass('selected').next('.inputpicker-wrapped-element').addClass('selected');
                    if ( ( tr_selected.next().position().top + 2 * tr_selected.outerHeight()) > wrapped_list.outerHeight()) {
                        wrapped_list.scrollTop(wrapped_list.scrollTop() + tr_selected.outerHeight());
                    }
                }
                break;
            case 27:    // Esc
                _setValue(input, _o(input).val());
                _hideWrappedList();
                break;
            case 13:    // Enter
                e.preventDefault(); // Prevent from submitting form
                methods.toggle.call(input, e);
                if ( _setValueAsSelected(input) ){
                    _o(input).trigger('change');
                }
                break;
            default:
                break;
        }

        dd('_eventKeyDown:' + e.keyCode);
    }

    function _eventKeyUp(e) {
        var input = $(this);
        var wrapped_list = _getWrappedList();
        // if(!_isWrappedListVisible()){
        //     e.stopPropagation();
        //     e.preventDefault();
        //     return;
        // }

        if ($.inArray( e.keyCode, [37, 38, 39, 40, 27, 9, 13]) != -1 ){
            return ;
        }

        dd("_eventKeyUp:" + e.keyCode);

        switch(e.keyCode){
            // case 38:    // Up
            //     return;
            //     break;
            // case 40:    // Down
            //     return;
            //     break;
            // case 13:    // Return
            //     break;
            case 9:     // Tab
                // input.val() ? _setValueAsSelected(input) : _setValue(input, '');
                if ( _setValueAsSelected(input) ){  // Value changed
                    _o(input).trigger('change');
                }
                _hideWrappedList();
                break;
            // case 27:    // ESC
            //     break;
            default:
                // Change input value
                if ( _set(input, 'url')){
                    _loadData(input, function (input) {
                        _render(input);
                    });
                }
                else{
                    if(_set(input, 'filterOpen')){  // Need to render with filtering
                        _render(input);
                    }
                    else{   // show straightway
                        methods.show.call(input, e);
                    }
                }

                break;
        }

        // if(!input.val()){    // Empty
        //     _getWrappedListElements().each(function () {
        //         $(this).show();
        //     });
        // }

        // _filterValue(input);

        // Check if has not selected, selected the first as default
        var wrapped_elements = _getWrappedListElements();
        if ( _isWrappedListVisible() && wrapped_list.find('.selected:visible').length == 0 &&  wrapped_elements.length){
            wrapped_list.find('.selected').removeClass('selected');
            wrapped_list.find('.inputpicker-wrapped-element:visible').first().addClass('selected');
        }
        // dd([
        //     '.selected:visible: ' +  wrapped_list.find('.selected:visible').length + ', ' + wrapped_elements.length,
        //     wrapped_elements.first().length,
        //     wrapped_elements.find(':visible').first().html()
        // ]);
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

        limit: 0,


        listBackgroundColor: '',
        listBorderColor: '',
        rowSelectedBackgroundColor: '',
        rowSelectedFontColor : '',



        // Un-necessary - Use Pagination
        // pagination: false,

        _bottom: ''

    };

    $.fn.inputpicker.wrapped_list = null;
});