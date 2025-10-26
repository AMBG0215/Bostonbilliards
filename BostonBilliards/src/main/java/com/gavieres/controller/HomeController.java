    package com.gavieres.controller;

    import org.springframework.web.bind.annotation.GetMapping;
    import org.springframework.web.bind.annotation.RestController;

    @RestController
    public class HomeController {

        @GetMapping("/")
        public String home() {
            return "Welcome to Boston Billiards Store API! 🎱";
        }
    }
