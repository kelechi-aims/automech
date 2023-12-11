from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        usertype = request.POST.get('usertype')  # Fetch the selected login type
        
        # Determine the user model based on the selected login type
        if usertype == 'mechanic':
            user = authenticate(username=username, password=password)
            # Handle mechanic login logic (replace 'mechanic_profile' with actual URL name)
            if user is not None:
                login(request, user)
                return redirect('mechanic_profile')  # Redirect to mechanic profile
            else:
                return render(request, 'login.html', {'error_message': 'Invalid credentials'})
        elif usertype == 'user':
            # Handle car owner login logic (replace 'user_profile' with actual URL name)
            # Similar logic as above for car owner login
            pass  # Implement your car owner login logic here
            
    return render(request, 'login.html')
