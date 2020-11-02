package user.users.validator;

import user.users.model.UserRequestModel;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;


public class PasswordsEqualConstraintValidator implements ConstraintValidator<PasswordsEqualConstraint, Object> {



    @Override
    public void initialize(PasswordsEqualConstraint arg0) {

    }

    @Override
    public boolean isValid(Object candidate, ConstraintValidatorContext constraintValidatorContext) {
        UserRequestModel user = (UserRequestModel) candidate;
        return user.getPassword() != null && user.getPasswordRepeat() != null && user.getPassword().equals(user.getPasswordRepeat());
    }

}