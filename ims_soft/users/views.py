from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User

from .forms import CompanyForm, UserRegisterForm, ProfileForm
from .models import Profile, Company
from.utils import get_company_form

def signup_view(request):
    staff_count = User.objects.filter(is_staff=True).count()
    company_form = CompanyForm(request.POST or None)
    if staff_count <= 2:
        if request.is_ajax():
            company_form = get_company_form(company_form)
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            if staff_count <= 1:
                new_user = form.save(commit=False)
                new_user.is_staff = True
                new_user = form.save()
            else:
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
        'form': form,
        'staff_count': staff_count,
        'company_form': company_form
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


@login_required
def company_view(request):
    obj = Company.objects.first()
    form = CompanyForm(request.POST or None, instance=obj)
    if request.is_ajax():
        if form.is_valid():
            instance = form.save()
            return JsonResponse({
                'name': instance.name,
                'product_key': instance.product_key,
                'email': instance.email,
                'phone': instance.phone,
                'address': instance.address,
                'web_url': instance.web_url
            })
    context = {
        'section_title': 'Settings',
        'title': 'Company',
        'obj': obj,
        'form': form
    }
    return render(request, 'users/company.html', context)
