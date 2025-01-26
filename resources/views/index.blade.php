@extends('template')

@section('title', 'Home')

@section('css')
    
@endsection

@section('content')
  	<div class="container-fluid">
        <div class="block-header">
            <div class="row clearfix">
                <div class="col-md-6 col-sm-12">
                    <h2>Home</h2>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Main</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Home</li>
                        </ol>
                    </nav>
                </div>     
            </div>
        </div>

        <div class="row clearfix">
            <div class="col-lg-3 col-md-6">
                <div class="card">
                    <div class="body">
                        <div class="d-flex align-items-center">
                            <div class="icon-in-bg bg-indigo text-white rounded-circle"><i class="fa fa-money"></i></div>
                            <div class="ml-4">
                                <span>Payment Confirmed</span>
                                <h4 class="mb-0 font-weight-medium">{{ $summary->New }}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6">
                <div class="card">
                    <div class="body">
                        <div class="d-flex align-items-center">
                            <div class="icon-in-bg bg-azura text-white rounded-circle"><i class="fa fa-dropbox"></i></div>
                            <div class="ml-4">
                                <span>Packed</span>
                                <h4 class="mb-0 font-weight-medium">{{ $summary->Packed }}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6">
                <div class="card">
                    <div class="body">
                        <div class="d-flex align-items-center">
                            <div class="icon-in-bg bg-orange text-white rounded-circle"><i class="fa fa-truck"></i></div>
                            <div class="ml-4">
                                <span>Shipment Preparation</span>
                                <h4 class="mb-0 font-weight-medium">{{ $summary->{'For Shipping'} }}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6">
                <div class="card">
                    <div class="body">
                        <div class="d-flex align-items-center">
                            <div class="icon-in-bg bg-pink text-white rounded-circle"><i class="fa fa-check"></i></div>
                            <div class="ml-4">
                                <span>Delivered</span>
                                <h4 class="mb-0 font-weight-medium">{{ $summary->Delivered }}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row clearfix">
            <div class="col-12">
                <div class="header">
                    <h5>Top-Selling Product</h5>
                    <small class="text-muted">Leading the Market in Popularity and Demand</small>
                </div>
                
                <div class="table-responsive mt-2">
                    <table class="table header-border table-hover table-custom spacing5">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Sales</th>
                            </tr>
                        </thead>
                        <tbody>
                            @if($data)
                                @foreach ($data as $item)
                                    <tr>
                                        <th class="w60">{{ $loop->iteration }}</th>
                                        <td>{{ $item['product_name'] }}</td>
                                        <td class="w100"><span class="badge badge-primary">{{ $item['quantity_sold'] }}</span></td>
                                    </tr>
                                @endforeach
                            @endif
                        </tbody>
                    </table>
                </div>
            </div>               
        </div>
    </div>
@endsection

@section('script')
   
@endsection
