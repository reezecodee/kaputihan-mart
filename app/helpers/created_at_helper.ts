export function formatCreatedAt(date: string | Date) {
  // Cek apakah date sudah dalam format string
  const d = new Date(date)

  // Pastikan d adalah objek Date yang valid
  if (Number.isNaN(d.getTime())) {
    return 'Tanggal tidak valid'
  }

  // Ambil waktu (jam dan menit)
  const waktu = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false })

  // Ambil tanggal dengan bulan dalam bahasa Indonesia
  const tanggal = d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })

  return `${waktu} - ${tanggal}`
}
