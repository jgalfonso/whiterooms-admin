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
            this.save = $('#save');
            this.release = $('#release');
        },

        bindEvents: function () {
            this.key.off('keyup').on('keyup', debounce(function(e) {
               if($(this).val().length > 4) {

                    $.ajax({
                        type: 'GET',
                        url : App.baseUrl + "/issuance/scan",
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
                                $('#issuanceid').val(data.issuance_id);
                                $('#containerid').val(data.id);
                                $('#udi').val(data.udi);
                                $('#name').val(data.name);
                                $('#description').val(data.description);
                                if(data.issued_to) $('#issuedto').val(data.issued_to);
                                $('#issuedto').attr('disabled', false);
                                App.save.attr('disabled', false);
                                App.release.attr('disabled', false);

                                App.initDataTable();

                                $('#issuedto').focus();
                            }
                        },
                        error : function(request, status, error) {
                            alert(error);
                        }
                    });
               };
            }, 300));

            this.save.on('click', this.store);
            this.release.on('click', this.edit);
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
                    { data: 'lot_no' },
                    { data: 'serial_no' },
                    { data: 'gtin' },
                    { data: 'basic_udi_di' },
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
                ]
            });
        },

        store : function() {

            if (!$('#form').parsley().validate()) { bootstrap_alert.warning('#alert', ' There are some error/s, please correct them bellow.'); return; }

            bootstrap_alert.close('#alert');     

            $.ajax({
                type:'POST',
                url : App.baseUrl + "/issuance/store",
                data: {
                    issuanceID  : $('#issuanceid').val(),
                    containerID : $('#containerid').val(),
                    udi         : $('#udi').val(),
                    issuedTo    : $('#issuedto').val(),
                    _token      : App.csrfToken,
                },
                dataType: 'json',
                success: function(data) {
                    if(data && data.success == true) {

                        swal({ title: "Success!", text: '1 row successfully submitted.', type: "success" });
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

        edit : function() {

            if (!$('#form').parsley().validate()) { bootstrap_alert.warning('#alert', ' There are some error/s, please correct them bellow.'); return; }

            bootstrap_alert.close('#alert');     

            $.ajax({
                type:'POST',
                url : App.baseUrl + "/issuance/edit",
                data: {
                    issuanceID  : $('#issuanceid').val(),
                    containerID : $('#containerid').val(),
                    udi         : $('#udi').val(),
                    issuedTo    : $('#issuedto').val(),
                    _token      : App.csrfToken,
                },
                dataType: 'json',
                success: function(data) {
                    if(data && data.success == true) {
                        App.print();
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
            $('#issuedto').attr('disabled', true);
            App.save.attr('disabled', true);
            App.release.attr('disabled', true);
            $('#key').focus();
        },

        print : function() {
            $.ajax({
                type: 'GET',
                url : App.baseUrl + "/issuance/print",
                data: {
                    containerID : $('#containerid').val(),
                    _token      : App.csrfToken
                },
                dataType: 'json',
                success : function(data) {
                    if(data && data['container']) {
                        
                        $html = '<div>UDI: <b>'+data['container']['udi']+'</b></div>';
                        $html += '<div>Description: '+data['container']['description']+'</div>';
                        $html += '<div>Issued To: '+data['container']['doctor']+'</div>';
                        $html += '<div>Issued By: '+data['container']['issued_by']+'</div>';
                        $html += '<div>Date / Time Issued: '+data['container']['dt_issued']+'</div>';
                        $('.invoice-num').html($html);

                        if(data['bins']) {
                            $html = '';

                            $.each(data['bins'], function (key, value) {
                                $html += '<tr>';
                                $html += '<td><b>'+value.item_no+'</b><br/>'+value.description+'</td>';
                                $html += '<td>'+value.catalog_no+'</td>';
                                $html += '</tr>';
                            });

                            $('#invoice .table > tbody').html($html);
                        }

                        w=window.open();
                        w.document.write($('#invoice').html());
                        w.print();
                        w.close();
                    }
                },
                error : function(request, status, error) {
                    alert(error);
                }
            });
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