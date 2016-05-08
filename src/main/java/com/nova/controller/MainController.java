package com.nova.controller;

import com.nova.model.Dish;
import com.nova.model.Manager;
import com.nova.model.User;
import com.nova.service.DishService;
import com.nova.service.ManagerService;
import com.nova.service.UserService;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;



import java.util.List;

/**
 * Created by Go on 2016/1/24.
 */

@SessionAttributes("principal")
@Controller
public class MainController {
    @Autowired
    private UserService userService;
    @Autowired
    private DishService dishService;
    @Autowired
    private ManagerService managerService;

//    @RequestMapping(value = "/", method = RequestMethod.GET)
//    public String index() {
//        return "index";
//    }

    /*首页，显示登录页面*/
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String login() {
        return "login";
    }

    /*显示菜单页面*/
    @RequestMapping(value = "/menu", method = RequestMethod.GET)
    public String manage() {
        return "manageMenu";
    }

    /*读取数据库，发送menu表内查询到的记录*/
    @RequestMapping(value = "/getmenu", method = RequestMethod.GET)
    @ResponseBody
    public List<Dish> menu() {
        return dishService.getMenu();
    }

    /*前台同步数据库menu表,recommended字段*/
    @RequestMapping(value = "/postrecommended", method = RequestMethod.POST)
    public void postRecommended(@RequestParam String recommended, @RequestParam int id) {
        dishService.updateRecommended(recommended, id);
    }

    /*前台同步数据库menu表,dishname字段*/
    @RequestMapping(value = "/postdishname", method = RequestMethod.POST)
    public void postDishname(@RequestParam("details") String dishname, @RequestParam int id) {
        dishService.updateDishname(dishname, id);
    }

    /*前台同步数据库menu表,price字段*/
    @RequestMapping(value = "/postprice", method = RequestMethod.POST)
    public void postPrice(@RequestParam("details") float price, @RequestParam int id) {
        dishService.updatePrice(price, id);
    }

    /*前台同步数据库menu表,onoff字段*/
    @RequestMapping(value = "/postonoff", method = RequestMethod.POST)
    public void postOnoff(@RequestParam int onoff, @RequestParam int id) {
        dishService.updateOnoff(onoff, id);
    }



    /*未登录时，地址栏输入URL:/submit,直接转跳首页,即登录页面*/
    @RequestMapping(value = "/submit", method = RequestMethod.GET)
    public String menuGet() {
        return "redirect:/";
    }

    /*提交用户名,密码*/
    @RequestMapping(value = "/submit", method = RequestMethod.POST)
    public String menuPost(@ModelAttribute("Manager") Manager manager, ModelMap modelMap, RedirectAttributes redirectAttributes) {
        if (managerService.hasManager(manager) == 0) {
            redirectAttributes.addFlashAttribute("error", "用户名/密码错误");
            return "redirect:/";
        } else {
            modelMap.addAttribute("principal", manager.getUsername());
            return "redirect:/menu";
        }
    }

    @RequestMapping(value = {"/users"}, method = RequestMethod.GET)
    public String users(ModelMap modelMap) {
        List<User> Users = userService.getAll();
        modelMap.addAttribute("Users", Users);
        return "userManager";
    }

    @RequestMapping(value = "/addUser", method = RequestMethod.GET)
    public String addUser() {
        return "addUser";
    }

    @RequestMapping(value = "/addUserPost", method = RequestMethod.POST)
    public String addUserPost(@ModelAttribute("user") User user) {
        userService.add(user);
        return "redirect:/users";
    }


    @RequestMapping(value = "/detailUser/{userId}", method = RequestMethod.GET)
    public String detailUser(@PathVariable("userId") int userId, ModelMap modelMap) {
        User user = userService.getById(userId);
        modelMap.addAttribute("user", user);
        return "userDetail";
    }

    @RequestMapping(value = "/updateUser/{userId}", method = RequestMethod.GET)
    public String updateUser(@PathVariable("userId") int userId, ModelMap modelMap) {
        User user = userService.getById(userId);
        modelMap.addAttribute("user", user);
        return "updateUser";
    }

    @RequestMapping(value = "/updateUserPost", method = RequestMethod.POST)
    public String updateUserPost(@ModelAttribute("user") User user) {
        userService.update(user);
        return "redirect:/users";
    }

    @RequestMapping(value = "/deleteUser/{userId}", method = RequestMethod.GET)
    public String deleteUser(@PathVariable("userId") int userId) {
        userService.deleteById(userId);
        return "redirect:/users";
    }
}