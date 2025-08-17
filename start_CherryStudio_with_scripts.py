import electron_inject
import os
import yaml
import time
import psutil

with open("config.yaml", "r", encoding="utf-8") as f:
    config = yaml.load(f, Loader=yaml.FullLoader)

CherryStudio_path = config["app_path"]
scripts_folder = config["scripts_folder"]

if __name__ == "__main__":
    app_path = CherryStudio_path
    # get js from scripts/
    js_list = [os.path.join(scripts_folder, file) for file in os.listdir(scripts_folder)]
    
    electron_process = None  # 初始化变量
    try:
        # 接收返回的进程对象
        electron_process = electron_inject.inject(
            app_path,
            devtools=False,
            browser=False,
            timeout=10,
            scripts=js_list,
        )
        print(f"Electron 应用已启动，PID: {electron_process.pid}")
        # 保持主程序运行，直到用户关闭 Electron 应用
        electron_process.wait()  # 等待子进程结束
    except Exception as e:
        print(f"发生错误: {e}")
    finally:
        # 确保无论如何都尝试终止子进程
        if electron_process and psutil.pid_exists(electron_process.pid):
            print(f"正在终止 Electron 应用 (PID: {electron_process.pid})...")
            electron_process.kill()
        
        print("脚本执行完毕，程序退出。")