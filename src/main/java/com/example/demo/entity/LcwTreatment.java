package com.example.demo.entity;

import lombok.Data;

import java.util.Date;
import java.io.Serializable;

/**
 * (LcwTreatment)实体类
 *
 * @author makejava
 * @since 2020-04-27 21:48:52
 */
@Data
public class LcwTreatment implements Serializable {
    private static final long serialVersionUID = 644029919707468237L;
    
    private Integer id;
    
    private Long creatorId;
    
    private String identity;
    
    private String createTime;
    /**
    * 检查项目
    */
    private String projects;
    /**
    * 用药
    */
    private String medicine;
    /**
    * 复诊（0 需要  1 不需要）
    */
    private Integer further_visit;
    /**
    * 住院（0需要 1不需要）
    */
    private Integer in_hospital;
    /**
    * 主要症状
    */
    private String symptom;
    /**
     * 医嘱
     */
    private String doctors_advice;


}