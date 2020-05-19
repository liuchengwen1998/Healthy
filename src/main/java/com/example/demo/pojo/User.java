package com.example.demo.pojo;

import lombok.Data;

import java.util.Date;

@Data
public class User {
    private Long id;
    private String username;
    private String password;
    private String phone;
    private String email;
    private String realname;
    private int status;
    private String rolename;
    private int roleid;
    private int fail_count;
    private Date fail_time;
    private String province;
    private String city;
    private String area;
    private String address;
    private String sex;
}
