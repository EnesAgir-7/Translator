from django.db import models

# Create your models here.
class Text(models.Model):
    inputText = models.CharField(max_length=500)
    outputText = models.CharField(max_length=500)
    
    def __str__(self):
        return self.inputText