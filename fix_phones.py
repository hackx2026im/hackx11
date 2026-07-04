import sys

file_path = sys.argv[1]
is_jr = sys.argv[2] == "true"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('phone: string;', 'phone?: string;')

phones = [
    'phone: "+94 76 142 7662",',
    'phone: "+94 77 485 2074",',
    'phone: "+94 76 219 5995",',
    'phone: "+94 76 947 6496",',
    'phone: "+94 78 256 7430",',
    'phone: "+94 77 015 0508",'
]

for p in phones:
    content = content.replace(f"      {p}\n", "")
    content = content.replace(f"      {p}", "")

if is_jr:
    old_render = '''<a
                href={`tel:${coord.phone.replace(/\s/g, "")}`}
                className="flex-1 py-2 px-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md hover:bg-[#18A0C0]/20 hover:border-[#72E5F8]/30 transition-all duration-300 text-center flex items-center justify-center gap-1.5 text-xs text-white/80 hover:text-white"
                onClick={e => e.stopPropagation()}
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="truncate">Phone</span>
              </a>'''
    new_render = '''{coord.phone && (
                <a
                  href={`tel:${coord.phone.replace(/\s/g, "")}`}
                  className="flex-1 py-2 px-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md hover:bg-[#18A0C0]/20 hover:border-[#72E5F8]/30 transition-all duration-300 text-center flex items-center justify-center gap-1.5 text-xs text-white/80 hover:text-white"
                  onClick={e => e.stopPropagation()}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span className="truncate">Phone</span>
                </a>
              )}'''
else:
    old_render = '''<a
                href={`tel:${coord.phone.replace(/\s/g, "")}`}
                className="flex-1 py-2 px-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md hover:bg-[#1A6FD4]/20 hover:border-[#5BB8FF]/30 transition-all duration-300 text-center flex items-center justify-center gap-1.5 text-xs text-white/80 hover:text-white"
                onClick={e => e.stopPropagation()}
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="truncate">Phone</span>
              </a>'''
    new_render = '''{coord.phone && (
                <a
                  href={`tel:${coord.phone.replace(/\s/g, "")}`}
                  className="flex-1 py-2 px-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md hover:bg-[#1A6FD4]/20 hover:border-[#5BB8FF]/30 transition-all duration-300 text-center flex items-center justify-center gap-1.5 text-xs text-white/80 hover:text-white"
                  onClick={e => e.stopPropagation()}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span className="truncate">Phone</span>
                </a>
              )}'''

content = content.replace(old_render, new_render)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
