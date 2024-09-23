<?php

namespace App\Models\Enums;

enum OrderFinancialStatusEnum: int
{
    case AUTHORIZED = 0;
    case PENDING = 1;
    case PAID = 2;
    case PARTIALLY_PAID = 3;
    case REFUNDED = 4;
    case VOIDED = 5;
    case PARTIALLY_REFUNDED = 6;
    case UNPAID = 7;

    public static function enumToArray(): array
    {
        return array_column(
            array_map(function ($case) {
                return ['key' => strtolower($case->name), 'value' => $case->value];
            }, OrderFinancialStatusEnum::cases()),
            'value',
            'key'
        );
    }

    public static function enumToNumberKeyArray(): array
    {
        $result = [];
        foreach (OrderFinancialStatusEnum::cases() as $case) {
            $result[$case->value] = strtolower($case->name);
        }
        return $result;
    }
}

