package com.example.demo.pojo;

import lombok.Data;

@Data
public class Treatment {
    private Long id;
    private String projects_name;
    private String name;
    private int sex;
    private String phone;
    private String  identity;
    private int  medicalnumber;
    private int further_visit;
    private int in_hospital;
    private String symptom;
    private String realname;
    private String create_time;
    private String doctors_advice;

}
