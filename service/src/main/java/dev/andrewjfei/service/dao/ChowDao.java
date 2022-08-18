package dev.andrewjfei.service.dao;

import dev.andrewjfei.service.enumeration.Area;
import dev.andrewjfei.service.enumeration.Cuisine;
import dev.andrewjfei.service.enumeration.PriceRange;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "[chow]")
public class ChowDao {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "[id]", columnDefinition = "VARCHAR(60)", unique = true, nullable = false)
    private String id;

    @Column(name = "[user_id]", columnDefinition = "VARCHAR(60)", nullable = false)
    private String userId;

    @Column(name = "[name]", columnDefinition = "VARCHAR(32)", unique = true, nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "[cuisine]", nullable = false)
    private Cuisine cuisine = Cuisine.OTHER;

    @Enumerated(EnumType.STRING)
    @Column(name = "[price_range]", nullable = false)
    private PriceRange priceRange = PriceRange.LOW;

    @Enumerated(EnumType.STRING)
    @Column(name = "[area]", nullable = false)
    private Area area = Area.CENTRAL_AUCKLAND;

    @Column(name = "[has_been]", columnDefinition = "INT", nullable = false)
    private int hasBeen = 0;

    @Column(name = "[created]", columnDefinition = "DATETIME", nullable = false)
    private LocalDateTime created = LocalDateTime.now();

    public ChowDao() {

    }

    public ChowDao(String userId, String name, Cuisine cuisine, PriceRange priceRange, Area area) {
        this.userId = userId;
        this.name = name;
        this.cuisine = cuisine;
        this.priceRange = priceRange;
        this.area = area;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Cuisine getCuisine() {
        return cuisine;
    }

    public void setCuisine(Cuisine cuisine) {
        this.cuisine = cuisine;
    }

    public PriceRange getPriceRange() {
        return priceRange;
    }

    public void setPriceRange(PriceRange priceRange) {
        this.priceRange = priceRange;
    }

    public Area getArea() {
        return area;
    }

    public void setArea(Area area) {
        this.area = area;
    }

    public int getHasBeen() {
        return hasBeen;
    }

    public void setHasBeen(int hasBeen) {
        this.hasBeen = hasBeen;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    @Override
    public String toString() {
        return "ChowDAO{" +
                "id='" + id + '\'' +
                ", userId='" + userId + '\'' +
                ", name='" + name + '\'' +
                ", cuisine=" + cuisine +
                ", priceRange=" + priceRange +
                ", area=" + area +
                ", hasBeen=" + hasBeen +
                ", created=" + created +
                '}';
    }
}
