package com.annual.report.Repository;


import com.annual.report.Entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findBySemester(int semester);
    List<Student> findBySemesterAndSession(int semester, String session);
}


