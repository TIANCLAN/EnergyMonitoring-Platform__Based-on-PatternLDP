import time
from datetime import datetime
import pandas as pd

import pymysql


def getTime():
    time_str = time.strftime("%Y{}%m{}%d{} %X")
    return time_str.format("年", "月", "日")


def get_conn():
    """

    :return:连接，游标
    """
    # 创建连接
    conn = pymysql.connect(host="127.0.0.1",
                           user="root",
                           password="20010826",
                           db="e",
                           charset="utf8"
                           )
    cursor = conn.cursor()  # 执行完毕返回的结果集默认以元组显示
    return conn, cursor


def close_conn(conn, cursor):
    cursor.close()
    conn.close()


def query(sql, *args):
    """
    封装通用查询
    :param sql: 
    :param args: 
    :return: 返回查询后的结果,((),(),)的形式
    """
    conn, cursor = get_conn()
    cursor.execute(sql, args)
    res = cursor.fetchall()
    close_conn(conn, cursor)
    return res


def insert_or_update_data(sql):
    conn, cursor = get_conn()
    try:
        cursor.execute(sql)
        conn.commit()
    finally:
        conn.close()


def get_r1_data():
    """

    :return: 返回div id=c1的数据
    """
    # 多次更新数据，取时间戳最新的那组数据
    categories = ['fridge', 'dish washer', 'sockets', 'light', 'microwave', 'electric space heater',
                  'electric stove', 'electric oven', 'washer dryer']
    data = []
    for category in categories:
        sql = "select sum(power) from data where category='" + category + "'"
        res = query(sql)
        data.append(res)

    return data


def get_l1_data():
    categories = ['fridge', 'dish washer', 'sockets', 'light', 'microwave', 'electric space heater',
                  'electric stove', 'electric oven', 'washer dryer']
    data = []
    # sql = "select count(*) from data group by category"
    # sql = "select distinct category from data"

    for category in categories:
        sql = "select physical_quantity,power from data where category='" + category + "'"
        res = query(sql)
        category_data = pd.DataFrame(res, columns=['Time', 'Active'])
        test = category_data.set_index('Time').resample('1440T').mean().dropna().reset_index()
        test = [tuple(x) for x in test.values]
        data.append(test)
    return data

def get_l2_data():
    data = []
    # sql = "select count(*) from data group by category"
    # sql = "select distinct category from data"
    sql = "select physical_quantity,power from data"
    res = query(sql)
    select_data = pd.DataFrame(res, columns=['Time', 'Active'])
    test = select_data.set_index('Time').resample('1440T').sum( ).dropna( ).reset_index( )
    test = [tuple(x) for x in test.values]
    return test

def get_trainning_data():
    sql = "select * from training"
    data = query(sql)
    res = []
    for i in range(len(data)):
        listRes = list(data[i])
        listRes.append(do_status_class(data[i][3]))
        res.append(listRes)
    return res

def do_status_class(index):
    if index == 'Running':
        return "badge bg-success me-1"
    elif index == 'Standby':
        return "badge bg-warning me-1"
    elif index =='Closed':
        return "badge bg-danger me-1"
    elif index =='Finished':
        return "badge bg-secondary me-1"

def stop(id):
    id = str(id)
    sql = "update training set status='Closed' where No='" + id + "'"
    insert_or_update_data(sql)

import sys
sys.path.append('preprocess')
import matplotlib
matplotlib.use("Agg")
import uk_dale_cfg
from os.path import join
import pandas as pd
name = ['Fridge']
appliance_dict = {
    'WashingMachine': uk_dale_cfg.WashingMachine,
    'Kettle': uk_dale_cfg.Kettle,
    'Microwave': uk_dale_cfg.Microwave,
    'Fridge': uk_dale_cfg.Fridge,
    'Dishwasher': uk_dale_cfg.Dishwasher
}
base_path = 'upload'


def data_process():
    for house_id in range(1, 2):
        aggregate_path = join(base_path, 'house_%d/channel_%d.dat' % (house_id, 1))
        # print(aggregate_path)
        aggregate_data = []
        with open(aggregate_path, 'r') as f:
            lines = f.readlines()
        for line in lines:
            s = line.split()
            aggregate_data.append([int(s[0]), int(s[1])])
        # np.save(join(base_path, 'house_%s/main.npy' % house_id), aggregate_data)
        # print('House: %d finished!' % house_id)
    for appliance_name in name:
        for house_id, channel_id in appliance_dict[appliance_name].items():
            appliance_path = join(base_path, 'house_%d/channel_%d.dat' % (house_id, channel_id))
            # print('Appliance: %s in house %s Load!' % (appliance_name, house_id))
            appliance_data = []

            with open(appliance_path, 'r') as f:
                lines = f.readlines()
                for line in lines:
                    s = line.split()
                    appliance_data.append([int(s[0]), int(s[1])])

            if (appliance_name == 'Kettle'):
                Kettle = appliance_data
            if (appliance_name == 'Fridge'):
                Fridge = appliance_data
            # np.save(join(base_path, 'house_%d/%s_appliance.npy' % (house_id, appliance_name)), appliance_data)
            # print('Appliance: %s House: %d finished!' % (appliance_name, house_id))


def return_img_stream(img_local_path):
    """
    工具函数:
    获取本地图片流
    :param img_local_path:文件单张图片的本地绝对路径
    :return: 图片流
    """
    import base64
    img_stream = ''
    with open(img_local_path, 'rb') as img_f:
        img_stream = img_f.read()
        img_stream = base64.b64encode(img_stream)
    return img_stream


if __name__ == "__main__":
    stop(1401)
