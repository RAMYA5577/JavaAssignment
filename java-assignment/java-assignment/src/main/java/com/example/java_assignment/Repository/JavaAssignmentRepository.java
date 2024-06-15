package com.example.java_assignment.Repository;

import com.example.java_assignment.Models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JavaAssignmentRepository extends JpaRepository<Customer,Integer> {

    public Customer findById(int id);

}
