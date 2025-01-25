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
                    <h2>Subscribers</h2>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="">Manage Users</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Subscribers</li>
                        </ol>
                    </nav>
                </div>     
            </div>
        </div>

        <div class="row clearfix">
            <div class="col-md-12">
                <div class="card">
                    <div class="table-responsive">
                        <table id="tbl" class="table table-hover js-basic-example dataTable table-custom spacing5 mb-0">
                             <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Lastname</th>
                                    <th>Firstname</th>
                                    <th>Middlename</th>
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
        </div>

        <input id="hdID" type="hidden">
    </div>
@endsection

@section('script')
    <script src="{{ URL::asset('assets/bundles/datatablescripts.bundle.js') }}"></script>
    <script src="{{ URL::asset('assets/vendor/parsleyjs/js/parsley.min.js') }}"></script>
    <script src="{{ URL::asset('assets/vendor/sweetalert/sweetalert.min.js') }}"></script>
    <script src="{{ URL::asset('assets/js/alert.js') }}"></script>
    <script src="{{ URL::asset('js/subscribers/index.js') }}"></script>
@endsection