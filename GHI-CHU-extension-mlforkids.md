# Ghi chú: extension MLforKids trong các file .sb3

Cập nhật: 29/07/2026

Các dự án dùng extension MLforKids cần trỏ tới project trên cloud để học sinh
mở là chạy được, không phải tự train lại. File này ghi trạng thái từng dự án và
những chỗ đang vướng.

## Đã chuyển sang cloud

| Dự án | Project cloud | Nhãn |
|---|---|---|
| camera-ai-3 | `4acf8900-8a39-11f1-…` | Co_doi_mu_bao_hiem, Khong_doi_mu_bao_hiem |
| captcha-done | `13d7b2d0-8a3c-11f1-…` | tru_cuu_hoa, vach_qua_duong, xe_dap |
| flappy-mario | `24cd9640-8a3c-11f1-…` | _background_noise_, Left, Right, Up, Down, No_talk |
| may-hoc-phan-loai | `fe13fb00-8a38-11f1-…` | Car, Cup |

Cả 4 file đã khớp `extension id` giữa `project.json` và `extension3.js` của
project mới, gồm cả opcode của từng block.

Lưu ý khi thay extension: phải đổi **đồng thời** `extensionURLs`,
`extensions[]` và tiền tố opcode của mọi block. Nếu chỉ đổi URL thì Scratch
vẫn nạp extension mới nhưng các block cũ mang id cũ sẽ không nhận ra, palette
hiện block lạ và luồng AI đứng im. Dùng `retarget_extension.py`, không dùng
`swap_extension.py` cho việc này.

## Chatbot khảo sát khách hàng

Project cloud dạng text đã tạo và **đã nạp 496 dòng training**, cân bằng
8 nhãn × 62 dòng:

```
chat_lieu_hai_long          chat_lieu_khong_hai_long
giao_hang_hai_long          giao_hang_khong_hai_long
mau_ma_hai_long             mau_ma_khong_hai_long
phong_cach_hai_long         phong_cach_khong_hai_long
```

Dữ liệu nguồn để ở `ML-M2.1/chatbot-khao-sat-khach-hang/` và
`ML-M3.1/chatbot-khao-sat-khach-hang/` (mỗi nhãn 1 file .txt).

### Block AI đã gắn

File `.sb3` trước đây có `extensions: []` và 0 block AI trên tổng 145 block.
Nay đã gắn extension `mlforkidstext1f667e20…` và điền 2 chỗ tác giả để trống,
đúng theo hướng dẫn chính tác giả ghi trong comment của file.

Trong sprite **phân tích - progress**, block `set [Phân tích câu trả lời]`
trước đây gán hằng số `0`, nay gán:

```
set [Phân tích câu trả lời] to (recognise text (item (Câu hỏi thứ) of [Câu trả lời]) (label))
```

Đặt ở đúng vị trí cũ nên không bị lệch nhịp: tại thời điểm đó `Câu hỏi thứ`
đang bằng số thứ tự câu của vòng lặp hiện tại.

Trong sprite **Phan tích Nút nhấn**, block `wait until` có ô điều kiện rỗng
(`CONDITION: [1, null]`), nay điền:

```
wait until (Is the machine learning model [ready to use]?)
```

### Sửa thứ tự list `class name`

`Sprite1` đổi costume bằng `item # of (nhãn) in [class name]`, nên thứ tự list
phải trùng thứ tự costume. Hai phần tử đầu đang bị đảo: `class name` để
`chat_lieu_khong_hai_long` trước `chat_lieu_hai_long`, còn costume thì
*chất liệu* trước *chất liệu không*. Hệ quả là riêng nhóm chất liệu hiện ngược
mặt cảm xúc. Đã đảo lại cho khớp; 6 phần tử còn lại vốn đã đúng.

### Còn phải làm bằng tay

Model **chưa được train**. API trả `status: 0 — No models trained yet, only
random answers can be chosen`. Phải vào giao diện MLforKids bấm *Train new
machine learning model* một lần. Endpoint train không mở qua scratchkey nên
không script được.

Trước khi train, block `wait until model ready` sẽ chờ mãi nên bấm nút phân
tích không thấy gì xảy ra. Đó là hành vi đúng của block, không phải lỗi file.

### Giới hạn 500 item

Mỗi project MLforKids chỉ chứa tối đa **500 mẫu training**. Vượt qua thì
`POST /train` trả HTTP 409 `Project already has maximum allowed amount of
training data`. Đó là lý do lấy 62 dòng/nhãn (62 × 8 = 496) chứ không dùng hết
800 dòng nguồn.

Quan trọng: scratchkey API **chỉ thêm được, không xoá được**. Các dạng
`DELETE /train/{id}`, `DELETE /train?id=`, `DELETE /train` đều trả 200 nhưng
nội dung là HTML trang chủ, tức route không tồn tại, dữ liệu vẫn còn nguyên.
Muốn xoá phải đăng nhập web MLforKids và xoá trong giao diện. Nếu nạp lệch
nhãn thì phải xoá sạch rồi nạp lại, không sửa cục bộ được.

Dòng training nên để **tiếng Việt có dấu**, server lưu và trả về khớp nguyên
văn, không bị lỗi encoding.

## Chưa chuyển được sang cloud

Hai dự án dạng number/regression vẫn dùng project **local**, tức dữ liệu
training nằm trong localStorage của trình duyệt từng máy, không nằm trong .sb3
và cũng không có trên server. Học sinh mở ở máy khác sẽ không có dữ liệu.

| Dự án | Extension | Các cột |
|---|---|---|
| ai-du-doan-ket-qua-hoc-tap | `mlforkidsregression9` (local, 6 block AI) | study_hours_per_day, social_media_hours, netflix_hours, sleep_hours, exercise_frequency, exam_score |
| may-ban-muoi-thong-minh | `mlforkidsregression26` (local) | x_muoi, y_muoi, huong_muoi, huong_ban |

Chưa tạo được project cloud cho hai dự án này, đang tìm cách khác.

Dữ liệu training đã tách ra CSV để không phụ thuộc localStorage:

- `ML-M2.1/ai-du-doan-ket-qua-hoc-tap.csv`
- `ML-M3.1/ai-du-doan-ket-qua-hoc-tap.csv`
- `ML-M3.1/may-ban-muoi-thong-minh.csv`

Khi nào tạo được project cloud regression với đúng bộ cột ở trên thì retarget
file .sb3 sang key mới, rồi nạp CSV vào project đó.
