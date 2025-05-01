export function formatRupiah(nominal: number): string {
  if (nominal === null || nominal === undefined) return 'Rp.0'

  const numberString = nominal.toString().replace(/[^,\d]/g, '')
  const split = numberString.split(',')
  const remainder = split[0].length % 3
  let thousands = split[0].substr(0, remainder)
  const thausands = split[0].substr(remainder).match(/\d{3}/gi)

  if (thausands) {
    const separator = remainder ? '.' : ''
    thousands += separator + thausands.join('.')
  }

  thousands = split[1] !== undefined ? thousands + ',' + split[1] : thousands

  return 'Rp.' + thousands
}
