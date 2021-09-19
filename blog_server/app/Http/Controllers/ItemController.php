<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use App\Models\Item;
use Illuminate\Support\Facades\DB;


class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = Item::join("categories", "items.category_id", "=", "categories.id")
                ->select(
                            "categories.name",
                            "items.id",
                            "items.category_id",
                            "items.title",
                            "items.slug",
                            "items.text_s",
                            "items.text_l",
                            "items.image",
                            "items.created_at",
                            "items.updated_at"
                        )
                ->get();
        return $items;

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
            'category_id' => 'required',
            'title' => 'required',
            'text_s' => 'required|max:200',
            'text_l' => 'required|max:2000',
            'image' => 'required'
        ]);
        if($validator->fails()){
            $errors = $validator->errors()->toJson();
            return response()->json([
                'errors' => $errors, 
                'status' => 400
            ],400);
        }

        $item = new Item();
        $item->category_id = $request->category_id;
        $item->title = $request->title;
        $item->slug = Str::slug($request->title, '-');
        $item->text_s = $request->text_s;
        $item->text_l = $request->text_l;
        $item->image = $request->image;
        
        $item->save();

        return response()->json([
            'message' => '¡Item creado con éxito!',
            'item' => $item,
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
            'category_id' => 'required',
            'title' => 'required',
            'text_s' => 'required|max:200',
            'text_l' => 'required|max:2000',
            'image' => 'required'
        ]);
        if($validator->fails()){
            $errors = $validator->errors()->toJson();
            return response()->json([
                'errors' => json_decode($errors), 
                'status' => 400
            ],400);
        }
        
        $item = Item::findOrFail($request->id);
        $item->category_id = $request->category_id;
        $item->title = $request->title;
        $item->text_s = $request->text_s;
        $item->text_l = $request->text_l;
        $item->image = $request->image;

        $item->save();

        return response()->json([
            'message' => '¡Item editado con éxito!',
            'item' => $item,
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
        $item = Item::destroy($id);

        return response()->json([
            'message' => '¡Item eliminado con éxito!',
            'status' => 200
        ], 200);
    }

    public function allLikes($item_id){

        $likes = DB::table('item_user')->where('item_id', '=', $item_id)->count();

        return response()->json([
            'likes' => $likes,
            'status' => 200
        ], 200);
    }

}
