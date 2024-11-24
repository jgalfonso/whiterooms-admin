 $(function () {
    
    var App = {
        baseUrl : window.location.protocol + '//' + window.location.host,
        csrfToken : $('meta[name="csrf-token"]').attr('content'),

        init: function () {
            this.setElements();

            this.bindEvents();
        },

        setElements: function () {
            this.key = $('#key');
            this.complete = $('#complete');
        },

        bindEvents: function () {
            this.key.off('keyup').on('keyup', debounce(function(e) {
               
                if(e.key === 'Enter' || $(this).val().length > 37) {
                    e.stopPropagation();
                    e.preventDefault();

                    $.ajax({
                        type: 'GET',
                        url : App.baseUrl + "/tally/scan",
                        data: {
                            itemNo: $(this).val(),
                            _token: App.csrfToken
                        },
                        dataType: 'json',
                        success : function(data) {
                            console.log(Object.values(data));

                            if(data && Object.values(data).length === 0) {

                                swal({ title: "Not Found!", text: 'Invalid instrument qr code.', type: "warning" });
                                App.clear();
                            }
                            else {

                                if(data.b_status == 'Missing' || data.b_status == 'Returned') {

                                    if(data.id != $('#containerid').val()) {

                                        $('#issuanceid').val(data.issuance_id);
                                        $('#containerid').val(data.id);
                                        $('#udi').val(data.udi);
                                        $('#name').val(data.name);
                                        $('#description').val(data.description);
                                        $('#issuedto').val(data.doctor);
                                        $('#receivedby').val(data.received_by);
                                        $('#dtreturned').val(formatDate(data.dt_returned));
                                        App.complete.attr('disabled', false);
                                    }

                                    App.initDataTable();
                                    swal({ title: "Success!", text: "Item "+$('#key').val()+" has been tallied and checked successfully.", type: "success" }, function () { $('#key').val(''); });
                                }
                                else {

                                    if(data.id == $('#containerid').val()) {

                                        swal({ title: "Notice!", text: "Item "+$('#key').val()+" is already checked.", type: "info" }, function () { $('#key').val(''); });
                                    }
                                    else {

                                        swal({
                                            title: "Notice!",
                                            text: "Item "+$('#key').val()+" is already checked. Would you like to view the container details?",
                                            type: "info",
                                            confirmButtonText: "Yes",
                                            showCancelButton: true,
                                            closeOnConfirm: false,
                                            showLoaderOnConfirm: true
                                        }, function (ret) {
                                            
                                            if(ret == true){
                                                $('#issuanceid').val(data.issuance_id);
                                                $('#containerid').val(data.id);
                                                $('#udi').val(data.udi);
                                                $('#name').val(data.name);
                                                $('#description').val(data.description);
                                                $('#issuedto').val(data.doctor);
                                                $('#receivedby').val(data.received_by);
                                                $('#dtreturned').val(formatDate(data.dt_returned));
                                                App.complete.attr('disabled', false);

                                                App.initDataTable();
                                                $('#key').val('');
                                                swal.close();
                                            }
                                            else {
						
                                                $('#key').val('');
                                                $('#key').focus();
                                            }
                                        });
                                    }
                                }
                            }
                        },
                        error : function(request, status, error) {
                            alert(error);
                        }
                    });
               };
            }, 300));

            this.complete.on('click', this.reset);
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
                    { data: 'badge' },
                    { data: 'status', 'className': 'hide' },
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

                            var content = '<b>'+row['item_no']+'</b><br/>'+row['description']; 
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

                            var content = row['encoded_by']+'<br><small>'+row['dt_created']+'</small>';
                            return content;
                        }
                    },
                    {
                        targets: 4,
                        orderable: false,
                        'render': function (data, type, row){

                            var content = '';

                            if(row['b_status'] == 'Returned') content = '<a href=""><span class="badge badge-warning text-uppercase" style="width: 120px;">Pending</span></a>';
                            else if(row['b_status'] == 'Missing') content = '<a href=""><span class="badge badge-danger text-uppercase" style="width: 120px;">Missing</span></a>';
                            else content = '<span class="badge badge-success text-uppercase" style="width: 120px;"><i class="fa fa-check"></i> Checked</span>';  

                            return content;
                        }
                    },
                    {
                        targets: 5,
                        orderable: false,
                        'render': function (data, type, row){

                            return row['b_status'];
                        }
                    },
                ]
            });
        },

        reset : function() {
            
            const found = $('#tbl tr td:nth-child(5)').toArray().some(td => {
                const text = td.textContent.trim();
                return text === 'Missing' || text === 'Pending';
            });
            if(found) {

                swal({
                    title: "Missing/Pending Instrument/s!",
                    text: "There are still pending or missing instruments on the list. Are you sure you want to continue marking the container as completed? Please note that any pending instruments will be marked as missing, and the container will be set to available.a",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, continue marking it as completed",
                    closeOnConfirm: true
                },
                function(){
                    
                    App.save();
                });
            }
            else {

                App.save();
            }
        },

        save : function() {

            $.ajax({
                type:'POST',
                url : App.baseUrl + "/tally/reset",
                data: {
                    issuanceID  : $('#issuanceid').val(),
                    containerID : $('#containerid').val(),
                    _token      : App.csrfToken,
                },
                dataType: 'json',
                success: function(data) {
                    if(data && data.success == true) {

                        swal({ title: "Success!", text: 'Container successfully marked as completed.', type: "success" });
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
            $('#receivedby').val('');
            $('#dtreturned').val('');
            $('#key').val('')
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
