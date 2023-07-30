import os


def rename_files_increasing_numeric(folder_path):
    if not os.path.exists(folder_path):
        print("Folder path does not exist.")
        return

    # Add other image extensions if needed
    image_extensions = [".jpg", ".jpeg", ".png", ".gif"]

    files = os.listdir(folder_path)
    image_files = [file for file in files if os.path.splitext(
        file)[-1].lower() in image_extensions]
    image_files.sort()

    counter = 1
    for file in image_files:
        file_extension = os.path.splitext(file)[-1].lower()
        new_file_name = f"{counter}.jpg"  # Convert all images to JPG format
        old_file_path = os.path.join(folder_path, file)
        new_file_path = os.path.join(folder_path, new_file_name)

        os.rename(old_file_path, new_file_path)
        counter += 1


if __name__ == "__main__":
    # Replace with the path to your folder
    folder_path = "assets/img/stainedGlassWindow/"
    rename_files_increasing_numeric(folder_path)
