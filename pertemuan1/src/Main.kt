open class Shape

class Rectangle (val height: Double, val width: Double) {
    fun calcArea() : Double {
        return height * width
    }
    fun calcPerimeter() : Double {
        return (height + width) * 2
    }
}

fun main() {
    val rectangle = Rectangle(10.0, 20.0)
    val area = rectangle.calcArea()
    println(area)

    val perimeter = rectangle.calcPerimeter()
    print(perimeter)
}
