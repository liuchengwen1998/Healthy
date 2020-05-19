package com.example.demo.entity;

import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;

/**
 * (LcwMenu)实体类
 *
 * @author makejava
 * @since 2020-04-29 18:45:05
 */
@Data
public class LcwMenu implements Serializable {
    private static final long serialVersionUID = 851260789131632832L;
    /**
    * ID
    */
    private Integer id;
    /**
    * 名称
    */
    private String title;
    
    private String icon;
    
    private String href;
    /**
    * 0:true,1:false
    */
    private Integer spread;

    private Integer parent_id;

    private ArrayList<LcwMenu> children = new ArrayList<>();


}