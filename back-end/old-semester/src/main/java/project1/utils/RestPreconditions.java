package project1.utils;

public class RestPreconditions {
    public static <T> T checkFound(T resource) {
        if (resource == null) {
            throw new RuntimeException("Resource Not Found!");
        }
        return resource;
    }
}