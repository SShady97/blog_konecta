<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'category_id',
        'title',
        'slug',
        'text_s',
        'text_l',
        'image'
    ];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function users() {
        return $this->belongsToMany(User::class);
    }

}
