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
@Table(name = "messages")
@NoArgsConstructor
public class MessageEntity implements Serializable {

    private static final long serialVersionUID = 8882427859606210097L;

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Getter @Setter
    private long id;

    @Column(nullable = false, length = 120, unique = true)
    @Getter @Setter
    private Long fromUserId;
    
    @Column(nullable = false, unique = true)
    @Getter @Setter
    private Long toUserId;

    @Column(nullable = false)
    @Getter @Setter
    private String content;

    @Column(nullable = false)
    @Getter @Setter
    private Long advertId;
}