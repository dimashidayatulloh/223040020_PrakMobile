fun Int?.toAbjad() : String {
    return when (this) {
        null -> "Nilai harus diisi"
        in 80..100 -> "A"
        in 70..79 -> "AB"
        in 60..69 -> "B"
        in 50..59 -> "BC"
        in 40..49 -> "C"
        in 30..39 -> "D"
        in 0..29 -> "E"
        else -> "Nilai di luar jangkauan"
    }
}

fun main() {
    var angka: Int? = 77
    println(angka.toAbjad())

    angka = 110
    println(angka.toAbjad())

    angka = null
    println(angka.toAbjad())

    angka = 25
    println(angka.toAbjad())
}