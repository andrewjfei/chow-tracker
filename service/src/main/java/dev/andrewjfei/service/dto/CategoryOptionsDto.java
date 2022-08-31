package dev.andrewjfei.service.dto;

import dev.andrewjfei.service.enumeration.Area;
import dev.andrewjfei.service.enumeration.Cuisine;
import dev.andrewjfei.service.enumeration.PriceRange;

import java.util.List;

public record CategoryOptionsDto(
        List<Cuisine> cuisineOptions,
        List<PriceRange> priceRangeOptions,
        List<Area> areaOptions
) {

    @Override
    public List<Cuisine> cuisineOptions() {
        return cuisineOptions;
    }

    @Override
    public List<PriceRange> priceRangeOptions() {
        return priceRangeOptions;
    }

    @Override
    public List<Area> areaOptions() {
        return areaOptions;
    }

    @Override
    public String toString() {
        return "CategoryOptionsDto{" +
                "cuisineOptions=" + cuisineOptions +
                ", priceRangeOptions=" + priceRangeOptions +
                ", areaOptions=" + areaOptions +
                '}';
    }
}
