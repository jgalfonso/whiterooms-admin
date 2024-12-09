<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\ProductService;
use Illuminate\Http\Request;

class InventoryController extends Controller
{   
    protected $supabase;

	public function index()
    {
       return view('inventory.index');
    }

    public function __construct(ProductService $productService)
    {
        $this->supabase = $productService;
    }

    public function getProducts()
    {   
        $data = $this->supabase->getProducts();
        return response()->json(['data' => collect($data)]);
    }

    public function getProduct(Request $request)
    {   
        $data = $this->supabase->getProduct($request);
        return response()->json($data);
    }

    public function store(Request $request) 
    {   
        $data = $this->supabase->store($request);
        echo json_encode($data);
    }

    public function edit(Request $request) 
    {   
        $data = $this->supabase->edit($request);
        echo json_encode($data);
    }
}
