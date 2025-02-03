data class  Mahasiswa (
    val nrp: String? = null,
    val nama: String,
    val ipk: Double? = null
)

//fun Int.toAbjad() : String {
//    return when (this) {
//        in 80..100 -> "A"
//        in 70..79 -> "AB"
//        in 60..69 -> "B"
//        in 50..59 -> "BC"
//        in 40..49 -> "C"
//        in 30..39 -> "D"
//        else -> "E"
//    }
//}

fun main() {
    val mhs = Mahasiswa(nama = "Budi")
    println(mhs.nrp)
    println(mhs.nama)
    mhs.ipk?.let { println(it) }

}