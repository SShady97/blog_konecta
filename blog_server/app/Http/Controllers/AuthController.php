<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {

        $user = DB::table('users')
                    ->where('email', '=', $request->email)
                    ->get();

        if(sizeof($user) !== 0){

            $credentials = request(['email', 'password']);

            if (! $token = auth()->attempt($credentials)) {
                return response()->json(['msg' => 'Usuario no autorizado!', 'status' => 401], 401);
            }

            return $this->respondWithToken($token);

        }else{

            return response()->json(['msg' => 'El usuario no existe', 'status' => 204], 200);
        }
        
        
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['msg' => 'Sesión cerrada con éxito!', 'status' => 200]);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|unique:users',
            'password' => 'required',
            'phone' => 'required'
        ]);
        if($validator->fails()){
            $errors = $validator->errors()->toJson();
            return response()->json([
                'errors' => json_decode($errors), 
                'status' => 400
            ],400);
        }

        $user = User::create(array_merge(
            $validator->validate(),
            ['password' =>  Hash::make($request->password)]
        ));

        return response()->json([
            'message' => '¡Usuario registrado exitosamente!',
            'user' => $user,
            'status' => 201
        ], 201);
    }
}