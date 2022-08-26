package dev.andrewjfei.service.dto;

public record RankingItemDto(
        int ranking,
        String itemName,
        int hasBeen
) {

    @Override
    public int ranking() {
        return ranking;
    }

    @Override
    public String itemName() {
        return itemName;
    }

    @Override
    public int hasBeen() {
        return hasBeen;
    }

    @Override
    public String toString() {
        return "RankingItemDto{" +
                "ranking=" + ranking +
                ", itemName='" + itemName + '\'' +
                ", hasBeen=" + hasBeen +
                '}';
    }
}
