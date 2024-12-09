@extends('template')

@section('title', 'Manage Inventory | Products')

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
                    <h2>Order Summary</h2>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="">Transactions</a></li>
                            <li class="breadcrumb-item"><a href="/transactions/orders">Orders</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Order Summary</li>
                        </ol>
                    </nav>
                </div>    
                
                <div class="col-md-6 col-sm-12 text-right hidden-xs">
                    <a href="javascript:void(0);" class="btn btn-sm btn-primary btn-round" title="">Confirmed</a>
                    <a href="javascript:void(0);" class="btn btn-sm btn-success btn-round" title="">Send Message</a>
                </div>
            </div>
        </div>

        <div class="row clearfix">
            <div class="col-md-8">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card mb-3">
                            <div class="header">
                                <h2>Customer</h2>
                            </div>
                            <div class="body">
                                <small class="text-muted">Name: </small>
                                <p>{{ $data[0]['profiles']['firstname'] }} {{ $data[0]['profiles']['lastname'] }}</p>
                                
                                <small class="text-muted">Email: </small>
                                <p>{{ $data[0]['profiles']['email'] }}</p>    
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="card">
                            <div class="header">
                                <h2>Items</h2>
                            </div>
                            
                            <table class="table table-hover table-custom">
                                <thead>
                                    <tr>
                                        <th class="w60"></th>
                                        <th>Item</th>
                                        <th class="text-right">Unit Price</th>
                                        <th class="text-right">Qty</th>
                                        <th class="text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($data[0]['order_items'] as $item)
                                        <tr>
                                            <td class="width45">
                                            <img class="rounded" src="{{ $item['products']['image'] }}" alt="" style="width: 100px;">
                                            </td>
                                            <td>{{ $item['products']['name'] }}</td>
                                            <td class="text-right">{{ $item['unit_price'] }}</td>
                                            <td class="text-right">{{ $item['qty'] }}</td>
                                            <td class="text-right">{{ $item['total'] }}</td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>    
                        </div> 
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card">
                    <div class="header">
                        <h2>Summary</h2>
                    </div>
                    <div class="body">
                        <small class="text-muted">Shipping Details: </small>
                        <p class="mb-0">{{ $data[0]['shipping_address']['firstname'] }} {{ $data[0]['shipping_address']['lastname'] }}</p>
                        <p class="mb-0">{{ $data[0]['shipping_address']['phone_no'] }}</p>
                        <p>{{ $data[0]['shipping_address']['line_1'] }} {{ $data[0]['shipping_address']['line_2'] }} {{ $data[0]['shipping_address']['city'] }} {{ $data[0]['shipping_address']['states']['name'] }} {{ $data[0]['shipping_address']['countries']['name'] }}</p>
                        <small class="text-muted">Delivery Type: </small>
                        <p>{{ $data[0]['delivery_type_id']==1?'Ship':'Pickup in Store' }} - {{ $data[0]['delivery_type_id']==1?$data[0]['delivery_methods']['name']:$data[0]['stores']['name'] }}</p> 
                        <small class="text-muted">Payment Method: </small>
                        <p>{{ $data[0]['payments']['payment_method_id']==1?'Credit Card':'Paypal' }}</p>
                        <small class="text-muted">Voucher: </small>
                        <p>{{ $data[0]['payments']['vouchers']?['name']:'' }}</p>
                        <small class="text-muted">Order Date: </small>
                        <p>{{ $data[0]['created_at'] }}</p> 
                        <small class="text-muted">Merchandise Subtotal: </small>
                        <p>{{ $data[0]['payments']['total'] }}</p>
                        <small class="text-muted">Delivery Fee: </small>
                        <p>{{ $data[0]['payments']['delivery_fee'] }}</p>
                        <small class="text-muted">Discount: </small>
                        <p>{{ $data[0]['payments']['discount'] }}</p>
                        <small class="text-muted">Total Payment: </small>
                        <p><b>{{ $data[0]['payments']['net'] }}</b></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('script')
    <script src="{{ URL::asset('assets/bundles/datatablescripts.bundle.js') }}"></script>
@endsection