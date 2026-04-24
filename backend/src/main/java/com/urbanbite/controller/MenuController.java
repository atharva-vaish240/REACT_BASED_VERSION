package com.urbanbite.controller;

import com.urbanbite.service.MenuService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * REST controller for the weekly tiffin menu.
 * Public access — no authentication required.
 */
@RestController
@RequestMapping("/api/menu")
public class MenuController {

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    /**
     * GET /api/menu?day=Monday — Get menu for a specific day.
     * Returns: { "lunch": "...", "dinner": "..." }
     */
    @GetMapping
    public ResponseEntity<Map<String, String>> getMenuByDay(@RequestParam(defaultValue = "Monday") String day) {
        return ResponseEntity.ok(menuService.getMenuByDay(day));
    }

    /**
     * GET /api/menu/all — Get the full weekly menu.
     * Returns: { "Monday": { "lunch": "...", "dinner": "..." }, ... }
     */
    @GetMapping("/all")
    public ResponseEntity<Map<String, Map<String, String>>> getFullMenu() {
        return ResponseEntity.ok(menuService.getFullMenu());
    }
}
