package com.example.iscmanagement;

import java.util.ArrayList;
import java.util.Arrays;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.iscmanagement.model.ISCAccount;
import com.example.iscmanagement.model.Role;
import com.example.iscmanagement.service.ISCAccountService;

@SpringBootApplication
public class IscManagementApplication implements CommandLineRunner {

	@Autowired
	ISCAccountService userService;

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

	public static void main(String[] args) {
		SpringApplication.run(IscManagementApplication.class, args);
		System.out.println("Done");
	}

	@Override
	public void run(String... args) throws Exception {
//		ISCAccount admin = new ISCAccount();
//		admin.setUsername("admin");
//		admin.setPassword("admin");
//		admin.setEmail("admin@email.com");
//		admin.setRoles(new ArrayList<Role>(Arrays.asList(Role.ROLE_ADMIN)));
//
//		userService.signup(admin);
//
//		ISCAccount client = new ISCAccount();
//		client.setUsername("client");
//		client.setPassword("client");
//		client.setEmail("client@email.com");
//		client.setRoles(new ArrayList<Role>(Arrays.asList(Role.ROLE_CLIENT)));
//
//		userService.signup(client);

	}

}
