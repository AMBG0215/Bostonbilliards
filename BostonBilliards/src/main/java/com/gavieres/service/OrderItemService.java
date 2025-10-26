package com.gavieres.service;

import com.gavieres.entity.OrderItemData;
import com.gavieres.repository.OrderItemDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemDataRepository orderItemRepository;

    public List<OrderItemData> getAllOrders() {
        return orderItemRepository.findAll();
    }

    public Optional<OrderItemData> getOrderById(Long id) {
        return orderItemRepository.findById(id);
    }

    public List<OrderItemData> getOrdersByCustomerId(int customerId) {
        return orderItemRepository.findByCustomerIdOrderByCreatedDesc(customerId);
    }

    public List<OrderItemData> getOrdersByOrderId(int orderId) {
        return orderItemRepository.findByOrderId(orderId);
    }

    public OrderItemData createOrder(OrderItemData orderItem) {
        orderItem.setCreated(LocalDateTime.now());
        orderItem.setLastUpdated(LocalDateTime.now());
        return orderItemRepository.save(orderItem);
    }

    public OrderItemData updateOrder(OrderItemData orderItem) {
        orderItem.setLastUpdated(LocalDateTime.now());
        return orderItemRepository.save(orderItem);
    }

    public void deleteOrder(Long id) {
        orderItemRepository.deleteById(id);
    }

    public OrderItemData updateOrderStatus(Long id, String orderStatus, String adminNotes) {
        Optional<OrderItemData> orderOpt = orderItemRepository.findById(id);
        if (orderOpt.isEmpty()) {
            throw new RuntimeException("Order not found with id: " + id);
        }
        
        OrderItemData order = orderOpt.get();
        order.setOrderStatus(orderStatus);
        order.setAdminNotes(adminNotes);
        order.setLastUpdated(LocalDateTime.now());
        
        return orderItemRepository.save(order);
    }

    public int generateNextOrderId() {
        List<OrderItemData> allOrders = orderItemRepository.findAll();
        if (allOrders.isEmpty()) {
            return 1;
        }
        return allOrders.stream()
                .mapToInt(OrderItemData::getOrderId)
                .max()
                .orElse(0) + 1;
    }
}

