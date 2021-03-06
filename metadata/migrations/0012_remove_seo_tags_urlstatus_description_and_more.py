# Generated by Django 4.0.4 on 2022-06-11 17:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('metadata', '0011_tagstatus_description_tagstatus_keywords_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='seo',
            name='tags',
        ),
        migrations.AddField(
            model_name='urlstatus',
            name='description',
            field=models.BooleanField(null=True, verbose_name='Тег description'),
        ),
        migrations.AddField(
            model_name='urlstatus',
            name='keywords',
            field=models.BooleanField(null=True, verbose_name='Тег keywords'),
        ),
        migrations.AddField(
            model_name='urlstatus',
            name='title',
            field=models.BooleanField(null=True, verbose_name='Тег title'),
        ),
        migrations.AlterField(
            model_name='seo',
            name='urls',
            field=models.ManyToManyField(to='metadata.urlstatus', verbose_name='Сканирование ссылок'),
        ),
        migrations.AlterField(
            model_name='urlstatus',
            name='status',
            field=models.TextField(null=True, verbose_name='Статус'),
        ),
        migrations.DeleteModel(
            name='TagStatus',
        ),
    ]
