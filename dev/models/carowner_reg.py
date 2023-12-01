from django import forms
from .models import User  # Import your custom User model

class CarOwnerRegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    confirm_password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('full_name', 'username', 'password', 'confirm_password', 'address', 'type_of_car', 'email', 'phone_number')

    def clean_confirm_password(self):
        # Check if the passwords match
        password = self.cleaned_data.get('password')
        confirm_password = self.cleaned_data.get('confirm_password')
        if password and confirm_password and password != confirm_password:
            raise forms.ValidationError("Passwords do not match.")
        return confirm_password

    def save(self, commit=True):
        user = super(CarOwnerRegistrationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user

