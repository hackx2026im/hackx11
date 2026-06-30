import re

with open('public/SriLankaMap.svg', 'r') as f:
    content = f.read()

# Convert XML attributes to JSX
content = content.replace('clip-path', 'clipPath')
content = content.replace('clip-rule', 'clipRule')
content = content.replace('fill-opacity', 'fillOpacity')
content = content.replace('fill-rule', 'fillRule')

# Change fills to inherit or customizable class
content = re.sub(r'fill="#010813"', 'className="map-shape"', content)

jsx = f"""export default function SriLankaMapSVG(props: React.SVGProps<SVGSVGElement>) {{
  return (
    {content.replace('<svg ', '<svg {...props} ')}
  );
}}
"""

with open('src/components/SriLankaMapSVG.tsx', 'w') as f:
    f.write(jsx)

print('Component created')
