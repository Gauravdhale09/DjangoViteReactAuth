from django.shortcuts import render, redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework import status
from django.contrib.auth.decorators import login_required
from .models import materials
from .serializers import materialsSerializer
from django.utils import timezone
from django.urls import reverse

@api_view(['GET'])
@login_required
def materials_list(request, *args, **kwargs):
    all_materials = materials.objects.all()
    serializer = materialsSerializer(all_materials, many=True)
    
    return Response({'all_materials': serializer.data})
    #return render(request, 'materials/index.html',{'all_materials':serializer.data})
    
@api_view(['GET','POST'])
# @login_required(login_url='/login/')
def create_material(request, *args, **kwargs):
    if request.method == 'POST':
        material = request.POST.get('title')
        material_status = request.POST.get('status')
        created_by = request.user.username
        if not created_by:
            created_by = 'dhale.gaurav'
        created_at = timezone.now()
        serializer = materialsSerializer(data={'title':material, 'status' : material_status, 'created_by' : created_by, 'created_at' : created_at})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return render(request, 'materials/create.html',{})


@api_view(['GET', 'DELETE'])
# @login_required(login_url='/login/')
def delete_material(request, pk, *args, **kwargs):
    try:
        material = materials.objects.get(title=pk)
    except materials.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    material.delete()
    return redirect(reverse('materials-list')) 
    

@api_view(['GET', 'POST'])
# @login_required(login_url='/login/')
def update_material(request, pk, *args, **kwargs):
    try:
        get_material = materials.objects.get(title=pk)
        get_material_serialized = materialsSerializer(get_material)
    except materials.DoesNotExist:
        get_material = None
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'POST':
        material = request.POST.get('title')
        material_status = request.POST.get('status')
        serializer = materialsSerializer(get_material, data={'title':material, 'status' : material_status, 'updated_at':timezone.now()}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    context = {
        'material_to_edit': get_material_serialized.data
    }
    return Response(context, status=status.HTTP_202_ACCEPTED)
    #return render(request, 'materials/edit.html', context=context)

