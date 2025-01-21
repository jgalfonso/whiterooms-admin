@extends('template')

@section('title', 'Manage Users | Admin')

@section('css')
    <link rel="stylesheet" href="{{ URL::asset('assets/vendor/jquery-datatable/dataTables.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ URL::asset('assets/vendor/sweetalert/sweetalert.css') }}">

    <style>
        div.dataTables_wrapper div.dataTables_filter input {
            width: 300px;
        }

        .parsley-errors-list {
            padding-inline-start: 17px !important;
        }

        .dataTables_filter {
            display: none;
        }

        .sa-button-container button {
            width: 100px;
        }

        .w1 {
            width: 1%;
        }
    </style>
@endsection

@section('content')
  	<div class="container-fluid">
        <div class="block-header">
            <div class="row clearfix">
                <div class="col-md-6 col-sm-12">
                    <h2>Admin</h2>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="">Manage Users</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Admin</li>
                        </ol>
                    </nav>
                </div>     
            </div>
        </div>

        <div class="row clearfix">
            <div class="col-md-8">
                <div class="card">
                    <div class="table-responsive">
                        <table id="tbl" class="table table-hover js-basic-example dataTable table-custom spacing5 mb-0">
                             <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Fullname</th>
                                    <th>Email</th>
                                    <th><i class="fa fa-level-down"></i></th>
                                </tr>
                            </thead>

                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="body">
                    <div class="card">
                        <div class="body">
                            <div class="card-value float-right text-warning" style="height: auto;"><i class="fa fa-file-o"></i></div>
                            <h5 id="form-title" style="margin-bottom: 30px;">New User</h5>
                            <p>All fields marked with an asterisk (*) are required.</p>

                            <div id="alert"></div>

                            <form id="form" novalidate="">
                                <div class="form-group">
                                    <label>Lastname</label><span style="color: red"> * </span>
                                    <input id="lastname" name="lastname" type="text" class="form-control" required>
                                </div>

                                <div class="form-group">
                                    <label>Firstname</label><span style="color: red"> * </span>
                                    <input id="firstname" name="firstname" type="text" class="form-control" required>
                                </div>

                                <div class="form-group">
                                    <label>Middlename</label>
                                    <input id="middlename" name="middlename" type="text" class="form-control">
                                </div>

                                <div class="form-group">
                                    <label>Email</label><span style="color: red"> * </span>
                                    <input id="email" name="email" type="email" class="form-control" required>
                                </div>

                                <div class="form-group">
                                    <label>Password</label><span style="color: red"> * </span>
                                    <input id="password" name="password" type="password" class="form-control" required>
                                </div>

                                <div class="form-group mt-5">
                                    <button id="save" type="button" class="btn btn-success" style="width: 100px">Save</button>
                                    <button id="cancel" type="button" class="btn btn-default" style="width: 100px; display: none;">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <input id="hdID" type="hidden">
    </div>
@endsection

@section('script')
    <script src="{{ URL::asset('assets/bundles/datatablescripts.bundle.js') }}"></script>
    <script src="{{ URL::asset('assets/vendor/parsleyjs/js/parsley.min.js') }}"></script>
    <script src="{{ URL::asset('assets/vendor/sweetalert/sweetalert.min.js') }}"></script>
    <script src="{{ URL::asset('assets/js/alert.js') }}"></script>
    <script src="{{ URL::asset('js/users/index.js') }}"></script>
@endsection