# Generated by Django 4.0.4 on 2022-06-05 10:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('metadata', '0003_alter_seo_seoanalyze'),
    ]

    operations = [
        migrations.CreateModel(
            name='Port',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('protocol', models.TextField(verbose_name='Протокол')),
                ('port', models.IntegerField(verbose_name='Номер порта')),
                ('service', models.TextField(verbose_name='Сервис')),
                ('state', models.TextField(verbose_name='Статус')),
            ],
            options={
                'verbose_name': 'Порт хоста',
                'verbose_name_plural': 'Порты хоста',
            },
        ),
        migrations.CreateModel(
            name='Host',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('host', models.TextField(verbose_name='Хост')),
                ('status', models.TextField(verbose_name='Статус хоста')),
                ('ports', models.ManyToManyField(to='metadata.port', verbose_name='Порты')),
            ],
            options={
                'verbose_name': 'Хост',
                'verbose_name_plural': 'Хосты',
            },
        ),
        migrations.AddField(
            model_name='scanner',
            name='hosts',
            field=models.ManyToManyField(to='metadata.host', verbose_name='Результаты сканирования хостов'),
        ),
    ]
