package user.users.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import user.users.converter.StringListConverter;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "user_details")
@NoArgsConstructor
public class UserDetailEntity implements Serializable {

    private static final long serialVersionUID = 1474158446218904169L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter
    private Long id;

    @Getter @Setter
    private String fullName;

    @Getter @Setter
    private String phoneNumber;

    @Getter @Setter
    private String profilePicture;

    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "JSON")
    @Getter @Setter
    private List<String> favorites;

    @JsonIgnoreProperties("userDetail")
    @OneToOne(mappedBy = "userDetail", cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @Getter @Setter
    private UserEntity user;

}
