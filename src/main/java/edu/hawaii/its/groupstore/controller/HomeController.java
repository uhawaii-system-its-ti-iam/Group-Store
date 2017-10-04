package edu.hawaii.its.groupstore.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import edu.hawaii.its.groupstore.access.User;
import edu.hawaii.its.groupstore.access.UserContextService;
import edu.hawaii.its.groupstore.service.MessageService;
import edu.hawaii.its.groupstore.type.Message;

@Controller
public class HomeController {

    private static final Log logger = LogFactory.getLog(HomeController.class);

    @Autowired
    private UserContextService userContextService;

    @Autowired
    private MessageService messageService;

    @GetMapping(value = { "/", "/home" })
    public String home(Model model) {
        logger.debug("User at home. ");

        int messageId = Message.JUMBOTRON_MESSAGE;
        Message message = messageService.findMessage(messageId);
        model.addAttribute("jumbotron", message.getText());

        return "home";
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "/login")
    public String login() {
        logger.debug("User at login.");
        return "redirect:/home";
    }

    @GetMapping(value = { "/holiday", "/holidays" })
    public String holiday() {
        logger.debug("User at holiday.");
        return "holiday";
    }

    @GetMapping(value = { "/campus", "/campuses" })
    public String campus() {
        logger.debug("User at campus.");
        return "campus";
    }

    @GetMapping(value = { "/help/contact", "/help/contacts" })
    public String contact() {
        logger.debug("User at contact.");
        return "help/contact";
    }

    @GetMapping(value = { "/help/faq", "/help/faqs" })
    public String faq() {
        logger.debug("User at faq.");
        return "help/faq";
    }

    @GetMapping(value = "/help/fonts")
    public String fonts() {
        logger.debug("User at fonts.");
        return "help/fonts";
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/user")
    public String adminUser(Model model) {
        logger.debug("User at /user.");

        User user = userContextService.getCurrentUser();
        model.addAttribute("user", user);

        return "user/user";
    }

    @GetMapping(value = "/404")
    public String invalid() {
        return "redirect:/";
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "/search")
    public String search() {
        logger.debug("User at search page.");
        return "search";
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "/group-configuration")
    public String groupConfiguration() {
        logger.debug("User at group configuration modal.");
        return "group-configuration";
    }

}
