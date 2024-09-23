<?php

namespace App\Http\Controllers;

use App\Models\Enums\OrderFulfillmentStatusEnum;

class IndexController extends Controller
{
    public function index()
    {
        $fulfillment_statuses = OrderFulfillmentStatusEnum::enumToNumberKeyArray();

        return view('index')->with(['fulfillment_statuses' => $fulfillment_statuses]);
    }
}
