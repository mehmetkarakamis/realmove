package user.users.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "email_confirmation")
@NoArgsConstructor
public class ConfirmationTokenEntity implements Serializable {

    private static final long serialVersionUID = -4915397749144891026L;

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Getter @Setter
    private long tokenId;

    @Getter @Setter
    private String confirmationToken;

    @Temporal(TemporalType.TIMESTAMP)
    @Getter @Setter
    private Date createdDate;

    @OneToOne(targetEntity = UserEntity.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    @Getter @Setter
    private UserEntity userEntity;

    public ConfirmationTokenEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
        this.createdDate = new Date();
        this.confirmationToken = UUID.randomUUID().toString();
    }
    
}