# Nimbus Commerce Platform — Framer Match

## Run

```bash
npm install
npm run dev
```

## Đã bổ sung

- **New CR**: tạo CR mới bằng form, ID tự động, trạng thái mặc định `New`.
- **Persistence**: dữ liệu lưu bằng `localStorage`, refresh trang không mất dữ liệu.
- **Edit CR**: sửa title, description, owner, priority, status, tasks.
- **Delete CR**: xoá CR hoặc sub-request có confirm.
- **Add SR**: tạo sub-request trực tiếp từ một CR; SR mới bắt đầu ở `New`.
- **Status filter**: All statuses / New / Planning / In progress / In review / Client review / Approved / Done.
- **Search**: tìm theo ID, title, owner, priority, status, description.
- **Edit project**: sửa tên project, client, owner, description; lưu persistent.
- **Responsive**: giữ layout desktop/mobile của bản Framer.

### Lưu ý về database/API/login

Bản này là web app frontend hoàn chỉnh cho demo và dùng `localStorage` như database phía trình duyệt. Chưa có server database, API hoặc authentication thật. Có thể nối tiếp với Supabase/PostgreSQL/API ở bước backend.
