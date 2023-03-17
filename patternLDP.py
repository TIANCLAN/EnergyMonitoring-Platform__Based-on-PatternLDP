import numpy as np

def read_files_npy(file_name):
    file=np.load(file_name,encoding = "latin1",allow_pickle=True)  #加载文件
    time_0 = float(file[0][0])
    value = []
    time = []
    for i in range(len(file)):
        value.append(int(file[i][1]))
        time.append((float(file[i][0])-time_0))
    minVals = min(value)
    maxVals = max(value)
    #(maxVals)
    #print(minVals)
    data = value
    m = len(data)
#     for i in range(len(data)):
#         data[i] = (data[i]- minVals)/maxVals-minVals
    mean_value = np.mean(value)
    std_value = np.std(value)
    data = [(elem-mean_value)/std_value for elem in value]

    return time[32950:33050],data[32950:33050]

def find_j(i, data, time, delta):
    index = i+1
    #print("index",index)
    if index >= len(data):
        return len(data)-1
    max_slope = max((data[index]+delta-data[i])/(time[index]-time[i]), (data[index]-delta-data[i])/(time[index]-time[i]))
    min_slope = min((data[index]+delta-data[i])/(time[index]-time[i]), (data[index]-delta-data[i])/(time[index]-time[i]))
    #print("max_slope",max_slope)
    #print("min_slope",min_slope)
    final_index = index
    index += 1
    while index < len(data):
        slope = (data[index]-data[i])/(time[index]-time[i])
        #print("index:{},i:{},slope:{}",index,i,slope)
        if min_slope <= slope <= max_slope:
            #print("----符合条件----")
            final_index = index
            max_slope = min((data[index] + delta - data[i]) / (time[index] - time[i]), max_slope)
            min_slope = max(min_slope, (data[index] - delta - data[i]) / (time[index] - time[i]))
            index += 1
            #print("max_slope",max_slope)
            #print("min_slope",min_slope)
        else:
            #print("----不符合条件----")
            final_index = index
            break
    #print("final_index",final_index)
    return final_index


def sample_points_alogorithm(data, time, delta):
    # print("--------------sample_points----------------")
    index = 0
    sample_index = [index]
    #print("sample_index",sample_index)
    while index < len(data)-1:
        next_point = find_j(index, data, time, delta)
        #print("next_point",next_point)
        sample_index.append(next_point)
        index = next_point
    #print("sample_index",sample_index)

    return sample_index

import sys

#dynamic-time-wrapping
def dtw(array_a, array_b):
    #print("--------------dtw----------------")
    distance = []
    swap = []
    swap.append(0)
    for _ in range(len(array_b)):
        swap.append(sys.maxsize )
    distance.append(swap)
    for i in range(len(array_a)):
        swap = []
        swap.append(sys.maxsize)
        for j in range(len(array_b)):
            swap.append((array_b[j]-array_a[i])*(array_b[j]-array_a[i]))
        distance.append(swap)
    min_i = 0
    min_j = 0
    for i in range(1, len(array_a)+1):
        for j in range(1, len(array_b)+1):
            if distance[i-1][j-1] > distance[i][j-1]:
                min_i = i
                min_j = j-1
            if distance[min_i][min_j] > distance[i-1][j]:
                min_i = i-1
                min_j = j

            distance[i][j] += distance[i][j]+distance[min_i][min_j]

    return distance[len(array_a)][len(array_b)]

#important-characterization
def pid_control(n, data, time, error_array, sample_result, k_p, k_i, k_d, pi, score_array):
    k = (data[sample_result[n-1]]-data[sample_result[n-2]])/(time[sample_result[n-1]]-time[sample_result[n-2]])
    error_array.append(abs(k*(time[sample_result[n]]-time[sample_result[n-1]])+data[sample_result[n-1]]
                           - data[sample_result[n]]))
    score = k_p*error_array[n]
    if n > 0:
        if n-pi-1 >= 0:
            for i in range(n-pi-1, n+1):
                score += k_i/pi*error_array[i]
        else:
            for i in range(0, n + 1):
                score += k_i / pi * error_array[i]
        score += k_d*(error_array[n]-error_array[n-1])/(time[sample_result[n]]-time[sample_result[n-1]])
    score_array.append(score)
    #print("score_array",score_array)
    return score_array, error_array

import math
import numpy as np

#important-aware-randomization
def perturb(data, n, alpha, w, theta, mu,  score_array, epsilon, epsilon_reminded, sample_result):
    p = 1-math.exp(-1*(alpha/score_array[n]+(1-alpha)*score_array[n]))
    # p = 1 - math.exp(-score_array[n])
    b = math.log(theta/score_array[n]+mu)
    epsilon_now = p*epsilon_reminded
    epsilon_reminded -= epsilon_now
    #14
    q = 0.5*epsilon_now/(1-math.exp(-epsilon_now*b))
    perturb_value = sample_function(q, b, epsilon_now)
    perturbed_result = data[sample_result[n]]+perturb_value
    if epsilon_reminded>epsilon/2:
        alpha -= 1/((1-alpha)*(1-alpha))*0.01
    elif epsilon/w > epsilon_reminded:
        alpha += 1/((1-alpha)*(1-alpha))*0.01
    return alpha, perturbed_result, epsilon_reminded


def sample_function(a, b, epsilon):
    number = np.random.random_sample()
    if number < 0.5:
        result = math.log(number*a/epsilon+math.exp(-1*epsilon*b))/epsilon
        return result
    else:
        result = -1*math.log((0.5+a/epsilon-number)*epsilon/a)/epsilon
        return result

#import read_file as rf
#import importance_characterization as ic
#import importance_aware_randomization as iar
#import dynamic_time_wrapping as dt
from matplotlib import pyplot as plt
import numpy as np

def run_program():
    #files = ["../data/heartrate_2017-01-09.csv", "../data/heartrate_2017-01-10.csv", "../data/heartrate_2017-01-11.csv",
             #"../data/heartrate_2017-01-12.csv", "../data/heartrate_2017-01-14.csv", "../data/heartrate_2017-01-16.csv"]
    # files = ["../data/heartrate_2017-01-09.csv"]
    files = ["upload/light1.npy"]
    file_names=files
    delta=0.15
    w=50
    theta=10
    mu=1
    epsilon=0.5
    k_p=0.8
    k_i=0.1
    k_d=0.1
    pi=5

    for name in file_names:
        d = []
        # for loop in range(0, 10):
        # print(name)
        time, data = read_files_npy(name)
        sample_points = sample_points_alogorithm(data, time, delta)
        perturb_array = []
        error_array = [0, 0]
        score_array = [0.01, 0.01]
        alpha = 0.5
        epsilon_remaind = epsilon
        for index in range(len(sample_points)):
            if index <= 1:

                perturb_array.append(data[sample_points[index]])
            else:
                score_array, error_array = pid_control(index, data, time, error_array, sample_points, k_p, k_i, k_d, pi, score_array)
                alpha, perturb_result, epsilon_remind = \
                    perturb(data, index, alpha, w, theta, mu,  score_array, epsilon, epsilon_remaind, sample_points)
                perturb_array.append(perturb_result)
                if index % w == 0:
                    alpha = 0.5
                    epsilon_remaind = epsilon
                    # if index % 100 == 0:
                    #     print("100 done")

        process_array = []
        start_index = sample_points[0]
        for index in range(1, len(sample_points)):
            process_array.append(data[start_index])
            end_index = sample_points[index]
            k = (perturb_array[index]-perturb_array[index-1])/(time[end_index]-time[start_index])
            for virtual_index in range(start_index+1, end_index):
                process_array.append(k*(time[virtual_index]-time[start_index])+data[start_index])
            start_index = end_index
        time.pop()
        data.pop()
        # print(np.array(time).shape)

        # print(np.array(process_array).shape)
            #plt.axis([0, 1500, 0, 4])
        fig = plt.figure(figsize=(20,9))
        plt.scatter(time, process_array, c="orange")
        plt.plot(time, process_array, c="orange")
        plt.scatter(time, data, c="blue")
        plt.plot(time, data, c="blue")

        # plt.show()
        plt.cla()
        # fig.savefig('download/patternLDP.png')
        return time, process_array, data

if __name__ == "__main__":
    print(run_program())



