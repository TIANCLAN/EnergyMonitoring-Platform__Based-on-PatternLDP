# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
import base64
import os
import random
from dataclasses import dataclass

from flask import Flask
from flask import request, redirect, url_for, session, g
from flask import render_template
from flask import jsonify
from werkzeug.utils import secure_filename

from utils import do_status_class

import patternLDP
import utils
import numpy as np

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
app.config['SECRET_KEY'] = 'sdfklas0lk42j'

@app.route("/")
def indexPage():
    if not g.user:
        return redirect(url_for('sign_in'))
    # Use a breakpoint in the code line below to debug your script.
    data = utils.get_trainning_data()
    # print(data)
    return render_template("index2.html", data=data) # Press Ctrl+F8 to toggle the breakpoint.




@dataclass
class User:
    id: int
    username: str
    password: str

users = [
    User(1, "admin", "123456"),
    User(2, "eason", "123456"),
    User(3, "echo", "123456"),
]
@app.before_request
def before_request():
    g.user = None
    if 'user_id' in session:
        user = [u for u in users if u.id == session['user_id']][0]
        g.user = user

@app.route("/sign_in", methods = ['GET', 'POST'])
def sign_in():
    if request.method == 'POST':
        session.pop('user_id', None)
        username = request.form.get("username", None)
        password = request.form.get("password", None)
        user = [u for u in users if u.username == username]
        if len(user) > 0:
            user = user[0]
        if user and user.password == password:

            session['user_id'] = user.id
            return redirect(url_for('indexPage'))

    return render_template('sign_in.html')

@app.route("/logout")
def logout():
    session.pop("user_id", None)
    return redirect(url_for('sign_in'))

@app.route("/", methods=['POST'])
def add_train():
    appliance = request.form.get("example-text-input")
    model = request.form.get('Trainning_model')
    clientNo = request.form.get('clientNo')
    time = request.form.get('trainTime')
    value = random.randint(501,6000)
    status = "Running"
    sql = f"insert into training (appliance_name, model, No, status, created_time, predict_value) values ('{appliance}', '{model}', '{clientNo}', '{status}', '{time}', {value})"               #'f'支持 '{变量}'格式
    utils.insert_or_update_data(sql)
    data = utils.get_trainning_data()
    return render_template("index2.html", data=data)

## 单个用电器的总数据
@app.route("/r1")
def get_r1_data():
    data = utils.get_r1_data()
    return jsonify({"fridge":data[0],"dish_washer":data[1],"sockets":data[2],"light":data[3],
                    "microwave":data[4],"electric_space_heater":data[5],"electric_stove":data[6],
                    "electric_oven":data[7],"washer_dryer":data[8]})

##上传源数据
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
UPLOAD_FOLDER = 'upload'

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


@app.route('/', methods=['POST', 'GET'])
def do_upload():
    if request.method == 'POST':
        file = request.files['file']
        # print(file)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            # filename = file.filename
            file.save(os.path.join(UPLOAD_FOLDER, filename))

    return render_template('main.html')

@app.route('/stop/<int:id>')
def stop(id):
    utils.stop(id)
    return redirect(url_for('indexPage'))


@app.route('/process', methods=['POST', 'GET'])
def do_process():
    print("开始处理")
    utils.data_process()
    return "处理完毕"

## 各用电器总数据
@app.route("/l1")
def get_l1_data():
    data = utils.get_l1_data()
    date, power = [], []

    # energy = np.zeros((9, 16496), int)
    for i in range(len(data)):
        energy = []
        # for j in range(len(data[i])):
        for j in range(len(data[i])):
            # print(len(data[i]))
            try:
                if i == 0:
                    date.append(data[i][j][0].strftime("%Y-%m-%d"))
                energy.append(int(data[i][j][1]))
            except:
                pass
                # print("第{}行{}列不行".format(i, j))
        power.append(energy)
    return jsonify({"date": date, "power": power})

##按日期总数据
@app.route("/l2")
def get_l2_data():
    data = utils.get_l2_data()
    date , power = [], []
    for i in range(len(data)):
        date.append(data[i][0])
        power.append(data[i][1])
    return jsonify({"date": date, "power": power})

@app.route("/time")
def getTime():

    return utils.getTime()

@app.route("/ajax",methods=["get","post"])
def print_hi4():
    # Use a breakpoint in the code line below to debug your script.
    name = request.values.get("name")
    score = request.values.get("score")
    print(f"name:{name},socre:{score}")
    return '100000' # Press Ctrl+F8 to toggle the breakpoint.

## 差分隐私数据
@app.route("/patternLDP")
def pic_show():
    time, process_array, data = patternLDP.run_program()
    # print(time)
    # print(process_array)
    # print(data)
    return jsonify({"time": time, "process_data": process_array, "data": data})



# @app.route("/abc")
# def print_hihi():
#     # Use a breakpoint in the code line below to debug your script.
#     id = request.values.get("id")
#
#     #f"""是啥
#     return f"""<form action="/login">
#         账号<input name="name" value="{id}"/><br/>
#         密码<input name="pwd"/>
#         <input type="submit">
#     </form>""" # Press Ctrl+F8 to toggle the breakpoint.


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    app.run()

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
