package user.users.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

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

    @Column(nullable = false)
    @Getter @Setter
    private String userId;

    @Column(nullable = false)
    @Getter @Setter
    private String content;

    @Getter @Setter
    @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private Date dateTime;

    @Getter @Setter
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="conversation_id", nullable=false)
    private ConversationEntity conversation;
}