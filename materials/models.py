from django.db import models

class materials(models.Model):
    title = models.CharField(max_length=255, null=False, unique=True)
    status = models.BooleanField(null=False)
    created_by = models.CharField(max_length=255, null=False)
    created_at = models.DateTimeField(null=False)
    updated_at = models.DateTimeField(default=None, null=True, blank=True)

    class Meta:
        db_table = 'materials'
    def __str__(self):
        return self.title