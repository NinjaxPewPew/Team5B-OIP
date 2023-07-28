import os


def rename_files_increasing_numeric(folder_path):
    if not os.path.exists(folder_path):
        print("Folder path does not exist.")
        return

    files = os.listdir(folder_path)
    files.sort()

    counter = 1
    for file in files:
        file_extension = os.path.splitext(file)[-1]
        new_file_name = f"{counter}{file_extension}"
        old_file_path = os.path.join(folder_path, file)
        new_file_path = os.path.join(folder_path, new_file_name)

        os.rename(old_file_path, new_file_path)
        counter += 1


if __name__ == "__main__":
    # Replace with the path to your folder
    folder_path = "assets/img/partickPluckers/"
    rename_files_increasing_numeric(folder_path)
