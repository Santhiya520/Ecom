<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Industries extends Model
{
    use HasFactory;

    protected $fillable = [
        'section_id',
        'title',
        'subtitle',
        'description1',
        'description2',
        'description3',
        'list',
        'image',
    ];

    // Relationship to Section
    public function section()
    {
        return $this->belongsTo(Section::class, 'section_id');
    }
}
