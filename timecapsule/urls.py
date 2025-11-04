"""
URL configuration for timecapsule project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from timecapsule_app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('how-it-works/', views.how_it_works, name='how_it_works'),
    path('notification/', views.notification_page, name='notification'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('create-capsule/', views.create_capsule, name='create_capsule'),
    path('delete-capsule/<int:capsule_id>/', views.delete_capsule, name='delete_capsule'),
    path('get-capsules/', views.get_capsules, name='get_capsules'),
    path('save-token/', views.save_notification_token, name='save_token'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
