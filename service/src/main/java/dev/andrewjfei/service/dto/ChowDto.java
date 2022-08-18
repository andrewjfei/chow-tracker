package dev.andrewjfei.service.dto;

import dev.andrewjfei.service.enumeration.Area;
import dev.andrewjfei.service.enumeration.Cuisine;
import dev.andrewjfei.service.enumeration.PriceRange;

public record ChowDto(
        String id,
        String name,
        Cuisine cuisine,
        PriceRange priceRange,
        Area area,
        Integer hasBeen
) {

    @Override
    public String id() {
        return id;
    }

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
    public Integer hasBeen() {
        return hasBeen;
    }

    @Override
    public String toString() {
        return "ChowDTO{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", cuisine=" + cuisine +
                ", priceRange=" + priceRange +
                ", area=" + area +
                ", hasBeen=" + hasBeen +
                '}';
    }
}
