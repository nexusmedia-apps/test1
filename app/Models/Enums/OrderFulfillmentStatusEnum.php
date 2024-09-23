<?php

namespace App\Models\Enums;

enum OrderFulfillmentStatusEnum: int
{
    case FULFILLED = 1;
    case PARTIAL = 2;

    public static function enumToArray(): array
    {
        return array_column(
            array_map(function ($case) {
                return ['key' => strtolower($case->name), 'value' => $case->value];
            }, OrderFulfillmentStatusEnum::cases()),
            'value',
            'key'
        );
    }

    public static function enumToNumberKeyArray(): array
    {
        $result = [];
        foreach (OrderFulfillmentStatusEnum::cases() as $case) {
            $result[$case->value] = strtolower($case->name);
        }
        return $result;
    }
}

