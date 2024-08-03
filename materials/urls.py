from django.urls import path
from . import views
urlpatterns = [
    path('',views.materials_list, name='materials-list'),
    path('create-material/', views.create_material, name='material-create'),
    path('delete=<pk>/', views.delete_material, name='material-delete'),
    path('Update=<pk>/', views.update_material, name='material-update'),
]