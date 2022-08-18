package dev.andrewjfei.service.dto;

public record ErrorDto(
        Integer code,
        String description
) {

    @Override
    public Integer code() {
        return code;
    }

    @Override
    public String description() {
        return description;
    }

    @Override
    public String toString() {
        return "ErrorDTO{" +
                "code=" + code +
                ", description='" + description + '\'' +
                '}';
    }
}

