from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import register
from .views import ItemCreateView, ItemListView, ItemUpdateView, ItemDeleteView
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api/register/', register, name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/items/add/', ItemCreateView.as_view(), name='item-create'),
    path('api/items/', ItemListView.as_view(), name='item-list'),
    path('api/profile/', views.profile_view, name='profile'),
    path('api/items/<int:pk>/', ItemUpdateView.as_view(), name='item-update'),
    path('api/items/<int:pk>/delete/', ItemDeleteView.as_view(), name='item-delete'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
