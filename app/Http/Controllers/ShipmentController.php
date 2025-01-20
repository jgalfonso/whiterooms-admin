<?php

namespace App\Http\Controllers;

use App\Services\ShipmentService;
use Illuminate\Http\Request;

class ShipmentController extends Controller
{
    protected $shipmentService;

    public function __construct(ShipmentService $shipmentService)
    {
        $this->shipmentService = $shipmentService;
    }

    public function index()
    { 
        return view('shipments.index');
    }

    public function getShipments()
    {   
        $data = $this->shipmentService->getShipments();
        return response()->json(['data' => collect($data)]);
    }
}
