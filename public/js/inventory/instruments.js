 $(function () {

    var App = {
        baseUrl : window.location.protocol + '//' + window.location.host + '/inventory/instruments',
        csrfToken : $('meta[name="csrf-token"]').attr('content'),

        init: function () {
            this.setElements();

            App.initDataTable();

            this.bindEvents();

            $('#itemno').focus();
        },

        setElements: function () {
            this.itemno = $('#itemno');
            this.save = $('#save');
            this.reset = $('#reset');
        },

        bindEvents: function () {
            this.itemno.change(function() {
                if($(this).val()) {
                    $.ajax({
                        type: 'GET',
                        url : App.baseUrl + "/get-byitem",
                        data: {
                            itemNo: $(this).val(),
                            _token: App.csrfToken
                        },
                        dataType: 'json',
                        success : function(data) {
                            console.log(data);

                            if(data && Object.values(data).length > 0) {
                                swal({
                                    title: "",
                                    text: "Item already exist. view item details?",
                                    type: "warning",
                                    confirmButtonText: "Yes",
                                    showCancelButton: true,
                                    closeOnConfirm: false,
                                    showLoaderOnConfirm: true
                                }, function (ret) {
                                    
                                    if(ret == true){
                                        $('#title').text('Edit Instrument');
                                        $('#instrumentid').val(data.id);
                                        $('#catalogno').val(data.catalog_no);
                                        $('#description').val(data.description);
                                        $('#lotno').val(data.lot_no);
                                        $('#serialno').val(data.serial_no);
                                        $('#gtin').val(data.gtin);
                                        $('#basicudidi').val(data.basic_uid_di);
                                        $("#itemno").prop('readonly', true);
                                        $('#catalogno').focus();
                                        swal.close();
                                    }
                                    else {
                                        $('#itemno').val('');
                                        $('#itemno').focus();
                                    }
                                });
                            }
                        },
                        error : function(request, status, error) {
                            alert(error);
                        }
                    });
                }
            });

            this.save.on('click', function() {
                if($('#instrumentid').val()) App.edit();
                else App.store();
            });
            
            this.reset.on('click', function() {
                App.clear();
            });
        },

        initDataTable: function() {
            
            var table = $('#tbl').DataTable({
                processing: true,
                serverSide: true,
                serverMethod: 'GET',
                bInfo: true,
                bDestroy: true,
                bLengthChange: false,
                pageLength: 30,
                scrollX: true,
                ajax: App.baseUrl + "/get-bylist",
                order: [[ 1, "asc" ]],
                columns:[
                    { data: 'id', 'className': 'hide' },
                    { data: 'item' },
                    { data: 'catalog_no' },
                    { data: 'lot_no' },
                    { data: 'serial_no' },
                    { data: 'gtin' },
                    { data: 'basic_udi_di' },
                    { data: 'created' },
                    { data: 'action', 'className': 'text-center' },
                ],
                language: {
                    paginate: {
                        next: '»', 
                        previous: '«' 
                    },
                    processing: "Please wait while we load the data...",
                    searchPlaceholder: 'By Item # / Description / Container UDI'
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
                        orderable: true,
                        'render': function (data, type, row){

                            var content = row['item_no']+'<br/><b>'+row['description']+'</b><br/>'; 
                            
                            content += (row['b_status']=='Missing'&&'<span class="badge badge-danger my-0 mb-1 ml-0">Missing</span></br>'||'</b>');
                            if(row['udi']) content += '<i class="fa fa-inbox"></i><b> '+row['udi']; 

                            return content;
                        }
                    },
                    {
                        targets: 2,
                        orderable: true,
                        'render': function (data, type, row){

                            return row['catalog_no'];
                        }
                    },
                    {
                        targets: 3,
                        orderable: true,
                        'render': function (data, type, row){

                            return row['lot_no'];
                        }
                    },
                    {
                        targets: 4,
                        orderable: true,
                        'render': function (data, type, row){

                            return row['serial_no'];
                        }
                    },
                    {
                        targets: 5,
                        orderable: true,
                        'render': function (data, type, row){

                            return row['gtin'];
                        }
                    },
                    {
                        targets: 6,
                        orderable: true,
                        'render': function (data, type, row){

                            return row['basic_uid_di'];
                        }
                    },
                    {
                        targets: 7,
                        orderable: true,
                        'render': function (data, type, row){

                            var content = row['encoded_by']+'<br><small>'+formatDate(row['dt_created'])+'</small>';
                            return content;
                        }
                    },
                    {
                        targets: 8,
                        orderable: false,
                        'render': function (data, type, row){

                            var content = '<a onclick="set('+row['id']+');" class="btn btn-sm btn-default" title="Edit" data-toggle="tooltip" data-placement="top" data-original-title="Edit" style="cursor: pointer;"><i class="icon-pencil"></i></a>';
                            return content;
                        }
                    }
                ]
            });
        },

        store : function() {

            if (!$('#form').parsley().validate()) { bootstrap_alert.warning('#alert', ' There are some error/s, please correct them bellow.'); return; }

            bootstrap_alert.close('#alert');     

            $.ajax({
                type:'POST',
                url : App.baseUrl + "/store",
                data: {
                    itemNo      : $('#itemno').val(),
                    catalogNo   : $('#catalogno').val(),
                    description : $('#description').val(),
                    lotNo       : $('#lotno').val(),
                    serialNo    : $('#serialno').val(),
                    gtin        : $('#gtin').val(),
                    basicUdiDi  : $('#basicudidi').val(),
                    _token      : App.csrfToken,
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
                url : App.baseUrl + "/edit",
                data: {
                    instrumentID    : $('#instrumentid').val(),
                    catalogNo       : $('#catalogno').val(),
                    description     : $('#description').val(),
                    lotNo           : $('#lotno').val(),
                    serialNo        : $('#serialno').val(),
                    gtin            : $('#gtin').val(),
                    basicUdiDi      : $('#basicudidi').val(),
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
            $('#title').text('New Instrument');
            $('#instrumentid').val('');
            $('#itemno').val('');
            $('#catalogno').val('');
            $('#description').val('');
            $('#lotno').val('');
            $('#serialno').val('');
            $('#gtin').val('');
            $('#basicudidi').val('');
            $("#itemno").prop('readonly', false);
            $('#itemno').focus();
        },
    }

    App.init();
});

function set(id) {
    $.ajax({
        type: 'GET',
        url : window.location.protocol + '//' + window.location.host + '/inventory/instruments/get-byid',
        data: {
            instrumentID: id,
            _token: $('meta[name="csrf-token"]').attr('content')
        },
        dataType: 'json',
        success : function(data) {
            console.log(data);

            if(data && Object.values(data).length > 0) {
                $('#title').text('Edit Instrument');
                $('#instrumentid').val(data.id);
                $('#itemno').val(data.item_no);
                $('#catalogno').val(data.catalog_no);
                $('#description').val(data.description);
                $('#lotno').val(data.lot_no);
                $('#serialno').val(data.serial_no);
                $('#gtin').val(data.gtin);
                $('#basicudidi').val(data.basic_uid_di);
                $("#itemno").prop('readonly', true);
                $('#catalogno').focus();
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

