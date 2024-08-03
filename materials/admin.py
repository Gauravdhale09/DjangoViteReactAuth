from django.contrib import admin
from .models import materials

class materialAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'created_at', 'created_by', 'updated_at')
    search_fields = ('title', )
    list_filter = ('title', )
    ordering = ('created_at',)
    fields = ('title', 'status', 'created_at', 'created_by')

admin.site.register(materials, materialAdmin)
