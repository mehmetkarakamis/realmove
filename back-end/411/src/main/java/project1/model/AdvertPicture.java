package project1.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "advert_picture")
@NoArgsConstructor
@AllArgsConstructor
public class AdvertPicture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    private int id;

    @Getter @Setter
    private String pictureUrl;

    @Getter @Setter
    @JsonIgnoreProperties("advertPictures")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="advert_id", nullable=false)
    private Advert advert;

}
