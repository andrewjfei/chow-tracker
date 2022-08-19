package dev.andrewjfei.service.dto;

import dev.andrewjfei.service.enumeration.Area;
import dev.andrewjfei.service.enumeration.Cuisine;
import dev.andrewjfei.service.enumeration.PriceRange;

import java.util.List;

public record ChowListFilterDto(
        String searchString,
        List<Cuisine> cuisineList,
        List<PriceRange> priceRangeList,
        List<Area> areaList
) {

    @Override
    public String searchString() {
        return searchString;
    }

    @Override
    public List<Cuisine> cuisineList() {
        return cuisineList;
    }

    @Override
    public List<PriceRange> priceRangeList() {
        return priceRangeList;
    }

    @Override
    public List<Area> areaList() {
        return areaList;
    }

    @Override
    public String toString() {
        return "ChowListFilterDto{" +
                "searchString='" + searchString + '\'' +
                ", cuisineList=" + cuisineList +
                ", priceRangeList=" + priceRangeList +
                ", areaList=" + areaList +
                '}';
    }
}
