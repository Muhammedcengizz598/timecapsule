from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import TimeCapsule
from datetime import datetime
from django.utils import timezone
import json

def index(request):
    return render(request, 'home.html')

def how_it_works(request):
    return render(request, 'how_it_works.html')

@login_required
def dashboard(request):
    capsules = TimeCapsule.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'dashboard.html', {'capsules': capsules})

def notification_page(request):
    return render(request, 'notification.html')

@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)
        
        user = User.objects.create_user(username=username, email=email, password=password)
        login(request, user)
        return JsonResponse({'success': True})
    
    return JsonResponse({'error': 'Invalid request'}, status=400)

@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)
    
    return JsonResponse({'error': 'Invalid request'}, status=400)

def logout_user(request):
    logout(request)
    return redirect('index')

@csrf_exempt
@login_required
def create_capsule(request):
    if request.method == 'POST':
        message = request.POST.get('message')
        open_date = request.POST.get('open_date')
        notification_token = request.POST.get('notification_token')
        
        audio_file = request.FILES.get('audio')
        image_file = request.FILES.get('image')
        video_file = request.FILES.get('video')
        
        capsule = TimeCapsule.objects.create(
            user=request.user,
            message=message,
            audio_file=audio_file,
            image_file=image_file,
            video_file=video_file,
            open_date=open_date,
            notification_token=notification_token
        )
        
        return JsonResponse({
            'success': True,
            'open_date': open_date,
            'capsule_id': capsule.id
        })
    
    return JsonResponse({'error': 'Invalid request'}, status=400)

@csrf_exempt
@login_required
def delete_capsule(request, capsule_id):
    if request.method == 'POST':
        try:
            capsule = TimeCapsule.objects.get(id=capsule_id, user=request.user)
            
            # Delete associated media files
            if capsule.audio_file:
                capsule.audio_file.delete()
            if capsule.image_file:
                capsule.image_file.delete()
            if capsule.video_file:
                capsule.video_file.delete()
            
            capsule.delete()
            return JsonResponse({'success': True, 'message': 'Capsule deleted successfully'})
        except TimeCapsule.DoesNotExist:
            return JsonResponse({'error': 'Capsule not found'}, status=404)
    return JsonResponse({'error': 'Invalid request method'}, status=400)

@login_required
def get_capsules(request):
    capsules = TimeCapsule.objects.filter(user=request.user)
    data = []
    for capsule in capsules:
        data.append({
            'id': capsule.id,
            'message': capsule.message,
            'open_date': capsule.open_date.isoformat(),
            'created_at': capsule.created_at.isoformat(),
            'is_opened': capsule.is_opened,
            'has_audio': bool(capsule.audio_file),
            'has_image': bool(capsule.image_file),
            'has_video': bool(capsule.video_file),
        })
    return JsonResponse({'capsules': data})

@csrf_exempt
def save_notification_token(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        token = data.get('token')
        request.session['notification_token'] = token
        return JsonResponse({'success': True})
    return JsonResponse({'error': 'Invalid request'}, status=400)
