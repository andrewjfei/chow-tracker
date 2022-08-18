package dev.andrewjfei.service.dto;

import dev.andrewjfei.service.enumeration.Area;
import dev.andrewjfei.service.enumeration.Cuisine;
import dev.andrewjfei.service.enumeration.PriceRange;

public record NewChowDto(
        String name,
        Cuisine cuisine,
        PriceRange priceRange,
        Area area
) {

    @Override
    public String name() {
        return name;
    }

    @Override
    public Cuisine cuisine() {
        return cuisine;
    }

    @Override
    public PriceRange priceRange() {
        return priceRange;
    }

    @Override
    public Area area() {
        return area;
    }

    @Override
    public String toString() {
        return "NewChowDto{" +
                "name='" + name + '\'' +
                ", cuisine=" + cuisine +
                ", priceRange=" + priceRange +
                ", area=" + area +
                '}';
    }
}
