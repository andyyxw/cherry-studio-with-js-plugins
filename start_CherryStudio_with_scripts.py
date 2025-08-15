import electron_inject
import os
import yaml
with open("config.yaml", "r", encoding="utf-8") as f:
    config = yaml.load(f, Loader=yaml.FullLoader)

CherryStudio_path = config["app_path"]
scripts_folder = config["scripts_folder"]

if __name__ == "__main__":
    app_path = CherryStudio_path
    # get js from scripts/
    js_list = [os.path.join(scripts_folder, file) for file in os.listdir(scripts_folder)]
    electron_inject.inject(
        app_path,
        devtools=False,
        browser=False,
        timeout=10,
        scripts=js_list,
    )