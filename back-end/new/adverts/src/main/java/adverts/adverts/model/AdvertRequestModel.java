package adverts.adverts.model;

import java.util.List;

import javax.validation.constraints.Pattern;

import lombok.Getter;
import lombok.Setter;


public class AdvertRequestModel {

    @Getter @Setter
    private String userId;
 
    @Pattern(regexp = ".{5,100}") ///min 5 max 100 character
    @Getter @Setter
    private String title;

    @Pattern(regexp = ".{5,50}")
    @Getter @Setter
    private String city; ///İl

    @Pattern(regexp = ".{5,50}")
    @Getter @Setter
    private String district; ///İlçe

    @Pattern(regexp = ".{5,50}")
    @Getter @Setter
    private String region; ///Mahalle

    @Getter @Setter
    private double price;

    @Pattern(regexp = ".{5,200}")
    @Getter @Setter
    private String description;

    @Pattern(regexp = ".{5,50}")
    @Getter @Setter
    private String advertType; // (kiralık, satılık vs)

    @Getter @Setter
    private int squareMeter; // metrekare

    @Pattern(regexp = ".{5,50}")
    @Getter @Setter
    private String residentalType; // konut tipi

    @Pattern(regexp = ".{5,50}")
    @Getter @Setter
    private String numberOfRooms; //oda salon sayısı

    @Getter @Setter
    private int floorNumber; // bulunduğu kat

    @Getter @Setter
    private int buildingAge; // bina yaşı

    @Pattern(regexp = ".{5,50}")
    @Getter @Setter
    private String heatingType; // ısınma tipi

    @Getter @Setter
    private int numberOfFloors; // bina kat sayısı

    @Pattern(regexp = ".{5,50}")
    @Getter @Setter
    private String itemStatus; // eşya durumu

    @Getter @Setter
    private int numberOfBathrooms; // banyo sayısı

    @Pattern(regexp = ".{5,50}")
    @Getter @Setter
    private String status; // sıfır, ikinci el

    @Pattern(regexp = ".{5,50}")
    @Getter @Setter
    private String studentOrSinglePerson; // öğrenciye, bekara

    @Pattern(regexp = ".{5,50}")
    @Getter @Setter
    private String front; // ev cephesi (kuzey, güney vs)

    @Pattern(regexp = ".{5,50}")
    @Getter @Setter
    private String inTheSite; // site içerisinde mi?

    @Getter @Setter
    private List<String> internal; //iç özellik

    @Getter @Setter
    private List<String> external; //dış özellik

    @Getter @Setter
    private List<String> location; //lokasyon
   

}
