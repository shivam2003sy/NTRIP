# Generated by Django 4.0.1 on 2023-12-19 16:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0013_alter_server_altitude'),
    ]

    operations = [
        migrations.AlterField(
            model_name='server',
            name='latitude',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='server',
            name='longitude',
            field=models.FloatField(default=0),
        ),
    ]
