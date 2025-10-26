package com.gavieres.enums;

public enum OrderItemStatus {
    PENDING(0),
    CONFIRMED(1),
    CANCELLED(2),
    SHIPPED(3),
    DELIVERED(4);

    private final int value;

    OrderItemStatus(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public static OrderItemStatus fromValue(int value) {
        for (OrderItemStatus status : OrderItemStatus.values()) {
            if (status.value == value) {
                return status;
            }
        }
        throw new IllegalArgumentException("Invalid OrderItemStatus value: " + value);
    }
}
