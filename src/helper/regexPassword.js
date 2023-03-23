export function validatePassword(password) {
  const errors = {}

  // Kiểm tra độ dài mật khẩu
  if (password.length < 8) {
    errors.length = "Mật khẩu phải có ít nhất 8 ký tự."
  }

  // Kiểm tra chữ cái thường
  if (!password.match(/[a-z]/)) {
    errors.lowercase = "Mật khẩu phải chứa ít nhất một chữ cái thường."
  }

  // Kiểm tra chữ cái in hoa
  if (!password.match(/[A-Z]/)) {
    errors.capitalize = "Mật khẩu phải chứa ít nhất một chữ cái in hoa."
  }

  // Kiểm tra chữ số
  if (!password.match(/\d/)) {
    errors.number = "Mật khẩu phải chứa ít nhất một chữ số."
  }

  // Kiểm tra ký tự đặc biệt
  if (!password.match(/[!@#$%^&*()_+~`\-={}\[\]\\|:;"'<>,.?/]/)) {
    errors.characters = "Mật khẩu phải chứa ít nhất một ký tự đặc biệt."
  }

  // Trả về mảng các lỗi (nếu có)
  return errors
}
