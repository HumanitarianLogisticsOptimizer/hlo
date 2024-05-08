# Generated by Django 4.2.9 on 2024-04-17 13:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("aid", "0005_alter_accaid_options_alter_adcaid_options"),
    ]

    operations = [
        migrations.CreateModel(
            name="AidType",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=100, verbose_name="Name")),
            ],
            options={
                "verbose_name": "Aid Type",
            },
        ),
        migrations.AlterField(
            model_name="accaid",
            name="type",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="acc_aids",
                to="aid.aidtype",
                verbose_name="Aid Type",
            ),
        ),
        migrations.AlterField(
            model_name="adcaid",
            name="type",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="adc_aids",
                to="aid.aidtype",
                verbose_name="Aid Type",
            ),
        ),
    ]