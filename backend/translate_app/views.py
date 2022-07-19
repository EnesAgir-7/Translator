from django.shortcuts import render

# Create your views here.
from django.http.response import Http404
from django.shortcuts import render
from rest_framework.views import APIView
from .models import Text
from .serializers import TextSerializer
from rest_framework.response import Response

class TextAPIView(APIView):    
    def get_object(self, pk):
        try:
            return Text.objects.get(pk=pk)
        except Text.DoesNotExist:
            raise Http404

    def get(self, request, pk=None, format=None):
        if pk:
            data = self.get_object(pk)
            serializer = TextSerializer(data)

        else:
            data = Text.objects.all()
            serializer = TextSerializer(data, many=True)

        return Response(serializer.data)
        
    def post(self, request, format=None):
        data = request.data
        serializer = TextSerializer(data=data)

        # Check if the data passed is valid
        serializer.is_valid(raise_exception=True)

        # Create Text in the DB
        serializer.save()

        # Return Response to User

        response = Response()

        response.data = {
            'message': 'Text Created Successfully',
            'data': serializer.data
        }

        return response
    
    def put(self, request, pk=None, format=None):
        # Get the Text to update
        text_to_update = Text.objects.get(pk=pk)

        # Pass the instance to update to the serializer, and the data and also partial to the serializer
        # Passing partial will allow us to update without passing the entire Text object
        serializer = TextSerializer(instance=text_to_update,data=request.data, partial=True)

        serializer.is_valid(raise_exception=True)
        serializer.save()
        response = Response()

        response.data = {
            'message': 'Text Updated Successfully',
            'data': serializer.data
        }

        return response
    
    def delete(self, request, pk, format=None):
        text_to_delete =  Text.objects.get(pk=pk)

        # delete the text
        text_to_delete.delete()

        return Response({
            'message': 'Text Deleted Successfully'
        })
    
    