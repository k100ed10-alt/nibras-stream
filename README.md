# نبراس ستريم

منصة عربية لبث الحصص الأسبوعية بأسلوب استوديو (شبيه StreamYard) وواجبات تفاعلية، من الصف الخامس إلى الثاني عشر، مضبوطة على منهج سلطنة عمان 2026/2027.

**المستودع:** https://github.com/k100ed10-alt/nibras-stream

## الصفحات
- `index.html` الرئيسية
- `login.html` دخول تجريبي (طالب / معلم / ولي أمر)
- `student.html` لوحة الطالب
- `teacher.html` لوحة المعلم
- `studio.html` استوديو البث
- `watch.html` مشاهدة الحصة
- `assignments.html` واجب تفاعلي
- `parent.html` متابعة ولي الأمر

## التشغيل محليا
```bash
git clone https://github.com/k100ed10-alt/nibras-stream.git
cd nibras-stream
python3 -m http.server 8080
```

## GitHub Pages
من المستودع: Settings → Pages → Source: Deploy from a branch → Branch: `main` / `/ (root)`.
بعدها الموقع يظهر على:
`https://k100ed10-alt.github.io/nibras-stream/`
