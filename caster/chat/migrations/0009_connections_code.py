# Generated by Django 4.0.1 on 2023-12-19 10:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0008_connections_approved'),
    ]

    operations = [
        migrations.AddField(
            model_name='connections',
            name='code',
            field=models.CharField(blank=True, editable=False, max_length=5, null=True),
        ),
    ]
