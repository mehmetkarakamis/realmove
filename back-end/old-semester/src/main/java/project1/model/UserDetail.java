package project1.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "user_info_detail")
public class UserDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long userDetailId;

    @Column(name="type")
    private String type;

    @Column(name="full_name")
    private String fullName;

    @Column(name="phone_number")
    private String phoneNumber;

    @Column(name="profile_picture")
    private String profilePicture;

    @JsonIgnoreProperties("userDetail")
    @OneToOne(mappedBy = "userDetail", cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private User user;

    public UserDetail(){

    }

    public UserDetail(String type, String fullName, String phoneNumber, String profilePicture, User user) {
        this.type = type;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.profilePicture = profilePicture;
        this.user = user;
    }

    public Long getUserDetailId() {
        return userDetailId;
    }

    public void setUserDetailId(Long userDetailId) {
        this.userDetailId = userDetailId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
