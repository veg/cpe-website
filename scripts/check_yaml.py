import argparse
from pathlib import Path
import yaml

def check_markdown_titles(directory: str):
    """
    Scans a directory for .md files, extracts YAML front matter,
    and checks if the 'title' attribute is a valid string.

    Args:
        directory (str): The path to the directory to scan.
    """
    dir_path = Path(directory)
    if not dir_path.is_dir():
        print(f"❌ Error: Directory not found at '{directory}'")
        return

    print(f"🔍 Scanning for .md files in '{dir_path}'...\n")

    # Recursively find all files ending in .md
    markdown_files = list(dir_path.rglob('*.md'))
    if not markdown_files:
        print("No .md files found.")
        return

    problem_files = []

    for file_path in markdown_files:
        try:
            content = file_path.read_text(encoding='utf-8')

            # The YAML block must be at the very start of the file
            if not content.strip().startswith('---'):
                problem_files.append((file_path, "No YAML front matter found."))
                continue

            # Split content to isolate the YAML block between the first two '---'
            parts = content.split('---', 2)
            if len(parts) < 3:
                problem_files.append((file_path, "YAML front matter not properly closed."))
                continue
            
            yaml_content = parts[1]
            
            if not yaml_content.strip():
                problem_files.append((file_path, "YAML front matter is empty."))
                continue

            # Parse the YAML content
            data = yaml.safe_load(yaml_content)

            # Ensure the parsed data is a dictionary
            if not isinstance(data, dict):
                 problem_files.append((file_path, "YAML is not a key-value structure."))
                 continue

            # Check for the 'title' attribute
            if 'title' not in data:
                problem_files.append((file_path, "Attribute 'title' is missing."))
            elif not isinstance(data.get('title'), str):
                title_type = type(data.get('title')).__name__
                problem_files.append((file_path, f"Attribute 'title' is not a string (it's a '{title_type}')."))
            else:
                print (file_path, data['title'])

        except yaml.YAMLError:
            problem_files.append((file_path, "Invalid YAML syntax."))
        except Exception as e:
            problem_files.append((file_path, f"An unexpected error occurred: {e}"))
    
    # --- Reporting ---
    if problem_files:
        print("--- ISSUES FOUND ---")
        for file_path, reason in problem_files:
            try:
                # Use relative path for cleaner output
                relative_path = file_path.relative_to(dir_path)
            except ValueError:
                relative_path = file_path
            print(f"❗️ File: {relative_path}\n   Reason: {reason}\n")
        print(f"--- Summary: {len(problem_files)} of {len(markdown_files)} files have issues. ---")
    else:
        print(f"✅ Success! All {len(markdown_files)} markdown files have a valid 'title' attribute.")


def main():
    """Main function to parse arguments and run the script."""
    parser = argparse.ArgumentParser(
        description="Check for a string 'title' in the YAML front matter of Markdown files."
    )
    parser.add_argument(
        "directory",
        nargs='?',
        default='.',
        help="The directory to scan (defaults to the current directory)."
    )
    args = parser.parse_args()
    
    check_markdown_titles(args.directory)


if __name__ == "__main__":
    main()