package com.gavieres.repository;

import com.gavieres.entity.CustomerData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerDataRepository extends JpaRepository<CustomerData, Long> {
    Optional<CustomerData> findByEmail(String email);
}

