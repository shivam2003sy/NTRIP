# Generated by Django 4.0.1 on 2023-12-19 15:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0011_client_server_remove_casterrooms_client_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='client',
            name='name',
        ),
        migrations.RemoveField(
            model_name='server',
            name='name',
        ),
        migrations.AlterField(
            model_name='client',
            name='ip',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='server',
            name='ip',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
