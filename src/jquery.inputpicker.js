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

                // Generate UUID
                if (original.data('inputpicker-uuid')){
                    return false;   // has been initiated
                }

                var uuid = _generateUid();
                original.data('inputpicker-uuid', uuid);

                // Clone input
                var self = original.clone();

                // Add Classes to the original element
                original.addClass('inputpicker-original');
                original.addClass('inputpicker-original-' + uuid);

                // Initiate Self
                self.val('').data('inputpicker-uuid', uuid).data('inputpicker-i', -1).addClass('inputpicker-input').prop('id', 'inputpicker-' + uuid).prop('name', 'inputpicker-' + uuid);

                // Inputpicker div
                var inputpicker_div = $("<div id=\"inputpicker-div-" + uuid + "\" class=\"inputpicker-div\" data-uuid=\"" + uuid + "\"></div>").append(self);

                // $('#inputpicker-" + uuid + "').inputpicker('toggle');
                inputpicker_div.append("<span class=\"inputpicker-arrow\" data-uuid=\"" + uuid + "\" onclick=\"$.fn.inputpicker('eventClickArrow');\"><b></b></span>");

                original.after(inputpicker_div);
                original.prop('type', 'hidden');

                // Add arrow for self
                // Pick up settings from data attributes
                var _options = [];
                for(var k in $.fn.inputpicker.defaults){
                    if(self.data(k)){
                        _options[k] = self.data(k);
                    }
                }

                var settings = $.extend({}, $.fn.inputpicker.defaults, _options, options);
                self.data('inputpicker-settings', settings);
                self.prop('autocomplete', 'off');

                // if(settings.showOn){
                //     for(var i in settings.showOn){
                //         self.on(settings.showOn[i] + '.inputpicker', methods.show);
                //     }
                // }
                self.on( 'focus.inputpicker', _eventFocus);
                self.on( 'blur.inputpicker', _eventBlur);

                self.on('keydown.inputpicker', _eventKeyDown);
                self.on('keyup.inputpicker', _eventKeyUp);
                self.on('change.inputpicker', _eventChange);

                // _eventChange.call(self.get(0));
                _setValue(self, original.val());
            })
        },

        destroy: function (options) {
            return this.each(function () {
                var self = $(this);
                self.removeClass('inputpicker-input');
                self.removeData('inputpicker-settings');
            })
        },

        // setting: function (name) {
        //     var self = $(this).get(0);
        //     var settings = self.data('settings');
        //     dd(settings);
        // },

        data: function (data) {
            return this.each(function () {
                var self = $(this);
                var uuid = self.data('inputpicker-uuid');
                _setSetting(self, 'data', data);


            });
        },

        toggle: function (options) {
            return this.each(function () {
                var self = $(this);


                if ( _isWrappedListVisible() ){
                    _hideWrappedList();
                }
                else{
                    self.inputpicker('show');
                }
            });
        },

        // Events
        show: function (e, t) {
            dd('inputpicker.show');
            var self = typeof t == 'undefined' ? $(this) : t;
            var settings = _getSettings(self);
            var data = _getSetting(self, 'data');
            // if (e) {
            //     e.preventDefault();
            //     e.stopPropagation();
            // }

            // Check if readonly
            if (self.prop('readonly')){
                dd('readonly');
                return;
            }

            if (!_isInputVisible(self)){
                dd('!_isInputVisible(self)');
                return;
            }

            /*

             // Start showing
             var selfOffset = {};
             var left = self.offset().left , //+ self.outerWidth()
             top = self.offset().top + self.outerHeight();

             var wrapped_list = _initWrappedList();
             */

            _render(self);

        },

        eventClickArrow: function(e){
            return this.each(function () {
                dd($(this).html());
                $('#inputpicker-' + $(this).data('uuid')).focus();
                event.stopPropagation();
            });

        }

    };

    // ---------------------------------------------------------------------------------------------------------

    function _initWrappedList(self) {
        if ( !$.fn.inputpicker.wrapped_list){
            // $.fn.inputpicker.divResult = $("<div id=\"inputpicker-list\" style=\"position:absolute;left:-1000px;top:-1000px;\"></div>");//border:1px solid #888;width:100px;height:200px;
            $.fn.inputpicker.wrapped_list = $('<div />', {
                id: 'inputpicker-wrapped-list',
                tabindex: -1,

            }).css({
                'display':'none',
                'position': 'absolute',
                'overflow' : 'all'
            }).addClass('inputpicker-wrapped-list').data('inputpicker-uuid', 0).appendTo(document.body);

            $(document).on('click', function (e) {
                if(($(e.target).hasClass('inputpicker-input'))){
                    return;
                }
                _hideWrappedList();
            });

            $.fn.inputpicker.wrapped_list.on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
        }

        // Reset if
        if ( $.fn.inputpicker.wrapped_list.data('inputpicker-uuid') != self.data('inputpicker-uuid')){
            $.fn.inputpicker.wrapped_list.data('inputpicker-uuid', self.data('inputpicker-uuid')).html("");
        }
        return $.fn.inputpicker.wrapped_list;
        // var list = $("<div class=\"inputpicker-list\" style=\"position:absolute;left:" + left + "px;top:"+ top + "px;border:1px solid #888;width:100px;height:200px;\"></div>");
    }

    function _getWrappedList() {
        return $.fn.inputpicker.wrapped_list;
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


    function _getSettings(self) {
        return self.data('inputpicker-settings') ;
    }

    function _getSetting(self, name) {
        var settings = _getSettings(self) ;
        // return ( settings && settings[name] ) ? settings[name] : null;
        return settings[name];
    }

    function _setSetting(self, name, value) {
        var settings = {};

        if (typeof name == 'object'){
            settings = name;
        }
        else{
            settings = _getSettings(self);
            settings[name] = value;
        }
        self.data('inputpicker-settings', settings);

    }

    /**
     * Search Wrapped List and hide un-matched rows
     * @param self
     * @private
     */
    function _filterValue(self) {
        var wrapped_list = _getWrappedList(self);
        var uuid = self.data('inputpicker-uuid');
        var settings = _getSettings(self);
        var fields = _getSetting(self, 'fields');
        var field_value = _getSetting(self, 'field_value');
        var searchOpen = settings['searchOpen'];
        var searchType = settings['searchType'];
        var searchField = settings['searchField'];
        var data = _getSetting(self, 'data');
        var original_value = $('.inputpicker-original-' + uuid).val();
        var original_value_low = original_value.toLowerCase();
        var value = $('#inputpicker-' + uuid).val();
        var value_low = value.toLowerCase();
        var isShown;

        if (!searchOpen || !value_low || !_isWrappedListVisible() || wrapped_list.data('inputpicker-uuid') != uuid){
            return;
        }

        _getWrappedListElements().each(function () {
            var i = $(this).data('i');

            isShown = false;

            // Check if need to see
            // First, the selected need to be shown
            // Check if need to be shown
            if (typeof searchField == 'string' && searchField) // Search specific field
            {
                var field_value = data[i][searchField].toLowerCase();
                if (searchType == 'left' && field_value.substr(0, value_low.length) == value_low) {
                    isShown = true;
                }
                else if (field_value.indexOf(value_low)) {
                    isShown = true;
                }
            }
            else {
                if (typeof searchField != 'array' && typeof searchField != 'object') {
                    searchField = [];
                    for(var k in fields)    searchField.push(fields[k]['name']);
                }
                for (var k in searchField) {
                    var field_value = data[i][searchField[k]].toLowerCase();
                    if (searchType == 'left' && field_value.substr(0, value_low.length) == value_low) {
                        isShown = true;
                    }
                    else if (field_value.indexOf(value_low) != -1) {
                        isShown = true;
                    }
                }
            }
            // dd([i + ' => ' + isShown, field_value, value_low]);
            isShown ? $(this).show() : $(this).hide();
        });

    }

    /**
     * Draw the results list
     * @param self
     * @private
     */
    function _render(self) {
        var wrapped_list = _initWrappedList(self);
        var uuid = self.data('inputpicker-uuid');
        var settings = _getSettings(self);
        var fields = _getSetting(self, 'fields');
        var field_value = _getSetting(self, 'field_value');
        var searchOpen = settings['searchOpen'];
        var searchType = settings['searchType'];
        var searchField = settings['searchField'];
        var data = _getSetting(self, 'data');
        var value = $('.inputpicker-original-' + uuid).val();

        var left = self.offset().left , //+ self.outerWidth()
            top = self.offset().top + self.outerHeight(),
            width = self.outerWidth();

        wrapped_list.css({
            left: left + 'px',
            top: top + 'px',
            width: width,
            display: ''
            //, backgroundColor:'#f1f1f1'
        }).data('inputpicker-uuid', uuid).html('');

        var html_table = "<table class=\"table small\"><thead><tr>" ;

        if(fields){
            for(var i = 0; i < fields.length; i++){
                html_table += '<th>' + fields[i]['text'] + '</th>';
            }
        }
        html_table += "</thead><tbody>";

        if(data){
            var isSelected = false;
            for(var i = 0; i < data.length; i++) {
                isSelected = value == data[i][ field_value ] ? true : false;
                html_table += '<tr class="inputpicker-wrapped-element inputpicker-wrapped-element-' + i + ' ' + (isSelected ? 'selected' : '') + '" data-i="' + i + '">';
                for (var j = 0; j < fields.length; j++) {
                    html_table += '<td>' + data[i][fields[j]['name']] + '</td>';
                }
                html_table += '</tr>';
            }
        }

        html_table += "</tr></tbody></table>";

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
                var self = $('#inputpicker-' + uuid);
                var data = _getSetting(self, 'data');

                _setValue(self, data[i][ _getSetting(self, 'field_value') ]);
                _hideWrappedList();

            })
        })


    }

    function _parseSettings(settings) {
        return settings;
    }

    // Check if the specific
    function _isInputVisible(os) {
        var o = os[0];
        return o.offsetWidth > 0 && o.offsetHeight > 0;
    }

    function _isWrappedListVisible() {
        return $('#inputpicker-wrapped-list').is(':visible');
    }

    function _generateUid() {
        if(!window.inputpickerUUID) window.inputpickerUUID = 0;
        return ++window.inputpickerUUID;
    }

    /**
     * Set value and selected
     * @param self
     * @param value
     * @private
     */
    function _setValue(self, value) {
        var uuid = self.data('inputpicker-uuid');
        var original = $('.inputpicker-original-' + uuid);
        var settings = _getSettings(self);
        var data = _getSetting(self, 'data');
        var wrapped_list = _getWrappedList();

        self.data('inputpicker-i', -1);
        for(var i = 0; i < data.length; i++){
            if ( data[i][ settings['field_value']] == value){
                self.data('inputpicker-i', i);
                self.val( data[i][ settings['field_text'] ]);
                original.val( data[i][ settings['field_value'] ]);

                // Selected
                if (_getWrappedList()){
                    _getWrappedListSelectedElement().removeClass('selected');
                    _getWrappedListElement(i).addClass('selected');
                }




                break;
            }
        }
        // self.val( data[i][ settings['field_text'] ]);
        // original.val( data[i][ settings['field_value'] ]);
    }

    /**
     * Set selected as value
     * @param uuid
     * @private
     */
    function _setSelectedAsValue(self) {
        var uuid = self.data('inputpicker-uuid');
        var original = $('.inputpicker-original-' + uuid);
        var settings = _getSettings(self);
        var data = _getSetting(self, 'data');

        self.data('inputpicker-i', -1);
        var tr_selected = $('#inputpicker-wrapped-list').find('tr.selected');
        if (tr_selected.length){
            var i = tr_selected.data('i');
            self.data('inputpicker-i', i);
            self.val( data[i][ settings['field_text'] ]);
            original.val( data[i][ settings['field_value'] ]);
        }
    }

    function _hideWrappedList() {
        dd('_hideWrappedList');
        $.fn.inputpicker.wrapped_list.hide();
    }

    function _showWrappedList() {
        $.fn.inputpicker.wrapped_list.show();
    }

    function _eventChange(e) {
        dd('_eventChange');
        if(this.value === ''){
            return;
        }
        // var self = $(this);
        // dd(origin);

    }

    /**
     *
     * @param e
     * @private
     */
    function _eventFocus(e) {
        var self = $(this);
        methods.show(e, self);
    }

    function _eventBlur(e) {
        var self = $(this);
        var uuid = self.data('inputpicker-uuid');
        var original = $('.inputpicker-original-' + uuid);

        // Clear invalid value
        if (self.data('inputpicker-i') == -1){
            self.val('');
            original.val('');
        }
    }

    function _eventKeyDown(e) {
        var self = $(this);
        var uuid = self.data('inputpicker-uuid');

        // if(!_isWrappedListVisible()){
        //     e.stopPropagation();
        //     e.preventDefault();
        //     return;
        // }

        // Change Data
        // _searchContent(self, self.val());
        // _render(self);

        _showWrappedList();


        switch(e.keyCode){
            case 38:    // Up
                if(_isWrappedListVisible()){
                    var tr_selected = $('#inputpicker-wrapped-list').find('tr.selected');
                    if ( tr_selected.prev('.inputpicker-wrapped-element').length ){
                        tr_selected.removeClass('selected').prev('.inputpicker-wrapped-element').addClass('selected');
                    }
                }
                break;
            case 40:    // Down
                if(_isWrappedListVisible()) {
                    var tr_selected = $('#inputpicker-wrapped-list').find('tr.selected');
                    if (tr_selected.next('.inputpicker-wrapped-element').length) {
                        tr_selected.removeClass('selected').next('.inputpicker-wrapped-element').addClass('selected');
                    }
                }
                break;
            case 13:    // Return
                e.preventDefault();
                _setSelectedAsValue(self);
                _hideWrappedList();
                break;
            case 9:     // Tab
                // self.val('');
                // Move to blur
                _setSelectedAsValue(self);
                _hideWrappedList();
                break;
            case 27:    // Esc

                break;

        }

        dd('_eventKeyDown:' + e.keyCode);
    }

    function _eventKeyUp(e) {
        var self = $(this);
        //
        // switch(e.keyCode){
        //
        // }
        // dd('_eventKeyUp:' + e.keyCode);


        switch(e.keyCode){
            case 38:    // Up
            case 40:    // Down
                return;

        }

        if(!self.val()){    // Empty
            _getWrappedListElements().each(function () {
                $(this).show();
            });
        }

        _filterValue(self);

        // Check if has not selected, selected the first as default
        var wrapped_list = _getWrappedList();
        var wrapped_elements = _getWrappedListElements();
        if ( _isWrappedListVisible() && wrapped_list.find('.selected:visible').length == 0 &&  wrapped_elements.length){
            wrapped_list.find('.selected').removeClass('selected');
            wrapped_list.find('.inputpicker-wrapped-element:visible').first().addClass('selected');
            dd( 'wrapped_elements.first()' + wrapped_elements.first().data('i') );
        }
        dd([
            '.selected:visible: ' +  wrapped_list.find('.selected:visible').length + ', ' + wrapped_elements.length,
            wrapped_elements.first().length,
            wrapped_elements.find(':visible').first().html()
        ]);
    }

    // -------------------------------------------------------------------------------------------
    $.fn.inputpicker = function (method) {
        if(!this.length) return this;
        if(methods[method]){
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if(typeof method == 'object' || !method){
            return methods.init.apply(this, arguments);

        }
        else { $.error("Method "+ method + " does not exist on jQuery.inputpicker"); }
    }


    $.fn.inputpicker.defaults = {

        // Data
        data: [],
        fields: [{name:'value', text:'Value'}],
        field_text :'value',
        field_value: 'value',

        // Split Setting
        splitOpen


        // Pagination
        pagination: false,
        limit: 10,

        // Style
        width: '100%',
        height: '200px'


    };

    $.fn.inputpicker.wrapped_list = null;
});