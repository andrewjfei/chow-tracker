package dev.andrewjfei.service.dto;

import java.util.List;

public record ChowRankingsDto(
        List<RankingItemDto> popularityRankings,
        List<RankingItemDto> cuisineRankings,
        List<RankingItemDto> priceRangeRankings,
        List<RankingItemDto> areaRankings
) {
    @Override
    public List<RankingItemDto> popularityRankings() {
        return popularityRankings;
    }

    @Override
    public List<RankingItemDto> cuisineRankings() {
        return cuisineRankings;
    }

    @Override
    public List<RankingItemDto> priceRangeRankings() {
        return priceRangeRankings;
    }

    @Override
    public List<RankingItemDto> areaRankings() {
        return areaRankings;
    }

    @Override
    public String toString() {
        return "ChowRankingsDto{" +
                "popularityRankings=" + popularityRankings +
                ", cuisineRankings=" + cuisineRankings +
                ", priceRangeRankings=" + priceRangeRankings +
                ", areaRankings=" + areaRankings +
                '}';
    }
}
