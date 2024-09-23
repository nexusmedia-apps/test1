<?php

namespace App\Http\Resources;

use App\Models\Enums\OrderFinancialStatusEnum;
use App\Models\Enums\OrderFulfillmentStatusEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrdersResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'customer_name' => trim($this->customer?->last_name . ' ' . $this->customer?->first_name),
            'customer_email' => $this->customer?->email,
            'total_price' => $this->total_price,
            'financial_status' => OrderFinancialStatusEnum::enumToNumberKeyArray()[$this->financial_status],
            'fulfillment_status' => OrderFulfillmentStatusEnum::enumToNumberKeyArray()[$this->fulfillment_status] ?? '',
        ];
    }
}
