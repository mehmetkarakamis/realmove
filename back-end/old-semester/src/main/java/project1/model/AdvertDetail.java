package project1.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "advert_details")
@NoArgsConstructor
@AllArgsConstructor
public class AdvertDetail {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter
    private int id;

    @Getter @Setter
    private String keyword; //otopark/bahçeli.

    @Getter @Setter
    private String type; //iç özellik, dış özellik

    @Getter @Setter
    @JsonIgnoreProperties("advertsDetails")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="advert_id", nullable=false)
    private Advert advert;

}
