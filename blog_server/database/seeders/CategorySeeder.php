<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $category_data = [
            'name' => 'Celulares'
        ];
        $category = new Category($category_data);
        $category->save();

        $category_data = [
            'name' => 'Computadores'
        ];
        $category = new Category($category_data);
        $category->save();

        $category_data = [
            'name' => 'Televisores'
        ];
        $category = new Category($category_data);
        $category->save();
    }
}
