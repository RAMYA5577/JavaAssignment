package com.example.java_assignment.Service.JavaAssignmentServiceImplementation;

import com.example.java_assignment.DTOs.ResponseDto.CustomerRequestDto;
import com.example.java_assignment.Models.Customer;
import com.example.java_assignment.Repository.JavaAssignmentRepository;
import com.example.java_assignment.Service.JavaAssignmentService;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service

public class JavaAssignmentServiceImplementation implements JavaAssignmentService {
    @Autowired
    JavaAssignmentRepository javaAssignmentRepository;
    @Override
    public String addCustomer(CustomerRequestDto customerRequestDto) {

    Customer customer = new Customer();
    customer.setFirstName(customerRequestDto.getFirstName());
    customer.setLastName(customerRequestDto.getLastName());
    customer.setStreet(customerRequestDto.getStreet());
    customer.setCity(customerRequestDto.getCity());
    customer.setAddress(customerRequestDto.getAddress());
    customer.setEmail(customerRequestDto.getEmail());
    customer.setState(customerRequestDto.getState());
    customer.setPhone(customerRequestDto.getPhone());

    javaAssignmentRepository.save(customer);

    return "Customer with name "+ customerRequestDto.getFirstName()+  " added successfully";
    }

    @Override
    public List<Customer> getByEmail(String email) {
        List<Customer> list = javaAssignmentRepository.findAll();
        List<Customer> ans = new ArrayList<>();
        for(Customer customer : list){
            if(customer.getEmail().equals(email))
                ans.add(customer);
        }
        return ans;
    }

    @Override
    public List<Customer> getByPhone(String phone) {
        List<Customer> list = javaAssignmentRepository.findAll();
        List<Customer> ans = new ArrayList<>();
        for(Customer customer : list){
            if(customer.getPhone().equals(phone))
                ans.add(customer);
        }
        return ans;
    }

    @Override
    public List<Customer> getByFirstName(String firstName) {
        List<Customer> list = javaAssignmentRepository.findAll();
        List<Customer> ans = new ArrayList<>();
        for(Customer customer : list){
            if(customer.getFirstName().equals(firstName))
                ans.add(customer);
        }
        return ans;
    }

    @Override
    public List<Customer> getByLastName(String lastName) {
        List<Customer> list = javaAssignmentRepository.findAll();
        List<Customer> ans = new ArrayList<>();
        for(Customer customer : list){
            if(customer.getLastName().equals(lastName))
                ans.add(customer);
        }
        return ans;
    }

    @Override
    public List<Customer> getById(int id) {
        List<Customer> list = new ArrayList<>();
        list.add(javaAssignmentRepository.findById(id));
        return list;
    }

    @Override
    public String deleteCustomer(int id) {
        Customer customer = javaAssignmentRepository.findById(id);
        javaAssignmentRepository.deleteById(id);

        return "Customer with name "+ customer.getFirstName()+customer.getLastName()+" Deleted Successfully";
    }

    @Override
    public List<Customer> getAll() {
        return javaAssignmentRepository.findAll();
    }

    @Override
    public String updateList(List<Customer> customers) {
        for(Customer customer : customers){
            Customer customer1 = javaAssignmentRepository.findById(customer.getUuid());
            customer1.setAddress(customer.getAddress());
            customer1.setCity(customer.getCity());
            customer1.setState(customer.getState());
            customer1.setEmail(customer.getEmail());
            customer1.setPhone(customer.getPhone());
            customer1.setFirstName(customer.getFirstName());
            customer1.setLastName(customer.getLastName());
            customer1.setStreet(customer.getStreet());
            javaAssignmentRepository.save(customer1);
        }
        return "Customer List Updated Successfully";
    }


}
