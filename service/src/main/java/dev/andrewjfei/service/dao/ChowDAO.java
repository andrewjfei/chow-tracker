package dev.andrewjfei.service.dao;

import dev.andrewjfei.service.enumeration.Area;
import dev.andrewjfei.service.enumeration.Cuisine;
import dev.andrewjfei.service.enumeration.PriceRange;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "chow")
public class ChowDAO {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "name")
    private String name;

    @Column(name = "cuisine")
    private Cuisine cuisine;

    @Column(name = "price_range")
    private PriceRange priceRange;

    @Column(name = "area")
    private Area area;

    @Column(name = "has_been")
    private Integer hasBeen;

    @Column(name = "created")
    private LocalDateTime created;

    public ChowDAO() {

    }

    public ChowDAO(String userId, String name, Cuisine cuisine, PriceRange priceRange, Area area) {
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

    public Integer getHasBeen() {
        return hasBeen;
    }

    public void setHasBeen(Integer hasBeen) {
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
