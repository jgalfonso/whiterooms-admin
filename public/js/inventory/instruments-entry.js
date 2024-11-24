 $(function () {

    var App = {
        baseUrl : window.location.protocol + '//' + window.location.host + '/inventory',
        csrfToken : $('meta[name="csrf-token"]').attr('content'),

        init: function () {
            this.setElements();

            App.initDataTable();

            this.bindEvents();
        },

        setElements: function () {
            this.itemno = $('#itemno');
            this.save = $('#save');
            this.new = $('#new');
        },

        bindEvents: function () {
            this.itemno.keyup(function() {
               if($(this).val().length > 15) {

                    $.ajax({
                        type: 'GET',
                        url : App.baseUrl + "/instruments/get-byitem",
                        data: {
                            itemNo: $(this).val(),
                            _token: App.csrfToken
                        },
                        dataType: 'json',
                        success : function(data) {
                            console.log(data);

                            if(data.status == 'Active') {

                                App.clear();
                                bootstrap_alert.warning('#alert', 'Invalid item.'); 
                            }
                            else {

                                $('#instrumentid').val(data.id);
                                $('#catalogno').val(data.catalog_no);
                                $('#description').val(data.description);
                                $('#lotno').val(data.lot_no);
                                $('#serialno').val(data.serial_no);
                                $('#gtin').val(data.gtin);
                                $('#basicudidi').val(data.basic_uid_di);
                                $('#catalogno').focus();
                            }
                        },
                        error : function(request, status, error) {
                            alert(error);
                        }
                    });
               };
            });

            $("body").on("click", ".delete", function (e) {
                e.preventDefault();
                
                $.ajax({
                    type:'POST',
                    url : App.baseUrl + '/bins/del',
                    data: {
                        binID           : $(this).data("bin_id"),
                        instrumentID    : $(this).data("id"),
                        _token          : App.csrfToken
                    },
                    dataType: 'json',
                    success: function(data) {
                        if(data && data.success == true) {
                            
                            App.initDataTable();
                            swal({ title: "Success!", text: '1 row successfully deleted.', type: "success" });
                        }
                        else swal({ title: "Error!", text: data.message, type: "error" });
                    },
                    error : function(request, status, error) {
                                
                        alert(error);
                    }
                })
            });
            
            this.save.on('click', this.store);
            this.new.on('click', function() {
                window.location = App.baseUrl + '/containers';
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
                ajax: App.baseUrl + "/bins/get-bylist?containerID=" + $('#containerid').val(),
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
                    processing: "Please wait while we load the data..."
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

                            var content = row['item_no']+'<br/><b>'+row['description']+'</b>'; 
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

                            var content = '<a class="btn btn-sm btn-default delete" title="Delete" data-bin_id="'+row['bin_id']+'" data-id="'+row['id']+'" style="cursor: pointer;" ><i class="icon-trash"></i></a>';
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
                url : App.baseUrl + "/instruments/store",
                data: {
                    containerID     : $('#containerid').val(),
                    instrumentID    : $('#instrumentid').val(),
                    itemNo          : $('#itemno').val(),
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
                        
                        swal({ title: "Success!", text: '1 row successfully submitted.', type: "success" });
                        App.initDataTable();
                        App.clear();
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
            $('#instrumentid').val('');
            $('#itemno').val('');
            $('#catalogno').val('');
            $('#description').val('');
            $('#lotno').val('');
            $('#serialno').val('');
            $('#gtin').val('');
            $('#basicudidi').val('');
            $('#itemno').focus();
        },
    }

    App.init();
});

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