<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Item;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        return $users;

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
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'phone' => 'required',
            'admin' => 'required|boolean'
        ]);

        if($validator->fails()){
            $errors = $validator->errors()->toJson();
            return response()->json([
                'errors' => json_decode($errors), 
                'status' => 400
            ],400);
        }

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->phone = $request->phone;
        $user->admin = $request->admin;
        
        $user->save();

        return response()->json([
            'message' => '¡Usuario creado con éxito!',
            'user' => $user,
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

        $user = User::findOrFail($request->id);

        if($request->email != $user->email){
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'email' => 'required|email|unique:users',
                'phone' => 'required',
                'admin' => 'required|boolean'
            ]);

            if($validator->fails()){
                $errors = $validator->errors()->toJson();
                return response()->json([
                    'errors' => json_decode($errors), 
                    'status' => 400
                ],400);
            }

            $user->email = $request->email;

        }else{
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'phone' => 'required',
                'admin' => 'required|boolean'
            ]);

            if($validator->fails()){
                $errors = $validator->errors()->toJson();
                return response()->json([
                    'errors' => json_decode($errors), 
                    'status' => 400
                ],400);
            }
        }
        
        $user->name = $request->name;
        if($request->password != ""){
            $user->password = $request->password;
        }
        $user->phone = $request->phone;
        $user->admin = $request->admin;

        $user->save();

        return response()->json([
            'message' => '¡Usuario editado con éxito!',
            'user' => $user,
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
        $user = User::destroy($id);
        return response()->json([
            'message' => '¡Usuario eliminado con éxito!',
            'status' => 200
        ], 200);
    }

    public function likeItem(Request $request){
        $user = User::findOrFail($request->user_id);
        $item = Item::findOrFail($request->item_id);
        $user->items()->attach($item);

        return response()->json([
            'message' => $user,
            'status' => 200
        ], 200);
    }
}
