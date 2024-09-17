package com.example.iscmanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.example.iscmanagement.properties.FileStorageProperties;

@SpringBootApplication
@EnableConfigurationProperties({
	FileStorageProperties.class
})
public class IscManagementApplication implements CommandLineRunner{
	public static void main(String[] args) {
		SpringApplication.run(IscManagementApplication.class, args);
		System.out.println("Done");
	}
	
	@Override
	public void run(String... args) throws Exception {
	}
}
