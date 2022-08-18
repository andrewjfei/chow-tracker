package dev.andrewjfei.service.dto;

public record ErrorDto(
        int code,
        String description
) {

    @Override
    public int code() {
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

