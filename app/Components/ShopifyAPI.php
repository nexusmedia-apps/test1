<?php

namespace App\Components;

class ShopifyAPI
{
    public static function getOrders(): array
    {
        try {
            $apiKey = config('shopify.api_key');
            $apiPassword = config('shopify.api_password');
            $shopUrl = config('shopify.url');
            $url = "https://{$apiKey}:{$apiPassword}@{$shopUrl}/admin/orders.json";

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            $response = curl_exec($ch);

            if (curl_errno($ch)) {
                return [];
            } else {
                $data = json_decode($response, true);
                return $data['orders'] ?? [];
            }
            curl_close($ch);
        } catch (\Exception $exception) {
            return [];
        }
    }

    public static function getCustomers(): array
    {
        try {
            $apiKey = config('shopify.api_key');
            $apiPassword = config('shopify.api_password');
            $shopUrl = config('shopify.url');
            $url = "https://{$apiKey}:{$apiPassword}@{$shopUrl}/admin/customers.json";

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            $response = curl_exec($ch);

            if (curl_errno($ch)) {
                return [];
            } else {
                $data = json_decode($response, true);
                return $data['customers'] ?? [];
            }
            curl_close($ch);
            curl_close($ch);
        } catch (\Exception $exception) {
            return [];
        }
    }
}
