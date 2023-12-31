from functools import partial
from multiprocessing.connection import Client
from django.shortcuts import render
from rest_framework.views import APIView,View
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView,ListCreateAPIView
from rest_framework import status

from chat.models import CasterRooms, ClientRover, ServerBaseStation, Connections
from chat.tasks import add
from chat.utils import get_coordinates
from .serializers import BaseStationSerializer, CasterRoomSerializers, ClientRoverSerializer, ConnectionSerializers , UserRegistrationSerializer
from django.db.models import Func, F, FloatField, Value
from django.db.models.expressions import RawSQL
from django.http import JsonResponse



from .serializers import BaseStationSerializer, CasterRoomSerializers, ClientRoverSerializer, ConnectionSerializers



from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login,models
from .forms import LoginForm



# Create your views here.

def lobby(request):
    add.delay()
    print("Herapheri")
    return render(request, 'chat/lobby.html')

def index(request):
    return render(request, 'chat/index.html')



def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            

            # check super User 
            user = models.User.objects.filter(username=username , is_superuser=True).first()
            print(user)
            if user is None:
                return render(request, 'chat/login.html', {'form': form})
            if user is not None:
                login(request, user)
                return redirect('index')
    else:
        form = LoginForm()

    return render(request, 'chat/login.html', {'form': form})

# apis
class AllBaseStations(View):
    def get(self,request,*args, **kwargs):
        data = ServerBaseStation.objects.all()
        return Response(data,200)

class AddBaseStation(ListCreateAPIView):
    queryset = ServerBaseStation.objects.all()
    serializer_class = BaseStationSerializer
    
class AddClient(ListCreateAPIView):
    queryset = ClientRover.objects.all()
    serializer_class = ClientRoverSerializer
    
    def perform_create(self, serializer):
        data = self.request.data
        caster_id  = data["mountPoint"]
        CasterRooms.objects.create(name=caster_id)
        return super().perform_create(serializer)
class ConnectBaseStationWithCaster(APIView): 
    def post(self,request,*args, **kwargs):
        data = request.data
        serl = ConnectionSerializers(data=data,partial=True)
        if serl.is_valid():
            serl.save()
            return Response(serl.data,200)
        return Response(serl.errors,400)

class GetAvailableCaster(ListCreateAPIView):
    queryset = CasterRooms.objects.all()
    serializer_class = CasterRoomSerializers
    
class GetDataForAClient(APIView):
    #todo : Here main logic has to be implemented during hackathon
    def get(request,self,mountPoint,*args, **kwargs):
        print(mountPoint)
        client= ClientRover.objects.get(mountPoint=mountPoint)
        coordinates = get_coordinates(client)
        return Response({"corrections": coordinates},200)



def get_distance(lat1,lon1,lat2,lon2):
    return ((lat1-lat2)**2 + (lon1-lon2)**2)**0.5






class GetNearestBaseStation(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        lat = float(data["lat"])
        lon = float(data["lon"])
        print("Location Received", lat, lon)

      
        queryset = ServerBaseStation.objects.annotate(
            distance=RawSQL(
                "6371 * acos(cos(radians(%s)) * cos(radians(latitude)) * cos(radians(longitude) - radians(%s)) + sin(radians(%s)) * sin(radians(latitude)))",
                (lat, lon, lat),
                output_field=FloatField(),
            )
        )

      
        queryset = queryset.order_by("distance")

        
        serializer = BaseStationSerializer(queryset, many=True)  
        return JsonResponse(serializer.data, safe=False)



    
class UserRegistrationView(CreateAPIView):
    serializer_class = UserRegistrationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({'user': serializer.data, 'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)

def allRequestsForApproval(request):
    all_requests = Connections.objects.filter(approved=False)
    data = ConnectionSerializers(data=all_requests,many=True).data
    print(data)
    return render(request,"chat/approve.html",context={
        "data" : data
    })
    
def allMountPoints(request):
    all_mp = Connections.objects.all()
    data = ConnectionSerializers(data=all_mp,many=True).data
    print(data)
    return render(request,"chat/approve.html",context={
        "data" : data
    })
    
class GetAllMountPoints(ListCreateAPIView):
    queryset = CasterRooms.objects.all()
    serializer_class = CasterRoomSerializers
    
class SendConnectionRequest(APIView):
    def post(self,request,*args, **kwargs):
        seril = ConnectionSerializers(data=request.data,partial=True)
        if seril.is_valid():
            seril.save()
            return Response(seril.data,200)
        return Response(seril.errors,400)
# class GetStatusOfConnection(APIView):
    # def get(self,request,pk,*args, **kwargs):
        # stats = Connections.objects.get()
def getAllClients(request):
    cr = ClientRover.objects.all()
    data = ClientRoverSerializer(cr)
    print(data)
    return render("chat/control.html",data=data)
