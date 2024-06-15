package com.example.java_assignment.Service;

import com.example.java_assignment.DTOs.ResponseDto.CustomerRequestDto;
import com.example.java_assignment.Models.Customer;
import org.springframework.stereotype.Service;

import java.util.List;


public interface JavaAssignmentService {
    public String addCustomer(CustomerRequestDto customerRequestDto);

    public List<Customer> getByEmail(String email);
    public List<Customer> getByPhone(String phone);
    public List<Customer> getByFirstName(String firstName);
    public List<Customer> getByLastName(String lastName);
    public List<Customer> getById(int id);

    public String deleteCustomer(int id);
    public List<Customer> getAll();

    public String updateList(List<Customer> customers);
}
