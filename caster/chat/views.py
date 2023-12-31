
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView,UpdateAPIView
from rest_framework.views import APIView
from rest_framework import status
from .serializers import  UserRegistrationSerializer , ServerLocationSerializer
from .models import Server
class UserRegistrationView(CreateAPIView):
    serializer_class = UserRegistrationSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        # create  a server for the user
        serverserializer = ServerLocationSerializer(data={
            'User':user.id
              })
        serverserializer.is_valid(raise_exception=True)
        server = serverserializer.save()
        print(server)
        print(user)
        return Response({'user': serializer.data,
                         "server": serverserializer.data,
                    'message': 'User registered successfully server Setup Comleted'}, status=status.HTTP_201_CREATED)
    
# Class Based Views to get Location from form and send it to the server
class ServerLocationView(APIView):
    serializer_class = ServerLocationSerializer
    def patch(self, request, *args, **kwargs):
        request.data['User'] = request.user
        serializer = self.serializer_class(data=request.data,partial=True)
        serializer.is_valid(raise_exception=True)
        server = serializer.save()
        print(server)
        return Response({'server': serializer.data, 'message': 'Server registered successfully'}, status=status.HTTP_201_CREATED)
    
class UpdateServerCoordinates(UpdateAPIView):
    queryset = Server.objects.all()
    serializer_class = ServerLocationSerializer
    lookup_url_kwarg = 'id'
