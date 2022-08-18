package dev.andrewjfei.service.dto;

public record RankingItemDto(
        String itemName,
        int hasBeen
) {

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
                "itemName='" + itemName + '\'' +
                ", hasBeen=" + hasBeen +
                '}';
    }
}
