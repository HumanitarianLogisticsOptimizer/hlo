# Generated by Django 4.2.9 on 2024-03-03 16:43

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("aid", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="adcaid",
            name="demanded_stock",
            field=models.IntegerField(default=100, verbose_name="Demanded Stock"),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="adcaid",
            name="standard_stock",
            field=models.IntegerField(default=1, verbose_name="Standard Stock"),
            preserve_default=False,
        ),
    ]