from django.urls import re_path 
from . import consumers

websocket_urlpatterns = [
    # re_path(r'^ws/(?P<mount_point>\w+)?/(?P<room_name>\w+)/$', consumers.ServerConnection.as_asgi())
    re_path(r'^ws/(?P<room_name>\w+)/$', consumers.ServerConnection.as_asgi())
]