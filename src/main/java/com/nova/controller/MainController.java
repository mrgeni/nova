package com.nova.controller;

import com.nova.model.Dish;
import com.nova.model.DishType;
import com.nova.model.Manager;
import com.nova.model.User;
import com.nova.service.DishService;
import com.nova.service.DishTypeService;
import com.nova.service.ManagerService;
import com.nova.service.UserService;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


import javax.servlet.http.HttpServletRequest;
import java.io.File;
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
    private DishTypeService dishTypeService;
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

    /*读取数据库，发送dish_type表内查询到的菜品种类*/
    @RequestMapping(value = "/getdishtype", method = RequestMethod.GET)
    @ResponseBody
    public List<DishType> type() {
        return dishTypeService.getDishtype();
    }

    /*前台同步数据库dish_type表,type字段*/
    @RequestMapping(value = "/postdishtype", method = RequestMethod.POST)
    @ResponseBody
    public void postDishtype(@RequestParam String type, @RequestParam int id) {
        dishTypeService.updateDishtype(type, id);
    }

    /*dish_type表,插入新的菜类记录*/
    @RequestMapping(value = "/add-type", method = RequestMethod.GET)
    @ResponseBody
    public int insertNewtype() {
        return dishTypeService.insertNewtype(new DishType());
    }

    @RequestMapping(value = "/postdeletetype", method = RequestMethod.POST)
    @ResponseBody
    public void postDeletedishtype(int id) {
        dishTypeService.deleteDishtype(id);
    }


    /*读取数据库，发送menu表内查询到的记录*/
    @RequestMapping(value = "/getmenu", method = RequestMethod.POST)
    @ResponseBody
    public List<Dish> menu(int type) {
        return dishService.getMenu(type);
    }

    /*前台同步数据库menu表,recommended字段*/
    @RequestMapping(value = "/postrecommended", method = RequestMethod.POST)
    @ResponseBody
    public void postRecommended(@RequestParam String recommended, @RequestParam int id) {
        dishService.updateRecommended(recommended, id);
    }

    /*前台同步数据库menu表,dishname字段*/
    @RequestMapping(value = "/postdishname", method = RequestMethod.POST)
    @ResponseBody
    public void postDishname(@RequestParam("details") String dishname, @RequestParam int id) {
        dishService.updateDishname(dishname, id);
    }

    /*前台同步数据库menu表,price字段*/
    @RequestMapping(value = "/postprice", method = RequestMethod.POST)
    @ResponseBody
    public void postPrice(@RequestParam("details") float price, @RequestParam int id) {
        dishService.updatePrice(price, id);
    }

    /*前台同步数据库menu表,onoff字段*/
    @RequestMapping(value = "/postonoff", method = RequestMethod.POST)
    @ResponseBody
    public void postOnoff(@RequestParam int onoff, @RequestParam int id) {
        dishService.updateOnoff(onoff, id);
    }

    /*menu表,插入新的菜品记录*/
    @RequestMapping(value = "/add-dish", method = RequestMethod.POST)
    @ResponseBody
    public int insertNewdish(int type) {
        return dishService.insertNewdish(new Dish(type));
    }

    /*menu表,删除菜品*/
    @RequestMapping(value = "/postdelete", method = RequestMethod.POST)
    @ResponseBody
    public void postDelete(String ids) {
        dishService.deleteDish(ids);

    }

    /*上传菜品图片*/
    @RequestMapping(value = "/img-upload", method = RequestMethod.POST)
    @ResponseBody
    public void imgUpload(MultipartFile img, int id, HttpServletRequest request) {
        try {
            String imgname = img.getOriginalFilename();
            String savepath = request.getSession().getServletContext().getRealPath("/WEB-INF/img") + File.separator + imgname;
            img.transferTo(new File(savepath));
            dishService.updateImg(imgname, id);
            //            return "{}";
            //           return "{\"initialPreview\":[\"/img/" + id + ".jpg?t=12\"],\"initialPreviewConfig\":[{\"caption\": \"" + id + "\",\"url\": \"/img-delete\",\"key\":\"" + id + ".jpg\"}],\"append\":\"false\"}";
        } catch (Exception e) {
//            e.printStackTrace();
//            return "{\"error\":\"发生错误,上传失败.\"}";
        }
    }

    /*删除菜品图片*/
    @RequestMapping(value = "/img-delete", method = RequestMethod.POST)
    @ResponseBody
    public void imgDelete(int id) {
        try {
            dishService.updateImg("无", id);
//            String deletepath = request.getSession().getServletContext().getRealPath("/WEB-INF/img") + File.separator + id;
//            (new File(deletepath)).delete();
//            return "{}";
        } catch (Exception e) {
//            return "{\"error\":\"发生错误,删除失败.\"}";
//
        }
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
