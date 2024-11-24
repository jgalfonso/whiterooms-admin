var baseUrl = window.location.protocol + '//' + window.location.host + '/';

function logOut() {
   
   $.ajax({
        url: baseUrl+'out',
        type: 'POST',
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
        dataType: 'json',
        success: function (response) {
            window.location = '/login';
        },
        error : function(request, status, error) {
            console.log(error);
        }
    });
}