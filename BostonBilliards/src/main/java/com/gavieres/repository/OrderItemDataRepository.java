package com.gavieres.repository;

import com.gavieres.entity.OrderItemData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemDataRepository extends JpaRepository<OrderItemData, Long> {
    List<OrderItemData> findByCustomerId(int customerId);
    List<OrderItemData> findByOrderId(int orderId);
    List<OrderItemData> findByCustomerIdOrderByCreatedDesc(int customerId);
}

