@extends('template')

@section('title', 'Transactions | Orders')

@section('css')
    <link rel="stylesheet" href="{{ URL::asset('assets/vendor/jquery-datatable/dataTables.bootstrap4.min.css') }}">

    <style>
        div.dataTables_wrapper div.dataTables_filter input {
            width: 300px;
        }
    </style>
@endsection

@section('content')
  	<div class="container-fluid">
        <div class="block-header">
            <div class="row clearfix">
                <div class="col-md-6 col-sm-12">
                    <h2>Orders</h2>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="">Transactions</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Orders</li>
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
                                    <th>Reference #</th>
                                    <th>Customer</th>
                                    <th>Items</th>
                                    <th>Delivery Type</th>
                                    <th>Payment Method</th>
                                    <th>Total</th>
                                    <th>Order Date</th>
                                    <th>Status</th>
                                    <th style="width: 1%;"><i class="fa fa-level-down"></i></th>
                                </tr>
                            </thead>

                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('script')
    <script src="{{ URL::asset('assets/bundles/datatablescripts.bundle.js') }}"></script>
    <script src="{{ URL::asset('js/orders/index.js') }}"></script>
@endsection