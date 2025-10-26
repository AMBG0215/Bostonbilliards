package com.gavieres.dto;

public class OrderStatusUpdateRequest {
    private String orderStatus;
    private String adminNotes;

    public OrderStatusUpdateRequest() {}

    public OrderStatusUpdateRequest(String orderStatus, String adminNotes) {
        this.orderStatus = orderStatus;
        this.adminNotes = adminNotes;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public String getAdminNotes() {
        return adminNotes;
    }

    public void setAdminNotes(String adminNotes) {
        this.adminNotes = adminNotes;
    }
}
