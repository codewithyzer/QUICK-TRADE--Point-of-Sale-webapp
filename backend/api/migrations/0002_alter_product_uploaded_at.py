# Generated by Django 5.2 on 2025-04-15 08:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='uploaded_at',
            field=models.DateField(auto_now_add=True),
        ),
    ]
