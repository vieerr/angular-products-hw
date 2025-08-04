package com.saintroche.products.client;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@FeignClient(name = "c-app-categories", url = "${c-app-categories:8003}")
public interface CategoryClient {

    @GetMapping("/api/categories/{id}")
    CategoryDTO getCategory(@PathVariable("id") Long id);
}
