package com.example.iscmanagement.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.iscmanagement.dao.ISCAccountRepo;
import com.example.iscmanagement.model.ISCAccount;



@Service
public class MyUserDetails implements UserDetailsService {

  @Autowired
  private ISCAccountRepo ISCAccountRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    final ISCAccount user = ISCAccountRepository.findByUsername(username);

    if (user == null) {
      throw new UsernameNotFoundException("User '" + username + "' not found");
    }

    return org.springframework.security.core.userdetails.User//
        .withUsername(username)//
        .password(user.getPassword())//
        .authorities(user.getRoles())//
        .accountExpired(false)//
        .accountLocked(false)//
        .credentialsExpired(false)//
        .disabled(false)//
        .build();
  }

}
