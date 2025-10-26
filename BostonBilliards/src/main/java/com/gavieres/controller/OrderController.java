package com.gavieres.controller;

import com.gavieres.entity.OrderItemData;
import com.gavieres.service.OrderItemService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
public class OrderController {

    @Autowired
    private OrderItemService orderItemService;

    @GetMapping
    public ResponseEntity<?> getAllOrders() {
        try {
            List<OrderItemData> orders = orderItemService.getAllOrders();
            log.info("Retrieved {} orders", orders.size());
            return ResponseEntity.ok(orders);
        } catch (Exception ex) {
            log.error("Failed to retrieve orders: {}", ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Long id) {
        try {
            return orderItemService.getOrderById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception ex) {
            log.error("Failed to retrieve order with id {}: {}", id, ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<?> getOrdersByCustomerId(@PathVariable int customerId) {
        try {
            List<OrderItemData> orders = orderItemService.getOrdersByCustomerId(customerId);
            log.info("Retrieved {} orders for customer {}", orders.size(), customerId);
            return ResponseEntity.ok(orders);
        } catch (Exception ex) {
            log.error("Failed to retrieve orders for customer {}: {}", customerId, ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderItemData orderItem) {
        try {
            OrderItemData savedOrder = orderItemService.createOrder(orderItem);
            log.info("Created order: {}", savedOrder.getId());
            return ResponseEntity.ok(savedOrder);
        } catch (Exception ex) {
            log.error("Failed to create order: {}", ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
    }

    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestBody List<OrderItemData> orderItems) {
        try {
            int orderId = orderItemService.generateNextOrderId();
            log.info("Processing checkout with order ID: {}", orderId);
            
            for (OrderItemData item : orderItems) {
                item.setOrderId(orderId);
                orderItemService.createOrder(item);
            }
            
            log.info("Successfully created order {} with {} items", orderId, orderItems.size());
            return ResponseEntity.ok(orderId);
        } catch (Exception ex) {
            log.error("Failed to process checkout: {}", ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateOrder(@PathVariable Long id, @RequestBody OrderItemData orderItem) {
        try {
            orderItem.setId(id);
            OrderItemData updatedOrder = orderItemService.updateOrder(orderItem);
            return ResponseEntity.ok(updatedOrder);
        } catch (Exception ex) {
            log.error("Failed to update order with id {}: {}", id, ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        try {
            orderItemService.deleteOrder(id);
            return ResponseEntity.ok("Order deleted successfully");
        } catch (Exception ex) {
            log.error("Failed to delete order with id {}: {}", id, ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
    }
}

