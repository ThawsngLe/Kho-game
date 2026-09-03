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
| `may-hoc-phan-loai-confidence.sb3` | Máy học phân loại (M3.1) + hiện độ tin cậy | Đang kiểm chứng trên link online |
| `mo-hinh-ai-kiem-thu-captcha-confidence.sb3` | Mô hình AI kiểm thử CAPTCHA (M3.1) + hiện độ tin cậy | Đang kiểm chứng trên link online |
| `chatbot-phan-hoi-khach-hang-confidence.sb3` | Chatbot phân tích phản hồi khách hàng (M3.1) + hiện độ tin cậy | Đang kiểm chứng trên link online |

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


---

## Ba bản thêm độ tin cậy (confidence) cho ML-M3.1

Rà bằng `scripts/audit_sb3_ai.py` thấy trong ML-M3.1 chỉ bài *Camera AI giao
thông* hiện độ tin cậy cho học sinh; ba bài phân loại còn lại chỉ lấy nhãn.
Ba file dưới là bản đã thêm, làm theo đúng mẫu của bài Camera AI:

```
set [Confident] to (recognise <đúng input mà block label đang dùng> (confidence))
```

đặt ngay trước câu lệnh chứa block nhận diện, kèm **bảng hiển thị riêng** cho học sinh nhìn:

- sprite `Confidence Panel` — khung bo tròn nền tối, chữ **CONFIDENCE**;
- monitor biến `Confident` để **mode large** (chỉ số to, không lộ tên biến);
- sprite `Confidence Bar` — 11 costume `bar_0`..`bar_10`, bề rộng tăng dần,
  **đổi màu theo mức**: đỏ < 50, vàng 50-79, xanh ≥ 80. Vòng lặp
  `switch costume to (join "bar_" (round (Confident / 10)))`.

Giá trị được **làm tròn 1 chữ số** ngay tại nơi gán biến (QT6) — bản đầu chưa
làm tròn, chạy thật thấy monitor hiện `94.065988`.

Vị trí bảng của từng bài chọn theo **ảnh render sân khấu** chứ không đoán:
máy học phân loại (0, 143) — dải trống trên giữa; CAPTCHA (175, −106) — góc
dưới phải, dưới nút *AI solver*; chatbot (102, 139) — chỗ trống trong thanh
đỏ *Analytics Bot*. Đặt ở góc trên trái như bản đầu thì đè lên tiêu đề
CAPTCHA và lên thanh đỏ của chatbot.

| Bài | Sprite | Input dùng lại | Extension |
|---|---|---|---|
| Máy học phân loại | `mystery` | `costume image` | `mlforkidsimages1dea2950…` |
| CAPTCHA | `Sprite1` | `backdrop image` | `mlforkidsimagesec9fd5f0…` |
| Chatbot | `phân tích - progress` | `item (Câu hỏi thứ) of [Câu trả lời]` | `mlforkidstext1f667e20…` |

Đã đối chiếu source `extension3.js` của ML4K: `label()` và `confidence()` gọi
cùng một hàm phân loại trên **cùng một cache** và đều trả Promise, nên thêm
block confidence không tốn thêm lượt gọi API và đặt trước hay sau đều cho
cùng kết quả.

Bản chính thức ở `ML-M3.1/` **chưa đổi** — chỉ đổi sau khi ba link dưới được
duyệt.

### Link test 1-click

Máy học phân loại:

```
https://machinelearningforkids.co.uk/scratch/?project=https%3A%2F%2Fraw.githubusercontent.com%2FThawsngLe%2FKho-game%2Fmain%2Fworking-on%2Fmay-hoc-phan-loai-confidence.sb3
```

CAPTCHA:

```
https://machinelearningforkids.co.uk/scratch/?project=https%3A%2F%2Fraw.githubusercontent.com%2FThawsngLe%2FKho-game%2Fmain%2Fworking-on%2Fmo-hinh-ai-kiem-thu-captcha-confidence.sb3
```

Chatbot:

```
https://machinelearningforkids.co.uk/scratch/?project=https%3A%2F%2Fraw.githubusercontent.com%2FThawsngLe%2FKho-game%2Fmain%2Fworking-on%2Fchatbot-phan-hoi-khach-hang-confidence.sb3
```

Cách kiểm: mở link → chờ editor nạp xong → bấm cờ xanh (bài CAPTCHA và
chatbot cần bấm nút train một lần trước) → nhìn monitor **Confident** trên sân
khấu: phải hiện số và đổi theo từng ảnh/câu được nhận diện, không đứng ở 0.
