<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'price', 'image', 'categories'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }


}
