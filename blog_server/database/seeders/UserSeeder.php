<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user_data = [
            'name' => 'Jose Alvarez',
            'email' => 'joseez182@gmail.com',
            'password' => Hash::make('Prueba1234'),
            'phone' => '3023032967',
            'admin' => 1
        ];
        $user = new User($user_data);
        $user->save();

        
        $user_data = [
            'name' => 'Manuel Suarez',
            'email' => 'jm@gmail.com',
            'password' => Hash::make('Prueba1234'),
            'phone' => '3013392956',
            'admin' => 0
        ];
        $user = new User($user_data);
        $user->save();
    }
}
