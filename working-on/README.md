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

đặt ngay trước câu lệnh chứa block nhận diện, kèm **thẻ hiển thị riêng** cho học sinh nhìn.

Thẻ là **sprite `the do tin cay`**, 101 costume `lv0`..`lv100` vẽ sẵn: nền tối
bo tròn, chữ **ĐỘ TIN CẬY**, số phần trăm cỡ lớn và thanh mức đổi màu theo
mức (đỏ thấp → xanh cao). Vòng lặp cập nhật:

```
forever
  go to front
  switch costume to (join "lv" (round (Confident)))
```

Không dùng monitor: ML4K bỏ qua toạ độ monitor lưu trong file, luôn dán về góc
(5, 5) và hiện tên biến tiếng Anh — nên vẽ thẳng vào costume mới kiểm soát được
vị trí (QT6).

Giá trị được **làm tròn 1 chữ số** ngay tại nơi gán biến (QT6) — bản đầu chưa
làm tròn, chạy thật thấy monitor hiện `94.065988`.

Vị trí thẻ của từng bài chọn theo **ảnh render sân khấu** chứ không đoán:
máy học phân loại (40, 152); CAPTCHA (182, 140); chatbot (100, 150) — chỗ trống
trong thanh đỏ *Analytics Bot*. Đặt ở góc trên trái như bản đầu thì đè lên tiêu
đề CAPTCHA và lên thanh đỏ của chatbot.

**Riêng bài chatbot** (07/09/2026): thẻ chỉ hiện trong bước phân tích, không
hiện suốt bài. Trước đó thẻ `show` ngay từ cờ xanh nên cả giai đoạn học sinh
đang trả lời 5 câu hỏi vẫn thấy một thẻ *ĐỘ TIN CẬY 0%* nằm góc trên phải —
vừa thừa vừa dễ hiểu nhầm. Đã sửa thành:

```
when green flag clicked : go to (100,150), set size 80%, set [Confident] to 0, hide
when I receive [Bắt đầu phân tích] : show
when I receive [kết thúc phân tích] : hide
```

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

Cách kiểm: mở link → chờ đủ ~45 giây cho editor nạp xong → bấm cờ xanh (bài
CAPTCHA và chatbot cần train model một lần trên ML4K trước) → nhìn **thẻ ĐỘ TIN
CẬY** trên sân khấu: phải hiện số phần trăm và đổi theo từng ảnh/câu được nhận
diện, không đứng ở 0, thanh mức đổi màu theo số.

Riêng bài chatbot, kịch bản đúng của học sinh: bấm cờ xanh → bấm nút **Bắt
đầu** → trả lời lần lượt 5 câu, mỗi câu bấm ô nhập rồi gõ → hết câu 5 bấm nút
**Kết thúc** → bấm nút **Phân tích**. Thẻ độ tin cậy chỉ được xuất hiện từ lúc
bấm Phân tích, và biến mất khi bảng tổng kết hiện ra.
