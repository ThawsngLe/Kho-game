# `working-on/` — khu vực đang làm, KHÔNG dùng cho học sinh/GV

File trong thư mục này là bản **đang thử nghiệm / đang phát triển**,
tách biệt hoàn toàn với các bài học chính thức ở `ML-M1.1/`, `ML-M2.1/`,
`ML-M3.1/`.

Không xoá các file này khỏi đây nếu chưa xác nhận bài đã ổn định —
nhưng cũng không copy chúng vào các thư mục bài học chính thức cho tới
khi được duyệt.

## Nội dung

| File | Bài | Trạng thái |
|---|---|---|
| `ai-du-doan-ket-qua-hoc-tap-dashboard.sb3` | AI dự đoán kết quả học tập (bản dashboard, game hoá, extension tự chứa) | Đã test PASS bằng Playwright (xem log dưới) |

## Link test 1-click

```
https://machinelearningforkids.co.uk/scratch/?project=https%3A%2F%2Fraw.githubusercontent.com%2FThawsngLe%2FKho-game%2Fmain%2Fworking-on%2Fai-du-doan-ket-qua-hoc-tap-dashboard.sb3
```

Mở link → bấm cờ xanh → kéo 5 thanh trượt → bấm nút **DỰ ĐOÁN**. Không
cần train, extension tự chứa 1000 dòng dữ liệu, chạy được ngay trên máy
bất kỳ.

## Kết quả test gần nhất (Playwright, profile trắng)

- Extension `mlforkidsregression9` nạp thành công (4 block đầy đủ, không
  banner lỗi).
- Điểm trả về đúng thang 0-10, 1 chữ số phẩy.
- Kim đồng hồ xoay đúng hướng (đã verify bằng ảnh chụp thực tế ở nhiều
  mức điểm, công thức `direction = -180 + (điểm/10)*180`).
- Không còn chồng chữ giữa RankText và monitor điểm.
- Mô phỏng bấm nút Dự đoán trên UI thật: biến `prediction` đổi đúng giá
  trị sau khi click.

Script test: `scripts/ket-qua-hoc-tap/verify_3fixes.js` và
`scripts/ket-qua-hoc-tap/verify_dashboard.js` (nằm ở repo task, không
nằm trong `Kho-game`).

Quy trình lập trình + test file Scratch dùng chung cho các bài sau: xem
skill `scratch-ml4k-dev` (kiro skill), lưu trong workspace của task.
