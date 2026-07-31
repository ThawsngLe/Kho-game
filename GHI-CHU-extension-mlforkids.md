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
| may-hoc-phan-loai | `fe13fb00-8a38-11f1-…` | dog, cat — đã nạp 240 ảnh Kaggle |

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

### Dữ liệu training — đổi từ Openverse sang Kaggle (30/07/2026)

Bản Openverse đầu tiên chỉ vét được **49 ảnh/nhãn** nên model đoán yếu. Đã
thay hẳn bằng Kaggle
[`tongpython/cat-and-dog`](https://www.kaggle.com/datasets/tongpython/cat-and-dog)
— giấy phép **CC0 Public Domain**, 10.032 ảnh, **tách sẵn** `training_set`
(4000/lớp) và `test_set` (1000/lớp).

Chọn dataset này vì hai lý do:

- Đủ ảnh để nạp kín quota, không phải lọc nhiễu như Openverse (query `cat` lẫn
  ảnh **CAT scan**, `dog` lẫn *sun dog*, tượng mèo, tranh vẽ…).
- Có sẵn hai thư mục train/test nên **tập costume trong `.sb3` chắc chắn không
  trùng tập train trên cloud** — điều kiện để bài học đo đúng độ chính xác.
  Đã kiểm chứng bằng dHash: khoảng cách nhỏ nhất giữa 22 ảnh costume và 240 ảnh
  train là **13 bit** (≤ 6 mới coi là trùng).

`scripts/fetch_dogcat_kaggle.py` đọc zip 228 MB qua **HTTP Range**
(`scripts/httpzip.py`) nên chỉ tải vài MB, **không cần `kaggle.json`**. Ảnh
chọn trải đều toàn lớp (even stride), chuẩn hoá **cắt giữa về 224×224 JPEG q85**
(~12 KB/ảnh) rồi lưu ở `dogcat-kaggle/train|test/<nhãn>/`, kèm
`dogcat-kaggle/nguon.csv` ghi đường dẫn gốc trong dataset. Dữ liệu để **ngoài
repo**, giống `captcha-data/`.

Chọn 224×224 vì đó đúng là kích thước đầu vào MobileNet mà MLforKids dùng: ảnh
học và ảnh kiểm tra đi qua cùng một đường xử lý, không co giãn thêm. Nhỏ hơn
ảnh captcha về dung lượng (~12 KB so với ~33 KB) nên bước tải dữ liệu về trình
duyệt để train cũng nhanh.

```
python scripts/fetch_dogcat_kaggle.py --train 120 --test 11
python scripts/upload_dogcat_training.py --data dogcat-kaggle/train --reserve 0
python scripts/swap_costumes_dogcat.py
```

Trạng thái: **240 item** trên cloud, cân bằng `dog` 120 / `cat` 120. Đã tải
ngược vài ảnh từ server về kiểm: JPEG hợp lệ, magic byte `ffd8ffe0`, 224×224,
không bị lệch byte đầu.

Không dùng hết 250 mà chỉ 240 để còn 10 chỗ trống nếu GV muốn thêm ảnh minh
hoạ trong giờ dạy. Ảnh nhỏ nên lần này **không gặp `HTTP 413`** như bản
Openverse (ảnh 98 KB từng bị chặn).

Thư mục `dogcat-data/` (Openverse) giữ lại làm tư liệu, không còn dùng nữa;
`scripts/fetch_dogcat_dataset.py` cũng vậy.

### Costume trong .sb3

Sprite `mystery` có 22 costume, lấy **tập test** của Kaggle, xen kẽ
(mystery01 = dog, mystery02 = cat, …). Đáp án lưu ở
`dogcat-kaggle/costume-mapping.csv`.

Tên vẫn để `mystery01`..`mystery22` vì code đổi costume theo **số thứ tự** qua
biến `item` (1..22), không theo tên — và tên trung tính thì không lộ đáp án cho
học sinh.

Ảnh dùng nguyên 224×224 `bitmapResolution` 1 như lúc fetch, không nén lại lần
nữa. Ảnh cũ 3:2 nằm ngang (hiển thị 480×318 ở `size` 20% → 96×63,6 px trên sân
khấu); ảnh mới vuông nên đặt `size` = **28,5714%** → hiển thị **64×64 px**, giữ
đúng chiều cao cũ để nhịp xếp tầng 14 px của đoạn clone không đổi. Muốn ảnh to
hơn thì `python scripts/swap_costumes_dogcat.py --display 96`, chỉ đổi `size`
chứ không đổi block nào.

Kết quả: file .sb3 từ **9,1 MB xuống 2,2 MB** (ảnh costume 7190 KB → 257 KB).
Bản GV sửa code nặng 9,1 MB vì Scratch lưu lại costume thành PNG 960×636
`bitmapResolution` 2 khi mở file ra chỉnh.

Script cũng tự copy file master ở gốc task sang `Kho-game/ML-M2.1/` và
`ML-M3.1/`; bản GV gửi lưu ở `00-goc/may-hoc-phan-loai-gv-sua-code.sb3`.

### Không phải train tay nữa

Bản GV sửa (bản đang dùng) đã thêm ngay sau lá cờ xanh:

```
train new machine learning model
wait until (Is the machine learning model [Ready] ?)
```

Đọc `extension3.js` thì `trainNewModel` **train ngay trong trình duyệt**: nó
gọi `GET /train?proxy=true` để tải toàn bộ ảnh training rồi `postMessage` lệnh
`train` cho MLforKids chạy TensorFlow.js phía client. Không có endpoint train
trên server, nên không có gì để script — và cũng không cần bấm gì trên
MLforKids nữa. README đã đổi cột Extension của bài này sang
*☁️ cloud · tự train khi bấm cờ*.

Hệ quả cần biết khi dạy: mỗi lần bấm cờ xanh máy tải lại 240 ảnh (~3 MB) rồi
train, lần đầu chờ vài chục giây. Đó là lý do nên giữ ảnh nhỏ.

### Ảnh nền — GV đã sửa, chưa xem được bằng mắt

Backdrop vẫn tên `Screenshot 2026-04-06 122413` (960×636, `bitmapResolution` 2)
nhưng **byte đã khác** bản gốc (1084 KB → 975 KB), tức GV đã chỉnh lại. Bản GV
cũng thêm hai sprite thư viện `Dog3` và `Cat` làm mốc hai bên sân khấu.

Vẫn chưa khẳng định được ảnh nền còn chữ *Car* / *Cup* hay không — muốn biết
phải mở file ra xem bằng mắt. Không đổi gì ở backdrop và hai sprite này.

## Ba block lấy ảnh của extension `mlforkidsImageData`

Đọc kỹ mục này trước khi kết luận một bài "lấy sai ảnh". Ba block tên gần giống
nhau nhưng lấy ảnh khác nhau hẳn, và **tên block dễ gây hiểu sai**.

| Block hiện trên palette | opcode | Dùng ở | Lấy gì |
|---|---|---|---|
| `costume image` | `getCostumeImage` | sprite | Ảnh costume hiện tại của **chính sprite đó**, đọc từ asset |
| `backdrop image` | `getBackdropCostumeImage` | sprite | **Vùng sân khấu mà sprite đó đang bao phủ**, cắt từ canvas |
| `backdrop image` | `getBackdropImage` | Stage | Toàn bộ sân khấu |

Hai block giữa và cuối **hiện cùng một chữ** `backdrop image`, chỉ khác chỗ đặt
(sprite hay Stage). Đây là chỗ dễ nhầm nhất.

Thân hàm trong `gui.js` của MLforKids:

```js
getBackdropCostumeImage(e,t){
  var o=t.target, i=o.getCurrentCostume(), n=o.size/100,
      a=i.size[0]/i.bitmapResolution*n,      // rong hien thi cua sprite
      r=i.size[1]/i.bitmapResolution*n,      // cao hien thi
      s=o.x-i.rotationCenterX/i.bitmapResolution,
      A=o.y+i.rotationCenterY/i.bitmapResolution,
      l=this._getStageCanvas(), u=l.width/480;
  s=u*(s+240), A=-u*(A-180), a*=u, r*=u;
  ...
  g.drawImage(l, s, A, a, r, 0, 0, 224, 224);   // cat dung vung sprite bao phu
}
```

Tức nó lấy hình chữ nhật bao quanh sprite gọi block, cắt ra từ canvas sân khấu
rồi co về 224×224. Không phải cả sân khấu.

Hệ quả khi dùng:

- Vùng cắt tính theo **costume và `size`% của sprite gọi block**, nên sprite đó
  phải có kích thước trùng vùng ảnh cần nhận diện.
- Nó chụp **những gì đang được vẽ** ở vùng đó, kể cả sprite khác nằm trên. Nếu
  sprite gọi block là một khung viền thì nên để phần giữa trong suốt.
- Đây là cách duy nhất để nhận diện ảnh **của sprite khác**, vì Scratch không có
  block đọc costume của sprite khác.

## CAPTCHA — thiếu block nhận diện (30/07/2026)

Sprite1 (khung scanner) gán `set [reg label] to [0]` là hằng số, nên phép so
sánh `reg label = captcha label` **luôn sai**, cả 9 ô đều hiện costume
`regc wrong`. Đã sửa: gán bằng kết quả nhận diện.

Bản đang dùng là **bản GV sửa lại** (PR #5), gồm:

```
set [reg label] to (recognise image (backdrop image) (label))
```

cộng thêm nút train model trong sprite `loading`: broadcast `train model` gọi
`trainNewModel`, rồi `wait until (checkModelStatus)`.

Cách này **đúng**: Sprite1 glide tới đúng ô rồi `backdrop image` cắt vùng ô đó
ra — xem mục "Ba block lấy ảnh" ở trên.

### Ghi chú sai đã rút lại

PR #4 trước đó (đã bị PR #5 ghi đè) dựa trên hiểu sai rằng
`getBackdropCostumeImage` lấy **cả sân khấu**, nên kết luận bài này "nhận diện
sai nguồn ảnh" và chuyển việc nhận diện vào từng sprite ô `00`..`22` qua một
list `reg labels`. Kết luận đó **sai**, thay đổi đó **không cần thiết**. Thiết
kế gốc dùng Sprite1 làm khung quét là đúng và gọn hơn.

Giữ lại đây để lần sau không lặp lại: muốn biết một block lấy ảnh gì thì đọc
thân hàm trong `gui.js`, đừng suy từ tên block.

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
