package user.users.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "conversations")
@NoArgsConstructor
public class ConversationEntity implements Serializable {

    private static final long serialVersionUID = 1112427859606210097L;

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Getter @Setter
    private Long id;

    @Column(nullable = false, unique = true)
    @Getter @Setter
    private String conversationId;

    @Column(nullable = false)
    @Getter @Setter
    private String advertId;

    @Column(nullable = false)
    @Getter @Setter
    private String fromUserId;

    @Column(nullable = false)
    @Getter @Setter
    private String toUserId;
    
    @Getter @Setter
    @OneToMany(mappedBy = "conversation", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<MessageEntity> messageList;

}