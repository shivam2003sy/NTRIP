# Generated by Django 4.0.1 on 2023-12-19 07:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0006_casterrooms_client_casterrooms_server_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='connections',
            name='channel',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='chat.casterrooms'),
        ),
        migrations.AddField(
            model_name='serverbasestation',
            name='altitude',
            field=models.FloatField(default=0.0),
        ),
        migrations.AddField(
            model_name='serverbasestation',
            name='latitude',
            field=models.FloatField(default=0.0),
        ),
        migrations.AddField(
            model_name='serverbasestation',
            name='longitude',
            field=models.FloatField(default=0.0),
        ),
    ]
