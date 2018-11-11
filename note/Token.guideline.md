Mục đích : vì sau này có 1 số thư viện nhận và parser data async (multer,...) chứ ko phải chờ đủ data rồi mới làm như mình nên để đảm bảo token nhận dc đầu tiên khi nhận request mình nên để token lên header

Cách dùng:
    + front-end: http.setRequestHeader("token", token);
    + back-end: var token = request.get("token");
    + Nếu chỉ dùng token để check authentication thì t có code sẵn middleware cho user và admin
    user: utilities.authenticationUserByHeader
    admin: adminUtilities.authenticationAdminByHeader
    nó sẽ lấy token trong request rồi check authenticate, nếu valid sẽ lưu account đó (load từ mongodb)
    vào request.account ko thì sẽ thrown error.

Q/A: