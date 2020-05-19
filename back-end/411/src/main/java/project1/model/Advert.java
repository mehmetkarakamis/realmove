package project1.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "adverts")
@NoArgsConstructor
@AllArgsConstructor
public class Advert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter
    private int id;

    @Getter @Setter
    private String title;

    @Getter @Setter
    private double price;

    @Getter @Setter
    private String description;

    @Getter @Setter
    @Temporal(value = TemporalType.DATE)
    private Date date;

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
    @JsonIgnoreProperties("advert")
    @OneToMany(mappedBy="advert", fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private Set<AdvertDetail> advertDetails;

    @Getter @Setter
    @JsonIgnoreProperties("advert")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // ilanı ekleyen kullanıcı

    @Getter @Setter
    @JsonIgnoreProperties("advert")
    @OneToMany(mappedBy="advert", fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private Set<AdvertPicture> advertPictures;


}
