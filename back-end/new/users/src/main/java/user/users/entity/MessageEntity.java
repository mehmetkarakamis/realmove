package user.users.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

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
    private Long id;

    @Column(nullable = false, unique = true)
    @Getter @Setter
    private String messageId;

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