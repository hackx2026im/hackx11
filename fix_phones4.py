import os

file_path = r'c:\Users\jthar\OneDrive\Documents\HackX\website\hackx-web-final\src\components\TeamSection.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

phones = [
    'phone: "+94 77 485 2074",',
    'phone: "+94 76 219 5995",',
    'phone: "+94 76 947 6496",',
    'phone: "+94 78 256 7430",',
    'phone: "+94 77 015 0508",'
]

for p in phones:
    content = content.replace(f'      {p}\r\n', '')
    content = content.replace(f'      {p}\n', '')

old_render = """<a
                href={`tel:${coord.phone.replace(/\\s/g, "")}`}
                className="flex-1 py-2 px-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md hover:bg-[#1A6FD4]/20 hover:border-[#5BB8FF]/30 transition-all duration-300 text-center flex items-center justify-center gap-1.5 text-xs text-white/80 hover:text-white"
                onClick={e => e.stopPropagation()}
              >
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span className="truncate">Phone</span>
              </a>"""

new_render = """{coord.phone && (
                <a
                  href={`tel:${coord.phone.replace(/\\s/g, "")}`}
                  className="flex-1 py-2 px-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md hover:bg-[#1A6FD4]/20 hover:border-[#5BB8FF]/30 transition-all duration-300 text-center flex items-center justify-center gap-1.5 text-xs text-white/80 hover:text-white"
                  onClick={e => e.stopPropagation()}
                >
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <span className="truncate">Phone</span>
                </a>
              )}"""

content = content.replace(old_render, new_render)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
