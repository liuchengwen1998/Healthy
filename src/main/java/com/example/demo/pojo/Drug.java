package com.example.demo.pojo;

import lombok.Data;

@Data
public class Drug {
    private Long id;
    private int number;
    private String name;
    private int count;
    private double price;
    private int type;
    private String description;


}
