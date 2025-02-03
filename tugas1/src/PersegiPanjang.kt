class PersegiPanjang (val height: Double, val width: Double) {
    fun calcArea() : Double {
        return height * width
    }
    fun calcPerimeter() : Double {
        return (height + width) * 2
    }
}

fun main() {
    val persegiPanjang = PersegiPanjang(4.0, 2.0)
    println("Panjang: ${persegiPanjang.height}")
    println("Lebar: ${persegiPanjang.width}")

    val area = persegiPanjang.calcArea()
    println("Luas: $area")

    val perimeter = persegiPanjang.calcPerimeter()
    println("Keliling: $perimeter")
}