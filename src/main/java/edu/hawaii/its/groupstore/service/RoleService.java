package edu.hawaii.its.groupstore.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.hawaii.its.groupstore.repository.RoleRepository;
import edu.hawaii.its.groupstore.type.Role;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public List<Role> findAll() {
        return roleRepository.findAll();
    }

    public Role find(Integer id) {
        return roleRepository.findById(id);
    }

    public Role findByRole(String role) {
        return roleRepository.findByRole(role);
    }

}
