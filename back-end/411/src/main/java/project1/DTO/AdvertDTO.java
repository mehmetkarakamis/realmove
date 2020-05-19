package project1.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;


public class AdvertDTO {

    @Getter @Setter
    private String title;

    @Getter @Setter
    private double price;

    @Getter @Setter
    private String description;

    @Getter @Setter
    private String advertType; // (kiralık, satılık vs)

    @Getter @Setter
    private int squareMeter; // metrekare

    @Getter @Setter
    private String residentalType; // konut tipi

    @Getter @Setter
    private String numberOfRooms; //oda salon sayısı

    @Getter @Setter
    private int floorNumber; // bulunduğu kat

    @Getter @Setter
    private int buildingAge; // bina yaşı

    @Getter @Setter
    private String heatingType; // ısınma tipi

    @Getter @Setter
    private int numOfBuildingFloors; // bina kat sayısı

    @Getter @Setter
    private String furnitureStatus; // eşya durumu

    @Getter @Setter
    private int numOfBathrooms; // banyo sayısı

    @Getter @Setter
    private String status; // sıfır, ikinci el

    @Getter @Setter
    private int studentAndSinglePerson; // öğrenciye, bekara

    @Getter @Setter
    private String front; // ev cephesi (kuzey, güney vs)

    @Getter @Setter
    private String onTheSite; // site içerisinde mi?

    @Getter @Setter
    private ArrayList<String> keyword; //otopark/bahçeli.

    @Getter @Setter
    private ArrayList<String> type; //iç özellik, dış özellik
}
