from rest_framework import serializers
from .models import materials

class materialsSerializer(serializers.ModelSerializer):
    class Meta:
        model = materials
        fields = '__all__'

class materialsSerializerOnlyTitle(serializers.ModelSerializer):
    class Meta:
        model = materials
        fields = ('title',)