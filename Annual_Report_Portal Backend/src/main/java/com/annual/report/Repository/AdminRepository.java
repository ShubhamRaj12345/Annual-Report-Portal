package com.annual.report.Repository;

import com.annual.report.Entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin,String> {

    Admin findByUsername(String username);
}
