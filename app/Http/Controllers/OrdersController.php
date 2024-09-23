<?php

namespace App\Http\Controllers;

use App\Components\ShopifyAPI;
use App\Http\Resources\OrdersResource;
use App\Models\Customer;
use App\Models\Enums\OrderFinancialStatusEnum;
use App\Models\Enums\OrderFulfillmentStatusEnum;
use App\Models\Order;

class OrdersController extends Controller
{
    public function index()
    {
        $orders = ShopifyAPI::getOrders();
        $customers = ShopifyAPI::getCustomers();

        Customer::truncate();

        foreach ($customers as $customer) {
            Customer::create([
                'import_id' => $customer['id'],
                'first_name' => $customer['first_name'],
                'last_name' => $customer['last_name'],
                'email' => $customer['email'],
            ]);
        }

        Order::truncate();

        foreach ($orders as $order) {
            Order::create([
                'import_id' => $order['id'],
                'customer_id' => $order['customer']['id'] ?? 0,
                'financial_status' => OrderFinancialStatusEnum::enumToArray()[$order['financial_status']],
                'fulfillment_status' => OrderFulfillmentStatusEnum::enumToArray()[$order['fulfillment_status']] ?? null,
                'total_price' => $order['total_price'],
            ]);
        }

        return OrdersResource::collection(Order::with('customer')->where('total_price', '>', 100)->get());
    }
}
