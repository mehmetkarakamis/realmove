package user.users.entity;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.JoinColumn;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@NoArgsConstructor
public class UserEntity implements Serializable {

    private static final long serialVersionUID = 8882427859606210097L;

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Getter @Setter
    private long id;

    @Column(nullable = false, length = 120, unique = true)
    @Getter @Setter
    private String email;
    
    @Column(nullable = false, unique = true)
    @Getter @Setter
    private String userId;

    @Column(nullable = false, unique = true)
    @Getter @Setter
    private String encryptedPassword;

    @Column(nullable = false)
    @Getter @Setter
    private boolean isEnabled;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
            )
    @Getter @Setter
    private Set<RoleEntity> roles;

    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinColumn(name= "id")
    @Getter @Setter
    private UserDetailEntity userDetail;
    
}