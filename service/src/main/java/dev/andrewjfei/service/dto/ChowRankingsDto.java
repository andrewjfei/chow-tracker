package dev.andrewjfei.service.dto;

import java.util.List;

public record ChowRankingsDto(
        List<RankingItemDto> popularity,
        List<RankingItemDto> cuisine,
        List<RankingItemDto> priceRange,
        List<RankingItemDto> area
) {
    @Override
    public List<RankingItemDto> popularity() {
        return popularity;
    }

    @Override
    public List<RankingItemDto> cuisine() {
        return cuisine;
    }

    @Override
    public List<RankingItemDto> priceRange() {
        return priceRange;
    }

    @Override
    public List<RankingItemDto> area() {
        return area;
    }

    @Override
    public String toString() {
        return "ChowRankingsDto{" +
                "popularity=" + popularity +
                ", cuisine=" + cuisine +
                ", priceRange=" + priceRange +
                ", area=" + area +
                '}';
    }
}
