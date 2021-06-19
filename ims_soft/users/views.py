from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login

from .forms import UserRegisterForm, ProfileForm
from .models import Profile


def signup_view(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            new_user = form.save()
            messages.success(
                request, f'Your account has been created! You can now customize your profile')
            new_user = authenticate(username=form.cleaned_data['username'],
                                    password=form.cleaned_data['password1'],
                                    )
            login(request, new_user)
            return redirect('users:profile')
    else:
        form = UserRegisterForm()

    context = {
        'header': 'Create New Account',
        'form': form
    }

    return render(request, 'users/signup.html', context)


@login_required
def profile_view(request):
    obj = Profile.objects.get(user=request.user)
    form = ProfileForm(request.POST or None, request.FILES, instance=obj)
    if request.is_ajax():
        if form.is_valid():
            print("valid")
            instance = form.save()
            return JsonResponse({
                'user': instance.user.username,
                'email': instance.email,
                'phone': instance.phone,
                'first_name': instance.first_name,
                'last_name': instance.last_name,
                'address': instance.address,
                'city': instance.city,
            })
    context = {
        'section_title': 'Users',
        'title': 'Profile',
        'obj': obj,
        'form': form,
    }

    return render(request, 'users/main.html', context)
