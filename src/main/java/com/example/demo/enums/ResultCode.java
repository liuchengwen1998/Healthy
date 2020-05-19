package com.example.demo.enums;

public enum ResultCode {
    //成功
    SUCCESS(200,"成功"),
    //失败
    FAIL(400,"失败"),

    //登陆
    LOGIN_EOORO(0,"用户名不存在"),
    LOGIN_EOORO1(1,"密码错误"),
    LOGIN_EOORO2(2,"账号被锁定"),
    LOGIN_EOORO3(3,"登陆失败"),
    LOGIN_EOORO4(4,"验证码不正确"),
    LOGIN_EOORO5(5,"获取数据失败"),
    LOGIN_EOORO6(6,"手机号码不匹配"),
    LOGIN_EOORO7(7,"用户名已存在"),
    LOGIN_EOORO8(8,"手机号码已存在"),
    //个人档案
    ACHIVEST_ERROR(0,"档案信息不存在"),
    ERROR_PAS(11,"管理员密码错误"),
    ERROR_PAS1(12,"两次密码不一致"),

    ERROR_MSG(21,"发送短信失败"),

    NOTNULL_ID(22,"身份证号码不存在")

    ;

    public int code;
    public String msg;

    ResultCode(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}
