package com.saintroche.products.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.saintroche.products.client.CategoryClient;
import com.saintroche.products.client.CategoryDTO;
import com.saintroche.products.models.entities.Product;
import com.saintroche.products.repositories.ProductRepository;

@Service
@Transactional
public class ProductServiceImp implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryClient categoryClient;

    public ProductServiceImp(ProductRepository productRepository, CategoryClient categoryClient) {
        this.productRepository = productRepository;
        this.categoryClient = categoryClient;
    }

    @Override
    public List<Product> getAllProducts() {
        return (List<Product>) productRepository.findAll();
    }

    @Override
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public Product createProduct(Product product) {
        if (product.getCategoryId() != null) {
            CategoryDTO category = categoryClient.getCategory(product.getCategoryId());
            if (category != null) {
                product.setCategoryId(category.getId());
            } else {
                throw new IllegalArgumentException("Category with id " + product.getCategoryId() + " does not exist");
            }
        }
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long id, Product product) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product with id " + id + " does not exist"));

        if (product.getName() != null) {
            existingProduct.setName(product.getName());
        }
        if (product.getDescription() != null) {
            existingProduct.setDescription(product.getDescription());
        }
        if (product.getPrice() != null) {
            existingProduct.setPrice(product.getPrice());
        }
        if (product.getCategoryId() != null) {
            existingProduct.setCategoryId(product.getCategoryId());
        }

        return productRepository.save(existingProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        if (!productRepository.findById(id).isPresent()) {
            throw new IllegalArgumentException("Product with id " + id + " does not exist");
        }

        productRepository.deleteById(id);
    }
}
