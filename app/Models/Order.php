<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'import_id',
        'customer_id',
        'financial_status',
        'fulfillment_status',
        'total_price',
    ];

    public function customer()
    {
        return $this->hasOne(Customer::class, 'import_id', 'customer_id');
    }
}
