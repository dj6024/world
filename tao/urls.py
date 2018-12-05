from django.conf.urls import url

from tao import views

urlpatterns = [
    # 首页
    url(r'^$', views.index, name='index'),

]


