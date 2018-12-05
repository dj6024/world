from django.conf.urls import url

from tao import views

urlpatterns = [
    # 首页
    url(r'^$', views.index, name='index'),
    # 注册
    url(r'^register/$', views.register, name='register'),
    # 退出登录
    url(r'^quit/$', views.quit, name='quit'),
    # 登录
    url(r'^login/$', views.login, name='login'),


]


