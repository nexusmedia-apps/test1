<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'import_id',
        'first_name',
        'last_name',
        'email',
    ];
}
