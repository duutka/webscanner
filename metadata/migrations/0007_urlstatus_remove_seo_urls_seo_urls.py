# Generated by Django 4.0.4 on 2022-06-08 01:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('metadata', '0006_remove_seo_seoanalyze_alter_injection_sql_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='UrlStatus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.IntegerField(verbose_name='Статус')),
                ('url', models.TextField(verbose_name='URL')),
            ],
        ),
        migrations.RemoveField(
            model_name='seo',
            name='urls',
        ),
        migrations.AddField(
            model_name='seo',
            name='urls',
            field=models.ManyToManyField(to='metadata.urlstatus', verbose_name='Внешние ссылки'),
        ),
    ]
