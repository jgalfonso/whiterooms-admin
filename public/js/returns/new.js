 $(function () {

    var App = {
        baseUrl : window.location.protocol + '//' + window.location.host,
        csrfToken : $('meta[name="csrf-token"]').attr('content'),

        init: function () {
            this.setElements();
            this.bindEvents();

            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const udi = urlParams.get('udi');
            if(udi) $('#key').val(udi).trigger('keyup');
        },

        setElements: function () {
            this.key = $('#key');
            this.complete = $('#complete');
        },

        bindEvents: function () {
            this.key.off('keyup').on('keyup', debounce(function(e) {
               if($(this).val().length >= 30) {

                    $.ajax({
                        type: 'GET',
                        url : App.baseUrl + "/returns/scan",
                        data: {
                            udi: $(this).val(),
                            _token: App.csrfToken
                        },
                        dataType: 'json',
                        success : function(data) {
                            console.log(Object.values(data));

                            $('#key').val('');
                    
                            if(data && Object.values(data).length === 0) {

                                App.clear();
                                swal({ title: "Not Found!", text: 'Invalid container qr code.', type: "warning" });
                            }
                            else {

                                if(data.cycle == 2000){

                                    swal({
                                        title: "Cycle Limit Reached",
                                        text: "The container's cycle limit has been reached, reset cycle?",
                                        type: "warning",
                                        showCancelButton: true,
                                        confirmButtonText: "Yes, continue resetting the cycle.",
                                        closeOnConfirm: true
                                    },
                                    function(){
                                        $.ajax({
                                            type:'POST',
                                            url : App.baseUrl + "/returns/reset",
                                            data: {
                                                containerID : data.id,
                                                _token      : App.csrfToken,
                                            },
                                            dataType: 'json',
                                            success: function(response) {
                                                if(response && response.success == true) {

                                                    $('#issuanceid').val(data.issuance_id);
                                                    $('#containerid').val(data.id);
                                                    $('#udi').val(data.udi);
                                                    $('#name').val(data.name);
                                                    $('#description').val(data.description);
                                                    $('#issuedto').val(data.doctor);
                                                    $('#issuedby').val(data.issued_by);
                                                    $('#dtissued').val(formatDate(data.dt_issued));
                                                    App.complete.attr('disabled', false);

                                                    App.initDataTable(); 
                                                } 
                                                else swal({ title: "Error!", text: response.message, type: "error" });
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
                                    });
                                }else {

                                    $('#issuanceid').val(data.issuance_id);
                                    $('#containerid').val(data.id);
                                    $('#udi').val(data.udi);
                                    $('#name').val(data.name);
                                    $('#description').val(data.description);
                                    $('#issuedto').val(data.doctor);
                                    $('#issuedby').val(data.issued_by);
                                    $('#dtissued').val(formatDate(data.dt_issued));
                                    App.complete.attr('disabled', false);

                                    App.initDataTable();
                                }
                            }
                        },
                        error : function(request, status, error) {
                            alert(error);
                        }
                    });
               };
            }, 300));
            
            this.complete.on('click', this.receive);
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
                ajax: App.baseUrl + "/inventory/bins/get-bylist?containerID=" + $('#containerid').val(),
                order: [[ 1, "asc" ]],
                columns:[
                    { data: 'id', 'className': 'hide' },
                    { data: 'item' },
                    { data: 'catalog_no' },
                    { data: 'created' },
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

                            var content = row['item_no']+'<br/><b>'+row['description']+'</b>'+(row['b_status']=='Missing'&&'<br><span class="badge badge-danger mt-1 ml-0">Missing</span>'||''); 
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

                            var content = row['encoded_by']+'<br><small>'+formatDate(row['dt_created'])+'</small>';
                            return content;
                        }
                    },
                ]
            });
        },

        receive : function() {
            $.ajax({
                type:'POST',
                url : App.baseUrl + "/returns/receive",
                data: {
                    issuanceID  : $('#issuanceid').val(),
                    containerID : $('#containerid').val(),
                    _token      : App.csrfToken,
                },
                dataType: 'json',
                success: function(data) {
                    if(data && data.success == true) {

                        swal({ title: "Success!", text: '1 row successfully received.', type: "success" });
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
            $('#tbl').dataTable().fnDestroy();
            $('#tbl tbody').empty();
            
            $('#issuanceid').val('');
            $('#containerid').val('');
            $('#udi').val('');
            $('#name').val('');
            $('#description').val('');
            $('#issuedto').val('');
            $('#issuedby').val('');
            $('#dtissued').val('');
            App.complete.attr('disabled', true);
            $('#key').focus()
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

function debounce(fn, delay) {
    let timer = null;
    return function(e) {
        clearTimeout(timer); // Clear the previous timer
        timer = setTimeout(() => fn.call(this, e), delay); // Ensure `this` is the input element
    };
}