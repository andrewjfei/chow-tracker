package dev.andrewjfei.service.dto;

import dev.andrewjfei.service.enumeration.Area;
import dev.andrewjfei.service.enumeration.Cuisine;
import dev.andrewjfei.service.enumeration.PriceRange;

public class ChowDTO {

    final private String id;
    final private String name;
    final private Cuisine cuisine;
    final private PriceRange priceRange;
    final private Area area;
    final private Integer hasBeen;

    public ChowDTO(String id, String name, Cuisine cuisine, PriceRange priceRange, Area area, Integer hasBeen) {
        this.id = id;
        this.name = name;
        this.cuisine = cuisine;
        this.priceRange = priceRange;
        this.area = area;
        this.hasBeen = hasBeen;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Cuisine getCuisine() {
        return cuisine;
    }

    public PriceRange getPriceRange() {
        return priceRange;
    }

    public Area getArea() {
        return area;
    }

    public Integer getHasBeen() {
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
