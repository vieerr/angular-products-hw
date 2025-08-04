package com.saintroche.products.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.saintroche.products.models.entities.Product;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {

}
