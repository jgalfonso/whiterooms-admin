 $(function () {

    var App = {
        baseUrl : window.location.protocol + '//' + window.location.host,
        csrfToken : $('meta[name="csrf-token"]').attr('content'),

        init: function () {
            this.setElements();
            this.bindEvents();
        },

        setElements: function () {
            this.login = $('#login');
        },

        bindEvents: function () {
            this.login.on('click', this.logIn);
        },

        logIn : function() {

            $.ajax({
                url: App.baseUrl + "/in",
                type: 'GET',
                headers: App.csrfToken,
                data: {
                    email : $('#email').val(),
                    password : $('#password').val()
                },
                dataType: 'json',
                success: function (data) {
                    if(data && data.success == true) window.location = App.baseUrl;
                    else swal({ title: "Error!", text: data.message, type: "error"});
                },
            });
        },
    }

    App.init();

});