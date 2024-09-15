from django.db import models

# Create your models here.
class Item(models.Model):
    name = models.CharField(max_length=255)
    year_of_manufacturing = models.IntegerField()
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='item_images/')
    category = models.CharField(max_length=100, default="Unspecified")
    owner = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name
