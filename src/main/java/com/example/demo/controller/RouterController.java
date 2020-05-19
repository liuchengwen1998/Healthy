package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RouterController {

    @RequestMapping("index")
    public String index(){
        return "index";
    }

    @RequestMapping("page/links/linksList")
    public String linkList(){
        return "page/links/linksList";
    }


    @RequestMapping("page/links/PersonList")
    public String PersonList(){
        return "page/links/PersonList";
    }

    @RequestMapping("page/user/changePwd")
    public String changePwd(){
        return "page/user/changePwd";
    }

    @RequestMapping("page/links/linksAdd")
    public String linksAdd(){
        return "page/links/linksAdd";
    }

    @RequestMapping("page/main")
    public String main(){
        return "page/main";
    }

    @RequestMapping("page/user/userInfo")
    public String userInfo(){
        return "page/user/userInfo";
    }

    @RequestMapping("page/user/selfArchives")
    public String selfArchives(){
        return "page/user/selfArchives";
    }

    //就诊管理
    @RequestMapping("page/visitmanager/addoperation")
    public String addoperation(){
        return "page/visitmanager/addoperation";
    }

    @RequestMapping("page/visitmanager/search")
    public String search(){
        return "page/visitmanager/search";
    }

    @RequestMapping("page/visitmanager/visitRecord")
    public String visitRecord(){
        return "page/visitmanager/visitRecord";
    }
    @RequestMapping("page/visitmanager/newVisit")
    public String newVisit(){
        return "page/visitmanager/newVisit";
    }
    @RequestMapping("page/visitmanager/peis")
    public String peis(){
        return "page/visitmanager/peis";
    }
    @RequestMapping("page/visitmanager/peisList")
    public String peisList(){
        return "page/visitmanager/peisList";
    }

//药品管理
    @RequestMapping("page/drugmanager/drugList")
    public String drugList(){
        return "page/drugmanager/drugList";
    }
    @RequestMapping("page/drugmanager/addDrug")
    public String addDrug(){
        return "page/drugmanager/addDrug";
    }

    @RequestMapping("page/archives/Archives")
    public String archives(){
        return "page/archives/Archives";
    }
    @RequestMapping("page/archives/newAdd")
    public String newAdd(){
        return "page/archives/newAdd";
    }
    @RequestMapping("page/archives/visitList")
    public String visitList(){
        return "page/archives/visitList";
    }
    @RequestMapping("page/archives/peisAllList")
    public String peisAllList(){
        return "page/archives/peisAllList";
    }

    @RequestMapping("/")
    public String tologin(){
        return "redirect:/login";
    }

    @RequestMapping({"/login","tologin"})
    public String login(){
        return "login";
    }

}
