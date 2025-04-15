function submitForm(form, message = null) {
  Swal.fire({
    title: 'Peringatan',
    text: message ? message : 'Apakah Anda ingin melakukan aksi ini?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, lakukan',
    cancelButtonText: 'Batal',
  }).then((result) => {
    if (result.isConfirmed) {
      document.getElementById(form).submit()
    }
  })
}

function logout() {
  Swal.fire({
    title: 'Peringatan',
    text: 'Apakah Anda logout dari aplikasi?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Logout',
    cancelButtonText: 'Batal',
  }).then((result) => {
    if (result.isConfirmed) {
      document.getElementById('logout-form').submit()
    }
  })
}
