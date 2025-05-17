package com.annual.report.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Student {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String name;
        private String rollNo;
        private  String session;
        private int semester;

        @ElementCollection(fetch = FetchType.EAGER)
        @CollectionTable(name = "student_subjects", joinColumns = @JoinColumn(name = "student_id"))
        @MapKeyColumn(name = "subject")
        @Column(name = "grade")
        private Map<String, String> subjects;


}



