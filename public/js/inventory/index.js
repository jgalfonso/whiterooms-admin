$(function () {

    var App = {
        baseUrl : window.location.protocol + '//' + window.location.host + '/api/inventory/',
        csrfToken : $('meta[name="csrf-token"]').attr('content'),

        init: function () {
            this.setElements();

            App.initDataTable();

            this.bindEvents();
        },

        setElements: function () {
            this.unitprice = $('#unitprice');
            this.discount = $('#discount');
            this.save = $('#save');
            this.reset = $('#reset');
        },

        bindEvents: function () {
            this.unitprice.keyup(function() {
                App.validateNumber(this);
                if($(this).val()) App.setNet();
            });
            this.discount.keyup(function() {
                App.validateNumber(this);
                if($(this).val()) App.setNet();
            });
            this.save.on('click', function() {
                if($('#id').val()) App.edit();
                else App.store();
            });
            this.reset.on('click', function() {
                App.clear();
            });
        },

        initDataTable: function() {
            
            var table = $('#tbl').DataTable({
                processing: true,
                serverMethod: 'GET',
                bInfo: true,
                bDestroy: true,
                bLengthChange: true,
                pageLength: 25,
                scrollX: true,
                ajax: App.baseUrl + "get-products",
                order: [[ 2, "asc" ]],
                columns:[
                    { data: 'id', 'className': 'hide' },
                    { data: 'thumb', 'className': 'text-center' },
                    { data: 'item' },
                    { data: 'qty', 'className': 'text-right' },
                    { data: 'unit_price', 'className': 'text-right' },
                    { data: 'discount', 'className': 'text-right' },
                    { data: 'net', 'className': 'text-right' },
                    { data: 'is_new_arrival', 'className': 'text-center' },
                    { data: 'is_recommended', 'className': 'text-center' },
                    { data: 'is_featured', 'className': 'text-center' },
                    { data: 'is_best_selling', 'className': 'text-center' },
                    { data: 'action', 'className': 'text-center' },
                ],
                language: {
                    paginate: {
                        next: '»', 
                        previous: '«' 
                    },
                    processing: "Please wait while we load the data...",
                    searchPlaceholder: 'By Sku / Name / Description'
                },
                initComplete: function(settings, json) {
                    //$('.span-counter').html(json.recordsTotal);
                    //$('.span-counter').css('display', 'inline');
                },
                columnDefs: [
                    {
                        targets: 0,
                        orderable: false,
                        'render': function (data, type, row){

                            return row['id'];
                        }
                    },
                    {
                        targets: 1,
                        orderable: false,
                        'render': function (data, type, row){

                            return '<img src="' + row['image'] + '" onerror="this.onerror=null; this.src=\'' + window.location.protocol + '//' + window.location.host + '/images/default.png\'; this.style.opacity=1;" alt="Thumbnail" class="w35 rounded">';

                        }
                    },
                    {
                        targets: 2,
                        orderable: true,
                        'render': function (data, type, row){

                            return row['sku']+'<br/><b>'+row['name']+'</b><br/>'+row['description'].substring(0, 50)+'...';
                        }
                    },
                    {
                        targets: 3,
                        orderable: true,
                        'render': function (data, type, row){

                            return row['qty'];
                        }
                    },
                    {
                        targets: 4,
                        orderable: true,
                        'render': function (data, type, row){

                            return row['unit_price'];
                        }
                    },
                    {
                        targets: 5,
                        orderable: true,
                        'render': function (data, type, row){

                            return (row['discount']=0?row['discount']:'');
                        }
                    },
                    {
                        targets: 6,
                        orderable: true,
                        'render': function (data, type, row){

                            return row['net_price'];
                        }
                    },
                    {
                        targets: 7,
                        orderable: true,
                        'render': function (data, type, row){

                            return (row['is_new_arrival']?'<i class="fa fa-check text-success"></i>':'');
                        }
                    },
                    {
                        targets: 8,
                        orderable: true,
                        'render': function (data, type, row){

                            return (row['is_recommended']?'<i class="fa fa-check text-success"></i>':'');
                        }
                    },
                    {
                        targets: 9,
                        orderable: true,
                        'render': function (data, type, row){

                            return (row['is_featured']?'<i class="fa fa-check text-success"></i>':'');
                        }
                    },
                    {
                        targets: 10,
                        orderable: true,
                        'render': function (data, type, row){

                            return (row['is_best_selling']?'<i class="fa fa-check text-success"></i>':'');
                        }
                    },
                    {
                        targets: 11,
                        orderable: false,
                        'render': function (data, type, row){

                            var content = '<a onclick="set('+row['id']+');" class="btn btn-sm btn-default" title="Edit" data-toggle="tooltip" data-placement="top" data-original-title="Edit" style="cursor: pointer;"><i class="icon-pencil"></i></a>';
                            return content;
                        }
                    }
                ]
            });
        },

        validateNumber: function(e) {
            let value = $(e).val();
            value = value.replace(/[^0-9.]/g, '');

            const periodCount = (value.match(/\./g) || []).length;
            if (periodCount > 1) value = value.replace(/\.+$/, ''); 
            $(e).val(value);
        },

        setNet : function() {

            $('#net').val($('#unitprice').val()-$('#discount').val());
        },

        store : function() {

            if (!$('#form').parsley().validate()) { bootstrap_alert.warning('#alert', ' There are some error/s, please correct them bellow.'); return; }

            bootstrap_alert.close('#alert');     

            $.ajax({
                type:'POST',
                url : App.baseUrl + "store",
                data: {
                    name            : $('#name').val(),
                    description     : $('#description').val(),
                    qty             : $('#qty').val(),
                    unitPrice       : $('#unitprice').val(),
                    discount        : $('#discount').val(),
                    net             : $('#net').val(),
                    thumbnailPath   : $('#thumbnailpath').val(),
                    isNewarrival    : $('#isnewarrival').is(":checked") && 1 || 0,
                    isRecommended   : $('#isrecommended').is(":checked") && 1 || 0,
                    isFeatured      : $('#isfeatured').is(":checked") && 1 || 0,
                    isBestselling   : $('#isbestselling').is(":checked") && 1 || 0,
                    _token          : App.csrfToken,
                },
                dataType: 'json',
                success: function(data) {
                    if(data && data.success == true) {
                        
                        App.initDataTable();
                        App.clear();
                        
                        swal({ title: "Success!", text: '1 row successfully submitted.', type: "success" });
                    }
                    else swal({ title: "Error!", text: data.message, type: "error" });
                },
                error : function(request, status, error) {
                            
                    var errors = request.responseJSON.message;  

                    errors += '<ul style="margin: 10px 0 0 35px;">';
                    $.each(request.responseJSON.errors, function(id, val) {
                        errors += '<li>'+val+'</li>';
                    });
                    errors += '</ul>';

                    bootstrap_alert.warning('#alert', errors); 
                }
            });
        },

        edit : function() {

            if (!$('#form').parsley().validate()) { bootstrap_alert.warning('#alert', ' There are some error/s, please correct them bellow.'); return; }

            bootstrap_alert.close('#alert');     

            $.ajax({
                type:'POST',
                url : App.baseUrl + "edit",
                data: {
                    id              : $('#id').val(),
                    name            : $('#name').val(),
                    description     : $('#description').val(),
                    qty             : $('#qty').val(),
                    unitPrice       : $('#unitprice').val(),
                    discount        : $('#discount').val(),
                    net             : $('#net').val(),
                    thumbnailPath   : $('#thumbnailpath').val(),
                    isNewarrival    : $('#isnewarrival').is(":checked") && 1 || 0,
                    isRecommended   : $('#isrecommended').is(":checked") && 1 || 0,
                    isFeatured      : $('#isfeatured').is(":checked") && 1 || 0,
                    isBestselling   : $('#isbestselling').is(":checked") && 1 || 0,
                    _token          : App.csrfToken,
                },
                dataType: 'json',
                success: function(data) {
                    if(data && data.success == true) {
                        
                        App.initDataTable();
                        App.clear();
                        
                        swal({ title: "Success!", text: '1 row successfully updated.', type: "success" });
                    }
                    else swal({ title: "Error!", text: data.message, type: "error" });
                },
                error : function(request, status, error) {
                            
                    var errors = request.responseJSON.message;  

                    errors += '<ul style="margin: 10px 0 0 35px;">';
                    $.each(request.responseJSON.errors, function(id, val) {
                        errors += '<li>'+val+'</li>';
                    });
                    errors += '</ul>';

                    bootstrap_alert.warning('#alert', errors); 
                }
            });
        },

        clear : function() {
            $('#title').text('New Product');
            $('#id').val('');
            $('#sku').val('');
            $('#name').val('');
            $('#description').val('');
            $('#qty').val('');
            $('#unitprice').val('');
            $('#discount').val('');
            $('#net').val('');
            $('#thumbnailpath').val('');$('#net').val('');
            $("#isnewarrival").prop('checked', true);
            $("#isrecommended").prop('checked', false);
            $("#isfeatured").prop('checked', false);
            $("#isbestselling").prop('checked', false);
            bootstrap_alert.close('#alert');    
            $('#form').parsley().reset();
            $('#name').focus();
        },
    }

    App.init();
});

function set(id) {
    $.ajax({
        type: 'GET',
        url : window.location.protocol + '//' + window.location.host + '/api/inventory/get-product',
        data: {
            id: id,
            _token: $('meta[name="csrf-token"]').attr('content')
        },
        dataType: 'json',
        success : function(data) {
            if(data && Object.values(data).length > 0) {
                $('#title').text('Edit Product');
                $('#id').val(data[0].id);
                $('#sku').val(data[0].sku);
                $('#name').val(data[0].name);
                $('#description').val(data[0].description);
                $('#qty').val(data[0].qty);
                $('#unitprice').val(data[0].unit_price);
                $('#discount').val(data[0].discount);
                $('#net').val(data[0].net_price);
                $('#thumbnailpath').val(data[0].image);
                $("#isnewarrival").prop('checked', data[0].is_new_arrival == 1 && true || false);
                $("#isrecommended").prop('checked', data[0].is_recommended == 1 && true || false);
                $("#isfeatured").prop('checked', data[0].is_featured == 1 && true || false);
                $("#isbestselling").prop('checked', data[0].is_best_selling == 1 && true || false);
                bootstrap_alert.close('#alert');    
                $('#form').parsley().reset();
                $('#name').focus();
            }
        },
        error : function(request, status, error) {
            alert(error);
        }
    });
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        time = d.toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true})

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-') +' '+ time;
}
