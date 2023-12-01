from django.shortcuts import render, redirect
from .forms import MechanicRegistrationForm

def mechanic_registration_view(request):
    if request.method == 'POST':
        form = MechanicRegistrationForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            # Redirect after successful registration
            return redirect('success_url_name')  # Replace 'success_url_name' with your desired URL
    else:
        form = MechanicRegistrationForm()
    return render(request, 'registration/mechanic_registration.html', {'form': form})
