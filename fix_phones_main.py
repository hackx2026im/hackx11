import os
file_path = 'src/components/TeamSection.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if 'phone: "+94' in line:
        if '286 8600' in line or '725 3446' in line:
            new_lines.append(line)
        else:
            continue
    else:
        new_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
