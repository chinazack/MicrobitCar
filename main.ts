function 右转 (时长: number) {
    startbit.startbit_setMotorSpeed(0 - 标准速度, 标准速度)
    basic.pause(时长)
    停止()
}
function 左转 (时长: number) {
    startbit.startbit_setMotorSpeed(标准速度, 0 - 标准速度)
    basic.pause(时长)
    停止()
}
function 后退 (时长: number) {
    startbit.startbit_setMotorSpeed(0 - 标准速度, 0 - 标准速度)
    basic.pause(时长)
    停止()
}
function 探测 () {
    if (最后角度 >= 90) {
        角度递增 = -30
    } else {
        角度递增 = 30
    }
    for (let index = 0; index < 3; index++) {
        let 角度增量 = 0
        最后角度 = 最后角度 + 角度增量
        startbit.setServo(startbit.startbit_servorange.range1, 1, 最后角度, 0)
        basic.pause(300)
        if (最后角度 == 90) {
            前距离 = startbit.startbit_ultrasonic(startbit.startbit_ultrasonicPort.port2)
        }
        if (最后角度 == 120) {
            左距离 = startbit.startbit_ultrasonic(startbit.startbit_ultrasonicPort.port2)
        }
        if (最后角度 == 60) {
            右距离 = startbit.startbit_ultrasonic(startbit.startbit_ultrasonicPort.port2)
        }
    }
}
function 前进 () {
    if (加速度 < 100) {
        加速度 += 0.2
    }
    startbit.startbit_setMotorSpeed(加速度, 加速度)
}
function 停止 () {
    startbit.startbit_setMotorSpeed(0, 0)
    加速度 = 0
}
let 加速度 = 0
let 右距离 = 0
let 左距离 = 0
let 前距离 = 0
let 角度递增 = 0
let 最后角度 = 0
let 标准速度 = 0
startbit.startbit_Init()
标准速度 = 60
最后角度 = 60
basic.forever(function () {
    if (前距离 <= 6) {
        后退(500)
    }
    if (前距离 >= Math.map(加速度, 0, 100, 10, 40) && (左距离 >= Math.map(加速度, 0, 100, 14, 50) && 右距离 >= Math.map(加速度, 0, 100, 14, 50))) {
        前进()
    } else {
        if (右距离 == 左距离) {
            后退(100)
            右转(200)
        }
        if (右距离 > 左距离) {
            右转(200)
        } else {
            左转(200)
        }
    }
})
control.inBackground(function () {
    while (true) {
        探测()
        basic.pause(1)
    }
})
