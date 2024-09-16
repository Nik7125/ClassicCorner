from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework import generics
from .models import Item
from .serializers import ItemSerializer, ProfileSerializer

# View to add a new item
class ItemCreateView(generics.CreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
# View to list all items
class ItemListView(generics.ListAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class ItemUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class ItemDeleteView(generics.DestroyAPIView):
    queryset = Item.objects.all()
    lookup_field = 'pk'    

@api_view(['POST'])
def profile_view(request):
    username = request.data.get('username')  # assuming the username is passed in the request body
    try:
        user = User.objects.get(username=username)
        profile_serializer = ProfileSerializer(user)
        
        items = Item.objects.filter(owner=username)
        items_serializer = ItemSerializer(items, many=True)
        
        return Response({
            'profile': profile_serializer.data,
            'items': items_serializer.data
        }, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    confirm_password = request.data.get('confirm_password')
    email = request.data.get('email')
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    terms_agreed = request.data.get('terms_agreed', False)

    if password != confirm_password:
        return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
    
    if not terms_agreed:
        return Response({'error': 'You must agree to the terms and conditions'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already taken'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(
        username=username,
        password=password,
        email=email,
        first_name=first_name,
        last_name=last_name
    )
    return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)