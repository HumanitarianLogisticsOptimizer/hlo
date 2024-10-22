# Generated by Django 4.2.9 on 2024-05-05 11:51

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("logistics", "0004_enterprisetask_load_quantity_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="volunteertask",
            name="code",
            field=models.CharField(default="0", editable=False, max_length=6, unique=True, verbose_name="Task Code"),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="volunteertask",
            name="done",
            field=models.BooleanField(default=False, verbose_name="Task Completed"),
        ),
    ]
