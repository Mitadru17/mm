const fs=require('fs');const f='scripts/closing-qa.cjs';let s=fs.readFileSync(f,'utf8');s=s.replaceAll('footer.signature-footer','footer.mystic-tear-footer');fs.writeFileSync(f,s);
