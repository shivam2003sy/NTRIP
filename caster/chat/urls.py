from django.urls import path 
from . import views 
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # path('', views.index , name='index'),
    # path('login/', views.login_view, name='login'),
    # path('create-client/', views.AddClient.as_view()),
    # path('base-stations/', views.AddBaseStation.as_view()),
    # path('connect-base-station/', views.ConnectBaseStationWithCaster.as_view()),
    # path('get-casters/', views.GetAvailableCaster.as_view()),
    # path('get-corrections/<str:mountPoint>', views.GetDataForAClient.as_view()),
    # path('NearestBaseStation', views.GetNearestBaseStation.as_view()),
    path('rover/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register-client', views.UserRegistrationView.as_view(), name='token_refresh'),
    path('update-server-coordinates/<str:id>', views.UpdateServerCoordinates.as_view(), name='svc'),

    # path('get-all-mount', views.GetAllMountPoints.as_view(), name='token_refresh'),
    

    # path('registerserver', views.ServerLocationView.as_view(), name='registerserver'),
]