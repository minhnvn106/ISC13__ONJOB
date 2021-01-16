package com.example.iscmanagement.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

public class FileStorageException extends RuntimeException{
	public FileStorageException(String message) {
		super(message);
	
	}
	public FileStorageException(String message, Throwable cause) {
		super(message,cause);
	}
}
