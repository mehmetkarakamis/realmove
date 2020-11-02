package project1.validator;




import project1.DTO.UserDTO;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;


public class PasswordsEqualConstraintValidator implements ConstraintValidator<PasswordsEqualConstraint, Object> {



    @Override
    public void initialize(PasswordsEqualConstraint arg0) {

    }

    @Override
    public boolean isValid(Object candidate, ConstraintValidatorContext constraintValidatorContext) {
        UserDTO user = (UserDTO) candidate;
        return user.getPassword() != null && user.getPasswordRepeat() != null && user.getPassword().equals(user.getPasswordRepeat());
    }

}