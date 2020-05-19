package com.example.demo.utils;

import com.example.demo.VO.ResultVO;
import com.example.demo.enums.ResultCode;

public class ResultVOUtil {
    public static ResultVO<Object> success(Object object){
        ResultVO<Object> resultVO = new ResultVO<>();

        resultVO.setData(object);
        resultVO.setMsg(ResultCode.SUCCESS.msg);
        resultVO.setCode(ResultCode.SUCCESS.code);
        return resultVO;
    }

    public static ResultVO success(){
        ResultVO resultVO = new ResultVO();
        resultVO.setMsg(ResultCode.SUCCESS.msg);
        resultVO.setCode(ResultCode.SUCCESS.code);
        return resultVO;
    }


    public static ResultVO error(Integer code,String msg){
        ResultVO resultVO = new ResultVO();
        resultVO.setMsg(msg);
        resultVO.setCode(code);
        return resultVO;
    }
}
