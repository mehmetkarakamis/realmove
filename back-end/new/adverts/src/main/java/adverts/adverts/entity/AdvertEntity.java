package adverts.adverts.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import adverts.adverts.converter.StringListConverter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "adverts")
@NoArgsConstructor
@ToString
public class AdvertEntity implements Serializable {

    private static final long serialVersionUID = 6745962496879613818L;
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Getter @Setter
    private Long id;

    @Column(nullable = false)
    @Getter @Setter
    private String userId;

    @Column(nullable = false, unique = true)
    @Getter @Setter
    private String advertId;

    @Getter @Setter
    private String title;

    @Getter @Setter
    private String city; ///İl

    @Getter @Setter
    private String district; ///İlçe

    @Getter @Setter
    private String region; ///Mahalle

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
    private int numberOfFloors; // bina kat sayısı

    @Getter @Setter
    private String itemStatus; // eşya durumu

    @Getter @Setter
    private int numberOfBathrooms; // banyo sayısı

    @Getter @Setter
    private String status; // sıfır, ikinci el

    @Getter @Setter
    private String studentOrSinglePerson; // öğrenciye, bekara

    @Getter @Setter
    private String front; // ev cephesi (kuzey, güney vs)

    @Getter @Setter
    private String inTheSite; // site içerisinde mi?

    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "JSON")
    @Getter @Setter
    private List<String> internal; //iç özellik

    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "JSON")
    @Getter @Setter
    private List<String> external; //dış özellik

    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "JSON")
    @Getter @Setter
    private List<String> location; //lokasyon
    
    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "JSON")
    @Getter @Setter
    private List<String> advertPictures;

    @Getter @Setter
    private Boolean validate;

    @Getter @Setter
    private Double latitude;

    @Getter @Setter
    private Double longitude;

    

}
