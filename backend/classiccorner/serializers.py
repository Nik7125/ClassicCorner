from rest_framework import serializers
from .models import Item

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'name', 'year_of_manufacturing', 'description', 'price', 'image', 'category', 'owner']
