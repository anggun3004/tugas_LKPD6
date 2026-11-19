const form = document.getElementById('registerForm');
const namaInput = document.getElementById('nama');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const ekskulInput = document.getElementById('ekskul');
const successMessage = document.getElementById('successMessage');

// Fungsi menampilkan status error
function setError(element, message) {
  const formGroup = element.parentElement;
  const errorDisplay = formGroup.querySelector('.error-msg');

  errorDisplay.innerText = message;
  formGroup.classList.add('error');
  formGroup.classList.remove('success');
}

// Fungsi menampilkan status valid/sukses
function setSuccess(element) {
  const formGroup = element.parentElement;
  const errorDisplay = formGroup.querySelector('.error-msg');

  errorDisplay.innerText = '';
  formGroup.classList.add('success');
  formGroup.classList.remove('error');
}

// Validasi masing-masing input
function validateNama() {
  const value = namaInput.value.trim();
  if (value === '') {
    setError(namaInput, 'Nama lengkap tidak boleh kosong.');
    return false;
  } else if (value.length < 3) {
    setError(namaInput, 'Nama lengkap minimal 3 karakter.');
    return false;
  } else {
    setSuccess(namaInput);
    return true;
  }
}

function validateEmail() {
  const value = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (value === '') {
    setError(emailInput, 'Email tidak boleh kosong.');
    return false;
  } else if (!emailRegex.test(value)) {
    setError(emailInput, 'Format email tidak valid (contoh: nama@domain.com).');
    return false;
  } else {
    setSuccess(emailInput);
    return true;
  }
}

function validatePassword() {
  const value = passwordInput.value;
  if (value === '') {
    setError(passwordInput, 'Password tidak boleh kosong.');
    return false;
  } else if (value.length < 8) {
    setError(passwordInput, 'Password minimal 8 karakter.');
    return false;
  } else {
    setSuccess(passwordInput);
    return true;
  }
}

function validateConfirmPassword() {
  const passwordValue = passwordInput.value;
  const confirmValue = confirmPasswordInput.value;

  if (confirmValue === '') {
    setError(confirmPasswordInput, 'Konfirmasi password wajib diisi.');
    return false;
  } else if (confirmValue !== passwordValue) {
    setError(confirmPasswordInput, 'Konfirmasi password tidak cocok dengan password.');
    return false;
  } else {
    setSuccess(confirmPasswordInput);
    return true;
  }
}

function validateEkskul() {
  const value = ekskulInput.value;
  if (value === '') {
    setError(ekskulInput, 'Silakan pilih salah satu ekstrakurikuler.');
    return false;
  } else {
    setSuccess(ekskulInput);
    return true;
  }
}

// Validasi Real-Time saat pengguna mengetik / memilih
namaInput.addEventListener('input', validateNama);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', () => {
  validatePassword();
  if (confirmPasswordInput.value !== '') {
    validateConfirmPassword();
  }
});
confirmPasswordInput.addEventListener('input', validateConfirmPassword);
ekskulInput.addEventListener('change', validateEkskul);

// Validasi saat tombol Submit diklik
form.addEventListener('submit', function (event) {
  // Mencegah halaman reload
  event.preventDefault();

  const isNamaValid = validateNama();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmValid = validateConfirmPassword();
  const isEkskulValid = validateEkskul();

  if (isNamaValid && isEmailValid && isPasswordValid && isConfirmValid && isEkskulValid) {
    alert(`Pendaftaran Berhasil! Selamat bergabung di ekstrakurikuler ${ekskulInput.value}, ${namaInput.value.trim()}!`);
    
    successMessage.textContent = `Pendaftaran berhasil dikirim untuk ${namaInput.value.trim()} (${ekskulInput.value}).`;
    successMessage.classList.remove('hidden');

    // Reset form dan indikator warna setelah berhasil
    form.reset();
    document.querySelectorAll('.form-group').forEach(group => {
      group.classList.remove('success', 'error');
    });
  } else {
    successMessage.classList.add('hidden');
  }
});