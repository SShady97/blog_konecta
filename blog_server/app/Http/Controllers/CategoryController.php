<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::all();
        return $categories;

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);
        if($validator->fails()){
            $errors = $validator->errors()->toJson();
            return response()->json([
                'errors' => json_decode($errors), 
                'status' => 400
            ],400);
        }

        $category = new Category();
        $category->name = $request->name; 
        $category->save();

        return response()->json([
            'message' => '¡Categoria creado con éxito!',
            'category' => $category,
            'status' => 201
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    { 
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);
        if($validator->fails()){
            $errors = $validator->errors()->toJson();
            return response()->json([
                'errors' => json_decode($errors), 
                'status' => 400
            ],400);
        }
        
        $category = Category::findOrFail($request->id);
        $category->name = $request->name;
        $category->save();

        return response()->json([
            'message' => '¡Categoria editada con éxito!',
            'category' => $category,
            'status' => 200
        ], 200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category = Category::destroy($id);

        return response()->json([
            'message' => '¡Categoria eliminada con éxito!',
            'status' => 200
        ], 200);
    }

    public function itemsByCat($category_id)
    {
        $items = Category::find($category_id)->items;

        return response()->json([
            'items' => $items
        ], 200);
    }
    
}
