package com.example.java_assignment.Controller;

import com.example.java_assignment.DTOs.ResponseDto.CustomerRequestDto;
import com.example.java_assignment.Models.Customer;
import com.example.java_assignment.Service.JavaAssignmentService;
import com.example.java_assignment.Service.JavaAssignmentServiceImplementation.JavaAssignmentServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/customer")
public class JavaAssignmentController {

    @Autowired
    JavaAssignmentServiceImplementation javaAssignmentServiceImplementation;
    @PostMapping(value = "/addCustomer")
    public ResponseEntity<String> addCustomer(@RequestBody CustomerRequestDto customer){
        String data = javaAssignmentServiceImplementation.addCustomer(customer);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
    @GetMapping(value = "/getById/{id}")
    public List<Customer> getByLastName(@PathVariable("id") int id){

        return javaAssignmentServiceImplementation.getById(id);
    }
    @GetMapping(value = "/getAll")
    public List<Customer> getAll(){
        return javaAssignmentServiceImplementation.getAll();
    }
    @GetMapping(value = "/getByFirstName/{firstName}")
    public List<Customer> getByFirstName(@PathVariable("firstName") String firstName){
        return javaAssignmentServiceImplementation.getByFirstName(firstName);
    }
    @GetMapping(value = "/getByLastName/{lastName}")
    public List<Customer> getByLastName(@PathVariable("lastName") String lastName){

        return javaAssignmentServiceImplementation.getByLastName(lastName);
    }
    @GetMapping(value = "/getByPhone/{phone}")
    public List<Customer> getByPhone(@PathVariable("phone") String phone){

        return javaAssignmentServiceImplementation.getByPhone(phone);
    }
    @GetMapping(value = "/getByEmail/{email}")
    public List<Customer> getByEmail(@PathVariable("email") String email){

        return javaAssignmentServiceImplementation.getByEmail(email);
    }
    @DeleteMapping(value = "/delete/{id}")
    public String delete(@PathVariable("id") String id){

        return javaAssignmentServiceImplementation.deleteCustomer(Integer.parseInt(id));
    }
    @PutMapping(value = "/updateList")
    public String updateList(@RequestBody List<Customer> customers){

        return javaAssignmentServiceImplementation.updateList(customers);
    }
}
