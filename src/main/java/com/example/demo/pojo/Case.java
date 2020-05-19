package com.example.demo.pojo;

import lombok.Data;

@Data
public class Case {
    private Integer id;
    private String name;
    private String identity;
    private Integer age;
    private Integer sex;
    private String medicalnumber;
    private String depart;
    private String description;
    private String creator;
    private String createtime;

}
