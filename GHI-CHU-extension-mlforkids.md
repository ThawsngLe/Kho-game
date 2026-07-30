# Ghi chú: extension MLforKids trong các file .sb3

Cập nhật: 30/07/2026

Các dự án dùng extension MLforKids cần trỏ tới project trên cloud để học sinh
mở là chạy được, không phải tự train lại. File này ghi trạng thái từng dự án và
những chỗ đang vướng.

## Đã chuyển sang cloud

| Dự án | Project cloud | Nhãn |
|---|---|---|
| camera-ai-3 | `4acf8900-8a39-11f1-…` | Co_doi_mu_bao_hiem, Khong_doi_mu_bao_hiem |
| captcha-done | `13d7b2d0-8a3c-11f1-…` | tru_cuu_hoa, vach_qua_duong, xe_dap — đã nạp 250 ảnh, xem mục CAPTCHA |
| flappy-mario | `24cd9640-8a3c-11f1-…` | _background_noise_, Left, Right, Up, Down, No_talk |
| may-hoc-phan-loai | `fe13fb00-8a38-11f1-…` | Car, Cup |

Cả 4 file đã khớp `extension id` giữa `project.json` và `extension3.js` của
project mới, gồm cả opcode của từng block.

Lưu ý khi thay extension: phải đổi **đồng thời** `extensionURLs`,
`extensions[]` và tiền tố opcode của mọi block. Nếu chỉ đổi URL thì Scratch
vẫn nạp extension mới nhưng các block cũ mang id cũ sẽ không nhận ra, palette
hiện block lạ và luồng AI đứng im. Dùng `retarget_extension.py`, không dùng
`swap_extension.py` cho việc này.

## Máy học phân loại — đổi từ Car/Cup sang dog/cat (30/07/2026)

Project cloud giữ nguyên `fe13fb00-8a38-11f1-…`, chủ dự án đã đổi nhãn trên
MLforKids thành `dog` / `cat`. Extension id đọc từ `extension3.js` vẫn là
`mlforkidsimages1dea29508a2e11f1b2aac329ebcca8d1`, **không đổi**, nên không
phải retarget: `extensionURLs`, `extensions[]` và opcode đều giữ nguyên.

Kiểm tra bằng:

```
python scripts/retarget_extension.py Kho-game/ML-M2.1/may-hoc-phan-loai.sb3 \
    --new-key <KEY> --dry-run
```

Script in ra `labels project moi: ['dog', 'cat']` và báo id giống nhau.

### Code không phải sửa

Sprite `mystery` so sánh bằng **chỉ số nhãn**, không phải chuỗi cứng:

```
if (recognise image (get costume image) (label)) = (return_label_0)
    -> glide sang trái    (nhãn 0 = dog)
else
    -> glide sang phải    (nhãn 1 = cat)
```

`return_label_0` tự lấy tên nhãn từ extension nên khi project đổi sang dog/cat
thì logic bám theo, không cần chỉnh block nào. Đây là lý do nên dùng
`return_label_N` thay vì gõ tên nhãn thành chuỗi.

### Dữ liệu training

Nguồn: [Openverse](https://api.openverse.org) lọc `license=cc0` +
`category=photograph` + `source=stocksnap`. Chọn stocksnap vì tìm chung bị
nhiễu nặng: query `cat` lẫn ảnh **CAT scan** (chụp PET-CT), tượng mèo, tranh cổ;
query `dog` lẫn *sun dog* (quầng khí quyển) và xe *police dog unit*.

Lọc thêm trong `scripts/fetch_dogcat_dataset.py`:

- tag/tiêu đề phải có tên con vật đích và **không** có tên con vật kia — bỏ ảnh
  `Dog Cat` chụp cả hai con
- bỏ từ khoá tranh vẽ/vật thể: illustration, painting, sketch, etching, statue…
- kích thước tối thiểu 500px, tỉ lệ khung 0.5–2.0
- chống trùng theo id và theo hash nội dung ảnh

Tải 60 ảnh/nhãn về `dogcat-data/<nhãn>/`, kèm `dogcat-data/nguon.csv` ghi xuất
xứ từng ảnh (tác giả, license, link gốc). Dữ liệu để **ngoài repo**, giống
`captcha-data/`.

Chia tập: 49 ảnh/nhãn nạp lên cloud làm training, **11 ảnh/nhãn giữ lại** làm
costume trong `.sb3` để tập test không trùng tập train.

```
python scripts/fetch_dogcat_dataset.py --per-label 60
python scripts/upload_dogcat_training.py --reserve 11
python scripts/swap_costumes_dogcat.py
```

Trạng thái: **98 item** trên cloud, cân bằng `dog` 49 / `cat` 49.

Bẫy gặp phải: 1 ảnh bị `HTTP 413 Payload too large` (ảnh 98 KB, 600×900). Nén
về 320px q60 (27 KB) thì nạp được. Nếu nạp hàng loạt mà lệch nhãn thì kiểm tra
log tìm 413, đừng cho rằng đã đủ.

Giới hạn Openverse khi không có API key: `page_size` tối đa **20**, tối đa
**12 trang** (~240 kết quả/truy vấn). Xin `page_size` lớn hơn trả HTTP 401,
không phải 400.

### Costume trong .sb3

Sprite `mystery` có 22 costume, đổi hết sang ảnh dog/cat **xen kẽ**
(mystery01 = dog, mystery02 = cat, …). Đáp án lưu ở
`dogcat-data/costume-mapping.csv`.

Tên vẫn để `mystery01`..`mystery22` vì code đổi costume theo **số thứ tự** qua
biến `item` (1..22), không theo tên — và tên trung tính thì không lộ đáp án cho
học sinh.

Kích thước hiển thị giữ y như cũ: ảnh cũ 960px rộng với `bitmapResolution` 2
(hiển thị 480px); ảnh mới 480px với `bitmapResolution` 1 — cùng hiển thị 480px
nhưng nhẹ hơn 4 lần. `rotationCenter` đặt lại đúng nửa kích thước pixel thật.
Sprite `size` = 20% nên trên sân khấu vẫn ra ~96px như trước.

Kết quả: file .sb3 từ **4.4 MB xuống 1.6 MB** (ảnh costume 3907 KB → 575 KB),
đổi từ PNG sang JPEG q85.

### Còn phải làm bằng tay

Model **chưa được train**: API trả `status: 0 — No models trained yet, only
random answers can be chosen`. Phải vào MLforKids bấm *Train new machine
learning model* một lần. Endpoint train không mở qua scratchkey nên không
script được. README đã đổi cột Extension của bài này sang
*☁️ cloud · cần train 1 lần*.

### Ảnh nền chưa kiểm được

Backdrop của Stage vẫn là ảnh cũ `Screenshot 2026-04-06 122413` (960×636).
Không kiểm tra được ảnh này có chữ *Car* / *Cup* hay không. Nếu có thì phải
thay hoặc sửa cho khớp dog/cat — việc này cần mở file ra xem bằng mắt.

## CAPTCHA — sửa luồng nhận diện ảnh (30/07/2026)

Bài này có **hai lỗi lồng nhau**, phải sửa cả hai mới chạy đúng.

**Lỗi 1 — thiếu block nhận diện.** Sprite1 (khung scanner) gán
`set [reg label] to [0]` là hằng số, nên phép so sánh
`reg label = captcha label` **luôn sai**, cả 9 ô đều hiện costume `regc wrong`.

**Lỗi 2 — nhận diện sai nguồn ảnh.** Sprite1 lấy ảnh bằng
`get backdrop image`, nhưng Stage chỉ có 2 backdrop `LOGIN SUCCESS` và
`Stripes`, không chứa ảnh CAPTCHA nào. Ảnh thật nằm ở costume của 9 sprite ô
`00`..`22` (mỗi sprite 62 costume: 20 Hydrant, 21 Cross, 21 Bicycle). Nếu chỉ
vá lỗi 1 thì model nhận cùng một ảnh nền cho cả 9 ô → kết quả vô nghĩa.

Scratch không có block lấy costume của sprite khác, nên đã **chuyển việc nhận
diện vào chính từng sprite ô** (giống pattern `mystery` trong
`may-hoc-phan-loai`):

- Stage: thêm list `reg labels` 9 phần tử.
- Mỗi ô `00`..`22`, ngay sau khối chọn costume và trước `wait until touching
  color`:

  ```
  replace item <n> of [reg labels] with (recognise image (get costume image) (label))
  ```

  Chỉ số `n` lấy từ điều kiện `list a contains <idx>` có sẵn trong từng ô
  (idx 0-based) rồi `+1` cho khớp list 1-based của Scratch. Ánh xạ:
  `00`→1, `01`→2, `02`→3, `10`→4, `11`→5, `12`→6, `20`→7, `21`→8, `22`→9 —
  trùng thứ tự list `coord`.

- Sprite1: bỏ `set [reg image]` và `get backdrop image`, đổi thành

  ```
  set [reg label] to (item (coord_i) of [reg labels])
  ```

  `coord_i` chạy 1..9 nên khớp trực tiếp với ô đang quét (clone glide tới
  sprite tên `item (coord_i) of [coord]`).

Biến `reg image` giờ không dùng nữa, để nguyên cho đỡ phá cấu trúc.

Kết quả: 9 block `_label` + 9 block `getCostumeImage`, mỗi ô tự nhận diện ảnh
của mình. Sửa cả ML-M2.1 và ML-M3.1.

Lưu ý: nhận diện chạy lúc nhận broadcast `start captcha`, tức 9 lời gọi API
gần như đồng thời. Không chèn `wait until model ready` (giống
`may-hoc-phan-loai`); nếu model chưa train thì `_label` trả nhãn ngẫu nhiên.

## CAPTCHA — dữ liệu training ảnh

Project cloud `13d7b2d0-8a3c-11f1-…` trước đây **trống 0 ảnh**, nên trang train
không có gì để học sinh xem. Nay đã nạp ảnh thật.

Nguồn: Kaggle [`mikhailma/test-dataset`](https://www.kaggle.com/datasets/mikhailma/test-dataset)
— *Google Recaptcha Image Dataset*, ~11.700 ảnh chia 12 lớp, giấy phép
**CC0 Public Domain** (dùng cho giáo dục và thương mại đều được).

Ánh xạ lớp trong dataset sang nhãn của project:

| Lớp dataset | Có sẵn | Nhãn project |
|---|---|---|
| Hydrant | 952 | `tru_cuu_hoa` |
| Crosswalk | 1240 | `vach_qua_duong` |
| Bicycle | 780 | `xe_dap` |

Tải bằng `scripts/fetch_captcha_dataset.py`. File zip 409 MB nhưng script đọc
qua **HTTP Range** (`scripts/httpzip.py`) nên chỉ tải vài MB cho số ảnh cần.
Endpoint download của Kaggle mở công khai, **không cần `kaggle.json`**.

Ảnh chọn trải đều toàn lớp (even stride) chứ không lấy 100 ảnh đầu, vì tên file
xếp theo thứ tự thu thập nên cắt đầu sẽ lệch nội dung. Ảnh lưu ở
`captcha-data/<nhãn>/`, mỗi ảnh ~30 KB.

Nạp lên bằng `scripts/upload_captcha_images.py`. Bẫy base64 giống
`upload_local_training.py`: phải gửi base64 **thuần**, bỏ tiền tố
`data:image/png;base64,`, nếu không sẽ chèn 15 byte rác trước ảnh.

### Giới hạn 250 ảnh, không phải 500

Project **ảnh** chỉ chứa tối đa **250 mẫu**. Con số 500 là của project **text**.
POST mẫu thứ 251 trả HTTP 409
`Project already has maximum allowed amount of training data`.

Giới hạn ghi trong mã nguồn MLforKids,
[`mlforkids-api/src/lib/db/limits.ts`](https://github.com/IBM/taxinomitis/blob/master/mlforkids-api/src/lib/db/limits.ts):

```
textTrainingItemsPerProject        : 500
numberTrainingItemsPerProject      : 1000
numberTrainingItemsPerClassProject : 3000
imageTrainingItemsPerProject       : 250
soundTrainingItemsPerProject       : 100
```

Đáng chú ý cho hai dự án regression còn treo: project number cho phép tới 1000
(3000 nếu là project trong lớp), thoải mái hơn nhiều so với ảnh.

Vì vậy 100 ảnh × 3 nhãn = 300 **không nạp hết được**. Lần chạy đầu dừng ở 250
ảnh, phân bố lệch 100/100/50 nên đã xoá sạch trên web rồi nạp lại cân bằng
**83 ảnh/nhãn** (83 × 3 = 249, gần hết quota):

```
python scripts/upload_captcha_images.py --per-label 83
```

Trạng thái hiện tại: `tru_cuu_hoa` 83, `vach_qua_duong` 83, `xe_dap` 83. Đã
kiểm tra ảnh tải về từ server là PNG hợp lệ, không lệch byte đầu.

Giống project text, scratchkey **chỉ thêm được, không xoá được**: cả
`DELETE /train/{id}`, `DELETE /train?id=`, `DELETE /train`, `DELETE /images/{id}`
đều trả 302 về `/#!/404`, còn `POST /train/{id}/delete` trả HTML trang chủ —
route không tồn tại. Muốn sửa phân bố phải xoá trong giao diện web MLforKids,
hoặc xoá hẳn project rồi tạo lại (key mới thì phải retarget lại 2 file `.sb3`).

### Bù thêm cho một nhãn lẻ

Nếu sau này chỉ cần bù cho một nhãn thiếu mà không nạp trùng nhãn đã đủ:

```
python scripts/upload_captcha_images.py --label xe_dap --skip 50 --limit 33
```

`--skip` bỏ qua số ảnh đã nạp của nhãn đó, `--limit` chặn số ảnh gửi thêm.

Sau khi nạp xong vẫn phải vào MLforKids bấm **Train new machine learning model**
một lần — endpoint train không mở qua scratchkey.

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
