package edu.hawaii.its.groupstore.type;

public interface PersonIdentifiable {
    default String getUhUuid() {
        return "";
    }
}
