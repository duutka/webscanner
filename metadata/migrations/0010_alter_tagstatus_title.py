# Generated by Django 4.0.4 on 2022-06-08 01:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('metadata', '0009_tagstatus_seo_tags'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tagstatus',
            name='title',
            field=models.BooleanField(verbose_name='Тег title'),
        ),
    ]
