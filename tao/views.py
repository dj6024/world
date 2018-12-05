import hashlib
import random
import time

from django.shortcuts import render, redirect

# Create your views here.
from tao.models import User


def index(request):
    return render(request, 'index.html')


def generate_token():
    # token = str(time.time()) + str(random.random())
    # md5 = hashlib.md5()
    # md5.update(token.encode('utf_8'))
    # return md5.hexdigest()
    pass


# 注册　
def register(request):
    if request.method == 'GET':
        return render(request, 'register.html')
    elif request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        print(username, password, 1111111111111111111)

        user = User()
        user.username = username
        user.password = password
        user.save()
    return redirect('tao:index')



# 退出登录
def quit(request):
    pass


# 登录
def login(request):
    return render(request, 'login.html')


