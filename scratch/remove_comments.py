import sys
import re

def remove_comments(text):
    # Remove multi-line comments
    text = re.sub(r'/\*.*?\*/', '', text, flags=re.DOTALL)
    # Remove single-line comments (but not inside strings)
    # A simple way is to match strings first, then comments
    pattern = r'("(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'|`(?:\\.|[^`\\])*`)|//.*|/\*.*?\*/'
    def replacer(match):
        if match.group(1) is not None:
            return match.group(1) # Keep the string
        else:
            return "" # Remove the comment
    
    text = re.sub(pattern, replacer, text, flags=re.DOTALL)
    # Remove lines that are just whitespace
    lines = [line for line in text.split("\n") if line.strip() != ""]
    return "\n".join(lines)

for filename in sys.argv[1:]:
    try:
        with open(filename, 'r') as f:
            content = f.read()
        
        with open(filename, 'w') as f:
            f.write(remove_comments(content))
        print(f"Cleaned {filename}")
    except Exception as e:
        print(f"Error cleaning {filename}: {e}")
