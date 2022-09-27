# Lighting in Three.js

## Anggota Kelompok
- Ryo Hilmi Ridho - NRP 5025201192
- Billy Brianto - NRP 5025201080
- Ferry Nur Alfian Eka Putra - NRP 5025201214
- Nathanael Roviery - NRP 5025201258
- Zahra Fayyadiyati - NRP 5025201133

## How to run
```
npm install
npm run dev
```

## Types of Lighting

### Ambient Light
Ambient light atau global light adalah cahaya yang secara merata menerangi semua objek yang ada

### Hemispehere Light
Hemisphere light adalah dua sumber cahaya yang diposisikan di atas (sebagai sky) dan di bawah (sebagai ground). Hemisphere light menunjukkan warna yang dipancarkan dari langit dan tanah. Pencahayaan ini tidak membuat bayangan dan bersifat fading.

### Rectangle Area Light
Rectangle area light adalah sumber cahaya yang berasal dari sumber yang berbentuk kotak/persegi seperti TV. Pencahayaan jenis ini tidak menghasilkan bayangan, melainkan sisi terang dari sebuah benda akibat pancaran cahaya dari sumber cahaya

### Directional Light
Directional light adalah cahaya yang dipancarkan ke arah tertentu. Cahaya ini akan terlihat seolah-olah sangat jauh dan sinar yang dihasilkan dari itu semua sejajar. Oleh karena itu, cahaya jenis ini dapat memberikan bayangan

### Point Light
Berbeda dengan directional light yang memiliki posisi sangat jauh/infinit, point light memiliki posisi pasti untuk menerangi area di sekitarnya. Pencahayaan jenis ini juga dapat membuat bayangan

### Spot Light
Cahaya ini dipancarkan dari satu titik dalam satu arah sehingga berbentuk menyerupai kerucut yang ukurannya semakin jauh dari cahaya semakin besar area yang dikenai cahaya namun intensitasnya semakin berkurang.

