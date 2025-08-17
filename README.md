# Cherry Studio with js plugins
> 如果该项目对你有用，欢迎fork & star🌟！


这是一个基于 [electron-inject](https://github.com/tintinweb/electron-inject) 的工具，专为 Cherry Studio 应用程序定制，允许您向 Cherry Studio 注入自定义 JavaScript 代码，以增强其功能和用户体验。

## 功能特点

- 向 Cherry Studio 注入自定义 JavaScript 脚本
- 可生成独立的可执行文件，无需 Python 环境

## 快速使用

### 可执行文件方式运行（推荐）
1. 下载 `CherryStudio_scripted.exe`。
2. 创建 `config.yaml` 文件，确保 `config.yaml` 文件与可执行文件位于同一目录
3. 修改 `config.yaml`内容：
```yaml
app_path: path/to/cherrystudio.exe （改成cherry的exe路径）
scripts_folder: /path/to/your/scripts（改成你的js插件脚本存放文件夹）
```   
4. 双击运行 `CherryStudio_scripted.exe`即可
5. 可创建快捷方式， 并将其作为默认的CherryStudio应用入口。即可默认使用带有插件的Cherry Studio。

### Python 方式运行

1. 安装依赖：
```bash
pip install -r requirements.txt
# 或者
pip install websocket-client requests psutil pyyaml
```
2. 修改 `config.yaml` 文件，设置 Cherry Studio 的安装路径
```yaml
app_path: path/to/cherrystudio.exe
scripts_folder: /path/to/your/scripts
```
3. 运行：
   ```bash
   python start_CherryStudio_with_scripts.py
   ```

## 配置文件说明

项目使用 `config.yaml` 进行配置，主要包含 Cherry Studio 的安装路径：

```yaml
app_path: C:\Users\10051\AppData\Local\Programs\Cherry Studio\Cherry Studio.exe
scripts_folder: ./scripts
```

请确保将路径更改为您计算机上 Cherry Studio 的实际安装位置。scripts_folder请更改为脚本文件存放位置。

## 示例脚本说明

项目在 `scripts` 目录下包含多个 JavaScript 示例脚本，用于增强 Cherry Studio 的功能：

- `focus-textinputarea-shortcut.js`: 注册一个快捷键ctrl + I, 用于聚焦输入框，方便输入文字和模型交流。
- 'switch-model-shortcut': 注册一个快捷键ctrl + shft + M, 用于点击模型切换栏，方便切换模型。

通过注入这两个脚本，配合cherry原生的快捷键，大多数聊天场景都可使用纯键盘进行操作、切换，大大提高效率。

您可以根据需要修改这些脚本或添加新的脚本。


## 生成可执行文件

如需生成可执行文件，请按以下步骤操作：

1. 安装 PyInstaller：
   ```bash
   pip install pyinstaller
   ```

2. 运行以下命令生成可执行文件：
   ```bash
   pyinstaller start_CherryStudio_with_scripts.spec --distpath ./  
   ```
## 注意事项

- 确保配置文件 `config.yaml` 中的路径正确
- 如修改脚本后需要重新生成可执行文件
- 本工具仅适用于 Cherry Studio 应用程序

## 许可证

本项目基于 MIT 许可证，详情请参阅 [LICENSE](LICENSE) 文件。

## 致谢

本项目基于 [tintinweb/electron-inject](https://github.com/tintinweb/electron-inject)。
